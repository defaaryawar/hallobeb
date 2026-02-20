import { motion } from "motion/react";

export default function NotFoundPage() {
  return (
    <div className="notfound-page">
      <motion.div
        className="notfound-card"
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.7, ease: "easeOut" }}
      >
        <motion.div
          className="notfound-emoji"
          animate={{ rotate: [0, -10, 10, -5, 0] }}
          transition={{ duration: 2, repeat: Infinity, repeatDelay: 3 }}
        >
          🔒
        </motion.div>

        <h1 className="notfound-title">404</h1>
        <p className="notfound-desc">Halaman yang kamu cari tidak ditemukan</p>
        <p className="notfound-hint">Pastikan kamu menggunakan link yang benar ya ♡</p>
      </motion.div>
    </div>
  );
}
