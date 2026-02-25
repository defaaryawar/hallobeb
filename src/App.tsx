import { useState, useRef, useCallback } from "react";
import HeroSection from "./sections/HeroSection";
import StorySection from "./sections/StorySection";
import PhotoSection from "./sections/PhotoSection";
import MessageSection from "./sections/MessageSection";
import EndingSection from "./sections/EndingSection";
import FloatingPetals from "./components/FloatingPetals";
import GiftModal from "./components/GiftModal";
import FloatingMusicPlayer from "./components/FloatingMusicPlayer";
import LockedPage from "./pages/LockedPage";
import NotFoundPage from "./pages/NotFoundPage";
import ModalHix from "./sections/ModalHix";

const SECRET_KEY = "/secure/nfc-access/270924131002170504/key-f8a2c9e1d7b3";

export default function App() {
  const [showModal, setShowModal] = useState(true);
  const [isPlaying, setIsPlaying] = useState(false);
  const audioRef = useRef<HTMLAudioElement>(null);
  const path = window.location.pathname;

  const handlePlayMusic = useCallback(() => {
    const audio = audioRef.current;
    if (audio) {
      audio.volume = 0;
      audio.play().catch(() => {
        /* browser may block autoplay — silent fail */
      });
      setIsPlaying(true);

      // Smooth fade-in over ~3 seconds
      const steps = 30;
      const interval = 100; // ms per step
      let step = 0;
      const fade = setInterval(() => {
        step++;
        audio.volume = Math.min(step / steps, 1);
        if (step >= steps) clearInterval(fade);
      }, interval);
    }
  }, []);

  // Root path → locked page (tap card message)
  if (path === "/") {
    return <LockedPage />;
  }

  // Secret key path → real app
  if (path === SECRET_KEY) {
    return (
      <>
        <audio ref={audioRef} src="/music/aboutyou_1975.m4a" loop preload="auto" />
        {showModal && (
          <GiftModal onDone={() => setShowModal(false)} onPlayMusic={handlePlayMusic} />
        )}
        {!showModal && (
          <FloatingMusicPlayer
            audioRef={audioRef}
            isPlaying={isPlaying}
            setIsPlaying={setIsPlaying}
          />
        )}
        <FloatingPetals />
        <main>
          <HeroSection />
          <StorySection />
          <PhotoSection />
          {/* <VideoSection /> */}
          <ModalHix />
          <MessageSection />
          <EndingSection />
        </main>
      </>
    );
  }

  // Any other path → 404
  return <NotFoundPage />;
}
