import { useRef } from "react";
import { motion, useScroll, useTransform } from "motion/react";
import Reveal from "../components/Reveal";

export default function MessageSection() {
  const sectionRef = useRef<HTMLElement>(null);

  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start end", "end start"],
  });

  const bgY = useTransform(scrollYProgress, [0, 1], ["0%", "15%"]);

  return (
    <section
      ref={sectionRef}
      className="relative py-28 px-6 overflow-hidden"
      style={{ backgroundColor: "var(--color-blush)" }}
    >
      {/* Parallax background layer */}
      <motion.div
        className="absolute inset-0 -z-0"
        style={{
          y: bgY,
          backgroundImage:
            "radial-gradient(ellipse 100% 80% at 50% 50%, #e8d5c4 0%, transparent 65%)",
        }}
      />

      <div className="relative z-10 max-w-sm mx-auto text-center">
        {/* Decorative */}
        <Reveal>
          <span
            className="block text-3xl text-[--color-muted-rose] mb-6 select-none"
            aria-hidden="true"
          >
            ♡
          </span>
        </Reveal>

        <Reveal delay={0.1}>
          <blockquote>
            <p
              className="text-[1.6rem] font-light leading-snug text-[--color-ink] italic"
              style={{ fontFamily: "var(--font-serif)" }}
            >
              "Kamu tidak perlu menjadi sempurna di depanku. Aku sudah jatuh cinta pada semua
              versimu — yang kuat, yang lelah, yang bahagia, yang bingung."
            </p>
          </blockquote>
        </Reveal>

        <Reveal delay={0.2}>
          <p
            className="mt-8 text-sm text-[--color-ink-light] tracking-wide"
            style={{ fontFamily: "var(--font-sans)" }}
          >
            Terima kasih sudah ada.
          </p>
        </Reveal>
      </div>
    </section>
  );
}
