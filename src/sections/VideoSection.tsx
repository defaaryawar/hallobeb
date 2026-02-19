import Reveal from "../components/Reveal";

export default function VideoSection() {
  return (
    <section className="px-8 py-28 max-w-md mx-auto">
      {/* Label */}
      <Reveal>
        <p
          className="text-xs tracking-[0.35em] uppercase text-[--color-muted-rose] mb-12"
          style={{ fontFamily: "var(--font-sans)" }}
        >
          untukmu
        </p>
      </Reveal>

      {/* Intro line */}
      <Reveal delay={0.1}>
        <p
          className="text-[1.3rem] font-light italic leading-snug text-[--color-ink] mb-10"
          style={{ fontFamily: "var(--font-serif)" }}
        >
          Ada kata-kata yang jauh lebih mudah kuungkapkan lewat ini.
        </p>
      </Reveal>

      {/* Video player */}
      <Reveal delay={0.15}>
        <div
          className="overflow-hidden rounded-sm"
          style={{ backgroundColor: "var(--color-sand)" }}
        >
          {/*
            📹 Put your video file in the /public/ folder
            and rename it to "video.mp4" — or change the src below.
          */}
          <video
            className="w-full aspect-[9/16] object-cover"
            controls
            playsInline
            preload="metadata"
            src="/video.mp4"
          />
        </div>
      </Reveal>

      {/* Sub-caption */}
      <Reveal delay={0.2}>
        <p
          className="mt-6 text-sm text-[--color-ink-light] text-center"
          style={{ fontFamily: "var(--font-sans)" }}
        >
          tonton sampai habis, ya.
        </p>
      </Reveal>
    </section>
  );
}
