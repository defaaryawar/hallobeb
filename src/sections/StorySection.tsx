import Reveal from "../components/Reveal";

interface StoryEntry {
  id: number;
  text: string;
}

const stories: StoryEntry[] = [
  {
    id: 1,
    text: "Aku masih ingat pertama kali aku benar-benar melihatmu — bukan hanya wajahmu, tapi caramu tertawa dengan seluruh dirimu, tanpa menahan apapun.",
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
    text: 'Setiap hal kecil yang kamu lakukan — cara kamu memegang mataharimu sendiri, cara kamu bilang "hm" sebelum berpikir — semuanya menetap di ingatanku.',
  },
  {
    id: 5,
    text: "Kalau hidup adalah perjalanan yang tidak ada petanya, aku bersyukur bisa tersesat bareng kamu.",
  },
];

export default function StorySection() {
  return (
    <section className="px-6 py-28 max-w-md mx-auto">
      {/* Section label */}
      <Reveal>
        <p
          className="text-xs tracking-[0.35em] uppercase text-[--color-muted-rose] mb-16"
          style={{ fontFamily: "var(--font-sans)" }}
        >
          kenangan
        </p>
      </Reveal>

      <div className="flex flex-col gap-14">
        {stories.map((story, i) => (
          <Reveal key={story.id} delay={i * 0.05}>
            <p
              className="text-[1.15rem] leading-[1.9] text-[--color-ink] font-light"
              style={{ fontFamily: "var(--font-serif)" }}
            >
              {story.text}
            </p>
          </Reveal>
        ))}
      </div>
    </section>
  );
}
