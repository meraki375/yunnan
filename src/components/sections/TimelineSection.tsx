"use client";

import { useMemo } from "react";
import Image from "next/image";
import { motion } from "framer-motion";
import { MAX_ALTITUDE, TOTAL_DISTANCE, tripDays } from "@/data/tripData";
import { useLocalStorageState } from "@/hooks/useLocalStorageState";

const dayImages: Record<string, string> = {
  "Day 1": "/images/destinations/yulin-yuntian.jpg",
  "Day 2": "/images/destinations/kunming-dianchi.jpg",
  "Day 3": "/images/destinations/dali-erhai.jpg",
  "Day 4": "/images/destinations/dali-erhai.jpg",
  "Day 5": "/images/destinations/dali-erhai.jpg",
  "Day 6": "/images/destinations/shangrila-songzanlin.jpg",
  "Day 7": "/images/destinations/shangrila-songzanlin.jpg",
  "Day 8": "/images/destinations/shangrila-songzanlin.jpg",
  "Day 9": "/images/destinations/meili-sunrise.jpg",
  "Day 10": "/images/destinations/meili-sunrise.jpg",
  "Day 11": "/images/destinations/lijiang-old-town.jpg",
  "Day 12": "/images/destinations/baise-jiefang.jpg",
  "Day 13": "/images/destinations/shenzhen-bay.jpg",
};

const typeLabel: Record<string, string> = {
  morning: "清晨",
  midday: "午间",
  afternoon: "下午",
  evening: "夜晚",
};

const stopForDay: Record<string, string> = {
  "Day 1": "yulin",
  "Day 2": "kunming",
  "Day 3": "dali",
  "Day 4": "dali",
  "Day 5": "dali",
  "Day 6": "shangrila",
  "Day 7": "shangrila",
  "Day 8": "shangrila",
  "Day 9": "meili",
  "Day 10": "meili",
  "Day 11": "lijiang",
  "Day 12": "baise",
  "Day 13": "shenzhen",
};

function dayNumber(day: string) {
  return day.replace("Day ", "").padStart(2, "0");
}

