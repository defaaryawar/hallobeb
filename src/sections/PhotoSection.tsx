import Reveal from "../components/Reveal";

interface Photo {
  id: number;
  src: string;
  alt: string;
}

// 🖼️ 7 photos — swap src with '/photos/1.jpg' etc. from your /public/photos/ folder
const photos: Photo[] = [
  { id: 1, src: "/foto/foto-1.jpg", alt: "memory one" },
  { id: 2, src: "/foto/foto-2.JPG", alt: "memory two" },
  { id: 3, src: "/foto/foto-3.jpg", alt: "memory three" },
  { id: 4, src: "/foto/foto-4.JPG", alt: "memory four" },
  { id: 5, src: "/foto/foto-5.jpg", alt: "memory five" },
  { id: 6, src: "/foto/foto-6.jpg", alt: "memory six" },
  { id: 7, src: "/foto/foto-8.jpg", alt: "memory seven" },
];

// Alternating positions so each number feels placed differently
const numberPositions = [
  // [top, right, bottom, left] — one pair active per entry
  { bottom: "-28px", right: "-4px", top: "auto", left: "auto" }, // 1 — bottom right
  { top: "-28px", left: "-4px", bottom: "auto", right: "auto" }, // 2 — top left
  { bottom: "-28px", right: "-4px", top: "auto", left: "auto" }, // 3 — bottom right
  { top: "-28px", left: "-4px", bottom: "auto", right: "auto" }, // 4 — top left
  { bottom: "12px", left: "-4px", top: "auto", right: "auto" }, // 5 — bottom left (overlap)
  { top: "12px", right: "-4px", bottom: "auto", left: "auto" }, // 6 — top right (overlap)
  { bottom: "-28px", right: "-4px", top: "auto", left: "auto" }, // 7 — bottom right
];

export default function PhotoSection() {
  return (
    <section className="px-6 py-20 max-w-md mx-auto">
      {/* Section label */}
      <Reveal>
        <p
          className="text-xs tracking-[0.35em] uppercase text-[--color-muted-rose] mb-14"
          style={{ fontFamily: "var(--font-sans)" }}
        >
          momen
        </p>
      </Reveal>

      <div className="flex flex-col gap-10">
        {photos.map((photo, i) => {
          const num = String(photo.id).padStart(3, "0");
          const pos = numberPositions[i] ?? numberPositions[0];

          return (
            <Reveal key={photo.id} delay={i * 0.04} y={20}>
              <div className="relative">
                {/* Photo — nearly full width on mobile */}
                <div className="overflow-hidden rounded-sm">
                  <img
                    src={photo.src}
                    alt={photo.alt}
                    loading="lazy"
                    className="w-full object-cover"
                    style={{ aspectRatio: "3 / 4", display: "block" }}
                  />
                </div>

                {/* Abstract floating number */}
                <span
                  aria-hidden="true"
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
                    bottom: pos.bottom,
                    left: pos.left,
                    lineHeight: 1,
                    letterSpacing: "-2px",
                    userSelect: "none",
                    pointerEvents: "none",
                  }}
                >
                  #{num}
                </span>
              </div>
            </Reveal>
          );
        })}
      </div>
    </section>
  );
}
