import { useState, useCallback } from "react";
import { motion, AnimatePresence } from "motion/react";

/* ─────────────────────────────────────────────
   Slide flow:
   intro → love → (logic) → (beneran | bohong) → gift
   ───────────────────────────────────────────── */

type SlideKey = "intro" | "love" | "logic" | "beneran" | "bohong" | "gift";

interface GiftModalProps {
  onDone: () => void;
}

export default function GiftModal({ onDone }: GiftModalProps) {
  const [slide, setSlide] = useState<SlideKey>("intro");

  /* ── Slide "love" — shrinking "ga sayang" button ── */
  const [noScale, setNoScale] = useState(1);
  const [yesWidth, setYesWidth] = useState(180);

  const handleLoveNo = useCallback(() => {
    setNoScale((s) => Math.max(s - 0.18, 0.05));
    setYesWidth((w) => Math.min(w + 45, 340));
  }, []);

  const handleLoveYes = useCallback(() => {
    setSlide("logic");
  }, []);

  /* ── Slide "logic" — 1 iya 1 tidak ── */
  const handleLogicYes = useCallback(() => {
    setSlide("beneran");
  }, []);

  const handleLogicNo = useCallback(() => {
    setSlide("bohong");
  }, []);

  return (
    <AnimatePresence>
      <motion.div
        className="gift-modal-overlay"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        transition={{ duration: 0.5 }}
      >
        <AnimatePresence mode="wait">
          {/* ───── INTRO: Greeting ───── */}
          {slide === "intro" && (
            <motion.div
              key="intro"
              className="gift-modal-card"
              initial={{ opacity: 0, y: 40, scale: 0.9 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: -30, scale: 0.95 }}
              transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
            >
              <motion.p
                className="gift-modal-emoji"
                animate={{ scale: [1, 1.15, 1], rotate: [0, 5, -5, 0] }}
                transition={{ duration: 2, repeat: Infinity, repeatDelay: 1 }}
              >
                🫶🏻
              </motion.p>

              <h2 className="gift-modal-title">
                Halo ayang akuu <br />
                <span className="gift-modal-name-highlight">Namiraaa</span> 💕
              </h2>

              <p className="gift-modal-subtitle">pacar tersayangggg 😘🫶🏻</p>

              <motion.div
                className="gift-modal-divider"
                initial={{ scaleX: 0 }}
                animate={{ scaleX: 1 }}
                transition={{ delay: 0.5, duration: 0.8, ease: "easeOut" }}
              />

              <motion.p
                className="gift-modal-subtitle"
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.8 }}
              >
                Aku ada beberapa pertanyaan buat kamu ayang~
              </motion.p>

              <motion.button
                className="gift-btn gift-btn--primary"
                onClick={() => setSlide("love")}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 1.2 }}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                Buka Pertanyaan 💌
              </motion.button>
            </motion.div>
          )}

          {/* ───── SLIDE 1: Sayang ga?? (shrinking button) ───── */}
          {slide === "love" && (
            <motion.div
              key="love"
              className="gift-modal-card"
              initial={{ opacity: 0, y: 40, scale: 0.9 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: -30, scale: 0.95 }}
              transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
            >
              <motion.p
                className="gift-modal-emoji"
                animate={{ rotate: [0, -10, 10, -10, 0] }}
                transition={{ duration: 1.5, repeat: Infinity, repeatDelay: 2 }}
              >
                🥺
              </motion.p>

              <h2 className="gift-modal-title gift-modal-title--caps">AYANGGGGGGGG,</h2>
              <p className="gift-modal-question">SAYANG AKU GAKKKKK 🥺☹️👉🏻👈🏻??</p>

              {/* Horizontal buttons */}
              <div className="gift-modal-buttons-row">
                <motion.button
                  className="gift-btn gift-btn--no"
                  onClick={handleLoveNo}
                  animate={{ scale: noScale }}
                  transition={{ type: "spring", stiffness: 400, damping: 20 }}
                  style={{ transformOrigin: "center" }}
                >
                  Ga sayang 😤
                </motion.button>

                <motion.button
                  className="gift-btn gift-btn--yes"
                  onClick={handleLoveYes}
                  animate={{ width: yesWidth }}
                  transition={{ type: "spring", stiffness: 300, damping: 22 }}
                >
                  Sayanggg bangett 🥰
                </motion.button>
              </div>

              {noScale < 0.3 && (
                <motion.p
                  className="gift-modal-hint"
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                >
                  yaudah pencet yang bener dong 😤😤
                </motion.p>
              )}
            </motion.div>
          )}

          {/* ───── SLIDE 2: Logic trap (1 iya 1 tidak) ───── */}
          {slide === "logic" && (
            <motion.div
              key="logic"
              className="gift-modal-card"
              initial={{ opacity: 0, y: 40, scale: 0.9 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: -30, scale: 0.95 }}
              transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
            >
              <motion.p
                className="gift-modal-emoji"
                animate={{ y: [0, -8, 0] }}
                transition={{ duration: 2, repeat: Infinity }}
              >
                🤔
              </motion.p>
              <h2 className="gift-modal-title">Oke sekarang serius…</h2>
              <p className="gift-modal-subtitle">
                Kamu cuma boleh jawab <strong>1 iya</strong> dan <strong>1 tidak</strong>.
              </p>
              <p className="gift-modal-question">Kamu sayang aku yaaa?</p>

              <div className="gift-modal-buttons-row">
                <motion.button
                  className="gift-btn gift-btn--no"
                  onClick={handleLogicNo}
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  Engga 😒
                </motion.button>
                <motion.button
                  className="gift-btn gift-btn--yes"
                  onClick={handleLogicYes}
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  Iya dong 🥰
                </motion.button>
              </div>
            </motion.div>
          )}

          {/* ───── SLIDE 2a: Jawab "Iya" → BENERANNN? ───── */}
          {slide === "beneran" && (
            <motion.div
              key="beneran"
              className="gift-modal-card"
              initial={{ opacity: 0, y: 40, scale: 0.9 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: -30, scale: 0.95 }}
              transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
            >
              <motion.p
                className="gift-modal-emoji"
                animate={{ scale: [1, 1.2, 1] }}
                transition={{ duration: 1, repeat: Infinity }}
              >
                😳
              </motion.p>
              <h2 className="gift-modal-title gift-modal-title--caps">BENERANNN??</h2>
              <p className="gift-modal-question">kamu lagi engga bohong kan?? 🥺</p>

              <motion.p
                className="gift-modal-hint"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.5 }}
              >
                kan jawaban "engga" nya udah kepake~ 😝
              </motion.p>

              <div className="gift-modal-buttons-row">
                <motion.button
                  className="gift-btn gift-btn--yes gift-btn--wide"
                  onClick={() => setSlide("gift")}
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  IYAAAAAA
                </motion.button>
              </div>
            </motion.div>
          )}

          {/* ───── SLIDE 2b: Jawab "Engga" → Bohong ya?? ───── */}
          {slide === "bohong" && (
            <motion.div
              key="bohong"
              className="gift-modal-card"
              initial={{ opacity: 0, y: 40, scale: 0.9 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: -30, scale: 0.95 }}
              transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
            >
              <motion.p
                className="gift-modal-emoji"
                animate={{ rotate: [0, 15, -15, 0] }}
                transition={{ duration: 0.8, repeat: Infinity }}
              >
                🤭
              </motion.p>
              <h2 className="gift-modal-title gift-modal-title--caps">SERIUSSSSSS??</h2>
              <p className="gift-modal-question">kamu bohong yaaa?? ya kan? 🤭</p>

              <motion.p
                className="gift-modal-hint"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.8 }}
              >
                hehe kan ga bisa jawab "engga" lagi 😝
              </motion.p>

              <div className="gift-modal-buttons-row">
                <motion.button
                  className="gift-btn gift-btn--yes gift-btn--wide"
                  onClick={() => setSlide("gift")}
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  IYAAAAAA
                </motion.button>
              </div>
            </motion.div>
          )}

          {/* ───── SLIDE 3: Gift celebration ───── */}
          {slide === "gift" && (
            <motion.div
              key="gift"
              className="gift-modal-card gift-modal-card--celebration"
              initial={{ opacity: 0, scale: 0.5 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.9 }}
              transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
            >
              {/* Confetti emojis */}
              {["🎉", "💕", "✨", "💗", "🌸", "🦋", "💖", "🎊"].map((e, i) => (
                <motion.span
                  key={i}
                  className="gift-confetti"
                  style={{
                    left: `${10 + ((i * 12) % 80)}%`,
                    top: `${5 + ((i * 17) % 60)}%`,
                  }}
                  initial={{ opacity: 0, scale: 0 }}
                  animate={{
                    opacity: [0, 1, 0.7],
                    scale: [0, 1.3, 1],
                    y: [0, -20, -10],
                    rotate: [0, 20, -10],
                  }}
                  transition={{
                    duration: 1.5,
                    delay: 0.3 + i * 0.1,
                    repeat: Infinity,
                    repeatType: "reverse",
                    repeatDelay: 1,
                  }}
                >
                  {e}
                </motion.span>
              ))}

              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.3 }}
              >
                <h2 className="gift-modal-title gift-modal-title--big">YEAYYYYYY 🎉🥳</h2>
              </motion.div>

              {/* Sticker GIF */}
              <motion.div
                className="gift-sticker-showcase"
                initial={{ opacity: 0, scale: 0, rotate: -15 }}
                animate={{ opacity: 1, scale: 1, rotate: 0 }}
                transition={{ delay: 0.5, duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
              >
                <img src="/sticker/hug-spin.gif" alt="pelukan" className="gift-sticker-big" />
              </motion.div>

              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.8 }}
              >
                <p className="gift-modal-celebration-text">Pelukan virtual buat kamu! 🤗</p>
                <p className="gift-modal-celebration-name">
                  Makasih sayangkuuu <strong>Namila</strong> cantik 💕
                </p>
              </motion.div>

              {/* Row of mini stickers */}
              <motion.div
                className="gift-sticker-row"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 1.2 }}
              >
                {[
                  "/sticker/iloveyou.gif",
                  "/sticker/hug-1.gif",
                  "/sticker/sending-virtual-hug.gif",
                ].map((src, i) => (
                  <motion.img
                    key={i}
                    src={src}
                    alt="sticker"
                    className="gift-sticker-mini"
                    initial={{ opacity: 0, y: 20, scale: 0.5 }}
                    animate={{ opacity: 1, y: 0, scale: 1 }}
                    transition={{ delay: 1.4 + i * 0.15, ease: [0.16, 1, 0.3, 1] }}
                  />
                ))}
              </motion.div>

              <motion.button
                className="gift-btn gift-btn--done"
                onClick={onDone}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 2 }}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                Lanjut baca surat dari aku 💌
              </motion.button>
            </motion.div>
          )}
        </AnimatePresence>
      </motion.div>
    </AnimatePresence>
  );
}
