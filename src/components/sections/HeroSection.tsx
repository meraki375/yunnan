"use client";

import { motion, useScroll, useTransform, AnimatePresence } from "framer-motion";
import { useEffect, useState, useRef } from "react";
import Image from "next/image";
import { travelImages, fallbackImage } from "@/data/travel-images";
import { useLocalStorageState } from "@/hooks/useLocalStorageState";
import { getMaxAltitudeForReturnPlan, getRouteDistanceForReturnPlan, RETURN_PLAN_STORAGE_KEY, type ReturnPlan } from "@/data/returnPlan";

export default function HeroSection() {
  const ref = useRef(null);
  const { scrollY } = useScroll();
  const bgScale = useTransform(scrollY, [0, 500], [1.04, 1]);
  const bgY = useTransform(scrollY, [0, 500], [0, 80]);
  const opacity = useTransform(scrollY, [0, 400], [1, 0]);
  const contentY = useTransform(scrollY, [0, 400], [0, -60]);

  const [bgLoaded, setBgLoaded] = useState(false);
  const [imageError, setImageError] = useState(false);
  const [showIndicator, setShowIndicator] = useState(true);
  const [showContent, setShowContent] = useState(false);
  const [isMobile, setIsMobile] = useState(false);
  const [returnPlan] = useLocalStorageState<ReturnPlan>(RETURN_PLAN_STORAGE_KEY, "main");
  const routeDistance = getRouteDistanceForReturnPlan(returnPlan);
  const maxAltitude = getMaxAltitudeForReturnPlan(returnPlan);

  useEffect(() => {
    const check = () => setIsMobile(window.innerWidth < 768);
    check();
    window.addEventListener("resize", check);
    const handleScroll = () => setShowIndicator(window.scrollY < 60);
    window.addEventListener("scroll", handleScroll, { passive: true });
    const timer = setTimeout(() => setShowContent(true), 100);
    return () => {
      window.removeEventListener("resize", check);
      window.removeEventListener("scroll", handleScroll);
      clearTimeout(timer);
    };
  }, []);

  const showFallback = imageError;

  const stats = [
    { value: "13", unit: "DAYS", label: "旅程" },
    { value: String(routeDistance), unit: "KM", label: "总里程" },
    { value: String(maxAltitude), unit: "M", label: "最高海拔" },
    { value: "9.25\u201310.7", unit: "", label: "行程日期" },
  ];

  return (
    <section ref={ref} className="relative min-h-screen overflow-hidden" style={{ background: "#081625" }}>
      <motion.div className="absolute inset-0" style={{ scale: bgScale, y: bgY }}>
        <div className="absolute inset-0" style={{ background: "#081625" }}>
          <Image
            src={imageError ? fallbackImage : travelImages.hero.url}
            alt={travelImages.hero.title}
            fill
            className={`object-cover transition-opacity duration-1200 ${bgLoaded ? "opacity-100" : "opacity-0"}`}
            priority
            onLoad={() => setBgLoaded(true)}
            onError={() => { setImageError(true); setBgLoaded(true); }}
            sizes="100vw"
            style={{ objectPosition: isMobile ? "44% center" : "center 52%" }}
          />
        </div>
        {showFallback && <div className="absolute inset-0 bg-gradient-to-br from-[#102033] via-[#1a2f45] to-[#0d1a2a]" />}
      </motion.div>

      <div className="absolute inset-0 z-[5] pointer-events-none" style={{
        background: isMobile
          ? "linear-gradient(to bottom, rgba(7,19,34,0.34) 0%, rgba(7,19,34,0.02) 25%, rgba(7,19,34,0.14) 52%, rgba(7,19,34,0.48) 100%), radial-gradient(ellipse at 50% 52%, rgba(5,14,27,0.04) 0%, rgba(5,14,27,0.16) 70%, rgba(5,14,27,0.28) 100%)"
          : "linear-gradient(to bottom, rgba(12,26,43,0.22) 0%, rgba(12,26,43,0.02) 32%, rgba(10,23,39,0.16) 68%, rgba(8,20,34,0.42) 100%), radial-gradient(ellipse at 50% 53%, rgba(5,16,30,0.10) 0%, rgba(5,16,30,0.20) 45%, rgba(5,16,30,0.04) 75%)"
      }} />

      <div className="absolute z-10 flex flex-col items-center text-center left-6 right-6 top-[29%] md:left-1/2 md:top-[52%] md:-translate-x-1/2 md:-translate-y-1/2"
        style={isMobile ? {} : { width: "min(920px, calc(100vw - 96px))", maxWidth: "920px" }}>
      <motion.div style={{ opacity, y: contentY }} className="flex flex-col items-center text-center w-full">

        {/* 1. Tag */}
        <motion.div initial={{ opacity: 0, y: 16 }} animate={showContent ? { opacity: 1, y: 0 } : {}} transition={{ duration: 0.8, delay: 0.2 }} style={{ marginBottom: isMobile ? "18px" : "22px" }}>
          <span className="inline-flex items-center rounded-[3px] font-normal leading-none whitespace-nowrap"
            style={{ color: "rgba(255,255,255,0.68)", background: "rgba(15,24,37,0.32)", border: "1px solid rgba(255,255,255,0.14)", backdropFilter: "blur(5px)", height: isMobile ? "26px" : "28px", padding: isMobile ? "0 10px" : "0 12px", gap: isMobile ? "7px" : "8px", fontSize: isMobile ? "10px" : "11px", letterSpacing: isMobile ? "0.07em" : "0.1em" }}>
            <span className="rounded-full" style={{ width: "5px", height: "5px", background: "#d66b27" }} />
            2026 · 中秋国庆 · 13 天自驾环线
          </span>
        </motion.div>

        {/* 2. Title */}
        <motion.h1 initial={{ opacity: 0, y: 24 }} animate={showContent ? { opacity: 1, y: 0 } : {}} transition={{ duration: 1, delay: 0.4, ease: "easeOut" }}
          className="font-display font-normal tracking-[-0.035em] max-w-[900px] box-border"
          style={{ color: "#f7f4ee", textShadow: "0 3px 22px rgba(0,0,0,0.22)", marginBottom: isMobile ? "18px" : "20px", fontSize: isMobile ? "clamp(52px, 15vw, 68px)" : "clamp(68px, 5vw, 94px)", lineHeight: "1.08", letterSpacing: isMobile ? "-0.04em" : "-0.035em", paddingLeft: isMobile ? "24px" : "32px", paddingRight: isMobile ? "24px" : "32px", display: isMobile ? "flex" : "block", flexDirection: isMobile ? "column" : undefined, gap: isMobile ? "2px" : undefined }}>
          {isMobile ? <><span>穿过山海</span><span>去见你</span></> : "穿过山海去见你"}
        </motion.h1>

        {/* 3. Route */}
        <motion.p initial={{ opacity: 0, y: 16 }} animate={showContent ? { opacity: 1, y: 0 } : {}} transition={{ duration: 0.8, delay: 0.5 }}
          className="font-medium whitespace-nowrap" style={{ color: "#df7832", marginBottom: isMobile ? "8px" : "10px", fontSize: isMobile ? "14px" : "15px", lineHeight: isMobile ? "1.4" : "1.5", letterSpacing: isMobile ? "0.025em" : "0.04em" }}>
          {returnPlan === "weather" ? "深圳 → 玉林 → 丽江 → 昆明 → 南宁 → 深圳" : "深圳 → 玉林 → 梅里 → 丽江 → 昆明 → 南宁 → 深圳"} · {routeDistance} km
        </motion.p>

        {/* 4. Description */}
        <motion.p initial={{ opacity: 0, y: 16 }} animate={showContent ? { opacity: 1, y: 0 } : {}} transition={{ duration: 0.8, delay: 0.7 }}
          className="font-normal" style={{ color: "rgba(255,255,255,0.64)", marginBottom: isMobile ? "26px" : "34px", fontSize: isMobile ? "13px" : "14px", lineHeight: isMobile ? "1.55" : "1.7", letterSpacing: isMobile ? "0.015em" : "0.025em", maxWidth: isMobile ? "340px" : undefined }}>
          沿着西南的山脊和江河，把秋天开进雪山的第一束光里。
        </motion.p>

        {/* 5. Stats */}
        <motion.div initial={{ opacity: 0, y: 16 }} animate={showContent ? { opacity: 1, y: 0 } : {}} transition={{ duration: 0.8, delay: 0.85 }}
          className="w-full" style={{ marginBottom: isMobile ? "26px" : "30px" }}>
          {/* Desktop */}
          <div className="hidden md:grid items-center" style={{ gridTemplateColumns: "minmax(110px,1fr) minmax(150px,1.2fr) minmax(150px,1.2fr) minmax(210px,1.55fr)", width: "760px", maxWidth: "100%", margin: "0 auto" }}>
            {stats.map((stat, i) => (
              <div key={stat.label} className="flex flex-col items-center justify-center relative px-[22px]" style={{ minHeight: "72px", ...(i > 0 ? { borderLeft: "1px solid rgba(255,255,255,0.14)" } : {}) }}>
                <div className="inline-flex items-end" style={{ gap: "6px" }}>
                  <span className="font-medium leading-none tracking-[-0.035em]" style={{ color: "rgba(255,255,255,0.94)", fontVariantNumeric: "tabular-nums", fontSize: stat.value === "9.25\u201310.7" ? "34px" : "38px" }}>{stat.value}</span>
                  {stat.unit && <span className="text-[10px] font-medium leading-none tracking-[0.08em]" style={{ color: "rgba(255,255,255,0.48)", paddingBottom: "5px" }}>{stat.unit}</span>}
                </div>
                <span className="text-[11px] leading-none tracking-[0.08em] mt-2" style={{ color: "rgba(255,255,255,0.42)" }}>{stat.label}</span>
              </div>
            ))}
          </div>
          {/* Mobile */}
          <div className="grid grid-cols-2 md:hidden w-full max-w-[350px] mx-auto" style={{ columnGap: "20px", rowGap: "22px" }}>
            {stats.map((stat) => (
              <div key={stat.label} className="flex flex-col items-center justify-center" style={{ minHeight: "70px", padding: "0" }}>
                <div className="inline-flex items-end" style={{ gap: "5px" }}>
                  <span className="font-medium leading-none tracking-[-0.035em]" style={{ color: "rgba(255,255,255,0.94)", fontVariantNumeric: "tabular-nums", fontSize: stat.value === "9.25\u201310.7" ? "34px" : "40px" }}>{stat.value}</span>
                  {stat.unit && <span className="text-[9px] font-medium leading-none tracking-[0.08em]" style={{ color: "rgba(255,255,255,0.48)", paddingBottom: "4px", marginLeft: "5px" }}>{stat.unit}</span>}
                </div>
                <span className="text-[10px] leading-none tracking-[0.08em] mt-2" style={{ color: "rgba(255,255,255,0.42)" }}>{stat.label}</span>
              </div>
            ))}
          </div>
        </motion.div>

        {/* 6. CTA */}
        <motion.div initial={{ opacity: 0, y: 16 }} animate={showContent ? { opacity: 1, y: 0 } : {}} transition={{ duration: 0.8, delay: 1.3 }}>
          <button onClick={() => { const el = document.getElementById("journey-map"); if (el) { const top = el.getBoundingClientRect().top + window.scrollY - 80; window.scrollTo({ top, behavior: "smooth" }); } }}
            className="group inline-flex items-center justify-center rounded-[4px] font-normal leading-none transition-all duration-[280ms]"
            style={{ height: "44px", minWidth: "148px", padding: "0 18px", gap: "10px", color: "rgba(255,255,255,0.9)", background: "rgba(10,22,37,0.22)", border: "1px solid rgba(255,255,255,0.26)", fontSize: "12px", letterSpacing: "0.1em", transitionTimingFunction: "cubic-bezier(0.22,1,0.36,1)" }}
            onMouseEnter={(e) => { const b = e.currentTarget; b.style.background = "rgba(212,103,37,0.92)"; b.style.borderColor = "rgba(212,103,37,1)"; b.style.transform = "translateY(-1px)"; }}
            onMouseLeave={(e) => { const b = e.currentTarget; b.style.background = "rgba(10,22,37,0.22)"; b.style.borderColor = "rgba(255,255,255,0.26)"; b.style.transform = ""; }}>
            <span>进入旅程</span>
            <svg width="14" height="14" viewBox="0 0 14 14" fill="none" className="transition-transform duration-[280ms] group-hover:translate-x-[5px]" style={{ transitionTimingFunction: "cubic-bezier(0.22,1,0.36,1)" }}>
              <path d="M5 3l5 4-5 4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
          </button>
        </motion.div>
      </motion.div>
      </div>

      <AnimatePresence>
        {showIndicator && (
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} transition={{ duration: 0.5 }} className="absolute bottom-8 left-1/2 -translate-x-1/2 z-10">
            <div className="flex flex-col items-center gap-2">
              <span className="text-[10px] font-mono text-white/20 tracking-[0.3em] uppercase leading-none">Scroll</span>
              <motion.div animate={{ y: [0, 6, 0] }} transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}>
                <svg width="16" height="16" viewBox="0 0 16 16" fill="none"><path d="M8 3v8M4 9l4 4 4-4" stroke="white" strokeOpacity="0.2" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" /></svg>
              </motion.div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      <div className="absolute bottom-0 left-0 right-0 h-32 pointer-events-none z-10" style={{ background: "linear-gradient(to bottom, transparent 0%, rgba(8,22,37,0.45) 100%)" }} />
    </section>
  );
}
