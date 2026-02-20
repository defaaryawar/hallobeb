import { motion } from "motion/react";

export default function LockedPage() {
  return (
    <div className="locked-page">
      <motion.div
        className="locked-card"
        initial={{ opacity: 0, y: 30, scale: 0.95 }}
        animate={{ opacity: 1, y: 0, scale: 1 }}
        transition={{ duration: 0.8, ease: "easeOut" }}
      >
        {/* NFC icon */}
        <motion.div
          className="locked-icon"
          animate={{ scale: [1, 1.08, 1] }}
          transition={{ duration: 2.5, repeat: Infinity, ease: "easeInOut" }}
        >
          <svg
            width="64"
            height="64"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="1.5"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            {/* card body */}
            <rect x="2" y="4" width="20" height="16" rx="3" />
            {/* NFC waves */}
            <path d="M8 14a3 3 0 0 1 3-3" />
            <path d="M8 11a6 6 0 0 1 6-6" />
            <path d="M8 8a9 9 0 0 1 9-9" />
            <circle cx="8" cy="14" r="1" fill="currentColor" />
          </svg>
        </motion.div>

        <motion.h1
          className="locked-title"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.3, duration: 0.6 }}
        >
          Akses Terkunci
        </motion.h1>

        <motion.p
          className="locked-desc"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.5, duration: 0.6 }}
        >
          Halaman ini hanya bisa dibuka melalui <span className="locked-highlight">kartu tap</span>{" "}
          yang kamu miliki ♡
        </motion.p>

        <motion.div
          className="locked-hint"
          initial={{ opacity: 0 }}
          animate={{ opacity: 0.5 }}
          transition={{ delay: 0.8, duration: 0.6 }}
        >
          tempelkan kartumu untuk membuka 💌
        </motion.div>
      </motion.div>

      {/* Soft floating particles */}
      <div className="locked-particles">
        {[...Array(6)].map((_, i) => (
          <motion.span
            key={i}
            className="locked-particle"
            initial={{ opacity: 0, y: 0 }}
            animate={{
              opacity: [0, 0.6, 0],
              y: [-20, -80],
              x: [0, (i % 2 === 0 ? 1 : -1) * (10 + i * 5)],
            }}
            transition={{
              duration: 3 + i * 0.5,
              repeat: Infinity,
              delay: i * 0.7,
              ease: "easeOut",
            }}
          >
            ♡
          </motion.span>
        ))}
      </div>
    </div>
  );
}
