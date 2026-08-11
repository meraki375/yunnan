"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Image from "next/image";
import { hotelsData, photoSpots } from "@/data/tripData";
import { destinationImages, travelImages } from "@/data/travel-images";
import { useLocalStorageState } from "@/hooks/useLocalStorageState";

// ===== Image helpers =====
const getCityAtmosphereImage = (city: string) => {
  const n = city.toLowerCase();
  if (n.includes("大理")) return travelImages.dali.erhai;
  if (n.includes("香格里拉")) return travelImages.shangrila.dukezong;
  if (n.includes("梅里")) return travelImages.meili.feilaiTemple;
  if (n.includes("昆明")) return travelImages.scenery.kunming;
  if (n.includes("玉林")) return travelImages.scenery.yulin;
  if (n.includes("丽江")) return destinationImages.lijiang;
  if (n.includes("百色")) return destinationImages.baise;
  return travelImages.scenery.yunnanMountain;
};

const getPhotoImage = (spotName: string) => {
  const n = spotName.toLowerCase();
  if (n.includes("龙龛")) return travelImages.dali.longkan;
  if (n.includes("日照金山") || n.includes("梅里")) return travelImages.meili.sunrise;
  if (n.includes("喜洲") || n.includes("稻田")) return travelImages.dali.xizhou;
  if (n.includes("松赞林")) return travelImages.shangrila.songzanlin;
  if (n.includes("独克宗")) return travelImages.shangrila.dukezong;
  if (n.includes("纳帕海")) return travelImages.shangrila.napahai;
  if (n.includes("丽江")) return destinationImages.lijiang;
  return travelImages.scenery.yunnanMountain;
};

// ===== Elevated Cities for altitude profile =====
const altitudeCities = [
  { city: "深圳", alt: 10, temp: "30°C", advice: ["短袖", "防晒"] },
  { city: "玉林", alt: 80, temp: "28°C", advice: ["短袖", "防蚊"] },
  { city: "昆明", alt: 1890, temp: "22°C", advice: ["薄外套", "防晒"] },
  { city: "大理", alt: 1970, temp: "23°C", advice: ["薄外套", "墨镜"] },
  { city: "香格里拉", alt: 3300, temp: "15°C", advice: ["保暖外套", "慢走", "抗高反药"] },
  { city: "白马雪山垭口", alt: 4300, temp: "3°C", advice: ["羽绒服", "手套", "氧气瓶"] },
  { city: "飞来寺", alt: 3480, temp: "6°C", advice: ["羽绒服", "保暖内衣", "氧气瓶"] },
  { city: "丽江", alt: 2400, temp: "20°C", advice: ["薄外套", "防晒"] },
  { city: "百色", alt: 130, temp: "27°C", advice: ["短袖", "补水"] },
];

const maxAlt = 4500;

