import React, { useState, useRef, useEffect } from 'react';
import { m } from 'framer-motion';
import {
  Mic,
  MicOff,
  Volume2,
  CheckCircle2,
  FileCode,
  X,
  Send,
  ShieldCheck,
  Globe,
} from 'lucide-react';
import type { CraftItem } from '../types/craft';
import { formatPrice } from '../lib/currency';
import { useModalA11y } from '../hooks/useModalA11y';
import { DIALECT_PRESETS, type DialectPreset } from '../data/dialectPresets';

interface VoiceStudioModalProps {
  isOpen: boolean;
  onClose: () => void;
  onPublishListing?: (newItem: CraftItem) => void;
}

export const VoiceStudioModal: React.FC<VoiceStudioModalProps> = ({
  isOpen,
  onClose,
  onPublishListing,
}) => {
  const [selectedDialect, setSelectedDialect] = useState<DialectPreset>(DIALECT_PRESETS[0]);
  const [isRecording, setIsRecording] = useState(false);
  const [recordSeconds, setRecordSeconds] = useState(0);
  const [hasProcessed, setHasProcessed] = useState(false);
  const [isPublishing, setIsPublishing] = useState(false);
  const [isPublished, setIsPublished] = useState(false);
  const [copiedJson, setCopiedJson] = useState(false);

  const canvasRef = useRef<HTMLCanvasElement>(null);
  const intervalRef = useRef<ReturnType<typeof setInterval> | null>(null);
  const panelRef = useModalA11y(isOpen, onClose);

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

    return () => {
      cancelAnimationFrame(animationId);
    };
  }, [isRecording]);

  useEffect(() => {
    if (!copiedJson) return;
    const t = setTimeout(() => setCopiedJson(false), 2000);
    return () => clearTimeout(t);
  }, [copiedJson]);

  const startRecording = () => {
    setIsRecording(true);
    setHasProcessed(false);
    setIsPublished(false);
    setRecordSeconds(0);

    if (intervalRef.current) clearInterval(intervalRef.current);
    intervalRef.current = setInterval(() => {
      setRecordSeconds((prev) => {
        if (prev >= 4) {
          stopRecording();
          return 4;
        }
        return prev + 1;
      });
    }, 1000);
  };

  const stopRecording = () => {
    setIsRecording(false);
    if (intervalRef.current) clearInterval(intervalRef.current);
    setTimeout(() => {
      setHasProcessed(true);
    }, 700);
  };

  const laborCost = selectedDialect.hours * selectedDialect.fairHourlyWage;
  const premiumSkill = Math.round((selectedDialect.rawCostINR + laborCost) * 0.22);
  const fairListingPriceINR = selectedDialect.rawCostINR + laborCost + premiumSkill;

  const generatedBecknPayload = {
    context: {
      domain: 'nic2004:9703',
      action: 'on_search',
      bap_id: 'milaan.global.trade',
      bpp_id: `bpp.artisan.${selectedDialect.id}.in`,
      timestamp: new Date().toISOString(),
      version: '2.0.0',
    },
    message: {
      catalog: {
        'bpp/descriptor': {
          name: `${selectedDialect.artisanName}'s Studio`,
          tags: [{ code: 'gi_lineage', value: selectedDialect.village }],
        },
        'bpp/providers': [
          {
            id: `PRV-${selectedDialect.id.toUpperCase()}-09`,
            descriptor: { name: selectedDialect.artisanName },
            items: [
              {
                id: `ITEM-${selectedDialect.id.toUpperCase()}-01`,
                descriptor: {
                  name: selectedDialect.craftType,
                  long_desc: selectedDialect.englishTranslation,
                  hsn_code: selectedDialect.hsnCode,
                },
                price: {
                  currency: 'INR',
                  value: fairListingPriceINR.toString(),
                },
                escrow_split: {
                  artisan_direct_dbt: `${Math.round(fairListingPriceINR * 0.914)} INR (91.4%)`,
                  raw_material: `${selectedDialect.rawCostINR} INR`,
                  green_logistics: `${Math.round(fairListingPriceINR * 0.03)} INR`,
                },
              },
            ],
          },
        ],
      },
    },
  };

  const handlePublish = () => {
    setIsPublishing(true);
    setTimeout(() => {
      setIsPublishing(false);
      setIsPublished(true);

      const newItem: CraftItem = {
        id: `CRAFTS-${Date.now().toString().slice(-6)}`,
        title: selectedDialect.craftType,
        category: 'Dhokra',
        subCategory: 'Voice onboarded',
        region: selectedDialect.village,
        state: 'India',
        image: selectedDialect.previewImage,
        priceINR: fairListingPriceINR,
        artisan: selectedDialect.artisanName,
        lineage: `${selectedDialect.name} Living Tradition`,
        hoursToCraft: selectedDialect.hours,
        materials: selectedDialect.englishTranslation.slice(0, 70) + '...',
        audioNarrative: {
          dialect: selectedDialect.name,
          vernacularQuote: selectedDialect.speechAudioText,
          englishTranslation: selectedDialect.englishTranslation,
        },
      };

      onPublishListing?.(newItem);
    }, 1200);
  };

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
        className="relative w-full max-w-4xl my-auto rounded bg-khadi p-5 sm:p-8 shadow-xl text-left overflow-hidden focus:outline-none"
      >
        <button
          onClick={onClose}
          className="absolute top-6 right-6 w-9 h-9 rounded bg-cream border border-kiln/20 text-indigo hover:text-madder flex items-center justify-center transition-colors z-20"
        >
          <X size={18} />
        </button>

        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-kiln/15 pb-6 mb-6">
          <div className="flex items-center gap-3">
            <div className="w-12 h-12 rounded bg-madder flex items-center justify-center text-khadi">
              <Mic size={24} />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h3 className="font-display text-2xl sm:text-3xl text-indigo">
                  List a craft by speaking
                </h3>
              </div>
              <div className="text-sm text-kiln font-body mt-1">
                This is a prototype. Prices, people and payments shown are examples.
              </div>
              <p className="text-base text-indigo font-body mt-1">
                Artisans describe their work in their own words — MILAAN translates it and turns it
                into a fair, ready-to-publish listing.
              </p>
            </div>
          </div>
        </div>

        <div className="mb-6 space-y-2">
          <label className="text-base font-body text-kiln flex items-center gap-1.5">
            <Globe size={16} />
            <span>Choose a language:</span>
          </label>
          <div className="flex items-center gap-2 overflow-x-auto pb-1 no-scrollbar">
            {DIALECT_PRESETS.map((preset) => (
              <button
                key={preset.id}
                onClick={() => {
                  setSelectedDialect(preset);
                  setHasProcessed(false);
                  setIsPublished(false);
                }}
                className={`px-4 py-2 rounded text-base font-body transition-colors whitespace-nowrap flex items-center gap-2 ${
                  selectedDialect.id === preset.id
                    ? 'bg-madder text-khadi'
                    : 'bg-cream text-indigo border border-kiln/20 hover:border-kiln/50'
                }`}
              >
                <span>{preset.nativeLabel}</span>
                <span className="opacity-80 text-sm">({preset.name.split(' ')[0]})</span>
              </button>
            ))}
          </div>
        </div>

        <div className="p-5 sm:p-6 rounded bg-cream border border-kiln/20 space-y-4 mb-6">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded bg-khadi border border-kiln/20 flex items-center justify-center text-indigo">
                <Volume2 size={18} />
              </div>
              <div>
                <div className="text-base font-body text-kiln">
                  Artisan: {selectedDialect.artisanName} ({selectedDialect.village})
                </div>
                <div className="text-lg font-display text-indigo">
                  "{selectedDialect.speechAudioText}"
                </div>
              </div>
            </div>

            <button
              onClick={isRecording ? stopRecording : startRecording}
              className={`px-5 py-2.5 rounded font-body text-base flex items-center gap-2 transition-colors ${
                isRecording
                  ? 'bg-red-600 text-khadi'
                  : 'bg-madder text-khadi hover:bg-madder/90'
              }`}
            >
              {isRecording ? (
                <>
                  <MicOff size={18} />
                  <span>Listening... 0:0{recordSeconds}</span>
                </>
              ) : (
                <>
                  <Mic size={18} />
                  <span>Play sample recording</span>
                </>
              )}
            </button>
          </div>

          <div className="w-full h-16 rounded bg-khadi border border-kiln/20 p-2 flex items-center justify-center overflow-hidden">
            <canvas ref={canvasRef} width={680} height={64} className="w-full h-full" />
          </div>

          <div className="text-lg text-indigo bg-cream p-3 rounded border border-kiln/20 font-body leading-relaxed">
            <strong className="text-kiln font-display">English translation:</strong> "
            {selectedDialect.englishTranslation}"
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-12 gap-6">
          <div className="md:col-span-5 p-5 rounded bg-cream border border-kiln/20 space-y-4">
            <div className="flex items-center gap-2 text-base font-body text-kiln">
              <ShieldCheck size={18} />
              <span>How the price is calculated</span>
            </div>

            <div className="space-y-3 text-base text-indigo font-body">
              <div className="flex justify-between items-center">
                <span>Materials:</span>
                <span className="font-medium">
                  ₹{selectedDialect.rawCostINR}
                </span>
              </div>

              <div className="flex justify-between items-center">
                <span>
                  Craftsmanship ({selectedDialect.hours} hrs at ₹{selectedDialect.fairHourlyWage}/hr):
                </span>
                <span className="font-medium">₹{laborCost}</span>
              </div>

              <div className="flex justify-between items-center">
                <span>Master skill premium (+22%):</span>
                <span className="font-medium">₹{premiumSkill}</span>
              </div>

              <div className="pt-3 border-t border-kiln/20 flex justify-between items-center bg-neem/10 p-2 rounded">
                <div>
                  <div className="text-sm font-body text-kiln">Artisan receives</div>
                  <div className="text-xl font-display text-neem">
                    ₹{fairListingPriceINR.toLocaleString('en-IN')}
                  </div>
                </div>
                <div className="text-right">
                  <div className="text-sm font-body text-kiln">
                    Rough intl. price
                  </div>
                  <div className="text-lg font-display text-indigo">
                    {formatPrice(fairListingPriceINR, 'USD')} USD
                  </div>
                </div>
              </div>
            </div>

            <div className="px-3.5 py-2 rounded bg-khadi border border-kiln/20 flex items-center justify-between text-base font-body">
              <span className="text-kiln">Craft origin & hours:</span>
              <span className="text-indigo">
                {selectedDialect.village} • {selectedDialect.hours} hrs handwork
              </span>
            </div>
          </div>

          <div className="md:col-span-7 flex flex-col justify-between p-5 rounded bg-cream border border-kiln/20 space-y-4">
            <div className="flex items-center justify-between text-base font-body">
              <span className="text-indigo flex items-center gap-1.5">
                <FileCode size={18} />
                <span>Listing JSON</span>
              </span>
              <span className="text-neem">
                {hasProcessed ? 'Status: Ready to publish' : 'Status: Sample ready'}
              </span>
            </div>

            <pre className="h-44 p-3 rounded bg-khadi border border-kiln/20 text-sm font-body text-indigo overflow-y-auto no-scrollbar text-left">
              {JSON.stringify(generatedBecknPayload, null, 2)}
            </pre>

            <div className="flex items-center gap-3 pt-2">
              <button
                onClick={handlePublish}
                disabled={isPublishing || isPublished}
                className={`flex-1 py-3 rounded font-body text-lg flex items-center justify-center gap-2 transition-colors ${
                  isPublished
                    ? 'bg-neem text-khadi'
                    : 'bg-madder text-khadi hover:bg-madder/90'
                }`}
              >
                {isPublishing ? (
                  <span>Publishing…</span>
                ) : isPublished ? (
                  <>
                    <CheckCircle2 size={18} />
                    <span>Published to crafts</span>
                  </>
                ) : (
                  <>
                    <Send size={18} />
                    <span>Publish this listing</span>
                  </>
                )}
              </button>

              <button
                onClick={() => {
                  navigator.clipboard?.writeText(JSON.stringify(generatedBecknPayload, null, 2));
                  setCopiedJson(true);
                }}
                className="px-4 py-3 rounded bg-khadi border border-kiln/30 text-base text-indigo font-body hover:bg-kiln/10"
              >
                {copiedJson ? 'Copied ✓' : 'Copy JSON'}
              </button>
            </div>
          </div>
        </div>
      </m.div>
    </div>
  );
};

export default VoiceStudioModal;
