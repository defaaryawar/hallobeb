import { useRef, useState, useEffect } from "react";
import { motion, useScroll, useTransform } from "motion/react";

/* ─── 11 image+quote slides ─── */
const imageSlides = [
  {
    image: "/foto-modalHix/foto-10.webp",
    quote:
      "Jika ada satu hal yang dapat aku katakan kepadamu, aku mencintaimu untuk semua alasan yang benar dan salah.",
  },
  {
    image: "/foto-modalHix/foto-5.webp",
    quote: "You're my favorite part of every day.",
  },
  {
    image: "/foto-modalHix/foto-1.webp",
    quote:
      "Saat orang-orang memiliki hari kasih sayang untuk di rayakan, aku punya setiap hari untuk menyayangimu meski tidak ku ucapkan",
  },
  {
    video: "https://res.cloudinary.com/dpzbospvf/video/upload/v1772005456/video-1_foedzy.mp4",
    quote:
      "Jalanku, lelahku, dan prosesku akan aku nikmati. Aku tidak tau endingnya akan seperti apa, tapi aku tetap yakin bahwa rencana Allah untuk kita pasti luar biasa.",
  },
  {
    image: "/foto-modalHix/foto-2.webp",
    quote:
      "No matter what happens, just remember you're my sweet girl, and I'll always love you through anything and everything.",
  },
  {
    image: "/foto-modalHix/foto-8.webp",
    quote: "Your eyes, your voice, your smile, I love everything about you.",
  },
  {
    image: "/foto-modalHix/foto-4.webp",
    quote:
      "Kamuuu lucuu bangettt tauuu!!! kamuuu ituu cewekkk terlucuu, tergemashhh, terimutt, terclingyyy Terr Terr Terr SEMUANYAA!! aku beruntung bangett bisaa dapatin cewek kaya kamuu udah cantikk, lucu, baik, pinter lagi, gaada kekurangannyaa, im soooo in luvvvv youuuu my grillll🫀🤍.",
  },
  {
    video:
      "https://res.cloudinary.com/dpzbospvf/video/upload/v1772005460/video-2-modalHix_jbawka.mp4",
    quote: "Mari tetap bersama dalam waktu yang lama dan selama lamanya.",
  },
  {
    image: "/foto-modalHix/foto-11.webp",
    quote:
      "Aku tidak menjanjikan sempurna. Tapi aku menjanjikan bahwa aku akan selalu jadi tempat pulangmu, dalam keadaan apapun.",
  },
  {
    image: "/foto-modalHix/foto-12.webp",
    quote:
      "Mencintaimu adalah keputusan terbaik yang pernah kubuat, dan aku akan memilihmu lagi di setiap kehidupan.",
  },
  {
    image: "/foto-modalHix/foto-13.webp",
    quote: "Thank you for coming into my life",
  },
];

/* ─── 6 frame variants cycled across slides ─── */
const frameVariants = [
  "polaroid", // thick bottom, clean white
  "tape", // washi tape strips on corners
  "dotted", // playful dotted border
  "stamp", // perforated stamp border
  "sketch", // hand-drawn look double border
  "minimal", // thin elegant line
];

/* ─── Subtle rotation per image ─── */
const rotations = [-2, 1.5, -1, 2, -2.5, 1, -1.5, 2.5, -1, 1.5, -2];
const yShifts = [0, 10, -8, 6, -4, 12, -10, 4, 8, -6, 0];

