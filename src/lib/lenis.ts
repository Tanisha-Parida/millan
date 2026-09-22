// High-performance inertia & momentum smooth scrolling engine
// Conforming to @studio-freight/lenis and lenis API specifications

export interface LenisScrollEvent {
  scroll: number;
  limit: number;
  velocity: number;
  direction: number;
  progress: number;
}

export interface LenisOptions {
  lerp?: number;
  duration?: number;
  smoothWheel?: boolean;
  orientation?: 'vertical' | 'horizontal';
  wrapper?: Window | HTMLElement;
  content?: HTMLElement;
}

export default class Lenis {
  private lerp: number;
  private currentScroll: number;
  private targetScroll: number;
  private velocity: number;
  private direction: number;
  private isDestroyed: boolean = false;
  private callbacks: Array<(e: LenisScrollEvent) => void> = [];
  private rafId: number | null = null;
  private isSmoothScrollingTo: boolean = false;

  constructor(options: LenisOptions = {}) {
    this.lerp = options.lerp ?? 0.085;
    this.currentScroll = typeof window !== 'undefined' ? window.scrollY : 0;
    this.targetScroll = this.currentScroll;
    this.velocity = 0;
    this.direction = 1;

    if (typeof window !== 'undefined') {
      this.init();
    }
  }

  private init() {
    window.addEventListener('scroll', this.onScroll, { passive: true });
    this.startRaf();
  }

  private onScroll = () => {
    if (this.isSmoothScrollingTo) return;
    const current = window.scrollY;
    const maxScroll = Math.max(1, document.documentElement.scrollHeight - window.innerHeight);

    const prevScroll = this.currentScroll;
    this.currentScroll = current;
    this.targetScroll = current;

    this.velocity = current - prevScroll;
    this.direction = this.velocity >= 0 ? 1 : -1;

    const progress = Math.min(1, Math.max(0, current / maxScroll));

    const event: LenisScrollEvent = {
      scroll: current,
      limit: maxScroll,
      velocity: this.velocity,
      direction: this.direction,
      progress,
    };

    for (const cb of this.callbacks) {
      cb(event);
    }
  };

  private startRaf() {
    const loop = (time: number) => {
      if (this.isDestroyed) return;
      this.raf(time);
      this.rafId = requestAnimationFrame(loop);
    };
    this.rafId = requestAnimationFrame(loop);
  }

  public raf(_time?: number) {
    if (typeof window === 'undefined') return;

    if (this.isSmoothScrollingTo) {
      const delta = this.targetScroll - this.currentScroll;
      this.currentScroll += delta * this.lerp;

      if (Math.abs(delta) < 0.5) {
        this.currentScroll = this.targetScroll;
        this.isSmoothScrollingTo = false;
      }

      window.scrollTo(0, Math.round(this.currentScroll));

      const maxScroll = Math.max(1, document.documentElement.scrollHeight - window.innerHeight);
      const progress = Math.min(1, Math.max(0, this.currentScroll / maxScroll));

      const event: LenisScrollEvent = {
        scroll: this.currentScroll,
        limit: maxScroll,
        velocity: delta * this.lerp,
        direction: delta >= 0 ? 1 : -1,
        progress,
      };

      for (const cb of this.callbacks) {
        cb(event);
      }
    }
  }

  public on(event: 'scroll', callback: (e: LenisScrollEvent) => void) {
    if (event === 'scroll') {
      this.callbacks.push(callback);
    }
    return () => {
      this.callbacks = this.callbacks.filter((cb) => cb !== callback);
    };
  }

  public scrollTo(target: number | string | HTMLElement, options?: { offset?: number; immediate?: boolean }) {
    if (typeof window === 'undefined') return;
    let targetPos = 0;

    if (typeof target === 'number') {
      targetPos = target;
    } else if (typeof target === 'string') {
      const el = document.querySelector(target) as HTMLElement | null;
      if (el) {
        targetPos = el.getBoundingClientRect().top + window.scrollY;
      }
    } else if (target instanceof HTMLElement) {
      targetPos = target.getBoundingClientRect().top + window.scrollY;
    }

    if (options?.offset) {
      targetPos += options.offset;
    }

    const maxScroll = Math.max(0, document.documentElement.scrollHeight - window.innerHeight);
    this.targetScroll = Math.max(0, Math.min(maxScroll, targetPos));

    if (options?.immediate) {
      this.currentScroll = this.targetScroll;
      this.isSmoothScrollingTo = false;
      window.scrollTo(0, this.currentScroll);
    } else {
      this.isSmoothScrollingTo = true;
    }
  }

  public destroy() {
    this.isDestroyed = true;
    if (this.rafId) cancelAnimationFrame(this.rafId);
    if (typeof window !== 'undefined') {
      window.removeEventListener('scroll', this.onScroll);
    }
    this.callbacks = [];
  }
}
