import { useRef } from "react";
import { motion, useScroll, useTransform } from "motion/react";

interface Photo {
  id: number;
  src: string;
  alt: string;
}

// 🖼️ 7 photos — swap src with '/photos/1.jpg' etc. from your /public/photos/ folder
const photos: Photo[] = [
  { id: 1, src: "/foto/foto-9.jpg", alt: "memory one" },
  { id: 2, src: "/foto/foto-2.JPG", alt: "memory two" },
  { id: 3, src: "/foto/foto-3.jpg", alt: "memory three" },
  { id: 4, src: "/foto/foto-4.JPG", alt: "memory four" },
  { id: 5, src: "/foto/foto-5.jpg", alt: "memory five" },
  { id: 6, src: "/foto/foto-6.jpg", alt: "memory six" },
  { id: 7, src: "/foto/foto-8.jpg", alt: "memory seven" },
];

// Alternating positions so each number feels placed differently
const numberPositions = [
  { bottom: "-28px", right: "-4px", top: "auto", left: "auto" },
  { top: "-28px", left: "-4px", bottom: "auto", right: "auto" },
  { bottom: "-28px", right: "-4px", top: "auto", left: "auto" },
  { top: "-28px", left: "-4px", bottom: "auto", right: "auto" },
  { bottom: "12px", left: "-4px", top: "auto", right: "auto" },
  { top: "12px", right: "-4px", bottom: "auto", left: "auto" },
  { bottom: "-28px", right: "-4px", top: "auto", left: "auto" },
];

// Creative entry directions per photo — all different!
const photoEntries = [
  { x: -100, y: 30, rotate: -12, scale: 0.6 }, // slide from left diagonal
  { x: 80, y: -40, rotate: 8, scale: 0.7 }, // slide from top-right
  { x: 0, y: 80, rotate: 0, scale: 0.4 }, // zoom up from center
  { x: -60, y: -60, rotate: -6, scale: 0.75 }, // slide from top-left diagonal
  { x: 120, y: 20, rotate: 10, scale: 0.65 }, // slide from right
  { x: 0, y: -80, rotate: -4, scale: 0.8 }, // drop from top
  { x: -90, y: 60, rotate: -15, scale: 0.5 }, // slide from bottom-left diagonal
];

// Quotes attached to specific photos
const PHOTO_QUOTES: Record<number, string> = {
  1: "Sebelum kamu bertanya padaku kenapa aku mencintaimu, aku sudah tanyakan itu pada Tuhanmu.\nDan Dia tidak memberiku alasan, melainkan keyakinan.",
  2: "Aku minta maaf jika caraku mencintaimu tidak sama seperti cinta yang kamu inginkan, but trust me i love you more than anything 🩵",
  3: "Untukmu sayang, aku ga punya wanita selain yang di foto ini, percayalah bahwa dia kuat, dia lucu, dia baik, dia akan terus terlihat cantik di mataku, mau seperti apapun tingkahnya saat denganku dia wanita paling sempurna, dan bahkan sampai kapanpun aku akan terus menyayanginya.",
  4: "Haii sayanggg, ingat yaa, selama apa?\n\nSelama aku masih ada, kamu akan selalu mempunyai orang yang selalu mencintaimu.",
  5: "Jatuh cinta padamu adalah kesengajaan yang jauh lebih indah dari ribuan hal yang pernah kurencanakan. Dan ini, pada dia yang menawan sekali — semoga dijaga selalu oleh Tuhan.",
  6: "Haiii, makasih ya udah mau sama cowo yang gapunya apa apa ini, makasih udah milih aku dari sekian banyaknya cowo yang menyukaimu, dan sekali lagi makasih buat semua rasa sayang yang kamu berikan ke aku, maaf kalo mungkin aku sering ngecewain kamu, maaf bangett cantikuu.\n\nSayangkuu ke kamu jauh diatas rasa sayang aku ke diriku🫶🏻🌹",
  7: "Aku katakan sekali lagi NAJMITA ZAHiRA DIRGANTORO, aku tau kamu baca ini satu-satu kan, aku benar2 tulus menyayangimu, tidak ada sedikitpun niat dalam hidupku untuk mempermainkan hatimu apalagi meninggalkanmu.",
};

