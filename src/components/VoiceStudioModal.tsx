import { useState, useRef, useEffect, useCallback } from 'react';
import { m as motion } from 'framer-motion';
import {
  Mic,
  MicOff,
  X,
  Globe,
  Camera,
  CheckCircle2,
  Loader2,
  AlertCircle,
  Volume2,
  VolumeX,
  Sparkles,
} from 'lucide-react';
import type { CraftItem } from '../types/craft';
import { useModalA11y } from '../hooks/useModalA11y';
import { DIALECT_PRESETS, type DialectPreset } from '../data/dialectPresets';
import { playDialectVoice, stopDialectVoice } from '../lib/speechAudio';

interface VoiceStudioModalProps {
  isOpen: boolean;
  onClose: () => void;
  onPublishListing?: (newItem: CraftItem) => void;
}

interface GeneratedListing {
  title: string;
  description: string;
  tags: string[];
  materials: string;
  suggestedPriceINR: number;
  priceReasoning: string;
}

type FlowStep = 'record' | 'generating' | 'review' | 'published';

const DIALECT_TO_LANG: Record<string, string> = {
  odia: 'or-IN',
  hindi: 'hi-IN',
  bengali: 'bn-IN',
  santhali: 'hi-IN',
  english: 'en-IN',
};

function makeFallbackListing(_transcript: string, dialect: DialectPreset): GeneratedListing {
  return {
    title: dialect.craftType,
    description: dialect.englishTranslation,
    tags: [dialect.name.split(' ')[0], 'Handmade', 'India', dialect.village],
    materials: 'Natural local materials (from artisan description)',
    suggestedPriceINR:
      dialect.rawCostINR +
      dialect.hours * dialect.fairHourlyWage +
      Math.round((dialect.rawCostINR + dialect.hours * dialect.fairHourlyWage) * 0.22),
    priceReasoning: `Materials ₹${dialect.rawCostINR} + ${dialect.hours} hours × ₹${dialect.fairHourlyWage}/hr + 22% skill premium.`,
  };
}

function resizeImage(file: File, maxDim: number): Promise<string> {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.onload = (e) => {
      const img = new Image();
      img.onload = () => {
        let { width, height } = img;
        if (width > maxDim || height > maxDim) {
          if (width > height) {
            height = Math.round((height * maxDim) / width);
            width = maxDim;
          } else {
            width = Math.round((width * maxDim) / height);
            height = maxDim;
          }
        }
        const canvas = document.createElement('canvas');
        canvas.width = width;
        canvas.height = height;
        const ctx = canvas.getContext('2d');
        if (!ctx) {
          reject(new Error('Canvas context unavailable'));
          return;
        }
        ctx.drawImage(img, 0, 0, width, height);
        resolve(canvas.toDataURL('image/jpeg', 0.85));
      };
      img.onerror = reject;
      img.src = e.target?.result as string;
    };
    reader.onerror = reject;
    reader.readAsDataURL(file);
  });
}

const GROQ_API_KEY = (import.meta.env.VITE_GROQ_API_KEY as string) || '';

