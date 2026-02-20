import { useRef, useState } from "react";
import { motion, useScroll, useTransform, AnimatePresence } from "motion/react";

interface AlasanGroup {
  emoji: string;
  title: string;
  items: string[];
  accent: string;
}

const ALASAN_GROUPS: AlasanGroup[] = [
  {
    emoji: "💖",
    title: "Pesonamu",
    accent: "#d4908a",
    items: [
      "Senyummu",
      "Matamu",
      "Cara kamu menatapku",
      "Suaramu",
      "Nada suaramu",
      "Tanganmu",
      "Tawamu",
      "Rasa malumu",
      "Cara kamu terlihat saat tidur",
      "Cara kamu terlihat saat marah",
    ],
  },
  {
    emoji: "🤍",
    title: "Hatimu",
    accent: "#c9a49a",
    items: [
      "Kebaikan hatimu",
      "Kesabaranmu",
      "Kejujuranmu",
      "Hati besarmu",
      "Kelembutan hatimu",
      "Kesetiaanmu",
      "Keberanianmu",
      "Kekuatanmu",
      "Jiwamu",
      "Suara hatimu",
    ],
  },
  {
    emoji: "🫂",
    title: "Caramu Mencintai",
    accent: "#e8a5a0",
    items: [
      "Cara kamu menenangkan badai dalam hatiku",
      "Cara kamu peduli",
      "Cara kamu bertahan",
      "Sentuhanmu",
      "Pelukanmu",
      "Cara kamu mendengarkan",
      "Cara kamu melihat hatiku yang terdalam",
      "Cara kamu percaya padaku",
      "Cara kamu memegang tanganku",
      "Cara kamu menarikku lebih dekat",
    ],
  },
  {
    emoji: "✨",
    title: "Hal-Hal Kecilmu",
    accent: "#d4908a",
    items: [
      "Kejutan-kejutan kecilmu",
      "Cara kamu memanggil namaku",
      "Pesan-pesan randommu",
      "Cara kamu menghargai hal-hal kecil",
      "Cara kamu mengingat detail-detail kecil",
      "Obrolan larut malammu",
      "Ide-ide gilamu",
      "Cara kamu bercerita tentang harimu",
      "Cara kamu bertanya apakah aku sudah makan",
      "Cara kamu berkata selamat malam",
    ],
  },
  {
    emoji: "🥹",
    title: "Yang Bikin Aku Terharu",
    accent: "#c9a49a",
    items: [
      "Cara kamu berjuang untukku",
      "Cara kamu membuat segalanya lebih baik",
      "Cara kamu memaafkan",
      "Cara kamu memahami",
      "Cara kamu menyembuhkan lukaku",
      "Cara kamu membalikan aku menjadi diriku",
      "Cara kamu menerima masa lalu",
      "Cara kamu telah mengubahku",
      "Cara kamu tahu apa yang tidak kukatakan",
      "Cara kamu mencintaiku bahkan saat aku tidak bisa dicintai",
    ],
  },
  {
    emoji: "😂",
    title: "Yang Bikin Aku Senyum",
    accent: "#e8a5a0",
    items: [
      "Cara kamu membuatku tertawa",
      "Momen-momen cemburumu yang lucu",
      "Cara kamu menghiburku",
      "Cara kamu tertawa pada leluconmu",
      "Anak kecil dalam dirimu",
      "Kecanggunganmu",
      "Cara kamu merespon pujian",
      "Cara kamu bersemangat",
      "Cara kamu menertawakanku dengan matamu",
      "Cara kamu tertawa dengan matamu",
    ],
  },
  {
    emoji: "💌",
    title: "Kata-Katamu",
    accent: "#d4908a",
    items: [
      'Cara kamu berkata "Aku di sini"',
      'Cara kamu berkata "Aku mencintaimu"',
      "Cara kamu menjelaskan dengan tenang",
      "Cara kamu mengekspresikan cinta",
      "Cara kamu berbisik",
      "Cara kamu menginspirasi",
      "Cara kamu berjuang dengan sungguh",
      "Cara kamu menjadi emosional",
      "Cara kamu berdoa",
      "Cara kamu mencintai quran",
    ],
  },
  {
    emoji: "🏠",
    title: "Kehadiranmu",
    accent: "#c9a49a",
    items: [
      "Kehangatanmu",
      "Keheninganmu",
      "Cara kamu duduk diam bersamaku",
      "Cara kamu ada dalam diam",
      "Cara kamu mengingatkanku pada rumah",
      "Kedamaian yang kamu berikan",
      "Cara kamu menenangkan kecemasanku",
      "Cara kamu merasa sakitku",
      "Cara kamu memanggilku",
      "Cara kamu menatap bintang-bintang",
    ],
  },
  {
    emoji: "💕",
    title: "Cinta Kita",
    accent: "#e8a5a0",
    items: [
      "Cara kamu merindukan kehadiranku",
      "Sifat protektifmu",
      "Mimpi-mimpimu",
      "Ketakutanmu kehilangan aku",
      "Cara kamu menghormati aku",
      "Cara kamu mencium",
      "Cara kamu memperbaiki yang rusak",
      "Cara kamu masih memilihku",
      "Cara kamu mempercayaiku",
      "Cara kamu mencintai aku apa adanya segalanya",
    ],
  },
  {
    emoji: "♾️",
    title: "Selamanya",
    accent: "#9e6b62",
    items: [
      "Pertumbuhanmu",
      "Perhatianmu padaku",
      "Kekeraskepalanmu",
      "Di jantungmu",
      "Rasa tidak amanmu",
      "Cara kamu bercerita tentang harimu",
      "Cara kamu tetap bersamaku",
      "Cara kamu menatapku",
      "Karena kamu adalah kamu",
      "Karena kamu adalah rumah bagiku — dan itu sudah cukup",
    ],
  },
];

