"use client";

import { MotionConfig } from "framer-motion";
import Navbar from "@/components/ui/Navbar";
import ReadingProgress from "@/components/ui/ReadingProgress";
import HeroSection from "@/components/sections/HeroSection";
import JourneyMap from "@/components/sections/JourneyMap";
import TimelineSection from "@/components/sections/TimelineSection";
import HotelSection from "@/components/sections/HotelSection";
import PackingSection from "@/components/sections/PackingSection";
import CostCalculatorSection from "@/components/sections/CostCalculatorSection";
import TipsSection from "@/components/sections/TipsSection";
import RoadbookDownloadSection from "@/components/sections/RoadbookDownloadSection";
import Footer from "@/components/ui/Footer";

export default function Home() {
  return (
    <MotionConfig reducedMotion="user">
      <main className="relative">
        <Navbar />
        <ReadingProgress />
        {/* 1. Full-screen immersive Hero */}
        <HeroSection />

        {/* 2. Interactive map with Yunnan outline + city cards */}
        <JourneyMap />

        {/* 3. Apple-style timeline */}
        <TimelineSection />

        {/* 4. Hotels / Photo / Weather (tabbed intel) */}
        <HotelSection />

        {/* 5. Packing list */}
        <PackingSection />

        {/* 6. Cost calculator */}
        <CostCalculatorSection />

        {/* 7. Tips, downloadable roadbook & Footer */}
        <TipsSection />
        <RoadbookDownloadSection />
        <Footer />
      </main>
    </MotionConfig>
  );
}
