"use client";

import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { useLocalStorageState } from "@/hooks/useLocalStorageState";

const chapters = [
  { id: "journey-map", number: "01", label: "路线" },
  { id: "timeline", number: "02", label: "日记" },
  { id: "travel-intel", number: "03", label: "情报" },
  { id: "packing", number: "04", label: "行囊" },
  { id: "costs", number: "05", label: "预算" },
  { id: "memos", number: "06", label: "备忘" },
  { id: "tips", number: "07", label: "附录" },
];

export default function ReadingProgress() {
  const [activeIndex, setActiveIndex] = useState(0);
  const [activeDay] = useLocalStorageState("shanhai-yueyue:active-day", "Day 4");
  const dayNumber = activeDay.replace("Day ", "");

  useEffect(() => {
    const observer = new IntersectionObserver((entries) => {
      const visible = entries
        .filter((entry) => entry.isIntersecting)
        .sort((a, b) => b.intersectionRatio - a.intersectionRatio)[0];
      if (visible) setActiveIndex(chapters.findIndex((chapter) => chapter.id === visible.target.id));
    }, { rootMargin: "-35% 0px -52% 0px", threshold: [0.01, 0.2, 0.5] });

    chapters.forEach((chapter) => {
      const element = document.getElementById(chapter.id);
      if (element) observer.observe(element);
    });
    return () => observer.disconnect();
  }, []);

  const scrollToChapter = (chapterId: string) => {
    const element = document.getElementById(chapterId);
    if (element) window.scrollTo({ top: element.getBoundingClientRect().top + window.scrollY - 80, behavior: "smooth" });
  };

  const activeChapter = chapters[Math.max(0, activeIndex)] ?? chapters[0];

  return (
    <>
      <aside className="fixed right-5 top-1/2 z-40 hidden -translate-y-1/2 xl:block" aria-label="路书阅读进度">
        <div className="rounded-full border border-[#102033]/10 bg-[#FFFDF8]/92 px-2 py-3 shadow-[0_10px_28px_rgba(16,32,51,0.1)] backdrop-blur">
          <div className="flex flex-col items-center gap-2">
            {chapters.map((chapter, index) => {
              const active = index === activeIndex;
              return (
                <motion.button
                  key={chapter.id}
                  type="button"
                  title={`${chapter.number} ${chapter.label}`}
                  aria-label={`跳转至${chapter.label}`}
                  aria-current={active ? "step" : undefined}
                  onClick={() => scrollToChapter(chapter.id)}
                  whileTap={{ scale: 0.86 }}
                  className="relative flex h-7 w-7 items-center justify-center rounded-full"
                >
                  {active && <motion.span layoutId="reading-progress-active" className="absolute inset-0 rounded-full bg-[#E7EFE8]" transition={{ type: "spring", stiffness: 420, damping: 30 }} />}
                  <span className={`relative font-mono text-[9px] ${active ? "font-semibold text-[#526A59]" : "text-[#A8A29E]"}`}>{chapter.number}</span>
                </motion.button>
              );
            })}
          </div>
        </div>
      </aside>

      <div className="fixed bottom-4 left-1/2 z-40 -translate-x-1/2 xl:hidden" aria-live="polite">
        <div className="flex items-center gap-2 rounded-full border border-[#102033]/10 bg-[#FFFDF8]/95 px-3 py-2 shadow-[0_8px_24px_rgba(16,32,51,0.12)] backdrop-blur">
          <span className="font-mono text-[10px] text-[#C66A2B]">{activeChapter.number}/07</span>
          <span className="h-3 w-px bg-[#102033]/12" />
          <span className="text-[11px] font-medium text-[#334155]">{activeChapter.label}</span>
          {activeChapter.id === "timeline" && <><span className="h-3 w-px bg-[#102033]/12" /><span className="font-mono text-[10px] text-[#526A59]">DAY {dayNumber}/13</span></>}
        </div>
      </div>
    </>
  );
}
