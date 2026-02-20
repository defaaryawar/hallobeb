import { useRef } from "react";
import { motion, useScroll, useTransform } from "motion/react";

interface StoryEntry {
  id: number;
  text: string;
}

const stories: StoryEntry[] = [
  {
    id: 1,
    text: "Aku masih ingat pertama kali aku benar-benar melihatmu — bukan hanya sekedar bertemu seperti sebelumnya pernah bertemu, tapi benar-benar melihat dirimu, caramu tertawa dengan seluruh dirimu, tanpa menahan apapun.",
  },
  {
    id: 2,
    text: "Ada hari-hari di mana aku hanya ingin duduk diam di dekatmu. Bukan bicara. Bukan melakukan apapun yang berarti. Hanya ada.",
  },
  {
    id: 3,
    text: "Kamu tahu cara membuatku merasa aman — bahkan di saat aku sendiri tidak tahu apa yang aku butuhkan.",
  },
  {
    id: 4,
    text: 'Setiap hal kecil yang kamu lakukan — cara kamu memegang mataharimu sendiri, cara kamu bilang "hm" sebelum berpikir, — semuanya menetap di ingatanku. apalagi bibirmu yang selalu di tekuk saat sedang manja, "hahahaha" lucu bangettt sayangg',
  },
  {
    id: 5,
    text: "Kalau hidup adalah perjalanan yang tidak ada petanya, aku bersyukur bisa tersesat bareng kamu.",
  },
];

// Different entry animation per card — creative variety!
const cardAnimations = [
  // Card 1: Slide from top-left diagonal
  { x: -80, y: -60, rotate: -8, scale: 0.7 },
  // Card 2: Slide from right with blur
  { x: 100, y: 0, rotate: 5, scale: 0.85 },
  // Card 3: Scale up from center with rotate
  { x: 0, y: 60, rotate: -3, scale: 0.5 },
  // Card 4: Slide from bottom-right diagonal
  { x: 60, y: 80, rotate: 6, scale: 0.75 },
  // Card 5: Wipe from left
  { x: -120, y: 20, rotate: -10, scale: 0.8 },
];

function StoryCard({ story, index }: { story: StoryEntry; index: number }) {
  const cardRef = useRef<HTMLDivElement>(null);

  const { scrollYProgress } = useScroll({
    target: cardRef,
    offset: ["start end", "end start"],
  });

  const isEven = index % 2 === 0;

  // Parallax — different speeds per card
  const y = useTransform(scrollYProgress, [0, 1], [60 + index * 15, -60 - index * 15]);
  const x = useTransform(scrollYProgress, [0, 0.5, 1], [isEven ? -40 : 40, 0, isEven ? 20 : -20]);
  const rotate = useTransform(scrollYProgress, [0, 0.5, 1], [isEven ? -2 : 2, 0, isEven ? 1 : -1]);
  const scale = useTransform(scrollYProgress, [0, 0.4, 0.6, 1], [0.9, 1, 1, 0.95]);

  const entry = cardAnimations[index % cardAnimations.length];

  return (
    <motion.div ref={cardRef} className="parallax-layer" style={{ y, x, rotate, scale }}>
      <motion.div
        initial={{
          opacity: 0,
          x: entry.x,
          y: entry.y,
          rotate: entry.rotate,
          scale: entry.scale,
          filter: index % 2 === 1 ? "blur(8px)" : "blur(0px)",
        }}
        whileInView={{
          opacity: 1,
          x: 0,
          y: 0,
          rotate: 0,
          scale: 1,
          filter: "blur(0px)",
        }}
        viewport={{ once: true, margin: "-80px" }}
        transition={{
          duration: 1.1,
          delay: index * 0.05,
          ease: [0.25, 0.1, 0.25, 1],
        }}
      >
        <p
          className="text-[1.15rem] leading-[1.9] text-[--color-ink] font-light"
          style={{ fontFamily: "var(--font-serif)" }}
        >
          {story.text}
        </p>
      </motion.div>
    </motion.div>
  );
}

export default function StorySection() {
  const sectionRef = useRef<HTMLElement>(null);

  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start end", "end start"],
  });

  // Background gradient parallax at 2x speed
  const bgY = useTransform(scrollYProgress, [0, 1], ["0%", "60%"]);
  // Decorative elements at extreme parallax
  const dotY1 = useTransform(scrollYProgress, [0, 1], [0, -200]);
  const dotY2 = useTransform(scrollYProgress, [0, 1], [0, -300]);
  const lineY = useTransform(scrollYProgress, [0, 1], [50, -250]);

  return (
    <section ref={sectionRef} className="parallax-section px-6 py-28 max-w-md mx-auto relative">
      {/* Parallax background gradient */}
      <motion.div
        className="absolute inset-0 -z-10 opacity-20"
        style={{
          y: bgY,
          backgroundImage:
            "radial-gradient(ellipse 100% 60% at 50% 30%, #f2e0d8 0%, transparent 70%)",
        }}
      />

      {/* Decorative parallax elements */}
      <motion.div
        className="parallax-dot"
        style={{ top: "10%", right: "5%", y: dotY1, width: 7, height: 7 }}
      />
      <motion.div
        className="parallax-dot"
        style={{ bottom: "20%", left: "0%", y: dotY2, width: 5, height: 5, opacity: 0.15 }}
      />
      <motion.div className="parallax-line" style={{ top: "40%", left: "-10px", y: lineY }} />
      <motion.div
        className="parallax-line"
        style={{
          top: "65%",
          right: "-8px",
          y: useTransform(scrollYProgress, [0, 1], [0, -180]),
          height: 80,
        }}
      />

      {/* Section label — clip-path horizontal wipe */}
      <motion.div
        initial={{ opacity: 0, clipPath: "inset(0 100% 0 0)" }}
        whileInView={{ opacity: 1, clipPath: "inset(0 0% 0 0)" }}
        viewport={{ once: true, margin: "-80px" }}
        transition={{ duration: 1.2, ease: [0.25, 0.1, 0.25, 1] }}
      >
        <p
          className="text-xs tracking-[0.35em] uppercase text-[--color-muted-rose] mb-16"
          style={{ fontFamily: "var(--font-sans)" }}
        >
          Listen me
        </p>
      </motion.div>

      <div className="flex flex-col gap-14">
        {stories.map((story, i) => (
          <StoryCard key={story.id} story={story} index={i} />
        ))}
      </div>
    </section>
  );
}
