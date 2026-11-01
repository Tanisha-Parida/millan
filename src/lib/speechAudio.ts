/**
 * Speech Audio Utility for Milaan Web
 * Provides text-to-speech playback for Indic vernacular dialects (Odia, Hindi, Bengali, etc.)
 * with intelligent voice matching and acoustic fallback.
 */

let activeUtterance: SpeechSynthesisUtterance | null = null;

export function isSpeechActive(): boolean {
  return activeUtterance !== null;
}

export function playDialectVoice(
  text: string,
  preferredLang: string = 'or-IN',
  onEnd?: () => void,
  onError?: () => void
): boolean {
  if (typeof window === 'undefined') return false;

  // Clean up any ongoing speech
  stopDialectVoice();

  // Try Web Audio chime to give immediate acoustic feedback
  tryPlayChime();

  if (!('speechSynthesis' in window)) {
    onError?.();
    return false;
  }

  try {
    const utterance = new SpeechSynthesisUtterance(text);
    activeUtterance = utterance;

    // Pick best available voice
    const voices = window.speechSynthesis.getVoices();
    
    // Priority:
    // 1. Exact match (e.g. or-IN or 'Odia')
    // 2. Any Indian voice (hi-IN, bn-IN, en-IN)
    // 3. Fallback voice
    const matchedVoice =
      voices.find(
        (v) =>
          v.lang.toLowerCase().includes('or') ||
          v.name.toLowerCase().includes('odia') ||
          v.name.toLowerCase().includes('oriya')
      ) ||
      voices.find((v) => v.lang.toLowerCase() === preferredLang.toLowerCase()) ||
      voices.find((v) => v.lang.toLowerCase().includes('in')) ||
      voices.find((v) => v.lang.toLowerCase().startsWith('hi')) ||
      voices[0];

    if (matchedVoice) {
      utterance.voice = matchedVoice;
      utterance.lang = matchedVoice.lang;
    } else {
      utterance.lang = preferredLang;
    }

    utterance.rate = 0.88; // Gentle, clear storytelling pace
    utterance.pitch = 1.0;

    utterance.onend = () => {
      activeUtterance = null;
      onEnd?.();
    };

    utterance.onerror = (e) => {
      console.warn('SpeechSynthesis error:', e);
      activeUtterance = null;
      onError?.();
    };

    window.speechSynthesis.speak(utterance);
    return true;
  } catch (err) {
    console.warn('Could not initialize speech synthesis:', err);
    onError?.();
    return false;
  }
}

export function stopDialectVoice(): void {
  if (typeof window !== 'undefined' && 'speechSynthesis' in window) {
    window.speechSynthesis.cancel();
  }
  activeUtterance = null;
}

function tryPlayChime(): void {
  try {
    const AudioCtx =
      window.AudioContext ||
      (window as unknown as { webkitAudioContext: typeof AudioContext }).webkitAudioContext;
    if (!AudioCtx) return;
    const ctx = new AudioCtx();
    if (ctx.state === 'suspended') {
      ctx.resume().catch(() => {});
    }
    const osc = ctx.createOscillator();
    const gain = ctx.createGain();

    osc.type = 'triangle';
    osc.frequency.setValueAtTime(392, ctx.currentTime); // G4
    osc.frequency.exponentialRampToValueAtTime(523.25, ctx.currentTime + 0.18); // C5

    gain.gain.setValueAtTime(0.12, ctx.currentTime);
    gain.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + 0.4);

    osc.connect(gain);
    gain.connect(ctx.destination);

    osc.start();
    osc.stop(ctx.currentTime + 0.4);
  } catch {
    // AudioContext blocked or not supported - silently ignore
  }
}
