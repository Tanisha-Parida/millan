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
} from 'lucide-react';
import type { CraftItem } from '../types/craft';
import { useModalA11y } from '../hooks/useModalA11y';
import { DIALECT_PRESETS, type DialectPreset } from '../data/dialectPresets';

// ── SpeechRecognition browser types ──────────────────────────────────────────

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

function getSpeechRecognition(): { new (): SpeechRecog } | null {
  if (typeof window === 'undefined') return null;
  const w = window as unknown as Record<string, unknown>;
  return (w.SpeechRecognition || w.webkitSpeechRecognition || null) as { new (): SpeechRecog } | null;
}

export const VoiceStudioModal: React.FC<VoiceStudioModalProps> = ({
  isOpen,
  onClose,
  onPublishListing,
}) => {
  const [step, setStep] = useState<FlowStep>('record');
  const [selectedDialect, setSelectedDialect] = useState<DialectPreset>(DIALECT_PRESETS[0]);
  const [isRecording, setIsRecording] = useState(false);
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

  const recognitionRef = useRef<SpeechRecog | null>(null);
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const fileInputRef = useRef<HTMLInputElement | null>(null);
  const panelRef = useModalA11y(isOpen, onClose);

  const speechSupported = typeof window !== 'undefined' && getSpeechRecognition() !== null;

  // Visualizer loop for waveform
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
        if (isRecording) {
          const t = Date.now() / 150 + i * 0.4;
          barHeight = Math.max(6, Math.abs(Math.sin(t)) * (height * 0.75));
        } else {
          barHeight = 4;
        }
        const y = (height - barHeight) / 2;
        ctx.fillStyle = isRecording ? '#A8402F' : '#C9B79C';
        ctx.beginPath();
        ctx.rect(x, y, barWidth, barHeight);
        ctx.fill();
      }

      if (!prefersReducedMotion && isRecording) {
        animationId = requestAnimationFrame(renderWave);
      }
    };

    renderWave();
    return () => cancelAnimationFrame(animationId);
  }, [isRecording]);

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
      setIsRecording(false);
      if (event.error === 'not-allowed') {
        setErrorMsg('Microphone access was denied. You can type your description instead.');
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
                      setTranscript('');
                      setErrorMsg(null);
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
                    ? 'Listening... speak clearly into your microphone.'
                    : transcript
                      ? 'Transcript captured. Edit or re-record below.'
                      : 'Press Record to speak, or type directly.'}
                </p>
                {speechSupported && (
                  <button
                    type="button"
                    onClick={isRecording ? stopRecording : startRecording}
                    className={`h-10 px-4 rounded-[6px] text-xs font-medium flex items-center gap-2 transition-colors cursor-pointer shrink-0 ${
                      isRecording
                        ? 'bg-madder-dark text-bone animate-pulse'
                        : 'bg-madder hover:bg-madder-dark text-bone'
                    }`}
                  >
                    {isRecording ? <MicOff size={15} /> : <Mic size={15} />}
                    <span>{isRecording ? 'Stop' : 'Record'}</span>
                  </button>
                )}
              </div>

              {/* Waveform Canvas */}
              {speechSupported && (
                <div className="w-full h-10 rounded-[4px] bg-parchment border border-clay/50 p-1 overflow-hidden">
                  <canvas ref={canvasRef} width={640} height={40} className="w-full h-full" />
                </div>
              )}

              {/* Textarea */}
              <textarea
                value={transcript}
                onChange={(e) => setTranscript(e.target.value)}
                placeholder="Describe the craft, materials, hours spent on the loom, and techniques..."
                rows={3}
                className="w-full bg-parchment border border-clay rounded-[6px] p-3 text-ink text-sm placeholder:text-ink-soft/60 resize-none focus:outline-none focus:border-madder"
              />
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