function PhotoCard({ photo, index }: { photo: Photo; index: number }) {
  const cardRef = useRef<HTMLDivElement>(null);
  const num = String(photo.id).padStart(3, "0");
  const pos = numberPositions[index] ?? numberPositions[0];
  const entry = photoEntries[index % photoEntries.length];
  const quote = PHOTO_QUOTES[photo.id];

  const { scrollYProgress } = useScroll({
    target: cardRef,
    offset: ["start end", "end start"],
  });

  const isOdd = index % 2 === 0;

  // Extreme zigzag parallax — odd up, even down
  const photoY = useTransform(scrollYProgress, [0, 1], isOdd ? [80, -80] : [-60, 60]);

  // Photos fly in from sides
  const photoX = useTransform(
    scrollYProgress,
    [0, 0.3, 0.7, 1],
    isOdd ? [-50, 0, 0, 30] : [50, 0, 0, -30],
  );

  // Scale from small to full
  const photoScale = useTransform(scrollYProgress, [0, 0.3, 0.7, 1], [0.8, 1.02, 1.02, 0.95]);

  // Subtle rotation
  const photoRotate = useTransform(scrollYProgress, [0, 0.5, 1], isOdd ? [-3, 0, 2] : [3, 0, -2]);

  // Number overlay moves at different speed (separation effect)
  const numY = useTransform(scrollYProgress, [0, 1], isOdd ? [40, -120] : [-40, 120]);
  const numX = useTransform(scrollYProgress, [0, 1], isOdd ? [-20, 40] : [20, -40]);

  return (
    <motion.div
      ref={cardRef}
      className="parallax-layer"
      style={{ y: photoY, x: photoX, scale: photoScale, rotate: photoRotate }}
    >
      <motion.div
        initial={{
          opacity: 0,
          x: entry.x,
          y: entry.y,
          rotate: entry.rotate,
          scale: entry.scale,
          filter: "blur(6px)",
        }}
        whileInView={{
          opacity: 1,
          x: 0,
          y: 0,
          rotate: 0,
          scale: 1,
          filter: "blur(0px)",
        }}
        viewport={{ once: true, margin: "-60px" }}
        transition={{
          duration: 1.0,
          delay: index * 0.04,
          ease: [0.16, 1, 0.3, 1],
        }}
      >
        <div className="relative">
          {/* Photo */}
          <div className="overflow-hidden rounded-sm">
            <img
              src={photo.src}
              alt={photo.alt}
              loading="lazy"
              className="w-full object-cover"
              style={{ aspectRatio: "3 / 4", display: "block" }}
            />
          </div>

          {/* Love quote attached below photo */}
          {quote && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-40px" }}
              transition={{ duration: 0.9, delay: 0.3, ease: [0.25, 0.1, 0.25, 1] }}
              style={{
                marginTop: "-4px",
                background:
                  "linear-gradient(145deg, rgba(242, 224, 216, 0.95), rgba(250, 246, 241, 0.9))",
                borderRadius: "0 0 12px 12px",
                padding: "20px 16px",
                borderTop: "2px solid var(--color-muted-rose)",
              }}
            >
              <p
                style={{
                  fontFamily: "var(--font-serif)",
                  fontSize: "0.95rem",
                  fontWeight: 300,
                  lineHeight: 1.8,
                  color: "var(--color-ink)",
                  fontStyle: "italic",
                  textAlign: "center",
                  margin: 0,
                  whiteSpace: "pre-line",
                }}
              >
                "{quote}"
              </p>
            </motion.div>
          )}

          {/* Floating number with separate parallax */}
          <motion.span
            aria-hidden="true"
            className="parallax-layer"
            style={{
              fontFamily: "var(--font-serif)",
              fontSize: "clamp(52px, 16vw, 80px)",
              fontWeight: 300,
              fontStyle: "italic",
              color: "var(--color-muted-rose)",
              opacity: 0.9,
              position: "absolute",
              top: pos.top,
              right: pos.right,
              bottom: quote ? "auto" : pos.bottom,
              left: pos.left,
              lineHeight: 1,
              letterSpacing: "-2px",
              userSelect: "none",
              pointerEvents: "none",
              y: numY,
              x: numX,
            }}
          >
            #{num}
          </motion.span>
        </div>
      </motion.div>
    </motion.div>
  );
}

export default function PhotoSection() {
  const sectionRef = useRef<HTMLElement>(null);

  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start end", "end start"],
  });

  const bgY = useTransform(scrollYProgress, [0, 1], ["0%", "40%"]);

  return (
    <section ref={sectionRef} className="parallax-section px-6 py-20 max-w-md mx-auto relative">
      {/* Background parallax layer */}
      <motion.div
        className="absolute inset-0 -z-10 opacity-15"
        style={{
          y: bgY,
          backgroundImage:
            "radial-gradient(ellipse 80% 50% at 60% 40%, #e8d5c4 0%, transparent 60%)",
        }}
      />

      {/* Section label — vertical clip reveal */}
      <motion.div
        initial={{ opacity: 0, clipPath: "inset(100% 0 0 0)" }}
        whileInView={{ opacity: 1, clipPath: "inset(0% 0 0 0)" }}
        viewport={{ once: true, margin: "-80px" }}
        transition={{ duration: 1, ease: [0.25, 0.1, 0.25, 1] }}
      >
        <p
          className="text-xs tracking-[0.35em] uppercase text-[--color-muted-rose] mb-14"
          style={{ fontFamily: "var(--font-sans)" }}
        >
          momen
        </p>
      </motion.div>

      <div className="flex flex-col gap-10">
        {photos.map((photo, i) => (
          <PhotoCard key={photo.id} photo={photo} index={i} />
        ))}
      </div>
    </section>
  );
}
