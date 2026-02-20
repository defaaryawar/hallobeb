import { useRef } from "react";
import { motion, useScroll, useTransform } from "motion/react";

export default function EndingSection() {
  const sectionRef = useRef<HTMLElement>(null);

  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start end", "end start"],
  });

  const titleY = useTransform(scrollYProgress, [0, 1], [60, -30]);
  const textY = useTransform(scrollYProgress, [0, 1], [40, -40]);
  const signatureY = useTransform(scrollYProgress, [0, 1], [30, -70]);

  return (
    <section
      ref={sectionRef}
      className="parallax-section px-6 py-32 max-w-md mx-auto text-center relative"
    >
      {/* Decorative line — clip-path wipe */}
      <motion.div
        initial={{ scaleX: 0 }}
        whileInView={{ scaleX: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 1.2, ease: [0.25, 0.1, 0.25, 1] }}
        style={{ transformOrigin: "left center" }}
      >
        <div className="w-12 h-px bg-[--color-muted-rose] mx-auto mb-14" aria-hidden="true" />
      </motion.div>

      {/* Main romantic text — the centerpiece */}
      <motion.div className="parallax-layer" style={{ y: textY }}>
        <motion.div
          initial={{ opacity: 0, y: 30, filter: "blur(6px)" }}
          whileInView={{ opacity: 1, y: 0, filter: "blur(0px)" }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 1.4, ease: [0.25, 0.1, 0.25, 1] }}
        >
          {/* Big decorative open-quote */}
          <span
            className="block text-5xl leading-none text-[--color-muted-rose] select-none mb-4"
            style={{ fontFamily: "var(--font-serif)" }}
            aria-hidden="true"
          >
            "
          </span>
          <blockquote
            className="text-[1.15rem] leading-[2] text-[--color-ink] font-light italic text-center"
            style={{ fontFamily: "var(--font-serif)" }}
          >
            Aku bukan laki-laki yang pintar dalam memahami bagaimana cara berfikirmu, bukan juga
            laki-laki yang hebat dalam memberi rasa nyaman, dan bukan laki-laki menyenangkan yang
            bisa memberimu berbagai kejutan indah. Tapi kalau kamu mengira selama ini aku tidak
            pernah peduli denganmu, kamu salah. Hal kecil yang terjadi padamu saja aku selalu
            berfikir bagaimana cara menyikapinya dengan baik. Aku selalu memperhatikanmu dengan cara
            yang mungkin berbeda dari laki-laki pada umumnya, tapi percayalah, aku tulus melakukan
            segalanya.
          </blockquote>
          {/* Closing quote */}
          <span
            className="block text-5xl leading-none text-[--color-muted-rose] select-none mt-4"
            style={{ fontFamily: "var(--font-serif)" }}
            aria-hidden="true"
          >
            "
          </span>
        </motion.div>
      </motion.div>

      {/* Closing line */}
      <motion.div className="parallax-layer mt-14" style={{ y: titleY }}>
        <motion.div
          initial={{ opacity: 0, x: -40, y: 20, rotate: -2 }}
          whileInView={{ opacity: 1, x: 0, y: 0, rotate: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 1.2, delay: 0.2, ease: [0.25, 0.1, 0.25, 1] }}
        >
          <h2
            className="text-2xl font-light italic leading-relaxed text-[--color-ink]"
            style={{ fontFamily: "var(--font-serif)" }}
          >
            Sampai nanti, dan nanti setelah itu.
          </h2>
        </motion.div>
      </motion.div>

      {/* Date + signature */}
      <motion.div className="parallax-layer" style={{ y: signatureY }}>
        <motion.div
          initial={{ opacity: 0, scale: 0.8, filter: "blur(6px)" }}
          whileInView={{ opacity: 1, scale: 1, filter: "blur(0px)" }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 1, delay: 0.4, ease: [0.25, 0.1, 0.25, 1] }}
        >
          <p
            className="mt-10 text-sm text-[--color-muted-rose] tracking-[0.2em]"
            style={{ fontFamily: "var(--font-sans)" }}
          >
            19 Februari 2026
          </p>
          <p
            className="mt-3 text-sm text-[--color-ink-light] tracking-wide"
            style={{ fontFamily: "var(--font-sans)" }}
          >
            dengan sepenuh hati, from d for n
          </p>
        </motion.div>
      </motion.div>

      {/* Decorative parallax elements */}
      <motion.div
        className="parallax-dot"
        style={{
          top: "20%",
          left: "5%",
          y: useTransform(scrollYProgress, [0, 1], [0, -100]),
          width: 6,
          height: 6,
        }}
      />
      <motion.div
        className="parallax-dot"
        style={{
          bottom: "15%",
          right: "8%",
          y: useTransform(scrollYProgress, [0, 1], [0, -150]),
          width: 4,
          height: 4,
          opacity: 0.2,
        }}
      />
    </section>
  );
}
