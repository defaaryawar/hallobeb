import { useRef, type ReactNode } from "react";
import { motion, useScroll, useTransform, useInView } from "motion/react";

interface TypewriterProps {
  text: string;
  className?: string;
  style?: React.CSSProperties;
  /** Speed in seconds per character (default 0.04) */
  speed?: number;
  /** Delay before starting in seconds (default 0) */
  delay?: number;
}

/**
 * Scroll-aware typewriter:
 * – Characters fade in one-by-one when the element enters the viewport.
 * – Each character is individually animated with stagger.
 */
export function Typewriter({ text, className, style, speed = 0.04, delay = 0 }: TypewriterProps) {
  const ref = useRef<HTMLSpanElement>(null);
  const isInView = useInView(ref, { once: true, margin: "-60px" });

  const chars = text.split("");

  return (
    <span ref={ref} className={className} style={style} aria-label={text}>
      {chars.map((char, i) => (
        <motion.span
          key={i}
          aria-hidden="true"
          initial={{ opacity: 0 }}
          animate={isInView ? { opacity: 1 } : { opacity: 0 }}
          transition={{
            duration: 0.05,
            delay: delay + i * speed,
            ease: "easeOut",
          }}
          style={{ display: "inline" }}
        >
          {char}
        </motion.span>
      ))}
      {/* Blinking cursor */}
      {isInView && (
        <motion.span
          className="typewriter-cursor"
          initial={{ opacity: 0 }}
          animate={{ opacity: [1, 0, 1] }}
          transition={{
            duration: 0.8,
            repeat: Infinity,
            delay: delay + chars.length * speed,
          }}
        >
          |
        </motion.span>
      )}
    </span>
  );
}

/**
 * Scroll-driven parallax wrapper.
 * Children move at a different speed based on their scroll position.
 */
interface ParallaxProps {
  children: ReactNode;
  /** How much the element moves relative to scroll. Positive = moves down, negative = moves up. */
  speed?: number;
  className?: string;
  style?: React.CSSProperties;
}

export function Parallax({ children, speed = 0.5, className, style }: ParallaxProps) {
  const ref = useRef<HTMLDivElement>(null);

  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"],
  });

  const y = useTransform(scrollYProgress, [0, 1], [speed * 100, speed * -100]);

  return (
    <motion.div ref={ref} className={className} style={{ y, ...style }}>
      {children}
    </motion.div>
  );
}

/**
 * Large decorative typographic text that moves with scroll.
 * Used as background decorative elements for premium feel.
 */
interface DecoTextProps {
  text: string;
  speed?: number;
  className?: string;
  style?: React.CSSProperties;
}

export function DecoText({ text, speed = 0.8, className, style }: DecoTextProps) {
  const ref = useRef<HTMLDivElement>(null);

  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"],
  });

  const y = useTransform(scrollYProgress, [0, 1], [speed * 80, speed * -80]);
  const opacity = useTransform(scrollYProgress, [0, 0.3, 0.7, 1], [0, 0.08, 0.08, 0]);

  return (
    <motion.div
      ref={ref}
      className={`deco-text ${className ?? ""}`}
      style={{ y, opacity, ...style }}
      aria-hidden="true"
    >
      {text}
    </motion.div>
  );
}