export default function TimelineSection() {
  const [activeDay, setActiveDay] = useLocalStorageState("shanhai-yueyue:active-day", "Day 4");
  const [, setSelectedStop] = useLocalStorageState("shanhai-yueyue:selected-stop", "dali");
  const selected = useMemo(
    () => tripDays.find((day) => day.day === activeDay) ?? tripDays[0],
    [activeDay],
  );
  const special = selected.day === "Day 4" || selected.day === "Day 5" ? "洱海边，把誓言留给晨光" : selected.day === "Day 10" ? "在梅里，等一座山慢慢发亮" : "把下一段风景，交给车轮和时间";
  const selectDay = (day: string) => {
    setActiveDay(day);
    setSelectedStop(stopForDay[day]);
  };

  return (
    <section id="timeline" className="relative overflow-hidden bg-white">
      <div className="section-container">
        <div className="flex flex-col justify-between gap-8 lg:flex-row lg:items-end">
          <div className="max-w-xl">
            <span className="section-number">02 / ITINERARY</span>
            <h2 className="section-title text-left">把日子，开成一条<span className="highlight">路</span></h2>
            <p className="mt-4 text-sm leading-7 text-[#526A59]">
              不赶抵达，也不浪费沿途。每一页都记下时间、天气，以及此刻最值得停下来的地方。
            </p>
          </div>
          <div className="grid grid-cols-3 divide-x divide-[#A8A29E]/20 rounded-xl border border-[#A8A29E]/15 bg-[#F7F3EA] px-2 py-3 text-center sm:min-w-96">
            <div><b className="block font-serif text-xl text-[#102033]">13</b><span className="text-[10px] text-[#A8A29E]">旅行天数</span></div>
            <div><b className="block font-serif text-xl text-[#102033]">{TOTAL_DISTANCE}</b><span className="text-[10px] text-[#A8A29E]">总里程 / km</span></div>
            <div><b className="block font-serif text-xl text-[#102033]">{MAX_ALTITUDE}</b><span className="text-[10px] text-[#A8A29E]">最高海拔 / m</span></div>
          </div>
        </div>

        <div role="tablist" aria-label="每日行程" className="mt-12 grid grid-cols-3 gap-2 sm:grid-cols-4 lg:grid-cols-6">
          {tripDays.map((day) => {
            const active = day.day === activeDay;
            return (
              <motion.button
                key={day.day}
                id={`day-tab-${dayNumber(day.day)}`}
                role="tab"
                type="button"
                aria-selected={active}
                aria-controls="day-detail"
                onClick={() => selectDay(day.day)}
                whileHover={{ y: -2 }}
                whileTap={{ scale: 0.97 }}
                transition={{ type: "spring", stiffness: 420, damping: 28 }}
                className={`relative min-h-20 overflow-hidden rounded-xl border px-3 py-3 text-left transition-colors ${
                  active ? "border-[#C66A2B]/45 bg-[#C66A2B]/10" : "border-[#A8A29E]/12 bg-white hover:border-[#526A59]/25 hover:bg-[#F7F3EA]"
                }`}
              >
                {active && <motion.span layoutId="active-day-glow" className="absolute inset-x-3 bottom-0 h-0.5 rounded-full bg-[#C66A2B]" transition={{ type: "spring", stiffness: 420, damping: 30 }} />}
                <span className={`block font-mono text-[10px] ${active ? "text-[#C66A2B]" : "text-[#A8A29E]"}`}>DAY {dayNumber(day.day)}</span>
                <span className="mt-1 block text-xs font-semibold text-[#102033]">{day.from} → {day.to}</span>
                <span className="mt-1 block text-[10px] text-[#A8A29E]">{day.date} · {day.distance}</span>
              </motion.button>
            );
          })}
        </div>

        <motion.article
          key={selected.day}
          id="day-detail"
          role="tabpanel"
          aria-labelledby={`day-tab-${dayNumber(selected.day)}`}
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ type: "spring", stiffness: 360, damping: 32 }}
          className="mt-6 grid overflow-hidden rounded-2xl border border-[#102033]/10 bg-[#102033] lg:grid-cols-[0.82fr_1.18fr]"
        >
          <div className="relative min-h-72 lg:min-h-full">
            <Image src={dayImages[selected.day]} alt={`${selected.to} 行程氛围图`} fill sizes="(max-width: 1023px) 100vw, 38vw" className="object-cover" />
            <div className="absolute inset-0 bg-gradient-to-t from-[#102033] via-[#102033]/35 to-transparent lg:bg-gradient-to-r" />
            <div className="absolute inset-x-6 bottom-6 text-white">
              <p className="font-mono text-[11px] tracking-[0.16em] text-[#D89B3C]">DAY {dayNumber(selected.day)} · {selected.date}</p>
              <h3 className="mt-2 font-serif text-3xl">{selected.from} → {selected.to}</h3>
              <p className="mt-2 text-sm text-white/65">{special}</p>
            </div>
          </div>

          <div className="bg-white p-6 sm:p-8">
            <div className="grid grid-cols-3 gap-3 border-b border-[#A8A29E]/15 pb-5 text-center">
              <div><b className="block text-sm text-[#102033]">{selected.distance}</b><span className="text-[10px] text-[#A8A29E]">驾驶距离</span></div>
              <div><b className="block text-sm text-[#102033]">{selected.duration}</b><span className="text-[10px] text-[#A8A29E]">预计用时</span></div>
              <div><b className="block text-sm text-[#102033]">{selected.weather.temp}</b><span className="text-[10px] text-[#A8A29E]">{selected.weather.altitude}</span></div>
            </div>

            <div className="mt-6 grid gap-7 md:grid-cols-[1.1fr_0.9fr]">
              <div>
                <p className="font-mono text-[10px] tracking-[0.16em] text-[#C66A2B]">今日路书</p>
                <ol className="mt-3 space-y-3 border-l border-[#C66A2B]/25 pl-4">
                  {selected.schedule.map((item) => (
                    <li key={`${item.time}-${item.activity}`} className="relative">
                      <span className="absolute -left-[19px] top-1.5 h-2 w-2 rounded-full bg-[#C66A2B] ring-4 ring-[#C66A2B]/10" />
                      <p className="text-sm font-medium text-[#102033]"><span className="mr-2 font-mono text-[11px] text-[#C66A2B]">{item.time}</span>{item.activity}</p>
                      <span className="text-[10px] text-[#A8A29E]">{typeLabel[item.type]}</span>
                    </li>
                  ))}
                </ol>
              </div>

              <aside className="rounded-xl bg-[#F7F3EA] p-4">
                <p className="font-mono text-[10px] tracking-[0.16em] text-[#526A59]">行前核对</p>
                <div className="mt-3 flex flex-wrap gap-2">
                  {selected.highlights.map((item) => <span key={item} className="rounded-full bg-white px-3 py-1 text-[11px] text-[#334155]">{item}</span>)}
                </div>
                <dl className="mt-5 space-y-3 text-xs">
                  <div className="flex justify-between gap-4"><dt className="text-[#A8A29E]">天气</dt><dd className="text-right text-[#334155]">{selected.weather.condition}</dd></div>
                  <div className="flex justify-between gap-4"><dt className="text-[#A8A29E]">住宿</dt><dd className="max-w-40 text-right text-[#334155]">{selected.hotel.name}</dd></div>
                  <div className="flex justify-between gap-4"><dt className="text-[#A8A29E]">地点</dt><dd className="text-right text-[#334155]">{selected.hotel.location}</dd></div>
                </dl>
              </aside>
            </div>
            <motion.button type="button" onClick={() => {
              setSelectedStop(stopForDay[selected.day]);
              const map = document.getElementById("journey-map");
              if (map) window.scrollTo({ top: map.getBoundingClientRect().top + window.scrollY - 80, behavior: "smooth" });
            }} whileTap={{ scale: 0.96 }} className="mt-6 inline-flex min-h-11 items-center gap-2 rounded-full border border-[#526A59]/20 bg-[#F7F3EA] px-4 text-xs font-medium text-[#526A59] transition-colors hover:border-[#526A59]/45 hover:bg-[#E7EFE8]">
              在路线图中定位这一日
              <svg width="13" height="13" viewBox="0 0 14 14" fill="none" aria-hidden="true"><path d="M5 3l4 4-4 4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" /></svg>
            </motion.button>
          </div>
        </motion.article>
      </div>
    </section>
  );
}