// ===== Main Section =====
export default function HotelSection() {
  const [savedHotels, setSavedHotels] = useLocalStorageState<string[]>("shanhai-yueyue:saved-hotels", []);
  const [activeTab, setActiveTab] = useLocalStorageState<"hotels" | "photos" | "weather">("shanhai-yueyue:intel-tab", "hotels");
  const [expandedHotelIds, setExpandedHotelIds] = useLocalStorageState<string[]>("shanhai-yueyue:expanded-hotel-services", []);
  const [expandedPhotos, setExpandedPhotos] = useState(false);
  const [showSavedOnly, setShowSavedOnly] = useState(false);
  const [savedNotice, setSavedNotice] = useState("");

  const confirmedHotels = hotelsData.filter((h) => h.confirmed);
  const pendingHotels = hotelsData.filter((h) => !h.confirmed);
  const visibleConfirmedHotels = showSavedOnly
    ? confirmedHotels.filter((hotel) => savedHotels.includes(hotel.id))
    : confirmedHotels;

  const toggleSavedHotel = (hotelId: string, hotelName: string) => {
    const wasSaved = savedHotels.includes(hotelId);
    setSavedHotels(wasSaved ? savedHotels.filter((id) => id !== hotelId) : [...savedHotels, hotelId]);
    setSavedNotice(wasSaved ? `已取消收藏：${hotelName}` : `已收藏：${hotelName}`);
  };

  const toggleHotelServices = (hotelId: string) => {
    setExpandedHotelIds((previous) => previous.includes(hotelId)
      ? previous.filter((id) => id !== hotelId)
      : [...previous, hotelId]);
  };

  return (
    <section
      id="travel-intel"
      className="relative py-24 sm:py-32 bg-[#F7F3EA] overflow-hidden"
    >
      {/* Background decorations */}
      <div className="absolute top-0 left-1/3 w-[500px] h-[500px] rounded-full bg-[#526A59]/3 blur-3xl pointer-events-none" />
      <div className="absolute bottom-0 right-1/4 w-[400px] h-[400px] rounded-full bg-[#C66A2B]/4 blur-3xl pointer-events-none" />

      <div className="section-container relative z-10">
        {/* Section header - left aligned for variety */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="section-header mb-16"
        >
          <span className="section-number">03 / INTEL</span>
          <h2 className="section-title">
            旅行<span className="highlight">资料索引</span>
          </h2>
          <p className="section-editorial">
            住宿安排 · 摄影攻略 · 天气海拔，一站式旅行情报
          </p>
          <div className="section-divider" />
        </motion.div>

        {/* ===== Segmented Tab Control ===== */}
        <div className="flex justify-center mb-14">
          <div role="tablist" aria-label="旅行资料分类" className="inline-flex rounded-lg bg-[#E8E4D9] p-1 gap-0.5">
            {([
              { id: "hotels" as const, label: "住宿安排" },
              { id: "photos" as const, label: "摄影攻略" },
              { id: "weather" as const, label: "天气海拔" },
            ]).map((tab) => (
              <motion.button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                type="button"
                id={`intel-tab-${tab.id}`}
                role="tab"
                aria-selected={activeTab === tab.id}
                aria-controls={`intel-panel-${tab.id}`}
                whileTap={{ scale: 0.96 }}
                className={`relative px-5 py-2.5 text-sm font-medium rounded-md transition-all duration-300 ${
                  activeTab === tab.id
                    ? "bg-white text-[#C66A2B] shadow-sm"
                    : "text-[#A8A29E] hover:text-[#334155]"
                }`}
              >
                {activeTab === tab.id && <motion.span layoutId="intel-tab-active" className="absolute inset-0 -z-10 rounded-md bg-white shadow-sm" transition={{ type: "spring", stiffness: 420, damping: 32 }} />}
                {tab.label}
              </motion.button>
            ))}
          </div>
        </div>

        <AnimatePresence mode="wait">
          {/* ===== TAB: Hotels ===== */}
          {activeTab === "hotels" && (
            <motion.div
              key="hotels"
              id="intel-panel-hotels"
              role="tabpanel"
              aria-labelledby="intel-tab-hotels"
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -12 }}
              transition={{ duration: 0.3 }}
            >
              {/* ---- Confirmed Hotels - featured ---- */}
              <div className="mb-10">
                <div className="mb-5 flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
                  <h3 className="flex items-center gap-2 text-sm font-mono uppercase tracking-wider text-[#526A59]">
                    <span className="h-1.5 w-1.5 rounded-full bg-[#526A59]" />
                    已确认住宿
                    <span className="text-[11px] font-normal text-[#A8A29E]">· {confirmedHotels.length} 间</span>
                  </h3>
                  <div className="inline-flex w-fit rounded-full border border-[#526A59]/15 bg-white/65 p-1" aria-label="收藏酒店筛选">
                    <motion.button type="button" onClick={() => setShowSavedOnly(false)} whileTap={{ scale: 0.96 }} aria-pressed={!showSavedOnly} className={`rounded-full px-3 py-1.5 text-[11px] transition-colors ${!showSavedOnly ? "bg-[#526A59] text-white" : "text-[#526A59]"}`}>全部</motion.button>
                    <motion.button type="button" onClick={() => setShowSavedOnly(true)} whileTap={{ scale: 0.96 }} aria-pressed={showSavedOnly} className={`rounded-full px-3 py-1.5 text-[11px] transition-colors ${showSavedOnly ? "bg-[#526A59] text-white" : "text-[#526A59]"}`}>已收藏 {savedHotels.length}</motion.button>
                  </div>
                </div>
                <p aria-live="polite" className="mb-4 min-h-4 text-[11px] text-[#526A59]">{savedNotice}</p>
                <div className="grid sm:grid-cols-2 gap-6">
                  {visibleConfirmedHotels.map((hotel, index) => {
                    const imageForCity = getCityAtmosphereImage(hotel.city);
                    const servicesExpanded = expandedHotelIds.includes(hotel.id);
                    const shownTags = servicesExpanded ? hotel.tags : hotel.tags.slice(0, 6);
                    return (
                      <motion.div
                        key={hotel.id}
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.5, delay: index * 0.08 }}
                        className="magazine-card overflow-hidden group"
                      >
                        {/* Image area */}
                        <div className="relative h-40 overflow-hidden">
                          <Image
                            src={hotel.image || imageForCity.url}
                            alt={hotel.city + "·氛围图"}
                            fill
                            className="object-cover transition-all duration-[800ms] group-hover:scale-105"
                            sizes="(max-width: 768px) 100vw, 400px"
                          />
                          <div className="absolute inset-0 bg-gradient-to-t from-black/30 via-transparent to-transparent" />
                          <div className="absolute top-3 left-3 px-2 py-0.5 rounded-full bg-[#526A59]/80 backdrop-blur-sm text-[10px] text-white font-mono flex items-center gap-1">
                            <span className="w-1 h-1 rounded-full bg-white" />
                            已确认
                          </div>

                          {/* Save button - subdued */}
                          <motion.button
                            onClick={() => toggleSavedHotel(hotel.id, hotel.name)}
                            type="button"
                            aria-pressed={savedHotels.includes(hotel.id)}
                            whileTap={{ scale: 0.82, rotate: -8 }}
                            animate={savedHotels.includes(hotel.id) ? { scale: [1, 1.18, 1] } : { scale: 1 }}
                            transition={{ type: "spring", stiffness: 520, damping: 20 }}
                            className="absolute top-2 right-2 w-11 h-11 rounded-full bg-white/15 backdrop-blur-sm flex items-center justify-center hover:bg-white/30 transition-all"
                            aria-label={
                              savedHotels.includes(hotel.id)
                                ? `取消收藏 ${hotel.name}`
                                : `收藏 ${hotel.name}`
                            }
                          >
                            <svg
                              width="16"
                              height="16"
                              viewBox="0 0 14 14"
                              fill={savedHotels.includes(hotel.id) ? "#C66A2B" : "none"}
                              stroke={savedHotels.includes(hotel.id) ? "#C66A2B" : "white"}
                              strokeWidth="1.5"
                            >
                              <path d="M7 1.5l1.72 3.48 3.84.56-2.78 2.71.66 3.84L7 10.15l-3.44 1.8.66-3.84L1.44 5.54l3.84-.56L7 1.5z" />
                            </svg>
                          </motion.button>

                          <div className="absolute bottom-2.5 left-3 text-[10px] text-white/50 font-mono">
                            {hotel.location}
                          </div>
                          <span className="absolute bottom-2.5 right-3 text-[9px] text-white/70">
                            {hotel.image ? "用户提供的住宿实拍" : "本地旅行参考影像"}
                          </span>
                        </div>

                        {/* Content area */}
                        <div className="p-5">
                          <h4 className="font-bold text-[#102033] text-sm leading-snug mb-0.5">
                            {hotel.name}
                          </h4>
                          {/* Short name subtitle */}
                          <p className="text-xs text-[#A8A29E] mb-3">
                            {hotel.location}
                          </p>

                          {(hotel.price !== "—" || hotel.rating > 0) && (
                            <p className="mb-3 text-[11px] font-medium text-[#A64D18]">
                              {hotel.price !== "—" ? hotel.price : "价格待补充"}
                              {hotel.rating > 0 && <span className="ml-2 text-[#526A59]">★ {hotel.rating}</span>}
                            </p>
                          )}

                          {/* Tags */}
                          <div className="flex flex-wrap gap-1.5 mb-3">
                            {shownTags.map((tag: string, i: number) => (
                              <span
                                key={i}
                                className="text-[10px] px-2 py-0.5 rounded-full bg-[#F7F3EA] text-[#526A59] font-medium border border-[#526A59]/8"
                              >
                                {tag}
                              </span>
                            ))}
                          </div>
                          {hotel.tags.length > 6 && (
                            <motion.button type="button" onClick={() => toggleHotelServices(hotel.id)} whileTap={{ scale: 0.96 }} aria-expanded={servicesExpanded} className="mt-1 text-[11px] font-medium text-[#A64D18] underline decoration-[#C66A2B]/35 underline-offset-4">
                              {servicesExpanded ? "收起服务" : `查看全部 ${hotel.tags.length} 项服务`}
                            </motion.button>
                          )}

                          {/* Reasons - editorial short list */}
                          {hotel.reason && hotel.reason.length > 0 && (
                            <div className="space-y-1.5">
                              <p className="text-[10px] font-mono uppercase tracking-wider text-[#A8A29E] mb-1.5">
                                编辑注释
                              </p>
                              <ul className="space-y-1">
                                {hotel.reason.slice(0, 3).map((r: string, i: number) => (
                                  <li
                                    key={i}
                                    className="text-[11px] text-[#334155] flex items-start gap-2"
                                  >
                                    <span className="text-[#C66A2B] mt-0.5">·</span>
                                    <span>{r}</span>
                                  </li>
                                ))}
                              </ul>
                            </div>
                          )}
                        </div>
                      </motion.div>
                    );
                  })}
                </div>
                {showSavedOnly && visibleConfirmedHotels.length === 0 && (
                  <div className="rounded-xl border border-dashed border-[#526A59]/25 bg-white/60 px-5 py-8 text-center">
                    <p className="text-sm font-medium text-[#334155]">还没有收藏的住宿</p>
                    <p className="mt-1 text-xs text-[#526A59]">点击酒店图片右上角的星标，稍后可在这里集中查看。</p>
                    <motion.button type="button" onClick={() => setShowSavedOnly(false)} whileTap={{ scale: 0.96 }} className="mt-4 rounded-full border border-[#526A59]/20 px-3 py-1.5 text-[11px] text-[#526A59]">查看全部住宿</motion.button>
                  </div>
                )}
              </div>

              {/* ---- Pending Hotels - light list ---- */}
              <div>
                <h3 className="text-sm font-mono uppercase tracking-wider text-[#A8A29E] mb-4 flex items-center gap-2">
                  <span className="w-1.5 h-1.5 rounded-full border border-dashed border-[#A8A29E]" />
                  待确定住宿
                  <span className="text-[#A8A29E] text-[11px] font-normal">
                    · {pendingHotels.length} 间
                  </span>
                </h3>
                <div className="space-y-2">
                  {pendingHotels.map((hotel, index) => (
                    <motion.div
                      key={hotel.id}
                      initial={{ opacity: 0, y: 10 }}
                      whileInView={{ opacity: 1, y: 0 }}
                      viewport={{ once: true }}
                      transition={{ duration: 0.3, delay: index * 0.05 }}
                      className="flex items-center gap-4 px-4 py-3 rounded-lg border border-dashed border-[#A8A29E]/20 bg-white/50"
                    >
                      <div className="w-8 h-8 rounded-full border border-dashed border-[#A8A29E]/30 flex items-center justify-center flex-shrink-0">
                        <svg width="12" height="12" viewBox="0 0 14 14" fill="none" className="text-[#A8A29E]">
                          <rect x="1" y="2" width="12" height="10" rx="1.5" stroke="currentColor" strokeWidth="1.2" />
                          <path d="M1 5h12" stroke="currentColor" strokeWidth="1.2" />
                        </svg>
                      </div>
                      <div className="flex-1 min-w-0">
                        <p className="text-sm text-[#334155] font-medium">{hotel.city}</p>
                        <p className="text-[11px] text-[#A8A29E]">{hotel.location} · 住宿待补充</p>
                      </div>
                    </motion.div>
                  ))}
                </div>
              </div>
            </motion.div>
          )}

          {/* ===== TAB: Photos ===== */}
          {activeTab === "photos" && (
            <motion.div
              key="photos"
              id="intel-panel-photos"
              role="tabpanel"
              aria-labelledby="intel-tab-photos"
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -12 }}
              transition={{ duration: 0.3 }}
            >
              <div className="max-w-4xl mx-auto space-y-6">
                {photoSpots.slice(0, expandedPhotos ? photoSpots.length : 3).map((spot, index) => (
                  <motion.div
                    key={spot.id}
                    initial={{ opacity: 0, y: 16 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.4, delay: index * 0.06 }}
                    className="magazine-card overflow-hidden group flex flex-col sm:flex-row"
                  >
                    {/* Left: Image thumbnail */}
                    <div className="relative w-full sm:w-48 h-48 sm:h-auto flex-shrink-0 overflow-hidden">
                      <Image
                        src={spot.image || getPhotoImage(spot.name).url}
                        alt={spot.name}
                        fill
                        className="object-cover transition-all duration-[800ms] group-hover:scale-105"
                        sizes="(max-width: 768px) 100vw, 200px"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t sm:bg-gradient-to-r from-black/30 via-transparent to-transparent" />
                    </div>

                    {/* Right: Content */}
                    <div className="p-5 flex-1 min-w-0">
                      <div className="flex items-start justify-between mb-2">
                        <h4 className="font-bold text-[#102033] text-sm">
                          {spot.name}
                        </h4>
                        {/* Photo tags instead of rating */}
                        <div className="flex gap-1.5 flex-shrink-0 ml-2">
                          {spot.name.includes("日出") && (
                            <span className="text-[9px] px-1.5 py-0.5 rounded bg-[#C66A2B]/10 text-[#C66A2B] font-mono">日出</span>
                          )}
                          {(spot.lens.includes("200") || spot.lens.includes("400")) && (
                            <span className="text-[9px] px-1.5 py-0.5 rounded bg-[#526A59]/10 text-[#526A59] font-mono">长焦</span>
                          )}
                          <span className="text-[9px] px-1.5 py-0.5 rounded bg-[#A8A29E]/10 text-[#A8A29E] font-mono">{spot.bestTime}</span>
                        </div>
                      </div>
                      <p className="text-xs text-[#334155] leading-relaxed mb-3">
                        {spot.description}
                      </p>
                      <div className="flex items-center gap-1.5 text-[10px] text-[#A8A29E] mb-3">
                        <span>📷 {spot.lens}</span>
                        <span className="h-3 w-px bg-[#A8A29E]/30" />
                        <span>{spot.image.includes("/hotels/") ? "用户提供实拍" : "旅行参考影像 · 本地存档"}</span>
                      </div>
                      <div className="flex flex-wrap gap-1.5">
                        {spot.tips.slice(0, 2).map((tip, i) => (
                          <span
                            key={i}
                            className="text-[10px] px-2 py-0.5 rounded-full bg-[#F7F3EA] border border-[#A8A29E]/10 text-[#334155]"
                          >
                            {tip}
                          </span>
                        ))}
                      </div>
                    </div>
                  </motion.div>
                ))}
              </div>

              {/* Expand toggle */}
              {photoSpots.length > 3 && (
                <div className="text-center mt-6">
                  <motion.button
                    onClick={() => setExpandedPhotos(!expandedPhotos)}
                    whileTap={{ scale: 0.96 }}
                    className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full border border-[#A8A29E]/20 text-xs text-[#A8A29E] hover:text-[#526A59] hover:border-[#526A59]/30 transition-all"
                  >
                    {expandedPhotos ? "收起" : `查看全部 ${photoSpots.length} 个拍摄点`}
                    <svg
                      width="10"
                      height="10"
                      viewBox="0 0 10 10"
                      fill="none"
                      className={`transition-transform ${expandedPhotos ? "rotate-180" : ""}`}
                    >
                      <path d="M2 3.5l3 3 3-3" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
                    </svg>
                  </motion.button>
                </div>
              )}
            </motion.div>
          )}

          {/* ===== TAB: Weather / Altitude ===== */}
          {activeTab === "weather" && (
            <motion.div
              key="weather"
              id="intel-panel-weather"
              role="tabpanel"
              aria-labelledby="intel-tab-weather"
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -12 }}
              transition={{ duration: 0.3 }}
            >
              {/* ===== Altitude Profile Line ===== */}
              <div className="max-w-4xl mx-auto mb-16">
                <h3 className="text-[11px] font-mono uppercase tracking-wider text-[#A8A29E] mb-6 text-center">
                  海拔剖面 — 深圳至梅里
                </h3>
                <div className="relative h-32 bg-white rounded-xl border border-[#A8A29E]/10 p-3">
                  <svg
                    viewBox="0 0 1000 120"
                    className="w-full h-full"
                    preserveAspectRatio="none"
                  >
                    {/* Grid lines */}
                    {[0, 1000, 2000, 3000].map((alt) => {
                      const y = 115 - (alt / maxAlt) * 100;
                      return (
                        <g key={alt}>
                          <line
                            x1="0"
                            y1={y}
                            x2="1000"
                            y2={y}
                            stroke="#E8E4D9"
                            strokeWidth="0.5"
                            strokeDasharray="4,4"
                          />
                          <text
                            x="5"
                            y={y + 3}
                            fontSize="7"
                            fill="#A8A29E"
                            fontFamily="monospace"
                          >
                            {alt}m
                          </text>
                        </g>
                      );
                    })}

                    {/* Area under curve */}
                    <defs>
                      <linearGradient id="altGradient" x1="0" y1="0" x2="0" y2="1">
                        <stop offset="0%" stopColor="#C66A2B" stopOpacity="0.3" />
                        <stop offset="100%" stopColor="#C66A2B" stopOpacity="0.02" />
                      </linearGradient>
                    </defs>

                    {/* Profile path */}
                    <path
                      d={altitudeCities
                        .map((c, i) => {
                          const x = (i / (altitudeCities.length - 1)) * 950 + 25;
                          const y = 115 - (c.alt / maxAlt) * 100;
                          return `${i === 0 ? "M" : "L"}${x},${y}`;
                        })
                        .join(" ")}
                      fill="none"
                      stroke="#C66A2B"
                      strokeWidth="2"
                    />
                    <path
                      d={
                        altitudeCities
                          .map((c, i) => {
                            const x = (i / (altitudeCities.length - 1)) * 950 + 25;
                            const y = 115 - (c.alt / maxAlt) * 100;
                            return `${i === 0 ? "M" : "L"}${x},${y}`;
                          })
                          .join(" ") +
                        `L${(altitudeCities.length - 1) / (altitudeCities.length - 1) * 950 + 25},115 L25,115 Z`
                      }
                      fill="url(#altGradient)"
                    />

                    {/* City dots and labels */}
                    {altitudeCities.map((c, i) => {
                      const x = (i / (altitudeCities.length - 1)) * 950 + 25;
                      const y = 115 - (c.alt / maxAlt) * 100;
                      const isHigh = c.alt > 3000;
                      const isLow = c.alt < 100;
                      return (
                        <g key={c.city}>
                          <circle
                            cx={x}
                            cy={y}
                            r={isHigh ? 5 : isLow ? 3 : 4}
                            fill={isHigh ? "#A63D40" : isLow ? "#A8A29E" : "#C66A2B"}
                            stroke="white"
                            strokeWidth="1.5"
                          />
                          <text
                            x={x}
                            y={y - (isHigh ? 10 : 8)}
                            textAnchor="middle"
                            fontSize={isHigh ? "8" : "7"}
                            fill={isHigh ? "#A63D40" : isLow ? "#A8A29E" : "#334155"}
                            fontWeight={isHigh ? "600" : "400"}
                            fontFamily="system-ui"
                          >
                            {c.city}
                          </text>
                          <text
                            x={x}
                            y={y - (isHigh ? 20 : 16)}
                            textAnchor="middle"
                            fontSize="6"
                            fill="#A8A29E"
                            fontFamily="monospace"
                          >
                            {c.alt}m
                          </text>
                        </g>
                      );
                    })}
                  </svg>

                  {/* Altitude warning for high points */}
                  <div className="absolute -bottom-6 left-1/2 -translate-x-1/2 flex gap-4 text-[10px] font-mono">
                    <span className="text-[#A63D40]">▲ 4300m 白马雪山垭口</span>
                    <span className="text-[#A8A29E]">— 注意高反 —</span>
                  </div>
                </div>
              </div>

              {/* ===== City Cards - compact ===== */}
              <div className="max-w-5xl mx-auto grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
                {altitudeCities.map((city, index) => {
                  const altitudeNum = city.alt;
                  const isHigh = altitudeNum > 3000;
                  const isLow = altitudeNum < 100;
                  const color = isHigh ? "#A63D40" : altitudeNum > 1000 ? "#C66A2B" : "#A8A29E";

                  return (
                    <motion.div
                      key={city.city}
                      initial={{ opacity: 0, y: 16 }}
                      whileInView={{ opacity: 1, y: 0 }}
                      viewport={{ once: true }}
                      transition={{ duration: 0.4, delay: index * 0.05 }}
                      className={`magazine-card overflow-hidden ${
                        isLow ? "opacity-60" : ""
                      }`}
                    >
                      <div className="p-4">
                        <div className="flex items-center justify-between mb-3">
                          <div className="flex items-center gap-2.5">
                            <div
                              className="w-8 h-8 rounded-full flex items-center justify-center text-xs font-bold"
                              style={{
                                background: `${color}12`,
                                color: color,
                              }}
                            >
                              {city.alt}m
                            </div>
                            <div>
                              <h4
                                className="text-sm font-bold"
                                style={{ color: isHigh ? "#A63D40" : "#102033" }}
                              >
                                {city.city}
                              </h4>
                            </div>
                          </div>
                          <div className="text-right">
                            <div className="text-xs font-bold text-[#102033]">
                              {city.temp}
                            </div>
                            <div className="text-[9px] text-[#A8A29E]">
                              预计温度
                            </div>
                          </div>
                        </div>

                        {/* Advice chips */}
                        <div className="flex flex-wrap gap-1">
                          {city.advice.slice(0, 3).map((a, i) => (
                            <span
                              key={i}
                              className="text-[9px] px-1.5 py-0.5 rounded-full bg-[#F7F3EA] border border-[#A8A29E]/10 text-[#334155]"
                            >
                              {a}
                            </span>
                          ))}
                        </div>

                        {/* High altitude warning on the route between cities */}
                      </div>
                    </motion.div>
                  );
                })}
              </div>

              {/* Altitude hazard notice - placed between Shangri-La and Meili */}
              <motion.div
                initial={{ opacity: 0, y: 12 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4, delay: 0.3 }}
                className="max-w-xl mx-auto mt-10 p-4 rounded-xl border border-[#A63D40]/12 bg-[#A63D40]/4 text-center"
              >
                <div className="flex items-center justify-center gap-2 text-xs font-medium text-[#A63D40] mb-1">
                  <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
                    <path d="M7 5v3M7 11v.01" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
                    <circle cx="7" cy="7" r="6" stroke="currentColor" strokeWidth="1.5" />
                  </svg>
                  高原提示
                </div>
                <p className="text-[11px] text-[#334155] leading-relaxed">
                  香格里拉（3300m）至白马雪山垭口（约4300m）路段海拔攀升显著，
                  建议在此段行程中：<br />
                  ① 选择供氧房住宿 · ② 抵达后24小时内避免洗澡
                  ③ 随身携带便携氧气瓶 · ④ 放缓步行节奏
                </p>
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </section>
  );
}
