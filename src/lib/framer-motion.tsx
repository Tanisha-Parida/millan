// Bespoke high-performance motion & choreography engine
// Conforming to Framer Motion API specifications for React 19

import React, {
  useEffect,
  useRef,
  useState,
  useMemo,
  forwardRef,
  type ReactNode,
  type CSSProperties,
} from 'react';

// MotionValue definition
export class MotionValue<T = number> {
  private current: T;
  private listeners: Set<(val: T) => void> = new Set();

  constructor(init: T) {
    this.current = init;
  }

  get(): T {
    return this.current;
  }

  set(val: T) {
    this.current = val;
    this.listeners.forEach((fn) => fn(val));
  }

  onChange(subscriber: (val: T) => void): () => void {
    this.listeners.add(subscriber);
    return () => this.listeners.delete(subscriber);
  }
}

export function useMotionValue<T>(initial: T): MotionValue<T> {
  return useMemo(() => new MotionValue(initial), [initial]);
}

export function useMotionValueEvent<T>(
  value: MotionValue<T>,
  event: 'change' | string,
  callback: (latest: T) => void
) {
  useEffect(() => {
    if (event === 'change' && value && typeof value.onChange === 'function') {
      return value.onChange(callback);
    }
  }, [value, event, callback]);
}

// useTransform hook
export function useTransform<T = number, R = number>(
  value: MotionValue<T> | number,
  inputRange: number[],
  outputRange: R[]
): MotionValue<R> {
  const isInputNumber = typeof value === 'number';
  const initialNumeric = isInputNumber ? (value as number) : (value.get() as unknown as number);

  const interpolate = (val: number): R => {
    if (inputRange.length === 0) return outputRange[0];
    if (val <= inputRange[0]) return outputRange[0];
    if (val >= inputRange[inputRange.length - 1]) return outputRange[outputRange.length - 1];

    for (let i = 0; i < inputRange.length - 1; i++) {
      const inMin = inputRange[i];
      const inMax = inputRange[i + 1];
      if (val >= inMin && val <= inMax) {
        const progress = (val - inMin) / (inMax - inMin);
        const outMin = outputRange[i];
        const outMax = outputRange[i + 1];

        if (typeof outMin === 'number' && typeof outMax === 'number') {
          return (outMin + (outMax - outMin) * progress) as unknown as R;
        } else if (typeof outMin === 'string' && typeof outMax === 'string') {
          const numMin = parseFloat(outMin);
          const numMax = parseFloat(outMax);
          const unit = outMin.replace(/^[-0.9.]+/, '');
          if (!isNaN(numMin) && !isNaN(numMax)) {
            return `${numMin + (numMax - numMin) * progress}${unit}` as unknown as R;
          }
          return progress < 0.5 ? outMin : outMax;
        }
        return progress < 0.5 ? outMin : outMax;
      }
    }
    return outputRange[0];
  };

  const outputValue = useMemo(() => new MotionValue<R>(interpolate(initialNumeric)), []);

  useEffect(() => {
    if (isInputNumber) {
      outputValue.set(interpolate(value as number));
      return;
    }

    const unsub = (value as MotionValue<T>).onChange((current) => {
      outputValue.set(interpolate(current as unknown as number));
    });
    return unsub;
  }, [value, inputRange, outputRange]);

  return outputValue;
}

export function useSpring(
  source: MotionValue<number> | number,
  config?: { stiffness?: number; damping?: number; mass?: number; restDelta?: number }
): MotionValue<number> {
  const initial = typeof source === 'number' ? source : source.get();
  const value = useMemo(() => new MotionValue(initial), [initial]);

  useEffect(() => {
    let animId: number;
    let current = value.get();
    let velocity = 0;
    const stiffness = config?.stiffness ?? 120;
    const damping = config?.damping ?? 25;
    const mass = config?.mass ?? 1;

    let target = typeof source === 'number' ? source : source.get();

    const step = () => {
      const displacement = current - target;
      const springForce = -stiffness * displacement;
      const dampingForce = -damping * velocity;
      const acceleration = (springForce + dampingForce) / mass;

      velocity += acceleration * (1 / 60);
      current += velocity * (1 / 60);

      if (Math.abs(velocity) < 0.00005 && Math.abs(displacement) < 0.00005) {
        current = target;
        velocity = 0;
        value.set(current);
        return;
      }

      value.set(current);
      animId = requestAnimationFrame(step);
    };

    if (typeof source === 'number') {
      target = source;
      animId = requestAnimationFrame(step);
      return () => cancelAnimationFrame(animId);
    }

    const unsub = source.onChange((v) => {
      target = v;
      cancelAnimationFrame(animId);
      animId = requestAnimationFrame(step);
    });

    return () => {
      unsub();
      cancelAnimationFrame(animId);
    };
  }, [source, config?.stiffness, config?.damping, config?.mass]);

  return value;
}

export interface ScrollOptions {
  target?: React.RefObject<HTMLElement | null>;
  offset?: string[];
}

