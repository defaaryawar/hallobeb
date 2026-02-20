import { useRef } from "react";
import { motion, useScroll, useTransform } from "motion/react";

export default function VideoSection() {
  const sectionRef = useRef<HTMLElement>(null);

  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start end", "end start"],
  });

  // Zoom parallax — video starts small, zooms in
  const videoScale = useTransform(scrollYProgress, [0, 0.4, 0.6, 1], [0.82, 1.0, 1.0, 0.94]);
  // Subtle tilt rotation
  const videoRotate = useTransform(scrollYProgress, [0, 0.5, 1], [2.5, 0, -2.5]);
  // Text moves slower than video (depth separation)
  const textY = useTransform(scrollYProgress, [0, 1], [40, -60]);
  // Video vertical parallax
  const videoY = useTransform(scrollYProgress, [0, 1], [60, -40]);
  // Background parallax
  const bgY = useTransform(scrollYProgress, [0, 1], ["0%", "35%"]);

  return (
    <section ref={sectionRef} className="parallax-section px-8 py-28 max-w-md mx-auto relative">
      {/* Background parallax layer */}
      <motion.div
        className="absolute inset-0 -z-10 opacity-15"
        style={{
          y: bgY,
          backgroundImage:
            "radial-gradient(ellipse 70% 50% at 40% 50%, #f2e0d8 0%, transparent 60%)",
        }}
      />

      {/* Label — diagonal slide-in from top-right */}
      <motion.div style={{ y: textY }}>
        <motion.div
          initial={{ opacity: 0, x: 60, y: -30 }}
          whileInView={{ opacity: 1, x: 0, y: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 1, ease: [0.25, 0.1, 0.25, 1] }}
        >
          <p
            className="text-xs tracking-[0.35em] uppercase text-[--color-muted-rose] mb-12"
            style={{ fontFamily: "var(--font-sans)" }}
          >
            untukmu
          </p>
        </motion.div>

        {/* Intro line — blur-to-focus */}
        <motion.div
          initial={{ opacity: 0, filter: "blur(12px)", y: 20 }}
          whileInView={{ opacity: 1, filter: "blur(0px)", y: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 1.2, delay: 0.1, ease: [0.25, 0.1, 0.25, 1] }}
        >
          <p
            className="text-[1.3rem] font-light italic leading-snug text-[--color-ink] mb-10"
            style={{ fontFamily: "var(--font-serif)" }}
          >
            Ada kata-kata yang jauh lebih mudah kuungkapkan lewat ini.
          </p>
        </motion.div>
      </motion.div>

      {/* Video player with zoom + rotation parallax */}
      <motion.div
        className="parallax-layer"
        style={{ y: videoY, scale: videoScale, rotate: videoRotate }}
      >
        <motion.div
          initial={{ opacity: 0, scale: 0.6, filter: "blur(10px)" }}
          whileInView={{ opacity: 1, scale: 1, filter: "blur(0px)" }}
          viewport={{ once: true, margin: "-60px" }}
          transition={{ duration: 1.2, delay: 0.15, ease: [0.16, 1, 0.3, 1] }}
        >
          <div
            className="overflow-hidden rounded-sm"
            style={{ backgroundColor: "var(--color-sand)" }}
          >
            <video
              className="w-full aspect-[9/16] object-cover"
              controls
              playsInline
              preload="metadata"
              src="/video.mp4"
            />
          </div>
        </motion.div>
      </motion.div>

      {/* Sub-caption — slide from bottom-left */}
      <motion.div style={{ y: useTransform(scrollYProgress, [0, 1], [20, -80]) }}>
        <motion.div
          initial={{ opacity: 0, x: -40, y: 20 }}
          whileInView={{ opacity: 1, x: 0, y: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.8, delay: 0.2, ease: [0.25, 0.1, 0.25, 1] }}
        >
          <p
            className="mt-6 text-sm text-[--color-ink-light] text-center"
            style={{ fontFamily: "var(--font-sans)" }}
          >
            tonton sampai habis, ya.
          </p>
        </motion.div>
      </motion.div>

      {/* Decorative parallax elements */}
      <motion.div
        className="parallax-dot"
        style={{
          top: "15%",
          right: "0%",
          y: useTransform(scrollYProgress, [0, 1], [0, -150]),
          width: 6,
          height: 6,
        }}
      />
      <motion.div
        className="parallax-line"
        style={{
          bottom: "10%",
          left: "-5px",
          y: useTransform(scrollYProgress, [0, 1], [40, -180]),
          height: 50,
        }}
      />
    </section>
  );
}