export const VoiceStudioModal: React.FC<VoiceStudioModalProps> = ({
  isOpen,
  onClose,
  onPublishListing,
}) => {
  const [step, setStep] = useState<FlowStep>('record');
  const [selectedDialect, setSelectedDialect] = useState<DialectPreset>(DIALECT_PRESETS[0]);
  const [isRecording, setIsRecording] = useState(false);
  const [isTranscribing, setIsTranscribing] = useState(false);
  const [transcript, setTranscript] = useState('');
  const [photoPreview, setPhotoPreview] = useState<string | null>(null);
  const [photoBase64, setPhotoBase64] = useState<string | null>(null);
  const [listing, setListing] = useState<GeneratedListing | null>(null);
  const [errorMsg, setErrorMsg] = useState<string | null>(null);

  // Editable fields in review step
  const [editTitle, setEditTitle] = useState('');
  const [editDesc, setEditDesc] = useState('');
  const [editMaterials, setEditMaterials] = useState('');
  const [editPrice, setEditPrice] = useState<number>(0);

  const mediaRecorderRef = useRef<MediaRecorder | null>(null);
  const audioChunksRef = useRef<Blob[]>([]);
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const fileInputRef = useRef<HTMLInputElement | null>(null);
  const panelRef = useModalA11y(isOpen, onClose);

  // Visualizer loop for waveform
  const [isPlayingAudio, setIsPlayingAudio] = useState(false);

  useEffect(() => {
    return () => {
      stopDialectVoice();
    };
  }, []);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let animationId: number;
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

    const renderWave = () => {
      const { width, height } = canvas;
      ctx.clearRect(0, 0, width, height);
      const bars = 28;
      const barWidth = 4;
      const spacing = (width - bars * barWidth) / (bars - 1);

      for (let i = 0; i < bars; i++) {
        const x = i * (barWidth + spacing);
        let barHeight: number;
        if (isRecording || isPlayingAudio) {
          const t = Date.now() / 150 + i * 0.4;
          barHeight = Math.max(6, Math.abs(Math.sin(t)) * (height * 0.75));
        } else {
          barHeight = 4;
        }
        const y = (height - barHeight) / 2;
        ctx.fillStyle = isRecording ? '#A8402F' : isPlayingAudio ? '#2D6A4F' : '#C9B79C';
        ctx.beginPath();
        ctx.rect(x, y, barWidth, barHeight);
        ctx.fill();
      }

      if (!prefersReducedMotion && (isRecording || isPlayingAudio)) {
        animationId = requestAnimationFrame(renderWave);
      }
    };

    renderWave();
    return () => cancelAnimationFrame(animationId);
  }, [isRecording, isPlayingAudio]);

  const stopAudioPlayback = useCallback(() => {
    stopDialectVoice();
    setIsPlayingAudio(false);
  }, []);

  const playVoiceSample = useCallback(() => {
    const textToSpeak = transcript.trim() || selectedDialect.speechAudioText;
    setIsPlayingAudio(true);
    playDialectVoice(
      textToSpeak,
      DIALECT_TO_LANG[selectedDialect.id] || 'or-IN',
      () => setIsPlayingAudio(false),
      () => setIsPlayingAudio(false)
    );
  }, [transcript, selectedDialect]);

  const loadPresetSample = useCallback((preset: DialectPreset) => {
    setSelectedDialect(preset);
    setTranscript(preset.speechAudioText);
    setPhotoPreview(preset.previewImage);
    setPhotoBase64(preset.previewImage);
    setErrorMsg(null);
  }, []);

  const startRecording = useCallback(async () => {
    setTranscript('');
    setErrorMsg(null);
    setIsRecording(true);
    setIsTranscribing(false);
    stopAudioPlayback();

    audioChunksRef.current = [];

    if (typeof navigator === 'undefined' || !navigator.mediaDevices?.getUserMedia) {
      setIsRecording(false);
      setErrorMsg('Microphone is not supported in this browser environment. You may type directly.');
      return;
    }

    try {
      const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
      let chosenMime = '';
      if (typeof MediaRecorder !== 'undefined') {
        const candidateTypes = [
          'audio/webm;codecs=opus',
          'audio/webm',
          'audio/mp4',
          'audio/aac',
        ];
        for (const t of candidateTypes) {
          if (MediaRecorder.isTypeSupported(t)) {
            chosenMime = t;
            break;
          }
        }
      }

      const mediaRecorder = chosenMime
        ? new MediaRecorder(stream, { mimeType: chosenMime })
        : new MediaRecorder(stream);

      const effectiveMime = mediaRecorder.mimeType || chosenMime || 'audio/webm';

      mediaRecorder.ondataavailable = (e) => {
        if (e.data && e.data.size > 0) {
          audioChunksRef.current.push(e.data);
        }
      };

      mediaRecorder.onstop = async () => {
        setIsRecording(false);
        setIsTranscribing(true);
        stream.getTracks().forEach((track) => track.stop());

        const audioBlob = new Blob(audioChunksRef.current, { type: effectiveMime });
        if (audioBlob.size < 500) {
          setIsTranscribing(false);
          setErrorMsg('Recording was too short. Speak into your microphone and press Stop when finished.');
          return;
        }

        try {
          const isAppleAudio = effectiveMime.includes('mp4') || effectiveMime.includes('aac');
          const ext = isAppleAudio ? 'm4a' : 'webm';
          const formData = new FormData();
          formData.append('file', audioBlob, `artisan-recording.${ext}`);
          formData.append('model', 'whisper-large-v3-turbo');

          let resp: Response | null = null;

          // 1. Try serverless backend proxy
          try {
            resp = await fetch('/api/transcribe', {
              method: 'POST',
              body: formData,
            });
          } catch {
            // network/proxy fallback
          }

          // 2. Fallback to direct client API if backend proxy fails or returned error
          if ((!resp || !resp.ok) && GROQ_API_KEY) {
            resp = await fetch('https://api.groq.com/openai/v1/audio/transcriptions', {
              method: 'POST',
              headers: {
                Authorization: `Bearer ${GROQ_API_KEY}`,
              },
              body: formData,
            });
          }

          if (!resp || !resp.ok) {
            const errBody = resp ? await resp.text() : 'No response';
            console.warn('Groq Whisper error response:', resp?.status, errBody);
            throw new Error(`Whisper transcription failed`);
          }

          const data = (await resp.json()) as { text?: string };
          const spokenText = (data.text || '').trim();
          if (spokenText) {
            setTranscript(spokenText);
            setErrorMsg(null);
          } else {
            setErrorMsg('No speech detected in audio. Please speak clearly or load sample voice.');
          }
        } catch (err) {
          console.warn('Whisper API call error:', err);
          setErrorMsg('Could not transcribe audio. Check your connection or load a sample voice.');
        } finally {
          setIsTranscribing(false);
        }
      };

      mediaRecorderRef.current = mediaRecorder;
      mediaRecorder.start();
    } catch (err) {
      console.warn('Microphone permission error:', err);
      setIsRecording(false);
      setErrorMsg('Microphone access was denied. Please allow microphone permissions or type directly.');
    }
  }, [stopAudioPlayback]);

  const stopRecording = useCallback(() => {
    if (mediaRecorderRef.current && mediaRecorderRef.current.state !== 'inactive') {
      mediaRecorderRef.current.stop();
    }
    setIsRecording(false);
  }, []);

  const handlePhotoSelect = useCallback(async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    try {
      const resized = await resizeImage(file, 1024);
      setPhotoPreview(resized);
      setPhotoBase64(resized);
    } catch {
      setErrorMsg('Could not load the photo. Please try a different image.');
    }
  }, []);

  const generateListing = useCallback(async () => {
    const text = transcript.trim();
    if (text.length < 3) {
      setErrorMsg('Please describe your craft first by speaking or typing.');
      return;
    }

    setStep('generating');
    setErrorMsg(null);

    try {
      const body: { transcript: string; language: string; imageBase64?: string } = {
        transcript: text,
        language: DIALECT_TO_LANG[selectedDialect.id] || 'unknown',
      };
      if (photoBase64) {
        body.imageBase64 = photoBase64;
      }

      const res = await fetch('/api/generate-listing', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(body),
      });

      if (res.ok) {
        const data = (await res.json()) as GeneratedListing;
        setListing(data);
        setEditTitle(data.title);
        setEditDesc(data.description);
        setEditMaterials(data.materials);
        setEditPrice(data.suggestedPriceINR);
        setStep('review');
        return;
      }

      // Fallback if API fails
      const fallback = makeFallbackListing(text, selectedDialect);
      setListing(fallback);
      setEditTitle(fallback.title);
      setEditDesc(fallback.description);
      setEditMaterials(fallback.materials);
      setEditPrice(fallback.suggestedPriceINR);
      setStep('review');
    } catch {
      const fallback = makeFallbackListing(text, selectedDialect);
      setListing(fallback);
      setEditTitle(fallback.title);
      setEditDesc(fallback.description);
      setEditMaterials(fallback.materials);
      setEditPrice(fallback.suggestedPriceINR);
      setStep('review');
    }
  }, [transcript, selectedDialect, photoBase64]);

  const handlePublish = useCallback(() => {
    if (!listing) return;

    const newItem: CraftItem = {
      id: `CRAFT-${Date.now().toString().slice(-6)}`,
      title: editTitle || listing.title,
      category: listing.tags[0] || 'Textiles & Handloom',
      subCategory: 'Artisan voice listing',
      region: selectedDialect.village,
      state: selectedDialect.id === 'odia' ? 'Odisha' : selectedDialect.id === 'bengali' ? 'West Bengal' : 'India',
      image: photoPreview || '/images/potter-jharokha.webp',
      priceINR: editPrice || listing.suggestedPriceINR,
      artisan: selectedDialect.artisanName,
      lineage: 'Master artisan lineage',
      hoursToCraft: selectedDialect.hours,
      materials: editMaterials || listing.materials,
      audioNarrative: {
        dialect: selectedDialect.name,
        vernacularQuote: transcript,
        englishTranslation: editDesc || listing.description,
      },
    };

    onPublishListing?.(newItem);
    setStep('published');
  }, [
    listing,
    editTitle,
    editDesc,
    editMaterials,
    editPrice,
    transcript,
    selectedDialect,
    photoPreview,
    onPublishListing,
  ]);

  const resetFlow = useCallback(() => {
    setStep('record');
    setTranscript('');
    setPhotoPreview(null);
    setPhotoBase64(null);
    setListing(null);
    setErrorMsg(null);
  }, []);

  if (!isOpen) return null;

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 bg-vat/80 backdrop-blur-sm overflow-y-auto"
      onClick={(e) => {
        if (e.target === e.currentTarget) onClose();
      }}
    >
      <motion.div
        ref={panelRef}
        tabIndex={-1}
        role="dialog"
        aria-modal="true"
        aria-label="List a craft by speaking"
        initial={{ opacity: 0, scale: 0.95, y: 20 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        exit={{ opacity: 0, scale: 0.95, y: 20 }}
        className="relative w-full max-w-2xl my-auto rounded-[4px] bg-parchment border border-clay p-6 sm:p-8 shadow-xl text-left overflow-hidden focus:outline-none"
      >
        {/* Close Button */}
        <button
          type="button"
          onClick={onClose}
          className="absolute top-4 right-4 w-10 h-10 rounded-[6px] bg-khadi border border-clay text-ink hover:text-madder flex items-center justify-center transition-colors cursor-pointer"
          aria-label="Close modal"
        >
          <X size={18} />
        </button>

        {/* Header */}
        <div className="flex items-center gap-4 border-b border-clay/40 pb-4 mb-6">
          <div className="w-12 h-12 rounded-[6px] bg-madder flex items-center justify-center text-bone shrink-0 shadow-xs">
            <Mic size={22} />
          </div>
          <div>
            <h3 className="font-heading text-2xl text-ink font-semibold">
              List a craft by speaking
            </h3>
            <p className="text-sm text-ink-soft mt-0.5">
              Describe your work in your native tongue. We compute fair pricing and build the listing.
            </p>
          </div>
        </div>

        {/* ─── Step 1: Record ──────────────────────────────────────────── */}
        {step === 'record' && (
          <div className="space-y-6">
            {/* Language Selector */}
            <div className="space-y-2">
              <label className="text-xs text-ink-soft font-medium flex items-center gap-1.5">
                <Globe size={14} />
                <span>Dialect preset:</span>
              </label>
              <div className="flex items-center gap-2 overflow-x-auto pb-1 no-scrollbar">
                {DIALECT_PRESETS.map((preset) => (
                  <button
                    key={preset.id}
                    type="button"
                    onClick={() => {
                      setSelectedDialect(preset);
                      stopAudioPlayback();
                    }}
                    className={`h-9 px-3 rounded-[6px] text-xs font-body transition-colors whitespace-nowrap cursor-pointer ${
                      selectedDialect.id === preset.id
                        ? 'bg-madder text-bone font-semibold'
                        : 'bg-khadi text-ink border border-clay hover:bg-clay/20'
                    }`}
                  >
                    {preset.nativeLabel} ({preset.name.split(' ')[0]})
                  </button>
                ))}
              </div>
            </div>

            {/* Recording & Input Area */}
            <div className="p-4 rounded-[4px] bg-khadi border border-clay space-y-4">
              <div className="flex items-center justify-between gap-3">
                <p className="text-xs text-ink-soft">
                  {isRecording
                    ? `Listening to ${selectedDialect.name}... speak into your microphone, then click Stop.`
                    : isTranscribing
                      ? `Transcribing your voice with Groq Whisper AI (whisper-large-v3-turbo)...`
                      : isPlayingAudio
                        ? `Playing ${selectedDialect.name} audio narrative...`
                        : transcript
                          ? 'Real voice transcribed. Edit text if needed, then generate listing.'
                          : `Press Record to speak in ${selectedDialect.name.split(' ')[0]}, or click "Load Sample Voice".`}
                </p>
                <div className="flex items-center gap-2">
                  <button
                    type="button"
                    disabled={isTranscribing}
                    onClick={isRecording ? stopRecording : startRecording}
                    className={`h-10 px-4 rounded-[6px] text-xs font-medium flex items-center gap-2 transition-colors cursor-pointer shrink-0 ${
                      isRecording
                        ? 'bg-madder-dark text-bone animate-pulse'
                        : isTranscribing
                          ? 'bg-clay text-ink-soft cursor-not-allowed opacity-70'
                          : 'bg-madder hover:bg-madder-dark text-bone'
                    }`}
                  >
                    {isRecording ? <MicOff size={15} /> : isTranscribing ? <Loader2 size={15} className="animate-spin" /> : <Mic size={15} />}
                    <span>{isRecording ? 'Stop' : isTranscribing ? 'Transcribing...' : 'Record'}</span>
                  </button>
                </div>
              </div>

              {/* Status Banner when transcribing */}
              {isTranscribing && (
                <div className="flex items-center gap-2 p-2.5 rounded-[4px] bg-madder/10 border border-madder/30 text-madder text-xs font-medium animate-pulse">
                  <Loader2 size={14} className="animate-spin shrink-0" />
                  <span>Processing authentic speech with Groq Whisper AI model...</span>
                </div>
              )}

              {/* Error banner */}
              {errorMsg && (
                <div className="flex items-center gap-2 p-2.5 rounded-[4px] bg-red-500/10 border border-red-500/30 text-red-700 dark:text-red-300 text-xs">
                  <AlertCircle size={14} className="shrink-0" />
                  <span>{errorMsg}</span>
                </div>
              )}

              {/* Waveform Canvas */}
              <div className="w-full h-10 rounded-[4px] bg-parchment border border-clay/50 p-1 overflow-hidden">
                <canvas ref={canvasRef} width={640} height={40} className="w-full h-full" />
              </div>

              {/* Textarea */}
              <textarea
                value={transcript}
                onChange={(e) => setTranscript(e.target.value)}
                placeholder={`Describe the craft in ${selectedDialect.name}, materials, hours spent, or click "Load Sample Voice"...`}
                rows={3}
                className="w-full bg-parchment border border-clay rounded-[6px] p-3 text-ink text-sm placeholder:text-ink-soft/60 resize-none focus:outline-none focus:border-madder"
              />

              {/* Sample Voice & Audio Playback Tools */}
              <div className="flex flex-wrap items-center justify-between gap-2 pt-2 border-t border-clay/40">
                <div className="flex flex-wrap items-center gap-2">
                  <button
                    type="button"
                    onClick={() => loadPresetSample(selectedDialect)}
                    className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-[4px] bg-madder/10 hover:bg-madder/20 text-madder text-xs font-medium transition-colors cursor-pointer"
                    title={`Load verified ${selectedDialect.name} voice transcript & photo`}
                  >
                    <Sparkles size={13} />
                    <span>Load {selectedDialect.name.split(' ')[0]} Sample Voice</span>
                  </button>

                  <button
                    type="button"
                    onClick={isPlayingAudio ? stopAudioPlayback : playVoiceSample}
                    className={`inline-flex items-center gap-1.5 px-3 py-1.5 rounded-[4px] border text-xs font-medium transition-colors cursor-pointer ${
                      isPlayingAudio
                        ? 'bg-madder text-bone border-madder'
                        : 'bg-parchment hover:bg-clay/20 border-clay text-ink'
                    }`}
                    title="Listen to the voice audio spoken aloud"
                  >
                    {isPlayingAudio ? <VolumeX size={13} /> : <Volume2 size={13} />}
                    <span>{isPlayingAudio ? 'Stop Audio' : 'Listen Voice (ଭଏସ୍ ଶୁଣନ୍ତୁ)'}</span>
                  </button>
                </div>

                {transcript.length > 0 && (
                  <button
                    type="button"
                    onClick={() => {
                      setTranscript('');
                      stopAudioPlayback();
                    }}
                    className="text-xs text-ink-soft hover:text-madder underline cursor-pointer"
                  >
                    Clear text
                  </button>
                )}
              </div>
            </div>

            {/* Photo Attachment */}
            <div className="space-y-2">
              <label className="text-xs text-ink-soft font-medium flex items-center gap-1.5">
                <Camera size={14} />
                <span>Craft photograph (optional):</span>
              </label>
              <div className="flex items-center gap-4">
                <input
                  ref={fileInputRef}
                  type="file"
                  accept="image/*"
                  onChange={handlePhotoSelect}
                  className="hidden"
                />
                <button
                  type="button"
                  onClick={() => fileInputRef.current?.click()}
                  className="btn-secondary h-11 text-xs"
                >
                  <Camera size={14} className="mr-2" />
                  <span>{photoPreview ? 'Change photo' : 'Upload photo'}</span>
                </button>
                {photoPreview && (
                  <div className="w-11 h-11 rounded-[4px] overflow-hidden border border-clay shrink-0">
                    <img
                      src={photoPreview}
                      alt="Craft preview"
                      width={44}
                      height={44}
                      className="w-full h-full object-cover craft-grade"
                    />
                  </div>
                )}
              </div>
            </div>

            {errorMsg && (
              <div className="p-3 rounded-[4px] bg-madder/10 border border-madder/30 text-madder text-xs flex items-center gap-2">
                <AlertCircle size={15} className="shrink-0" />
                <span>{errorMsg}</span>
              </div>
            )}

            {/* Actions */}
            <div className="flex justify-end gap-3 pt-2">
              <button type="button" onClick={onClose} className="btn-secondary h-11 text-xs">
                Cancel
              </button>
              <button
                type="button"
                onClick={generateListing}
                disabled={transcript.trim().length === 0}
                className="btn-primary h-11 text-xs"
              >
                Generate listing
              </button>
            </div>
          </div>
        )}

        {/* ─── Step 2: Generating ──────────────────────────────────────── */}
        {step === 'generating' && (
          <div className="py-16 text-center space-y-4">
            <Loader2 size={36} className="animate-spin text-madder mx-auto" />
            <h4 className="font-heading text-xl text-ink font-semibold">
              Translating and computing fair price...
            </h4>
            <p className="text-xs text-ink-soft max-w-sm mx-auto">
              Analyzing vernacular dialect, estimating raw material values, and setting transparent artisan compensation.
            </p>
          </div>
        )}

        {/* ─── Step 3: Review & Edit ────────────────────────────────────── */}
        {step === 'review' && listing && (
          <div className="space-y-6 text-left">
            <div className="space-y-3">
              <div>
                <label className="text-xs text-ink-soft font-medium block mb-1">
                  Listing title
                </label>
                <input
                  type="text"
                  value={editTitle}
                  onChange={(e) => setEditTitle(e.target.value)}
                  className="w-full h-11 bg-khadi border border-clay rounded-[6px] px-3 text-sm text-ink font-medium focus:outline-none focus:border-madder"
                />
              </div>

              <div>
                <label className="text-xs text-ink-soft font-medium block mb-1">
                  English translation & description
                </label>
                <textarea
                  value={editDesc}
                  onChange={(e) => setEditDesc(e.target.value)}
                  rows={2}
                  className="w-full bg-khadi border border-clay rounded-[6px] p-3 text-sm text-ink focus:outline-none focus:border-madder"
                />
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="text-xs text-ink-soft font-medium block mb-1">
                    Materials used
                  </label>
                  <input
                    type="text"
                    value={editMaterials}
                    onChange={(e) => setEditMaterials(e.target.value)}
                    className="w-full h-11 bg-khadi border border-clay rounded-[6px] px-3 text-sm text-ink focus:outline-none focus:border-madder"
                  />
                </div>
                <div>
                  <label className="text-xs text-ink-soft font-medium block mb-1">
                    Suggested buyer price (₹)
                  </label>
                  <input
                    type="number"
                    value={editPrice || ''}
                    onChange={(e) => setEditPrice(parseInt(e.target.value, 10) || 0)}
                    className="w-full h-11 bg-khadi border border-clay rounded-[6px] px-3 text-sm text-ink font-semibold tabular-nums focus:outline-none focus:border-madder"
                  />
                </div>
              </div>

              <div className="p-3 bg-khadi/70 border border-clay/60 rounded-[4px] text-xs text-ink-soft">
                <span className="font-semibold text-ink">Price rationale: </span>
                <span>{listing.priceReasoning}</span>
              </div>
            </div>

            <div className="flex justify-end gap-3 pt-3 border-t border-clay/40">
              <button type="button" onClick={resetFlow} className="btn-secondary h-11 text-xs">
                Back
              </button>
              <button type="button" onClick={handlePublish} className="btn-primary h-11 text-xs">
                Publish to marketplace
              </button>
            </div>
          </div>
        )}

        {/* ─── Step 4: Published ───────────────────────────────────────── */}
        {step === 'published' && (
          <div className="py-8 text-center space-y-6">
            <CheckCircle2 size={44} className="text-neem mx-auto" />
            <div>
              <h4 className="font-heading text-2xl text-ink font-semibold">
                Listing successfully published!
              </h4>
              <p className="text-xs text-ink-soft mt-1">
                Your craft is now live in the Milaan catalog with direct-to-artisan checkout.
              </p>
            </div>

            <div className="p-4 bg-khadi border border-clay rounded-[4px] max-w-sm mx-auto text-left">
              <div className="text-xs text-madder font-semibold mb-1">Live listing</div>
              <div className="font-heading text-lg text-ink font-semibold">{editTitle}</div>
              <div className="text-xs text-ink-soft mt-1">
                {selectedDialect.village}
              </div>
              <div className="text-sm font-bold text-ink mt-2">
                ₹{editPrice.toLocaleString('en-IN')}
              </div>
            </div>

            <div className="flex justify-center gap-3 pt-2">
              <button type="button" onClick={resetFlow} className="btn-secondary h-11 text-xs">
                List another craft
              </button>
              <button type="button" onClick={onClose} className="btn-primary h-11 text-xs">
                Done
              </button>
            </div>
          </div>
        )}
      </motion.div>
    </div>
  );
};

export default VoiceStudioModal;
