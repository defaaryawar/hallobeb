import Reveal from "../components/Reveal";

export default function EndingSection() {
  return (
    <section className="px-6 py-32 max-w-md mx-auto text-center">
      <Reveal>
        <div className="w-12 h-px bg-[--color-muted-rose] mx-auto mb-14" aria-hidden="true" />
      </Reveal>

      <Reveal delay={0.1}>
        <h2
          className="text-3xl font-light italic leading-relaxed text-[--color-ink]"
          style={{ fontFamily: "var(--font-serif)" }}
        >
          Sampai nanti, dan nanti setelah itu.
        </h2>
      </Reveal>

      <Reveal delay={0.2}>
        <p
          className="mt-10 text-sm text-[--color-muted-rose] tracking-[0.2em]"
          style={{ fontFamily: "var(--font-sans)" }}
        >
          19 Februari 2026
        </p>
      </Reveal>

      <Reveal delay={0.3}>
        <p
          className="mt-3 text-sm text-[--color-ink-light] tracking-wide"
          style={{ fontFamily: "var(--font-sans)" }}
        >
          dengan sepenuh hati, from d for n
        </p>
      </Reveal>

      <Reveal delay={0.5}>
        <p className="mt-16 text-4xl text-[--color-muted-rose] select-none" aria-hidden="true">
          ♡
        </p>
      </Reveal>
    </section>
  );
}
