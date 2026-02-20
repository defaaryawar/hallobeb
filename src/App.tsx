import { useState } from "react";
import HeroSection from "./sections/HeroSection";
import StorySection from "./sections/StorySection";
import PhotoSection from "./sections/PhotoSection";
import VideoSection from "./sections/VideoSection";
import MessageSection from "./sections/MessageSection";
import EndingSection from "./sections/EndingSection";
import FloatingPetals from "./components/FloatingPetals";
import GiftModal from "./components/GiftModal";
import LockedPage from "./pages/LockedPage";
import NotFoundPage from "./pages/NotFoundPage";

const SECRET_KEY = "/secure/nfc-access/270924131002170504/key-f8a2c9e1d7b3";

export default function App() {
  const [showModal, setShowModal] = useState(true);
  const path = window.location.pathname;

  // Root path → locked page (tap card message)
  if (path === "/") {
    return <LockedPage />;
  }

  // Secret key path → real app
  if (path === SECRET_KEY) {
    return (
      <>
        {showModal && <GiftModal onDone={() => setShowModal(false)} />}
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

  // Any other path → 404
  return <NotFoundPage />;
}