function AlasanCard({
  group,
  index,
  startNum,
}: {
  group: AlasanGroup;
  index: number;
  startNum: number;
}) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 40, scale: 0.95 }}
      whileInView={{ opacity: 1, y: 0, scale: 1 }}
      viewport={{ once: true, margin: "-40px" }}
      transition={{
        duration: 0.7,
        delay: 0.05,
        ease: [0.25, 0.1, 0.25, 1],
      }}
      style={{
        background: "linear-gradient(145deg, #1a1a1a 0%, #2d1f2f 50%, #1a1a1a 100%)",
        borderRadius: "1.2rem",
        padding: "1.5rem 1.2rem",
        boxShadow: "0 4px 8px rgba(0,0,0,0.25), inset 0 1px 0 rgba(255,255,255,0.05)",
        border: "1px solid rgba(255,255,255,0.06)",
        minWidth: "280px",
        maxWidth: "300px",
        scrollSnapAlign: "center",
        flexShrink: 0,
      }}
    >
      {/* Card header */}
      <div
        style={{
          textAlign: "center",
          marginBottom: "1rem",
          paddingBottom: "0.8rem",
          borderBottom: `1px solid rgba(255,255,255,0.08)`,
        }}
      >
        <span style={{ fontSize: "1.8rem", display: "block", marginBottom: "4px" }}>
          {group.emoji}
        </span>
        <span
          style={{
            fontFamily: "var(--font-serif)",
            fontSize: "1.1rem",
            fontWeight: 400,
            fontStyle: "italic",
            color: group.accent,
            letterSpacing: "0.02em",
          }}
        >
          {group.title}
        </span>
      </div>

      {/* Reasons list */}
      <ol
        style={{
          listStyle: "none",
          padding: 0,
          margin: 0,
          display: "flex",
          flexDirection: "column",
          gap: "6px",
        }}
      >
        {group.items.map((item, i) => (
          <li
            key={i}
            style={{
              color: "rgba(255, 255, 255, 0.8)",
              fontFamily: "var(--font-sans)",
              fontSize: "0.78rem",
              lineHeight: 1.5,
              display: "flex",
              gap: "8px",
              alignItems: "baseline",
            }}
          >
            <span
              style={{
                color: group.accent,
                fontWeight: 600,
                fontSize: "0.7rem",
                flexShrink: 0,
                minWidth: "22px",
              }}
            >
              {startNum + i}.
            </span>
            <span>{item}</span>
          </li>
        ))}
      </ol>

      {/* Page indicator */}
      <div
        style={{
          textAlign: "center",
          marginTop: "1rem",
          paddingTop: "0.6rem",
          borderTop: "1px solid rgba(255,255,255,0.06)",
        }}
      >
        <span
          style={{
            fontFamily: "var(--font-sans)",
            fontSize: "0.65rem",
            color: "rgba(255,255,255,0.3)",
            letterSpacing: "0.1em",
            textTransform: "uppercase",
          }}
        >
          {index + 1} / {ALASAN_GROUPS.length}
        </span>
      </div>
    </motion.div>
  );
}

