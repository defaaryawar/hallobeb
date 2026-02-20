import { useState } from "react";
import HeroSection from "./sections/HeroSection";
import StorySection from "./sections/StorySection";
import PhotoSection from "./sections/PhotoSection";
import VideoSection from "./sections/VideoSection";
import MessageSection from "./sections/MessageSection";
import EndingSection from "./sections/EndingSection";
import FloatingPetals from "./components/FloatingPetals";
import GiftModal from "./components/GiftModal";

export default function App() {
  const [showModal, setShowModal] = useState(true);

  return (
    <>
      {/* Interactive gift modal on first load */}
      {showModal && <GiftModal onDone={() => setShowModal(false)} />}

      {/* Global floating petals overlay */}
      <FloatingPetals />
      <main>
        <HeroSection />
        <StorySection />
        <PhotoSection />
        <VideoSection />
        <MessageSection />
        <EndingSection />
      </main>
    </>
  );
}
