"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence, useReducedMotion } from "framer-motion";

const navItems = [
  { id: "journey-map", label: "路线", num: "01" },
  { id: "timeline", label: "日记", num: "02" },
  { id: "travel-intel", label: "情报", num: "03" },
  { id: "packing", label: "行囊", num: "04" },
  { id: "costs", label: "预算", num: "05" },
  { id: "tips", label: "附录", num: "06" },
];

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [activeSection, setActiveSection] = useState("");
  const reduceMotion = useReducedMotion();

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);
      const ids = navItems.map((item) => item.id);
      for (let i = ids.length - 1; i >= 0; i--) {
        const el = document.getElementById(ids[i]);
        if (el) {
          const rect = el.getBoundingClientRect();
          if (rect.top <= 180) { setActiveSection(ids[i]); break; }
        }
      }
    };
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Body scroll lock when mobile menu open
  useEffect(() => {
    if (mobileOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    return () => { document.body.style.overflow = ""; };
  }, [mobileOpen]);

  const scrollTo = (id: string) => {
    const el = document.getElementById(id);
    if (el) {
      const top = el.getBoundingClientRect().top + window.scrollY - 80;
      window.scrollTo({ top, behavior: "smooth" });
    }
    setMobileOpen(false);
  };

  return (
    <>
      <motion.header
        initial={reduceMotion ? false : { y: -20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.6, ease: "easeOut" }}
        className="fixed top-0 left-0 right-0 z-50"
        style={{
          height: "64px",
          transition: "background-color 240ms ease, box-shadow 240ms ease, border-color 240ms ease",
          background: scrolled ? "rgba(255,253,248,0.96)" : "rgba(247,243,234,0.84)",
          backdropFilter: "blur(16px)",
          borderBottom: "1px solid rgba(16,32,51,0.10)",
          boxShadow: scrolled ? "0 10px 26px rgba(16,32,51,0.08)" : "0 4px 18px rgba(16,32,51,0.04)",
        }}
      >
        <div className="w-full h-full mx-auto max-w-[1680px] flex md:grid md:grid-cols-[1fr_auto_1fr] items-center justify-between md:justify-start md:px-10" style={{ paddingLeft: "max(20px, env(safe-area-inset-left))", paddingRight: "max(20px, env(safe-area-inset-right))" }}>
          {/* ── Brand ── */}
          <button
            onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
            className="flex flex-col flex-shrink-0 rounded-md px-1 py-1 transition-transform active:scale-95"
            aria-label="回到顶部"
          >
            <span className="text-[22px] md:text-[17px] font-medium leading-none tracking-[0.04em]"
              style={{ color: "#102033", transition: "color 240ms ease" }}>
              <span style={{ color: "#C66A2B" }}>山海</span>
              <span>赴约</span>
            </span>
            <span className="hidden sm:block text-[8px] leading-none tracking-[0.22em] mt-[5px]"
              style={{ color: "#526A59", transition: "color 240ms ease" }}>
              ROAD TO MEILI
            </span>
          </button>

          {/* ── Desktop nav ── */}
          <nav className="hidden md:flex items-center gap-6">
            {navItems.map((item) => (
              <motion.button key={item.id} onClick={() => scrollTo(item.id)}
                whileHover={reduceMotion ? undefined : { y: -1 }} whileTap={reduceMotion ? undefined : { scale: 0.94 }}
                className="relative min-h-11 px-1 text-[12px] font-normal leading-none tracking-[0.05em] transition-colors duration-200"
                style={{ color: activeSection === item.id ? "#102033" : "#526A59" }}>
                <span className="mr-[3px] text-[9px] text-[#A8A29E]">{item.num}</span>
                {item.label}
                {activeSection === item.id && (
                  <motion.span layoutId="nav-indicator"
                    className="absolute left-1/2 -translate-x-1/2 w-[22px] h-[2px] rounded-[2px]"
                    style={{ bottom: "4px", background: "#C66A2B" }}
                    transition={{ duration: 0.28, ease: [0.22, 1, 0.36, 1] }} />
                )}
              </motion.button>
            ))}
          </nav>

          {/* ── Desktop meta ── */}
          <div className="hidden md:flex justify-self-end items-center gap-[10px]">
            <span className="text-[9px] leading-none tracking-[0.12em]" style={{ color: "#526A59" }}>2026.09.25</span>
            <span style={{ width: "16px", height: "1px", background: "rgba(16,32,51,0.18)" }} />
            <span className="text-[9px] leading-none tracking-[0.12em]" style={{ color: "#526A59" }}>13 DAYS</span>
          </div>

          {/* ── Mobile hamburger ── */}
          <motion.button onClick={() => setMobileOpen(!mobileOpen)} whileTap={reduceMotion ? undefined : { scale: 0.9 }}
            className="md:hidden flex items-center justify-center flex-shrink-0 rounded-full border border-[#102033]/10 bg-white/55" style={{ width: "44px", height: "44px", padding: "0" }}
            aria-label={mobileOpen ? "关闭菜单" : "打开菜单"} aria-expanded={mobileOpen} aria-controls="mobile-menu">
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
              {mobileOpen ? (
                <path d="M4 4l16 16M20 4L4 20" stroke="#102033" strokeWidth="1.6" strokeLinecap="round" />
              ) : (<>
                <path d="M2 5h20" stroke="#102033" strokeWidth="1.8" strokeLinecap="round" />
                <path d="M2 12h20" stroke="#102033" strokeWidth="1.8" strokeLinecap="round" />
                <path d="M2 19h20" stroke="#102033" strokeWidth="1.8" strokeLinecap="round" />
              </>)}
            </svg>
          </motion.button>
        </div>
      </motion.header>

      {/* ── Mobile drawer — full-screen with inner container ── */}
      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            id="mobile-menu"
            initial={{ x: "100%" }}
            animate={{ x: 0 }}
            exit={{ x: "100%" }}
            transition={{ duration: reduceMotion ? 0.01 : 0.34, ease: [0.22, 1, 0.36, 1] }}
            className="fixed inset-0 z-[200] md:hidden overflow-hidden"
            style={{ background: "#FFFDF8" }}
            role="dialog" aria-label="目录"
          >
            {/* Inner container with safe padding */}
            <div className="w-full h-full flex flex-col overflow-y-auto"
              style={{
                paddingTop: "max(64px, env(safe-area-inset-top))",
                paddingBottom: "max(24px, env(safe-area-inset-bottom))",
                paddingLeft: "20px",
                paddingRight: "20px",
                boxSizing: "border-box",
              }}>

              {/* ── Header: brand + close ── */}
              <div className="w-full flex items-start justify-between" style={{ minHeight: "56px" }}>
                {/* Brand */}
                <div className="flex flex-col">
                  <span className="text-[22px] font-medium leading-none tracking-[0.04em] whitespace-nowrap"
                    style={{ color: "#102033" }}>
                    <span style={{ color: "#C66A2B" }}>山海</span>
                    <span>赴约</span>
                  </span>
                  <span className="text-[8px] leading-none tracking-[0.22em]"
                    style={{ color: "#526A59", marginTop: "5px" }}>
                    ROAD TO MEILI
                  </span>
                </div>
                {/* Close button */}
                <motion.button onClick={() => setMobileOpen(false)} whileTap={reduceMotion ? undefined : { scale: 0.9 }}
                  className="inline-flex items-center justify-center flex-shrink-0 rounded-full border border-[#102033]/10 bg-white"
                  style={{ width: "40px", height: "40px", marginTop: "-8px", marginRight: "-8px" }}
                  aria-label="关闭菜单">
                  <svg width="22" height="22" viewBox="0 0 22 22" fill="none">
                    <path d="M5 5l12 12M17 5L5 17" stroke="#102033" strokeWidth="1.5" strokeLinecap="round" />
                  </svg>
                </motion.button>
              </div>

              {/* ── Nav list ── */}
              <nav className="w-full flex flex-col" style={{ marginTop: "44px", gap: "10px" }}>
                {navItems.map((item, idx) => (
                  <motion.button
                    key={item.id}
                    onClick={() => scrollTo(item.id)}
                    initial={{ opacity: 0, y: 12 }}
                    animate={{ opacity: 1, y: 0 }}
                    whileHover={reduceMotion ? undefined : { x: 4 }} whileTap={reduceMotion ? undefined : { scale: 0.98 }}
                    transition={{ duration: reduceMotion ? 0.01 : 0.32, delay: reduceMotion ? 0 : 0.06 + idx * 0.04, ease: "easeOut" }}
                    className="w-full grid items-center rounded-[14px] box-border transition-colors duration-200"
                    style={{
                      minHeight: "68px",
                      padding: "0 18px",
                      gridTemplateColumns: "42px minmax(0, 1fr)",
                      columnGap: "14px",
                      color: activeSection === item.id ? "#A64D18" : "#334155",
                      background: activeSection === item.id ? "#F1E3D1" : "transparent",
                    }}>
                    <span className="font-mono text-[13px] leading-none tracking-[0.06em] text-center"
                      style={{ fontVariantNumeric: "tabular-nums", color: activeSection === item.id ? "#A64D18" : "#526A59" }}>
                      {item.num}
                    </span>
                    <span className="text-[22px] font-normal leading-none tracking-[0.05em] text-left">
                      {item.label}
                    </span>
                  </motion.button>
                ))}
              </nav>

              {/* ── Footer meta ── */}
              <div className="w-full flex justify-between items-end" style={{ marginTop: "auto", paddingTop: "24px" }}>
                <span className="text-[9px] leading-[1.4] tracking-[0.14em]" style={{ color: "#526A59" }}>
                  SHENZHEN → MEILI → SHENZHEN
                </span>
                <span className="text-[9px] leading-[1.4] tracking-[0.14em]" style={{ color: "#526A59" }}>
                  2026.09.25 — 10.07
                </span>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