export default function MessageSection() {
  const sectionRef = useRef<HTMLElement>(null);
  const [activeCard, setActiveCard] = useState(0);

  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start end", "end start"],
  });

  const bgLayer1Y = useTransform(scrollYProgress, [0, 1], ["0%", "50%"]);
  const bgLayer2Y = useTransform(scrollYProgress, [0, 1], ["0%", "30%"]);

  const handleScroll = (e: React.UIEvent<HTMLDivElement>) => {
    const el = e.currentTarget;
    const scrollLeft = el.scrollLeft;
    const cardWidth = 300 + 16; // card width + gap
    const idx = Math.round(scrollLeft / cardWidth);
    setActiveCard(Math.min(idx, ALASAN_GROUPS.length - 1));
  };

  return (
    <section
      ref={sectionRef}
      className="parallax-section relative py-20 overflow-hidden"
      style={{ backgroundColor: "var(--color-blush)" }}
    >
      {/* Parallax backgrounds */}
      <motion.div
        className="absolute inset-0 -z-0"
        style={{
          y: bgLayer1Y,
          backgroundImage:
            "radial-gradient(ellipse 100% 80% at 50% 50%, #e8d5c4 0%, transparent 65%)",
        }}
      />
      <motion.div
        className="absolute inset-0 -z-0 opacity-30"
        style={{
          y: bgLayer2Y,
          backgroundImage:
            "radial-gradient(ellipse 60% 60% at 20% 30%, #f5c6c0 0%, transparent 60%)",
        }}
      />

      <div className="relative z-10">
        {/* Title */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-60px" }}
          transition={{ duration: 0.8, ease: [0.25, 0.1, 0.25, 1] }}
          style={{ textAlign: "center", marginBottom: "0.5rem", padding: "0 1.5rem" }}
        >
          <span
            style={{
              fontFamily: "var(--font-serif)",
              fontSize: "1.5rem",
              color: "var(--color-ink)",
              fontStyle: "italic",
              fontWeight: 300,
              lineHeight: 1.4,
              display: "block",
            }}
          >
            ♡ 100 Alasan Kenapa Aku
          </span>
          <span
            style={{
              fontFamily: "var(--font-serif)",
              fontSize: "1.5rem",
              color: "var(--color-deep-rose)",
              fontStyle: "italic",
              fontWeight: 500,
              lineHeight: 1.4,
              display: "block",
            }}
          >
            Selalu Sayang & Cinta Kamu ♡
          </span>
        </motion.div>

        {/* Hint */}
        <motion.p
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.3 }}
          style={{
            textAlign: "center",
            fontFamily: "var(--font-sans)",
            fontSize: "0.75rem",
            color: "var(--color-ink-light)",
            marginBottom: "1.5rem",
            letterSpacing: "0.03em",
          }}
        >
          ← geser untuk baca semua →
        </motion.p>

        {/* Horizontal scrollable cards */}
        <div
          onScroll={handleScroll}
          style={{
            display: "flex",
            gap: "16px",
            overflowX: "auto",
            scrollSnapType: "x mandatory",
            paddingLeft: "calc(50% - 140px)",
            paddingRight: "calc(50% - 140px)",
            paddingBottom: "12px",
            WebkitOverflowScrolling: "touch",
            scrollbarWidth: "none",
            msOverflowStyle: "none",
          }}
        >
          {ALASAN_GROUPS.map((group, i) => {
            // Calculate starting number for this group
            const startNum = ALASAN_GROUPS.slice(0, i).reduce((sum, g) => sum + g.items.length, 1);
            return <AlasanCard key={i} group={group} index={i} startNum={startNum} />;
          })}
        </div>

        {/* Dot indicators */}
        <div
          style={{
            display: "flex",
            justifyContent: "center",
            gap: "6px",
            marginTop: "16px",
          }}
        >
          {ALASAN_GROUPS.map((_, i) => (
            <motion.div
              key={i}
              animate={{
                width: activeCard === i ? 20 : 6,
                backgroundColor:
                  activeCard === i ? "var(--color-deep-rose)" : "var(--color-muted-rose)",
                opacity: activeCard === i ? 1 : 0.4,
              }}
              transition={{ duration: 0.3 }}
              style={{
                height: 6,
                borderRadius: 3,
              }}
            />
          ))}
        </div>
      </div>

      {/* Decorative parallax elements */}
      <motion.div
        className="parallax-dot"
        style={{
          top: "25%",
          left: "8%",
          y: useTransform(scrollYProgress, [0, 1], [0, -180]),
          width: 8,
          height: 8,
        }}
      />
      <motion.div
        className="parallax-dot"
        style={{
          bottom: "30%",
          right: "12%",
          y: useTransform(scrollYProgress, [0, 1], [0, -120]),
          width: 5,
          height: 5,
          opacity: 0.15,
        }}
      />
      <motion.div
        className="parallax-line"
        style={{
          top: "15%",
          right: "5%",
          y: useTransform(scrollYProgress, [0, 1], [0, -200]),
        }}
      />
    </section>
  );
}
