import { motion } from "motion/react";

export default function HeroSection() {
  return (
    <section className="relative flex flex-col items-center justify-center min-h-svh px-6 text-center overflow-hidden bg-[--color-cream]">
      {/* Very subtle background texture */}
      <div
        className="absolute inset-0 opacity-30"
        style={{
          backgroundImage:
            "radial-gradient(ellipse 80% 60% at 50% 40%, #f2e0d8 0%, transparent 70%)",
        }}
      />

      <motion.div
        className="relative z-10 flex flex-col items-center gap-6 max-w-sm mx-auto"
        initial={{ opacity: 0, y: 32 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 1.4, ease: [0.25, 0.1, 0.25, 1] }}
      >
        <p
          className="text-xs tracking-[0.35em] uppercase text-[--color-muted-rose]"
          style={{ fontFamily: "var(--font-sans)" }}
        >
          untuk kamu
        </p>

        <h1
          className="text-5xl font-light leading-snug text-[--color-ink]"
          style={{ fontFamily: "var(--font-serif)" }}
        >
          karena kamu adalah
          <br />
          <em>rumah yang selalu&nbsp;kutuju.</em>
        </h1>

        <p
          className="text-sm font-light text-[--color-ink-light] max-w-xs leading-relaxed"
          style={{ fontFamily: "var(--font-sans)" }}
        >
          Kalau kamu lagi buka ini, berarti kamu lagi butuh sesuatu. Semoga yang kamu cari adalah
          aku. Karena aku selalu nyari kamu.
        </p>
      </motion.div>

      {/* Scroll hint */}
      <motion.div
        className="absolute bottom-10 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1.2, delay: 1.8, ease: "easeOut" }}
      >
        <span
          className="text-xs tracking-widest text-[--color-muted-rose] uppercase"
          style={{ fontFamily: "var(--font-sans)" }}
        >
          scroll
        </span>
        <motion.div
          className="w-px h-10 bg-[--color-muted-rose] origin-top"
          animate={{ scaleY: [0, 1, 0], originY: 0 }}
          transition={{
            duration: 2,
            delay: 2,
            repeat: Infinity,
            repeatDelay: 0.5,
            ease: "easeInOut",
          }}
        />
      </motion.div>
    </section>
  );
}
