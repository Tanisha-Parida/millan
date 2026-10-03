import { useState, useRef, useEffect, useCallback } from 'react';
import { m } from 'framer-motion';
import {
  Mic,
  MicOff,
  X,
  Send,
  Globe,
  Camera,
  CheckCircle2,
  Loader2,
  AlertCircle,
  ImageIcon,
  Edit3,
} from 'lucide-react';
import type { CraftItem } from '../types/craft';
import { useModalA11y } from '../hooks/useModalA11y';
import { DIALECT_PRESETS, type DialectPreset } from '../data/dialectPresets';

// ── SpeechRecognition browser types ──────────────────────────────────────────
// These aren't in the standard TS DOM lib — declare them minimally.

interface SpeechRecogResult {
  readonly transcript: string;
  readonly confidence: number;
}

interface SpeechRecogResultList {
  readonly length: number;
  [index: number]: { readonly [index: number]: SpeechRecogResult };
}

interface SpeechRecogEvent extends Event {
  readonly results: SpeechRecogResultList;
}

interface SpeechRecogErrorEvent extends Event {
  readonly error: string;
}

interface SpeechRecog extends EventTarget {
  lang: string;
  interimResults: boolean;
  continuous: boolean;
  maxAlternatives: number;
  onresult: ((event: SpeechRecogEvent) => void) | null;
  onerror: ((event: SpeechRecogErrorEvent) => void) | null;
  onend: (() => void) | null;
  start(): void;
  stop(): void;
  abort(): void;
}

// ── Types ────────────────────────────────────────────────────────────────────

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

// ── Speech recognition language map ──────────────────────────────────────────

const DIALECT_TO_LANG: Record<string, string> = {
  odia: 'or-IN',
  hindi: 'hi-IN',
  bengali: 'bn-IN',
  santhali: 'hi-IN', // fallback — most browsers lack Santhali
  english: 'en-IN',
};

// ── Simulated fallback listing (when API is unavailable) ─────────────────────

function makeFallbackListing(_transcript: string, dialect: DialectPreset): GeneratedListing {
  return {
    title: dialect.craftType,
    description: dialect.englishTranslation,
    tags: [dialect.name.split(' ')[0], 'Handmade', 'India', dialect.village],
    materials: 'Natural local materials (from artisan description)',
    suggestedPriceINR:
      dialect.rawCostINR + dialect.hours * dialect.fairHourlyWage +
      Math.round((dialect.rawCostINR + dialect.hours * dialect.fairHourlyWage) * 0.22),
    priceReasoning: `Materials ₹${dialect.rawCostINR} + ${dialect.hours} hours × ₹${dialect.fairHourlyWage}/hr + 22% skill premium.`,
  };
}

// ── Image resizer ────────────────────────────────────────────────────────────

function resizeImage(file: File, maxDim: number): Promise<string> {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.onload = () => {
      const img = new Image();
      img.onload = () => {
        let { width, height } = img;
        if (width > maxDim || height > maxDim) {
          const scale = maxDim / Math.max(width, height);
          width = Math.round(width * scale);
          height = Math.round(height * scale);
        }
        const canvas = document.createElement('canvas');
        canvas.width = width;
        canvas.height = height;
        const ctx = canvas.getContext('2d');
        if (!ctx) return reject(new Error('No canvas context'));
        ctx.drawImage(img, 0, 0, width, height);
        resolve(canvas.toDataURL('image/jpeg', 0.85));
      };
      img.onerror = reject;
      img.src = reader.result as string;
    };
    reader.onerror = reject;
    reader.readAsDataURL(file);
  });
}

// ── Web Speech API check ─────────────────────────────────────────────────────

function getSpeechRecognition(): (new () => SpeechRecog) | null {
  const w = window as unknown as {
    SpeechRecognition?: new () => SpeechRecog;
    webkitSpeechRecognition?: new () => SpeechRecog;
  };
  return w.SpeechRecognition || w.webkitSpeechRecognition || null;
}

// ── Component ────────────────────────────────────────────────────────────────

