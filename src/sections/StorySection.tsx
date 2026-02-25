import { useRef } from "react";
import { motion, useScroll, useTransform, type MotionValue } from "motion/react";

/* ─── Stories ─── */
const stories = [
  {
    id: 1,
    text: "Aku masih inget gimana kita pertama kali ketemu lagi setelah lama lost contact, dan melewati berbagai macam halangan, terutama aku sayanggg... aku jadi halangan terbesar buat diriku sendiri, but thankyouuu lovee🫶🏻, kamu selalu berusaha lewatin rintangan itu.🩵",
    typewriter: true,
  },
  {
    id: 2,
    text: "Aku selalu ingin berterimakasih kepada kamu karena kamu gapernah mau menyerah, dalam segala hal apapun itu, kamu tau ga? kamu itu best my choice",
  },
  {
    id: 3,
    text: "Kamu manusia yang paling tau aku sekarang, kamu tau aku marah gimana? kamu tau kalo aku ngambek, kamu tau segala hal tentang aku sekarang! jadi tolong jangan ada pikiran untuk pergi ataupun menjauh sayang😓",
  },
  {
    id: 4,
    text: "i always love you jangan pernah ragu untuk mengadu tentang duniamu, libatkan aku di setiap apapun itu, dan jika merasa dunia sedang tidak berpihak ke kamu, jangan lupa kamu masih punya aku yang selalu bersyukur kamu ada di dunia ini",
  },
  {
    id: 5,
    text: "Kalau hidup adalah perjalanan yang tidak ada petanya, semoga kita selalu tersesat bareng WKWKWKW.",
  },
  {
    id: 6,
    text: "Gada lagi hal yang bisa aku berikan dengan mulutku selain ucapan terima kasih dan permintaan maaf, tapi aku akan selalu berusaha memberikan yang terbaik untuk kamu. Semoga kamu selalu dijaga oleh tuhan ya sayanggg🩵🫶🏻🫶🏻",
    typewriter: true,
  },
  {
    id: 4,
    text: 'Setiap hal kecil yang kamu lakukan — cara kamu memegang mataharimu sendiri, cara kamu senyum, cara kamu tidur, — semuanya menetap di ingatanku. apalagi bibir kamu yang selalu di tekuk saat sedang manja, "hahahaha" lucu bangettt sayangg',
  },
  {
    id: 5,
    text: "Kalau hidup adalah perjalanan yang tidak ada petanya, semoga selalu tersesat bareng kamu.",
    typewriter: true,
  },
  {
    id: 6,
    text: "Gada lagi hal yang bisa aku berikan dengan mulutku selain ucapan terima kasih dan permintaan maaf, tapi aku akan selalu berusaha memberikan yang terbaik untuk kamu. Semoga kamu selalu dijaga oleh tuhan ya sayanggg🩵🫶🏻🫶🏻",
    typewriter: false,
  },
];

const STORY_COUNT = stories.length;

/* ─── Single story: word-by-word highlight as you scroll ─── */
function StorySlide({
  story,
  index,
  globalProgress,
}: {
  story: (typeof stories)[0];
  index: number;
  globalProgress: MotionValue<number>;
}) {
  const storyStart = index / STORY_COUNT;
  const storyEnd = (index + 1) / STORY_COUNT;

  // Slide visibility
  const slideOpacity = useTransform(
    globalProgress,
    [storyStart, storyStart + 0.02, storyEnd - 0.02, storyEnd],
    [0, 1, 1, 0],
  );

  // Gentle float up
  const slideY = useTransform(globalProgress, [storyStart, storyEnd], [30, -30]);

  // Internal progress (0→1) within this slide
  const localProgress = useTransform(globalProgress, [storyStart + 0.03, storyEnd - 0.03], [0, 1]);

  const words = story.text.split(" ");

  return (
    <motion.div className="ss-slide" style={{ opacity: slideOpacity, y: slideY }}>
      {/* Story number */}
      <span className="ss-num" aria-hidden="true">
        {String(story.id).padStart(2, "0")}
      </span>

      {/* Word-by-word highlight text */}
      <p className="ss-text">
        {words.map((word, wi) => (
          <StoryWord
            key={wi}
            word={word}
            index={wi}
            total={words.length}
            progress={localProgress}
          />
        ))}
      </p>

      {/* Progress bar */}
      <motion.div className="ss-progress-line">
        <motion.div className="ss-progress-fill" style={{ scaleX: localProgress }} />
      </motion.div>
    </motion.div>
  );
}

/* ─── Individual word: dim → vivid based on scroll ─── */
function StoryWord({
  word,
  index,
  total,
  progress,
}: {
  word: string;
  index: number;
  total: number;
  progress: MotionValue<number>;
}) {
  const wordStart = Math.max(0, index / total - 0.1);
  const wordEnd = Math.min(1, index / total + 0.05);
  const wordOpacity = useTransform(progress, [wordStart, wordEnd], [0.15, 1]);

  return (
    <motion.span className="ss-word" style={{ opacity: wordOpacity }}>
      {word}{" "}
    </motion.span>
  );
}

export default function StorySection() {
  const sectionRef = useRef<HTMLElement>(null);

  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start start", "end end"],
  });

  // Shifting background hue
  const bgGradient = useTransform(scrollYProgress, (v) => {
    const h = v * 30;
    return `radial-gradient(ellipse 80% 60% at 50% 45%, hsl(${20 + h}, 30%, 95%) 0%, hsl(${15 + h}, 20%, 99%) 70%)`;
  });

  // Scroll hint fades
  const hintOpacity = useTransform(scrollYProgress, [0, 0.08], [1, 0]);

  return (
    <section ref={sectionRef} className="ss-outer" style={{ height: `${STORY_COUNT * 150}vh` }}>
      <div className="ss-sticky">
        {/* Animated background */}
        <motion.div className="ss-bg" style={{ background: bgGradient }} />

        {/* Label */}
        <div className="ss-label-wrap">
          <span className="ss-label">listen me babe</span>
        </div>

        {/* Story slides */}
        {stories.map((story, i) => (
          <StorySlide key={story.id} story={story} index={i} globalProgress={scrollYProgress} />
        ))}

        {/* Scroll hint */}
        <motion.div className="ss-scroll-hint" style={{ opacity: hintOpacity }}>
          scroll perlahan ↓
        </motion.div>
      </div>
    </section>
  );
}