/* ─── Decorative SVGs ─── */
function DecoArrow({ style, flip }: { style: React.CSSProperties; flip?: boolean }) {
  return (
    <svg
      className="mhx-deco"
      viewBox="0 0 120 40"
      fill="none"
      style={{ ...style, transform: `${style.transform ?? ""} ${flip ? "scaleX(-1)" : ""}` }}
    >
      <path
        d="M2 20 C30 20, 60 8, 90 20 S110 32, 118 20"
        stroke="currentColor"
        strokeWidth="1.2"
        strokeLinecap="round"
      />
      <path
        d="M108 14 L118 20 L108 26"
        stroke="currentColor"
        strokeWidth="1.2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

function DecoCircle({ style }: { style: React.CSSProperties }) {
  return (
    <svg className="mhx-deco" viewBox="0 0 80 80" fill="none" style={style}>
      <circle
        cx="40"
        cy="40"
        r="36"
        stroke="currentColor"
        strokeWidth="0.8"
        strokeDasharray="4 6"
      />
    </svg>
  );
}

function DecoStar({ style }: { style: React.CSSProperties }) {
  return (
    <svg className="mhx-deco" viewBox="0 0 24 24" fill="currentColor" style={style}>
      <path d="M12 0 L14 10 L24 12 L14 14 L12 24 L10 14 L0 12 L10 10 Z" />
    </svg>
  );
}

const TOTAL_SLIDES = 1 + imageSlides.length; // 12

export default function ModalHix() {
  const sectionRef = useRef<HTMLElement>(null);

  /* ── Track viewport width for pixel-based drift ── */
  const [vw, setVw] = useState(typeof window !== "undefined" ? window.innerWidth : 375);
  useEffect(() => {
    const onResize = () => setVw(window.innerWidth);
    window.addEventListener("resize", onResize);
    return () => window.removeEventListener("resize", onResize);
  }, []);

  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start end", "end end"],
  });

  /* ── 1. Elevation reveal ── */
  const panelScale = useTransform(scrollYProgress, [0, 0.06], [0.96, 1]);
  const panelOpacity = useTransform(scrollYProgress, [0, 0.04], [0, 1]);
  const panelY = useTransform(scrollYProgress, [0, 0.06], [60, 0]);

  /* ── 2. Intro holds, then slides FAR LEFT ── */
  const introX = useTransform(scrollYProgress, [0.12, 0.2], [0, -600]);
  const introOpacity = useTransform(scrollYProgress, [0.12, 0.19], [1, 0]);

  /* ── 3. Horizontal drift (NUMERIC px → GPU-accelerated) ── */
  const driftPx = (TOTAL_SLIDES - 1) * vw;
  const xDrift = useTransform(scrollYProgress, [0.12, 0.96], [0, -driftPx]);

  /* ── 4. Parallax deco (single layer for performance) ── */
  const decoY = useTransform(scrollYProgress, [0, 1], [0, -60]);

  /* ── 5. Background ── */
  const bgY = useTransform(scrollYProgress, [0, 1], [0, 120]);

  return (
    <section ref={sectionRef} className="mhx-outer" style={{ height: `${TOTAL_SLIDES * 110}svh` }}>
      <motion.div className="mhx-bg" style={{ y: bgY }} />

      <div className="mhx-sticky">
        {/* ── Decorative layer (consolidated for perf) ── */}
        <motion.div className="mhx-deco-layer" style={{ y: decoY }}>
          <DecoArrow
            style={{ top: "14%", left: "5%", width: 130, rotate: "12deg", opacity: 0.1 }}
          />
          <DecoArrow
            style={{ bottom: "20%", right: "4%", width: 110, rotate: "-10deg", opacity: 0.08 }}
            flip
          />
          <DecoCircle style={{ top: "10%", right: "12%", width: 80, opacity: 0.06 }} />
          <DecoCircle style={{ bottom: "16%", left: "10%", width: 65, opacity: 0.05 }} />
          <DecoStar style={{ top: "28%", right: "18%", width: 14, opacity: 0.1 }} />
          <DecoStar style={{ bottom: "32%", left: "7%", width: 10, opacity: 0.08 }} />
        </motion.div>

        {/* ── Focus vignette ── */}
        <div className="mhx-focus-left" />
        <div className="mhx-focus-right" />

        {/* ── Main panel ── */}
        <motion.div
          className="mhx-panel"
          style={{ scale: panelScale, opacity: panelOpacity, y: panelY }}
        >
          {/* ── Intro text (slides LEFT to exit) ── */}
          <motion.div className="mhx-intro" style={{ x: introX, opacity: introOpacity }}>
            <h2 className="mhx-intro-title">
              sayang,
              <br />
              udah siap baca ini?
            </h2>
            <div className="mhx-intro-divider" />
            <p className="mhx-intro-hint">lanjut scroll ya sayang ↓</p>
          </motion.div>

          {/* ── Horizontal track ── */}
          <motion.div className="mhx-track" style={{ x: xDrift }}>
            {/* Slide 0: spacer for intro text */}
            <div className="mhx-slide" />

            {/* Slides 1–11: framed images */}
            {imageSlides.map((slide, i) => {
              const rot = rotations[i];
              const yOff = yShifts[i];
              const isOdd = i % 2 !== 0;
              const frameType = frameVariants[i % frameVariants.length];

              return (
                <div className="mhx-slide" key={i}>
                  <div className="mhx-card">
                    {/* Framed image — variant class */}
                    <div
                      className={`mhx-frame mhx-frame--${frameType}`}
                      style={{
                        transform: `rotate(${rot}deg) translateY(${yOff}px)`,
                      }}
                    >
                      <div className="mhx-frame-inner">
                        {"video" in slide && slide.video ? (
                          <video
                            src={slide.video}
                            className="mhx-img"
                            muted
                            autoPlay
                            loop
                            playsInline
                            preload="metadata"
                            style={{ willChange: "transform" }}
                          />
                        ) : (
                          <img
                            src={(slide as { image: string }).image}
                            alt=""
                            className="mhx-img"
                            loading="lazy"
                          />
                        )}
                      </div>

                      {/* Floating number */}
                      <span
                        className="mhx-num"
                        style={{
                          [isOdd ? "left" : "right"]: "-10px",
                          [isOdd ? "bottom" : "top"]: "-18px",
                        }}
                      >
                        {String(i + 1).padStart(2, "0")}
                      </span>
                    </div>

                    {/* Quote */}
                    <p className="mhx-quote">"{slide.quote}"</p>
                  </div>
                </div>
              );
            })}
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}
