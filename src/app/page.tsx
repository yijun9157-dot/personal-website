import CausticsOverlay from "@/components/effects/CausticsOverlay";
import CursorGlow from "@/components/effects/CursorGlow";
import ScanlineOverlay from "@/components/effects/ScanlineOverlay";
import HoloDivider from "@/components/effects/HoloDivider";
import VideoBackground from "@/components/effects/VideoBackground";
import ThreeDParticleField from "@/components/effects/ThreeDParticleField";
import Navbar from "@/components/layout/Navbar";
import Hero from "@/components/sections/Hero";
import Works from "@/components/sections/Works";
import TechStack from "@/components/sections/TechStack";
import Footer from "@/components/sections/Footer";

export default function Home() {
  return (
    <>
      <VideoBackground />
      <ThreeDParticleField />
      <CausticsOverlay />
      <CursorGlow />
      <ScanlineOverlay />
      <Navbar />
      <main>
        <Hero />
        <HoloDivider />
        <Works />
        <HoloDivider />
        <TechStack />
      </main>
      <HoloDivider />
      <Footer />
    </>
  );
}
