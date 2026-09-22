import React, { useState, useRef, useEffect } from 'react';
import { motion } from 'framer-motion';
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
import type { CraftItem } from './ArtisanVaultGrid';

interface VoiceStudioModalProps {
  isOpen: boolean;
  onClose: () => void;
  onPublishListing?: (newItem: CraftItem) => void;
}

interface DialectPreset {
  id: string;
  name: string;
  nativeLabel: string;
  artisanName: string;
  village: string;
  craftType: string;
  speechAudioText: string;
  englishTranslation: string;
  hours: number;
  rawCostINR: number;
  fairHourlyWage: number;
  pohhScore: number;
  previewImage: string;
  hsnCode: string;
}

const DIALECT_PRESETS: DialectPreset[] = [
  {
    id: 'odia',
    name: 'Odia (Sambalpuri)',
    nativeLabel: 'ଓଡ଼ିଆ (ସମ୍ବଲପୁରୀ)',
    artisanName: 'Bipra Charan Baghel',
    village: 'Bastar Border / Barpali',
    craftType: 'Dhokra Brass Tribal Figurine',
    speechAudioText: 'ମୋର ଏଇ ଢୋକ୍ରା ପିତ୍ତଳ ମୂର୍ତ୍ତି କୁ ୬ ଘଣ୍ଟା ଲାଗିଲା, କଞ୍ଚା ମାଲ ୨୨୦ ଟଙ୍କା ପଡ଼ିଲା। ଜଙ୍ଗଲ ମହୁଫେଣା ର ମହମ ରେ ଗଢ଼ିଛି।',
    englishTranslation: 'This Dhokra brass figurine took 6 hours of lost-wax sculpting. Raw materials cost ₹220. Coaxed from wild forest beeswax before molten brass casting.',
    hours: 6,
    rawCostINR: 220,
    fairHourlyWage: 190,
    pohhScore: 98.6,
    previewImage: '/images/dhokra.jpg',
    hsnCode: '9703.00.10',
  },
  {
    id: 'hindi',
    name: 'Hindi (Awadhi)',
    nativeLabel: 'हिन्दी (अवधी)',
    artisanName: 'Ram Kinkar Prajapati',
    village: 'Nizamabad, Azamgarh',
    craftType: 'Engraved Black Luster Urn',
    speechAudioText: 'यह घड़ा हमने चाक पर घुमाकर हाथ से तराशा है। 8 घंटे की मेहनत है, माटी और तेल का खर्च 180 रुपया आया है।',
    englishTranslation: 'Hand-thrown on the kick-wheel and etched with silver slip jaali motifs. Took 8 hours of labor, river clay and mustard oil cost ₹180.',
    hours: 8,
    rawCostINR: 180,
    fairHourlyWage: 185,
    pohhScore: 99.1,
    previewImage: '/images/pottery.jpg',
    hsnCode: '6913.90.00',
  },
  {
    id: 'bengali',
    name: 'Bengali (Rarh)',
    nativeLabel: 'বাংলা (বীরভূম)',
    artisanName: 'Bimalendu Chitrakar',
    village: 'Pingla, West Bengal',
    craftType: 'Patachitra Natural Dye Scroll',
    speechAudioText: 'এই পটচিত্র আঁকতে ৭ ঘণ্টা লেগেছে। বেলপাতা, কাঁচা হলুদ আর অপরাজিতা ফুলের রস দিয়ে রং তৈরি করেছি। খরচ ১৫০ টাকা।',
    englishTranslation: 'Painting this mythological scroll took 7 hours. All mineral dyes were pressed by hand from wood-apple leaves, raw turmeric, and blue pea blossoms. Cost ₹150.',
    hours: 7,
    rawCostINR: 150,
    fairHourlyWage: 200,
    pohhScore: 98.8,
    previewImage: '/images/madhubani.jpg',
    hsnCode: '9701.10.20',
  },
  {
    id: 'santhali',
    name: 'Santhali / Tribal',
    nativeLabel: 'ᱥᱟᱱᱛᱟᱲᱤ (Ol Chiki)',
    artisanName: 'Karan Soren',
    village: 'Mayurbhanj, Odisha',
    craftType: 'Sabai Grass Braided Storage Basket',
    speechAudioText: 'ᱱᱚᱣᱟ ᱥᱟᱵᱟᱭ ᱜᱷᱟᱥ ᱴᱩᱠᱨᱤ ᱵᱮᱱᱟᱣ ᱞᱟᱹᱜᱤᱫ ᱕ ᱴᱟᱲᱟᱝ ᱞᱟᱜᱟᱣ ᱮᱱᱟ᱾ ᱠᱟᱸᱪᱟ ᱢᱟᱞ ᱑᱒᱐ ᱴᱟᱠᱟ ᱯᱟᱲᱟᱣ ᱮᱱᱟ᱾',
    englishTranslation: 'Woven from wild forest Sabai grass, sun-dried and coiled without nails. 5 hours of continuous knotting, raw grass gathered from Mayurbhanj hill tracts for ₹120.',
    hours: 5,
    rawCostINR: 120,
    fairHourlyWage: 175,
    pohhScore: 99.4,
    previewImage: '/images/bamboo.jpg',
    hsnCode: '4602.19.11',
  },
  {
    id: 'english',
    name: 'English (Voice Assist)',
    nativeLabel: 'English (Direct Audio)',
    artisanName: 'Ananya Meher',
    village: 'Sambalpur Silk Guild',
    craftType: 'Sambalpuri Ikat Wall Textile',
    speechAudioText: 'I hand-tied and dip-dyed 1,400 silk threads before putting this on our pit loom. It took 12 hours of weaving, raw silk cost was ₹650.',
    englishTranslation: 'Hand-tied and dip-dyed 1,400 silk threads before putting this on our pit loom. It took 12 hours of weaving, raw silk cost was ₹650.',
    hours: 12,
    rawCostINR: 650,
    fairHourlyWage: 220,
    pohhScore: 99.2,
    previewImage: '/images/ikat.jpg',
    hsnCode: '5007.20.10',
  },
];

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

  const canvasRef = useRef<HTMLCanvasElement>(null);
  const intervalRef = useRef<ReturnType<typeof setInterval> | null>(null);

  // Audio frequency waveform canvas visualizer
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

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
        // Amplitude based on whether recording or idle
        const baseAmp = isRecording ? Math.sin(phase + i * 0.4) * 0.5 + 0.5 : 0.15;
        const noise = isRecording ? Math.random() * 0.35 : 0.05;
        const totalAmp = Math.min(1, baseAmp + noise);

        const barHeight = Math.max(4, totalAmp * (height * 0.85));
        const x = i * (barWidth + 2);
        const y = (height - barHeight) / 2;

        const grad = ctx.createLinearGradient(0, y, 0, y + barHeight);
        if (isRecording) {
          grad.addColorStop(0, '#FAF7F2');
          grad.addColorStop(0.5, '#D4AF37');
          grad.addColorStop(1, '#C85A32');
        } else {
          grad.addColorStop(0, 'rgba(212, 175, 55, 0.4)');
          grad.addColorStop(1, 'rgba(200, 90, 50, 0.2)');
        }

        ctx.fillStyle = grad;
        ctx.beginPath();
        ctx.roundRect(x, y, barWidth, barHeight, 3);
        ctx.fill();
      }

      animationId = requestAnimationFrame(renderWave);
    };

    renderWave();

    return () => {
      cancelAnimationFrame(animationId);
    };
  }, [isRecording]);

  // Handle Recording simulation
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

  // Cost-Plus Fair Living Wage Calculation:
  // Total = Raw Material + (Hours * Fair Living Wage) + (25% GI Skill & Preservation Premium)
  const laborCost = selectedDialect.hours * selectedDialect.fairHourlyWage;
  const premiumSkill = Math.round((selectedDialect.rawCostINR + laborCost) * 0.22);
  const fairListingPriceINR = selectedDialect.rawCostINR + laborCost + premiumSkill;
  const fairListingPriceUSD = Math.round(fairListingPriceINR / 83);

  // Generated Beckn v2 JSON Payload
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
          name: `${selectedDialect.artisanName} Sovereign Studio`,
          tags: [{ code: 'gi_lineage', value: selectedDialect.village }],
        },
        'bpp/providers': [
          {
            id: `PRV-${selectedDialect.id.toUpperCase()}-09`,
            descriptor: { name: selectedDialect.artisanName },
            items: [
              {
                id: `ITEM-${Date.now().toString().slice(-6)}`,
                descriptor: {
                  name: selectedDialect.craftType,
                  long_desc: selectedDialect.englishTranslation,
                  pohh_authenticity_score: `${selectedDialect.pohhScore}%`,
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
        id: `VLT-${Date.now().toString().slice(-6)}`,
        title: selectedDialect.craftType,
        category: 'Dhokra',
        subCategory: 'Living Voice Onboarded',
        region: selectedDialect.village,
        state: 'India',
        image: selectedDialect.previewImage,
        priceINR: fairListingPriceINR,
        artisan: selectedDialect.artisanName,
        lineage: `${selectedDialect.name} Living Tradition`,
        hoursToCraft: selectedDialect.hours,
        materials: selectedDialect.englishTranslation.slice(0, 70) + '...',
        pohhIndex: selectedDialect.pohhScore,
        audioNarrative: {
          dialect: selectedDialect.name,
          vernacularQuote: selectedDialect.speechAudioText,
          englishTranslation: selectedDialect.englishTranslation,
        },
        hash: `0x${Math.random().toString(16).slice(2, 10)}${Math.random().toString(16).slice(2, 10)}`,
      };

      onPublishListing?.(newItem);
    }, 1200);
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-6 bg-black/85 backdrop-blur-2xl overflow-y-auto">
      <motion.div
        initial={{ opacity: 0, scale: 0.94, y: 30 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        exit={{ opacity: 0, scale: 0.94, y: 30 }}
        className="relative w-full max-w-4xl my-auto rounded-[32px] bg-[#0c0a08] border border-[#D4AF37]/35 p-5 sm:p-8 shadow-[0_25px_90px_rgba(0,0,0,0.9)] text-left overflow-hidden"
      >
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-6 right-6 w-9 h-9 rounded-full bg-[#1e1710] border border-[#D4AF37]/25 text-[#FAF7F2]/70 hover:text-white flex items-center justify-center transition-colors z-20"
        >
          <X size={18} />
        </button>

        {/* Modal Header */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-[#D4AF37]/15 pb-6 mb-6">
          <div className="flex items-center gap-3">
            <div className="w-12 h-12 rounded-2xl bg-gradient-to-br from-[#C85A32] to-[#D4AF37] flex items-center justify-center text-[#060709] shadow-lg shadow-[#D4AF37]/20">
              <Mic size={24} />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h3 className="font-serif-luxury text-2xl sm:text-3xl text-[#FAF7F2] font-bold">
                  Zero-Literacy Voice Studio
                </h3>
                <span className="px-2 py-0.5 rounded-full bg-[#D4AF37]/15 border border-[#D4AF37]/30 text-[10px] text-[#D4AF37] font-telemetry">
                  AUDIO AI ONBOARDING
                </span>
              </div>
              <p className="text-xs text-[#FAF7F2]/65 font-sans mt-0.5">
                Master artisans speak in their native mother tongue. MILAAN translates, computes fair wages, and mints ONDC Beckn v2 payloads.
              </p>
            </div>
          </div>
        </div>

        {/* ------------------------------------------------------------- */}
        {/* STEP 1: VERNACULAR DIALECT SWITCHER */}
        {/* ------------------------------------------------------------- */}
        <div className="mb-6 space-y-2">
          <label className="text-xs font-telemetry uppercase text-[#D4AF37] tracking-wider flex items-center gap-1.5">
            <Globe size={13} />
            <span>Select Native Indian Dialect:</span>
          </label>
          <div className="flex items-center gap-2 overflow-x-auto pb-1 scrollbar-none">
            {DIALECT_PRESETS.map((preset) => (
              <button
                key={preset.id}
                onClick={() => {
                  setSelectedDialect(preset);
                  setHasProcessed(false);
                  setIsPublished(false);
                }}
                className={`px-4 py-2 rounded-2xl text-xs font-medium transition-all whitespace-nowrap flex items-center gap-2 ${
                  selectedDialect.id === preset.id
                    ? 'bg-gradient-to-r from-[#C85A32] to-[#D4AF37] text-[#060709] font-bold shadow-md shadow-[#D4AF37]/25 scale-[1.02]'
                    : 'bg-[#18130d] text-[#FAF7F2]/80 hover:text-white border border-[#D4AF37]/20'
                }`}
              >
                <span>{preset.nativeLabel}</span>
                <span className="opacity-60 text-[10px]">({preset.name.split(' ')[0]})</span>
              </button>
            ))}
          </div>
        </div>

        {/* ------------------------------------------------------------- */}
        {/* STEP 2: SIMULATED AUDIO RECORDING WAVEFORM */}
        {/* ------------------------------------------------------------- */}
        <div className="p-5 sm:p-6 rounded-3xl bg-[#15100a] border border-[#D4AF37]/25 shadow-inner space-y-4 mb-6">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-full bg-[#231b12] border border-[#D4AF37]/30 flex items-center justify-center text-[#D4AF37]">
                <Volume2 size={18} />
              </div>
              <div>
                <div className="text-xs font-telemetry text-[#D4AF37]">
                  ARTISAN: {selectedDialect.artisanName} ({selectedDialect.village})
                </div>
                <div className="text-sm font-serif-luxury text-[#FAF7F2] font-semibold">
                  "{selectedDialect.speechAudioText}"
                </div>
              </div>
            </div>

            {/* Record / Trigger Button */}
            <button
              onClick={isRecording ? stopRecording : startRecording}
              className={`px-5 py-2.5 rounded-full font-medium text-xs flex items-center gap-2 transition-all ${
                isRecording
                  ? 'bg-red-600 text-white animate-pulse'
                  : 'bg-[#D4AF37] text-[#060709] hover:bg-[#FAF7F2]'
              }`}
            >
              {isRecording ? (
                <>
                  <MicOff size={15} />
                  <span>Listening... 0:0{recordSeconds}</span>
                </>
              ) : (
                <>
                  <Mic size={15} />
                  <span>Simulate Voice Ingestion</span>
                </>
              )}
            </button>
          </div>

          {/* Canvas Waveform Visualizer */}
          <div className="w-full h-16 rounded-2xl bg-[#090705] border border-[#D4AF37]/15 p-2 flex items-center justify-center overflow-hidden">
            <canvas ref={canvasRef} width={680} height={64} className="w-full h-full" />
          </div>

          {/* Real-time English AI Translation */}
          <div className="text-xs text-[#FAF7F2]/80 bg-[#1e160e] p-3 rounded-2xl border border-[#D4AF37]/15 font-sans leading-relaxed">
            <strong className="text-[#D4AF37] font-telemetry">MILAAN AI TRANSLATION:</strong>{' '}
            "{selectedDialect.englishTranslation}"
          </div>
        </div>

        {/* ------------------------------------------------------------- */}
        {/* STEP 3 & 4: AUTONOMOUS COST-PLUS LIVING WAGE & BECKN SCHEMA */}
        {/* ------------------------------------------------------------- */}
        <div className="grid grid-cols-1 md:grid-cols-12 gap-6">
          
          {/* Left: Cost-Plus Fair Wage Breakdown (5 Cols) */}
          <div className="md:col-span-5 p-5 rounded-3xl bg-[#140f09] border border-[#D4AF37]/25 space-y-4">
            <div className="flex items-center gap-2 text-xs font-telemetry text-[#58D68D]">
              <ShieldCheck size={16} />
              <span>TRANSPARENT COST-PLUS LIVING WAGE</span>
            </div>

            <div className="space-y-3 text-xs">
              <div className="flex justify-between items-center text-[#FAF7F2]/75">
                <span>Raw Materials Expense:</span>
                <span className="font-telemetry text-[#FAF7F2] font-semibold">₹{selectedDialect.rawCostINR}</span>
              </div>

              <div className="flex justify-between items-center text-[#FAF7F2]/75">
                <span>Manual Labor ({selectedDialect.hours} hrs @ ₹{selectedDialect.fairHourlyWage}/hr):</span>
                <span className="font-telemetry text-[#FAF7F2] font-semibold">₹{laborCost}</span>
              </div>

              <div className="flex justify-between items-center text-[#FAF7F2]/75">
                <span>Heritage GI Skill Preservation (+22%):</span>
                <span className="font-telemetry text-[#FAF7F2] font-semibold">₹{premiumSkill}</span>
              </div>

              <div className="pt-3 border-t border-[#D4AF37]/20 flex justify-between items-center">
                <div>
                  <div className="text-[10px] font-telemetry text-[#D4AF37]">DIRECT ARTISAN PAYOUT</div>
                  <div className="text-xl font-telemetry font-bold text-[#58D68D]">
                    ₹{fairListingPriceINR.toLocaleString('en-IN')}
                  </div>
                </div>
                <div className="text-right">
                  <div className="text-[10px] font-telemetry text-[#FAF7F2]/50">GLOBAL EXPORT</div>
                  <div className="text-lg font-telemetry font-bold text-[#FAF7F2]">
                    ${fairListingPriceUSD} USD
                  </div>
                </div>
              </div>
            </div>

            {/* Proof of Human Hand Score */}
            <div className="px-3.5 py-2 rounded-2xl bg-[#1c150c] border border-[#2D5A43]/50 flex items-center justify-between text-xs font-telemetry">
              <span className="text-[#FAF7F2]/80">Proof-of-Human-Hand:</span>
              <span className="text-[#58D68D] font-bold">{selectedDialect.pohhScore}% Authentic</span>
            </div>
          </div>

          {/* Right: Instant Structured ONDC Beckn v2 JSON Schema (7 Cols) */}
          <div className="md:col-span-7 flex flex-col justify-between p-5 rounded-3xl bg-[#080705] border border-[#D4AF37]/25 space-y-4">
            <div className="flex items-center justify-between text-xs font-telemetry">
              <span className="text-[#D4AF37] flex items-center gap-1.5">
                <FileCode size={14} />
                <span>ONDC Beckn v2 JSON Output</span>
              </span>
              <span className="text-[#58D68D]">
                {hasProcessed ? 'STATUS: INGESTION COMPLETE & READY' : 'STATUS: READY FOR BROADCAST'}
              </span>
            </div>

            {/* Code snippet viewer */}
            <pre className="h-44 p-3 rounded-2xl bg-[#040403] border border-[#D4AF37]/15 text-[11px] font-telemetry text-[#FAF7F2]/80 overflow-y-auto scrollbar-thin scrollbar-thumb-[#D4AF37]/30 text-left">
              {JSON.stringify(generatedBecknPayload, null, 2)}
            </pre>

            {/* Publish Confirmation Action */}
            <div className="flex items-center gap-3 pt-2">
              <button
                onClick={handlePublish}
                disabled={isPublishing || isPublished}
                className={`flex-1 py-3 rounded-full font-semibold text-xs tracking-wider uppercase flex items-center justify-center gap-2 transition-all shadow-lg ${
                  isPublished
                    ? 'bg-[#2D5A43] text-white'
                    : 'bg-gradient-to-r from-[#C85A32] to-[#D4AF37] text-[#060709] hover:scale-[1.02] shadow-[#D4AF37]/25'
                }`}
              >
                {isPublishing ? (
                  <span>Broadcasting to Beckn Network...</span>
                ) : isPublished ? (
                  <>
                    <CheckCircle2 size={16} />
                    <span>Published to Live Vault & ONDC</span>
                  </>
                ) : (
                  <>
                    <Send size={15} />
                    <span>Publish Listing to ONDC Network</span>
                  </>
                )}
              </button>

              <button
                onClick={() => {
                  navigator.clipboard?.writeText(JSON.stringify(generatedBecknPayload, null, 2));
                  alert('Beckn v2 JSON schema copied to clipboard!');
                }}
                className="px-4 py-3 rounded-full bg-[#1a140d] border border-[#D4AF37]/30 text-xs text-[#D4AF37] font-telemetry hover:bg-[#D4AF37]/20"
              >
                Copy JSON
              </button>
            </div>
          </div>

        </div>

      </motion.div>
    </div>
  );
};

export default VoiceStudioModal;