export function useScroll(options?: ScrollOptions) {
  const scrollY = useMemo(() => new MotionValue(0), []);
  const scrollYProgress = useMemo(() => new MotionValue(0), []);

  useEffect(() => {
    const handleScroll = () => {
      const current = window.scrollY;
      scrollY.set(current);

      if (options?.target?.current) {
        const el = options.target.current;
        const rect = el.getBoundingClientRect();
        const top = rect.top + window.scrollY;
        const height = el.offsetHeight;
        const windowHeight = window.innerHeight;

        let start = top;
        let end = top + height - windowHeight;

        if (options?.offset && options.offset.length >= 2) {
          const startPoint = options.offset[0];
          const endPoint = options.offset[1];
          if (startPoint === 'start start') start = top;
          else if (startPoint === 'start end') start = top - windowHeight;

          if (endPoint === 'end end') end = top + height - windowHeight;
          else if (endPoint === 'end start') end = top + height;
        }

        const total = Math.max(1, end - start);
        const progress = Math.min(1, Math.max(0, (current - start) / total));
        scrollYProgress.set(progress);
      } else {
        const total = Math.max(1, document.documentElement.scrollHeight - window.innerHeight);
        const progress = Math.min(1, Math.max(0, current / total));
        scrollYProgress.set(progress);
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    handleScroll();
    return () => window.removeEventListener('scroll', handleScroll);
  }, [options?.target, scrollY, scrollYProgress]);

  return { scrollY, scrollYProgress };
}

// Flexible Motion style definition supporting MotionValues
export type MotionStyle = {
  [K in keyof CSSProperties]?: CSSProperties[K] | MotionValue<any> | any;
} & Record<string, any>;

// Motion component factory
type MotionProps<T extends Element> = Omit<React.HTMLAttributes<T>, 'style'> & {
  initial?: Record<string, any> | boolean;
  animate?: Record<string, any>;
  exit?: Record<string, any>;
  transition?: {
    type?: string;
    stiffness?: number;
    damping?: number;
    duration?: number;
    delay?: number;
    ease?: any;
  };
  whileHover?: Record<string, any>;
  whileTap?: Record<string, any>;
  layout?: boolean | 'position' | 'size' | string;
  layoutId?: string;
  children?: ReactNode;
  style?: MotionStyle;
  className?: string;
};

function createMotionComponent<T extends Element>(tag: string) {
  return forwardRef<T, MotionProps<T>>((props, forwardedRef) => {
    const {
      initial: _initial,
      animate,
      exit: _exit,
      transition,
      whileHover,
      whileTap: _whileTap,
      style,
      children,
      className,
      ...rest
    } = props;

    const [isHovered, setIsHovered] = useState(false);
    const [computedStyles, setComputedStyles] = useState<CSSProperties>({});
    const localRef = useRef<T | null>(null);

    // Synchronize MotionValues in style
    useEffect(() => {
      const resolvedStyle: Record<string, any> = {};
      const unsubs: Array<() => void> = [];

      const processStyle = () => {
        const targetState = isHovered && whileHover ? { ...animate, ...whileHover } : animate || {};
        const combined = { ...style, ...targetState };

        for (const [key, val] of Object.entries(combined)) {
          if (val instanceof MotionValue) {
            resolvedStyle[key] = val.get();
            const unsub = val.onChange((v) => {
              setComputedStyles((prev) => ({ ...prev, [key]: v }));
            });
            unsubs.push(unsub);
          } else {
            resolvedStyle[key] = val;
          }
        }
        setComputedStyles({ ...resolvedStyle });
      };

      processStyle();

      return () => {
        unsubs.forEach((u) => u());
      };
    }, [style, animate, isHovered, whileHover]);

    const transitionStyle: CSSProperties = useMemo(() => {
      const duration = transition?.duration ?? 0.35;
      const delay = transition?.delay ?? 0;
      return {
        transition: `all ${duration}s cubic-bezier(0.16, 1, 0.3, 1) ${delay}s`,
      };
    }, [transition]);

    const finalStyle = {
      ...transitionStyle,
      ...style,
      ...computedStyles,
    };

    return React.createElement(
      tag,
      {
        ...rest,
        ref: (node: T) => {
          localRef.current = node;
          if (typeof forwardedRef === 'function') {
            forwardedRef(node);
          } else if (forwardedRef) {
            (forwardedRef as React.MutableRefObject<T | null>).current = node;
          }
        },
        className,
        style: finalStyle,
        onMouseEnter: (e: React.MouseEvent<T>) => {
          setIsHovered(true);
          props.onMouseEnter?.(e);
        },
        onMouseLeave: (e: React.MouseEvent<T>) => {
          setIsHovered(false);
          props.onMouseLeave?.(e);
        },
      },
      children
    );
  });
}

export const motion = {
  div: createMotionComponent<HTMLDivElement>('div'),
  span: createMotionComponent<HTMLSpanElement>('span'),
  section: createMotionComponent<HTMLElement>('section'),
  article: createMotionComponent<HTMLElement>('article'),
  aside: createMotionComponent<HTMLElement>('aside'),
  header: createMotionComponent<HTMLElement>('header'),
  footer: createMotionComponent<HTMLElement>('footer'),
  nav: createMotionComponent<HTMLElement>('nav'),
  main: createMotionComponent<HTMLElement>('main'),
  p: createMotionComponent<HTMLParagraphElement>('p'),
  h1: createMotionComponent<HTMLHeadingElement>('h1'),
  h2: createMotionComponent<HTMLHeadingElement>('h2'),
  h3: createMotionComponent<HTMLHeadingElement>('h3'),
  h4: createMotionComponent<HTMLHeadingElement>('h4'),
  button: createMotionComponent<HTMLButtonElement>('button'),
  a: createMotionComponent<HTMLAnchorElement>('a'),
  ul: createMotionComponent<HTMLUListElement>('ul'),
  li: createMotionComponent<HTMLLIElement>('li'),
  img: createMotionComponent<HTMLImageElement>('img'),
  svg: createMotionComponent<SVGSVGElement>('svg'),
  path: createMotionComponent<SVGPathElement>('path'),
};

export function AnimatePresence({ children }: { children: ReactNode; mode?: 'sync' | 'popLayout' | 'wait' | string }) {
  return <>{children}</>;
}
