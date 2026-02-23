import { useState, useEffect, useCallback, type RefObject } from "react";
import { motion, AnimatePresence } from "motion/react";

interface FloatingMusicPlayerProps {
  audioRef: RefObject<HTMLAudioElement | null>;
  isPlaying: boolean;
  setIsPlaying: (v: boolean) => void;
}

export default function FloatingMusicPlayer({
  audioRef,
  isPlaying,
  setIsPlaying,
}: FloatingMusicPlayerProps) {
  const [expanded, setExpanded] = useState(true);

  // Auto-collapse after 4 seconds
  useEffect(() => {
    const timer = setTimeout(() => setExpanded(false), 4000);
    return () => clearTimeout(timer);
  }, []);

  const togglePlay = useCallback(() => {
    const audio = audioRef.current;
    if (!audio) return;
    if (audio.paused) {
      audio.play();
      setIsPlaying(true);
    } else {
      audio.pause();
      setIsPlaying(false);
    }
  }, [audioRef, setIsPlaying]);

  const toggleExpand = useCallback(() => {
    setExpanded((prev) => !prev);
  }, []);

  return (
    <AnimatePresence>
      <motion.div
        className={`music-player ${expanded ? "music-player--expanded" : "music-player--collapsed"}`}
        initial={{ x: 300, opacity: 0 }}
        animate={{
          x: 0,
          opacity: 1,
        }}
        transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
      >
        {/* ── Collapsed peek tab ── */}
        {!expanded && (
          <motion.button
            className="music-peek-tab"
            onClick={toggleExpand}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.2 }}
            whileTap={{ scale: 0.95 }}
            aria-label="Open music player"
          >
            <span className="music-peek-icon">
              {isPlaying ? (
                <span className="music-eq-mini">
                  <span className="music-eq-mini-bar" />
                  <span className="music-eq-mini-bar" />
                  <span className="music-eq-mini-bar" />
                </span>
              ) : (
                "♪"
              )}
            </span>
          </motion.button>
        )}

        {/* ── Expanded card ── */}
        {expanded && (
          <motion.div
            className="music-card"
            initial={{ opacity: 0, scale: 0.9, x: 20 }}
            animate={{ opacity: 1, scale: 1, x: 0 }}
            exit={{ opacity: 0, scale: 0.9, x: 20 }}
            transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
          >
            {/* Close / collapse button */}
            <button className="music-close-btn" onClick={toggleExpand} aria-label="Minimize player">
              ›
            </button>

            {/* Album art area */}
            <div className="music-album-art">
              <div className="music-album-gradient" />
              <span className="music-album-note">♪</span>
              {isPlaying && (
                <motion.div
                  className="music-album-ring"
                  animate={{ scale: [1, 1.4, 1], opacity: [0.5, 0, 0.5] }}
                  transition={{ duration: 2, repeat: Infinity }}
                />
              )}
            </div>

            {/* Song info */}
            <div className="music-info">
              <span className="music-title">About You</span>
              <span className="music-artist">The 1975</span>
            </div>

            {/* Controls */}
            <div className="music-controls">
              <button
                className="music-play-btn"
                onClick={togglePlay}
                aria-label={isPlaying ? "Pause" : "Play"}
              >
                {isPlaying ? (
                  <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor">
                    <rect x="5" y="3" width="5" height="18" rx="1.5" />
                    <rect x="14" y="3" width="5" height="18" rx="1.5" />
                  </svg>
                ) : (
                  <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor">
                    <path d="M6 3.5a1 1 0 0 1 1.5-.87l13 8a1 1 0 0 1 0 1.74l-13 8A1 1 0 0 1 6 19.5V3.5Z" />
                  </svg>
                )}
              </button>

              {/* Equalizer bars */}
              {isPlaying && (
                <div className="music-equalizer">
                  {[...Array(4)].map((_, i) => (
                    <motion.span
                      key={i}
                      className="music-eq-bar"
                      animate={{ scaleY: [0.3, 1, 0.5, 0.8, 0.3] }}
                      transition={{
                        duration: 0.8 + i * 0.15,
                        repeat: Infinity,
                        ease: "easeInOut",
                        delay: i * 0.1,
                      }}
                    />
                  ))}
                </div>
              )}
            </div>
          </motion.div>
        )}
      </motion.div>
    </AnimatePresence>
  );
}
