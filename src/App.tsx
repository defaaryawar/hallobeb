import HeroSection from "./sections/HeroSection";
import StorySection from "./sections/StorySection";
import PhotoSection from "./sections/PhotoSection";
import VideoSection from "./sections/VideoSection";
import MessageSection from "./sections/MessageSection";
import EndingSection from "./sections/EndingSection";

export default function App() {
  return (
    <main>
      <HeroSection />
      <StorySection />
      <PhotoSection />
      <VideoSection />
      <MessageSection />
      <EndingSection />
    </main>
  );
}
