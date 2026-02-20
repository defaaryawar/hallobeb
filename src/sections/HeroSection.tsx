import { motion, useScroll, useTransform } from "motion/react";
import { useRef } from "react";

export default function HeroSection() {
  const sectionRef = useRef<HTMLElement>(null);

  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start start", "end start"],
  });

  const textY = useTransform(scrollYProgress, [0, 1], ["0%", "40%"]);
  const bgY = useTransform(scrollYProgress, [0, 1], ["0%", "25%"]);
  const sectionScale = useTransform(scrollYProgress, [0, 1], [1, 0.88]);
  const sectionOpacity = useTransform(scrollYProgress, [0, 0.8], [1, 0]);

  return (
    <motion.section
      ref={sectionRef}
      className="relative flex flex-col items-center justify-center min-h-svh px-6 text-center overflow-hidden bg-[--color-cream]"
      style={{ scale: sectionScale, opacity: sectionOpacity }}
    >
      {/* Parallax background gradient */}
      <motion.div
        className="absolute inset-0 opacity-30"
        style={{
          y: bgY,
          backgroundImage:
            "radial-gradient(ellipse 80% 60% at 50% 40%, #f2e0d8 0%, transparent 70%)",
        }}
      />

      <motion.div
        className="absolute inset-0 opacity-15"
        style={{
          y: useTransform(scrollYProgress, [0, 1], ["0%", "50%"]),
          backgroundImage:
            "radial-gradient(ellipse 60% 40% at 30% 60%, #e8d5c4 0%, transparent 60%)",
        }}
      />

      {/* Decorative emoji centerpiece */}
      <motion.div
        className="relative z-10 mb-8"
        initial={{ opacity: 0, scale: 0, rotate: -180 }}
        animate={{ opacity: 1, scale: 1, rotate: 0 }}
        transition={{ duration: 1.8, delay: 0.5, ease: [0.16, 1, 0.3, 1] }}
      >
        <span className="text-6xl select-none" aria-hidden="true">
          🌸
        </span>
      </motion.div>

      {/* Main content with blur-to-focus + diagonal entries */}
      <motion.div
        className="relative z-10 flex flex-col items-center gap-6 max-w-sm mx-auto"
        initial={{ opacity: 0, y: 40, filter: "blur(10px)" }}
        animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
        transition={{ duration: 1.6, delay: 1.2, ease: [0.25, 0.1, 0.25, 1] }}
        style={{ y: textY }}
      >
        <motion.p
          className="text-xs tracking-[0.35em] uppercase text-[--color-muted-rose]"
          style={{ fontFamily: "var(--font-sans)" }}
          initial={{ opacity: 0, x: -30 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 1, delay: 1.5, ease: "easeOut" }}
        >
          untuk kamu
        </motion.p>

        <motion.h1
          className="text-5xl font-light leading-snug text-[--color-ink]"
          style={{ fontFamily: "var(--font-serif)" }}
          initial={{ opacity: 0, y: 30, scale: 0.95 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          transition={{ duration: 1.4, delay: 1.8, ease: [0.25, 0.1, 0.25, 1] }}
        >
          karena kamu adalah
          <br />
          <em>rumah yang selalu&nbsp;kutuju.</em>
        </motion.h1>

        <motion.p
          className="text-sm font-light text-[--color-ink-light] max-w-xs leading-relaxed"
          style={{ fontFamily: "var(--font-sans)" }}
          initial={{ opacity: 0, x: 30 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 1, delay: 2.2, ease: "easeOut" }}
        >
          Kalau kamu lagi buka ini, berarti kamu lagi butuh sesuatu. Semoga yang kamu cari adalah
          aku. Karena aku selalu nyari kamu.
        </motion.p>
      </motion.div>

      {/* Scroll hint */}
      <motion.div
        className="absolute bottom-5 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1.2, delay: 3, ease: "easeOut" }}
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
            delay: 3.5,
            repeat: Infinity,
            repeatDelay: 0.5,
            ease: "easeInOut",
          }}
        />
      </motion.div>

      {/* Decorative parallax dots */}
      <motion.div
        className="parallax-dot"
        style={{
          top: "20%",
          left: "15%",
          y: useTransform(scrollYProgress, [0, 1], [0, -120]),
          width: 8,
          height: 8,
        }}
      />
      <motion.div
        className="parallax-dot"
        style={{
          top: "70%",
          right: "10%",
          y: useTransform(scrollYProgress, [0, 1], [0, -80]),
          width: 5,
          height: 5,
          opacity: 0.15,
        }}
      />
      <motion.div
        className="parallax-line"
        style={{
          top: "30%",
          right: "20%",
          y: useTransform(scrollYProgress, [0, 1], [0, -150]),
        }}
      />
    </motion.section>
  );
}