export const VoiceStudioModal: React.FC<VoiceStudioModalProps> = ({
  isOpen,
  onClose,
  onPublishListing,
}) => {
  // State
  const [selectedDialect, setSelectedDialect] = useState<DialectPreset>(DIALECT_PRESETS[0]);
  const [step, setStep] = useState<FlowStep>('record');
  const [transcript, setTranscript] = useState('');
  const [isRecording, setIsRecording] = useState(false);
  const [photoPreview, setPhotoPreview] = useState<string | null>(null);
  const [photoBase64, setPhotoBase64] = useState<string | null>(null);
  const [listing, setListing] = useState<GeneratedListing | null>(null);
  const [isOffline, setIsOffline] = useState(false);
  const [errorMsg, setErrorMsg] = useState<string | null>(null);
  const [speechSupported, setSpeechSupported] = useState(true);

  // Editable listing fields
  const [editTitle, setEditTitle] = useState('');
  const [editDesc, setEditDesc] = useState('');
  const [editMaterials, setEditMaterials] = useState('');
  const [editPrice, setEditPrice] = useState(0);

  const recognitionRef = useRef<SpeechRecog | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const panelRef = useModalA11y(isOpen, onClose);

  // Check speech support on mount
  useEffect(() => {
    setSpeechSupported(!!getSpeechRecognition());
  }, []);

  // Waveform animation
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    let animationId: number;
    let phase = 0;

    const renderWave = () => {
      const width = canvas.width;
      const height = canvas.height;
      ctx.clearRect(0, 0, width, height);

      const bars = 36;
      const barWidth = width / bars - 2;
      phase += 0.08;

      for (let i = 0; i < bars; i++) {
        const baseAmp = isRecording ? Math.sin(phase + i * 0.4) * 0.5 + 0.5 : 0.15;
        const noise = isRecording ? Math.random() * 0.35 : 0.05;
        const totalAmp = Math.min(1, baseAmp + noise);
        const barHeight = Math.max(4, totalAmp * (height * 0.85));
        const x = i * (barWidth + 2);
        const y = (height - barHeight) / 2;

        ctx.fillStyle = isRecording ? '#B23A2E' : '#6B3414';
        ctx.beginPath();
        ctx.rect(x, y, barWidth, barHeight);
        ctx.fill();
      }

      if (!prefersReducedMotion) {
        animationId = requestAnimationFrame(renderWave);
      }
    };

    renderWave();
    return () => cancelAnimationFrame(animationId);
  }, [isRecording]);

  // ── Recording ──────────────────────────────────────────────────────────────

  const startRecording = useCallback(() => {
    const SR = getSpeechRecognition();
    if (!SR) return;

    setTranscript('');
    setErrorMsg(null);
    setIsRecording(true);

    const recognition = new SR();
    recognition.lang = DIALECT_TO_LANG[selectedDialect.id] || 'hi-IN';
    recognition.interimResults = true;
    recognition.continuous = false;
    recognition.maxAlternatives = 1;

    recognition.onresult = (event: SpeechRecogEvent) => {
      let finalText = '';
      for (let i = 0; i < event.results.length; i++) {
        finalText += event.results[i][0].transcript;
      }
      setTranscript(finalText);
    };

    recognition.onerror = (event: SpeechRecogErrorEvent) => {
      console.warn('Speech error:', event.error);
      setIsRecording(false);
      if (event.error === 'not-allowed') {
        setErrorMsg('Microphone access was denied. You can type instead.');
      }
    };

    recognition.onend = () => {
      setIsRecording(false);
    };

    recognitionRef.current = recognition;
    recognition.start();
  }, [selectedDialect]);

  const stopRecording = useCallback(() => {
    recognitionRef.current?.stop();
    setIsRecording(false);
  }, []);

  // ── Photo ──────────────────────────────────────────────────────────────────

  const handlePhotoSelect = useCallback(async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    try {
      const resized = await resizeImage(file, 1024);
      setPhotoPreview(resized);
      setPhotoBase64(resized);
    } catch {
      setErrorMsg('Could not load the photo. Try a different image.');
    }
  }, []);

  // ── Generate listing ───────────────────────────────────────────────────────

  const generateListing = useCallback(async () => {
    const text = transcript.trim();
    if (text.length < 3) {
      setErrorMsg('Please say or type a description first.');
      return;
    }

    setStep('generating');
    setErrorMsg(null);
    setIsOffline(false);

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

      // API failed — fall back
      const errBody = (await res.json().catch(() => ({}))) as { error?: string; offline?: boolean };
      console.warn('API error:', errBody.error);

      // Use fallback
      const fallback = makeFallbackListing(text, selectedDialect);
      setListing(fallback);
      setEditTitle(fallback.title);
      setEditDesc(fallback.description);
      setEditMaterials(fallback.materials);
      setEditPrice(fallback.suggestedPriceINR);
      setIsOffline(true);
      setStep('review');
    } catch (err) {
      console.warn('Network error:', err);
      const fallback = makeFallbackListing(text, selectedDialect);
      setListing(fallback);
      setEditTitle(fallback.title);
      setEditDesc(fallback.description);
      setEditMaterials(fallback.materials);
      setEditPrice(fallback.suggestedPriceINR);
      setIsOffline(true);
      setStep('review');
    }
  }, [transcript, selectedDialect, photoBase64]);

  // ── Publish ────────────────────────────────────────────────────────────────

  const handlePublish = useCallback(() => {
    if (!listing) return;

    const newItem: CraftItem = {
      id: `CRAFT-${Date.now().toString().slice(-6)}`,
      title: editTitle || listing.title,
      category: listing.tags[0] || 'Handmade',
      subCategory: 'Voice listed',
      region: selectedDialect.village,
      state: 'India',
      image: photoPreview || selectedDialect.previewImage,
      priceINR: editPrice || listing.suggestedPriceINR,
      artisan: selectedDialect.artisanName,
      lineage: `${selectedDialect.name} tradition`,
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
    listing, editTitle, editDesc, editMaterials, editPrice,
    transcript, selectedDialect, photoPreview, onPublishListing,
  ]);

  // ── Reset ──────────────────────────────────────────────────────────────────

  const resetFlow = useCallback(() => {
    setStep('record');
    setTranscript('');
    setPhotoPreview(null);
    setPhotoBase64(null);
    setListing(null);
    setIsOffline(false);
    setErrorMsg(null);
  }, []);

  if (!isOpen) return null;

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-6 bg-indigo/80 backdrop-blur-sm overflow-y-auto"
      onClick={(e) => {
        if (e.target === e.currentTarget) onClose();
      }}
    >
      <m.div
        ref={panelRef}
        tabIndex={-1}
        role="dialog"
        aria-modal="true"
        aria-label="List a craft by speaking"
        initial={{ opacity: 0, scale: 0.94, y: 30 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        exit={{ opacity: 0, scale: 0.94, y: 30 }}
        className="relative w-full max-w-3xl my-auto rounded bg-khadi p-5 sm:p-8 shadow-xl text-left overflow-hidden focus:outline-none"
      >
        {/* Close button */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 w-9 h-9 rounded bg-cream border border-kiln/20 text-indigo hover:text-madder flex items-center justify-center transition-colors z-20"
          aria-label="Close"
        >
          <X size={18} />
        </button>

        {/* Header */}
        <div className="flex items-center gap-3 border-b border-kiln/15 pb-5 mb-6">
          <div className="w-11 h-11 rounded bg-madder flex items-center justify-center text-khadi shrink-0">
            <Mic size={22} />
          </div>
          <div>
            <h3 className="font-display text-2xl text-indigo">List a craft by speaking</h3>
            <p className="text-sm text-kiln mt-0.5">
              Describe your craft in your own language. We turn it into a listing.
            </p>
          </div>
        </div>

        {/* ─── Step 1: Record ──────────────────────────────────────────── */}
        {step === 'record' && (
          <div className="space-y-5">
            {/* Language selector */}
            <div className="space-y-2">
              <label className="text-sm text-kiln flex items-center gap-1.5">
                <Globe size={15} />
                <span>Language:</span>
              </label>
              <div className="flex items-center gap-2 overflow-x-auto pb-1 no-scrollbar">
                {DIALECT_PRESETS.map((preset) => (
                  <button
                    key={preset.id}
                    onClick={() => {
                      setSelectedDialect(preset);
                      setTranscript('');
                      setErrorMsg(null);
                    }}
                    className={`px-3 py-1.5 rounded text-sm transition-colors whitespace-nowrap ${
                      selectedDialect.id === preset.id
                        ? 'bg-madder text-khadi'
                        : 'bg-cream text-indigo border border-kiln/20 hover:border-kiln/40'
                    }`}
                  >
                    {preset.nativeLabel}
                  </button>
                ))}
              </div>
            </div>

            {/* Recording / Text input area */}
            <div className="p-4 rounded bg-cream border border-kiln/20 space-y-3">
              {speechSupported ? (
                <>
                  <div className="flex items-center justify-between gap-3">
                    <p className="text-sm text-kiln">
                      {isRecording
                        ? 'Listening — speak now...'
                        : transcript
                          ? 'Tap the mic to re-record, or edit the text below.'
                          : 'Tap the microphone and describe your craft.'}
                    </p>
                    <button
                      onClick={isRecording ? stopRecording : startRecording}
                      className={`px-4 py-2 rounded text-sm flex items-center gap-2 transition-colors shrink-0 ${
                        isRecording
                          ? 'bg-red-600 text-white'
                          : 'bg-madder text-khadi hover:bg-madder/90'
                      }`}
                    >
                      {isRecording ? (
                        <>
                          <MicOff size={16} />
                          <span>Stop</span>
                        </>
                      ) : (
                        <>
                          <Mic size={16} />
                          <span>Record</span>
                        </>
                      )}
                    </button>
                  </div>

                  {/* Waveform */}
                  <div className="w-full h-12 rounded bg-khadi border border-kiln/15 p-1.5 overflow-hidden">
                    <canvas ref={canvasRef} width={680} height={48} className="w-full h-full" />
                  </div>
                </>
              ) : (
                <p className="text-sm text-kiln">
                  Your browser does not support voice input. Type your description below instead.
                </p>
              )}

              {/* Editable transcript */}
              <textarea
                value={transcript}
                onChange={(e) => setTranscript(e.target.value)}
                placeholder={
                  speechSupported
                    ? 'Your speech will appear here. You can also type directly...'
                    : 'Describe your craft — materials, time, technique...'
                }
                rows={3}
                className="w-full bg-khadi border border-kiln/20 rounded px-3 py-2 text-indigo text-base placeholder:text-kiln/50 resize-none focus:outline-none focus:border-madder"
              />
            </div>

            {/* Photo upload */}
            <div className="space-y-2">
              <label className="text-sm text-kiln flex items-center gap-1.5">
                <Camera size={15} />
                <span>Attach a photo (optional):</span>
              </label>

              <input
                ref={fileInputRef}
                type="file"
                accept="image/*"
                capture="environment"
                onChange={handlePhotoSelect}
                className="sr-only"
                aria-label="Upload craft photo"
              />

              {photoPreview ? (
                <div className="relative inline-block">
                  <img
                    src={photoPreview}
                    alt="Craft photo preview"
                    className="w-32 h-32 object-cover rounded border border-kiln/20"
                  />
                  <button
                    onClick={() => {
                      setPhotoPreview(null);
                      setPhotoBase64(null);
                    }}
                    className="absolute -top-2 -right-2 w-6 h-6 rounded-full bg-madder text-khadi flex items-center justify-center text-xs"
                    aria-label="Remove photo"
                  >
                    ✕
                  </button>
                </div>
              ) : (
                <button
                  onClick={() => fileInputRef.current?.click()}
                  className="flex items-center gap-2 px-4 py-2.5 rounded bg-cream border border-kiln/20 text-indigo text-sm hover:border-kiln/40 transition-colors"
                >
                  <ImageIcon size={16} className="text-kiln" />
                  <span>Choose photo</span>
                </button>
              )}
            </div>

            {/* Error */}
            {errorMsg && (
              <div className="flex items-start gap-2 p-3 rounded bg-madder/10 border border-madder/30 text-sm text-madder">
                <AlertCircle size={16} className="shrink-0 mt-0.5" />
                <span>{errorMsg}</span>
              </div>
            )}

            {/* Generate button */}
            <button
              onClick={generateListing}
              disabled={transcript.trim().length < 3}
              className="w-full py-3 rounded bg-madder text-khadi text-base font-semibold flex items-center justify-center gap-2 transition-colors hover:bg-madder/90 disabled:opacity-40 disabled:cursor-not-allowed"
            >
              <Send size={16} />
              <span>Generate listing</span>
            </button>

            <p className="text-xs text-kiln text-center">
              This is a prototype. The listing is generated by AI and may need editing.
            </p>
          </div>
        )}

        {/* ─── Step 2: Generating ──────────────────────────────────────── */}
        {step === 'generating' && (
          <div className="flex flex-col items-center justify-center py-16 space-y-4">
            <Loader2 size={32} className="text-madder animate-spin" />
            <p className="text-lg text-indigo font-display">Creating your listing...</p>
            <p className="text-sm text-kiln">
              The AI is reading your description
              {photoBase64 ? ' and photo' : ''} to build a listing.
            </p>
          </div>
        )}

        {/* ─── Step 3: Review & edit ───────────────────────────────────── */}
        {step === 'review' && listing && (
          <div className="space-y-5">
            {/* Offline notice */}
            {isOffline && (
              <div className="flex items-center gap-2 px-3 py-2 rounded bg-haldi/15 border border-haldi/30 text-sm text-kiln">
                <AlertCircle size={15} className="text-haldi shrink-0" />
                <span>Offline example — connect the Gemini API for real listings.</span>
              </div>
            )}

            <div className="flex items-center gap-2 text-sm text-kiln">
              <Edit3 size={15} />
              <span>Review and edit your listing before publishing:</span>
            </div>

            {/* Editable listing card */}
            <div className="p-5 rounded bg-cream border border-kiln/20 space-y-4">
              {/* Photo + Title row */}
              <div className="flex gap-4">
                {photoPreview && (
                  <img
                    src={photoPreview}
                    alt="Craft photo"
                    className="w-24 h-24 object-cover rounded border border-kiln/15 shrink-0"
                  />
                )}
                <div className="flex-1 space-y-2">
                  <label className="text-xs text-kiln">Title</label>
                  <input
                    type="text"
                    value={editTitle}
                    onChange={(e) => setEditTitle(e.target.value)}
                    className="w-full bg-khadi border border-kiln/20 rounded px-3 py-1.5 text-indigo font-display text-lg focus:outline-none focus:border-madder"
                  />
                </div>
              </div>

              {/* Description */}
              <div className="space-y-1">
                <label className="text-xs text-kiln">Description</label>
                <textarea
                  value={editDesc}
                  onChange={(e) => setEditDesc(e.target.value)}
                  rows={2}
                  className="w-full bg-khadi border border-kiln/20 rounded px-3 py-1.5 text-indigo text-base resize-none focus:outline-none focus:border-madder"
                />
              </div>

              {/* Materials */}
              <div className="space-y-1">
                <label className="text-xs text-kiln">Materials</label>
                <input
                  type="text"
                  value={editMaterials}
                  onChange={(e) => setEditMaterials(e.target.value)}
                  className="w-full bg-khadi border border-kiln/20 rounded px-3 py-1.5 text-indigo text-base focus:outline-none focus:border-madder"
                />
              </div>

              {/* Tags */}
              <div className="space-y-1">
                <label className="text-xs text-kiln">Tags</label>
                <div className="flex flex-wrap gap-1.5">
                  {listing.tags.map((tag, i) => (
                    <span
                      key={i}
                      className="px-2 py-0.5 rounded bg-khadi border border-kiln/15 text-sm text-indigo"
                    >
                      {tag}
                    </span>
                  ))}
                </div>
              </div>

              {/* Price */}
              <div className="flex items-end gap-4 pt-2 border-t border-kiln/15">
                <div className="space-y-1">
                  <label className="text-xs text-kiln">Suggested price (₹)</label>
                  <input
                    type="number"
                    value={editPrice}
                    onChange={(e) => setEditPrice(Number(e.target.value))}
                    min={1}
                    className="w-36 bg-khadi border border-kiln/20 rounded px-3 py-1.5 text-indigo text-lg font-display focus:outline-none focus:border-madder"
                  />
                </div>
                <p className="text-xs text-kiln flex-1">{listing.priceReasoning}</p>
              </div>
            </div>

            {/* Actions */}
            <div className="flex items-center gap-3">
              <button
                onClick={handlePublish}
                className="flex-1 py-3 rounded bg-madder text-khadi text-base font-semibold flex items-center justify-center gap-2 hover:bg-madder/90 transition-colors"
              >
                <Send size={16} />
                <span>Publish to crafts</span>
              </button>
              <button
                onClick={resetFlow}
                className="px-4 py-3 rounded bg-khadi border border-kiln/20 text-indigo text-sm hover:bg-cream transition-colors"
              >
                Start over
              </button>
            </div>
          </div>
        )}

        {/* ─── Step 4: Published ───────────────────────────────────────── */}
        {step === 'published' && (
          <div className="flex flex-col items-center justify-center py-12 space-y-4 text-center">
            <div className="w-14 h-14 rounded-full bg-neem/15 flex items-center justify-center">
              <CheckCircle2 size={28} className="text-neem" />
            </div>
            <h4 className="font-display text-2xl text-indigo">
              Published to crafts
            </h4>
            <p className="text-sm text-kiln max-w-sm">
              Your listing is now visible in the crafts section. In a real deployment
              it would be searchable by buyers.
            </p>
            <div className="flex items-center gap-3 pt-2">
              <button
                onClick={resetFlow}
                className="px-5 py-2.5 rounded bg-madder text-khadi text-sm font-semibold hover:bg-madder/90 transition-colors"
              >
                List another craft
              </button>
              <button
                onClick={onClose}
                className="px-5 py-2.5 rounded bg-cream border border-kiln/20 text-indigo text-sm hover:bg-khadi transition-colors"
              >
                Done
              </button>
            </div>
          </div>
        )}
      </m.div>
    </div>
  );
};

export default VoiceStudioModal;
