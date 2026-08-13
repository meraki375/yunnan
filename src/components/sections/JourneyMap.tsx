"use client";

import { useMemo } from "react";
import Image from "next/image";
import { motion } from "framer-motion";
import { destinations } from "@/data/tripData";
import { destinationImages } from "@/data/travel-images";
import { useLocalStorageState } from "@/hooks/useLocalStorageState";
import { getHotelsForReturnPlan, getRouteDistanceForReturnPlan, getTripDaysForReturnPlan, RETURN_PLAN_STORAGE_KEY, type ReturnPlan } from "@/data/returnPlan";
import RouteContingencyPanel from "./RouteContingencyPanel";

const stopDays: Record<string, string> = {
  shenzhen: "Day 1", yulin: "Day 1", kunming: "Day 2", dali: "Day 3",
  shangrila: "Day 6", meili: "Day 9", lijiang: "Day 10",
};

const outboundLegs = [
  { days: "D1", route: "深圳 → 玉林", distance: "460 km · 6–7 h", note: "中秋回家团圆" },
  { days: "D2", route: "玉林 → 昆明", distance: "850 km · 10–11 h", note: "百色午餐 · 酒店已订 · 夜市一晚" },
  { days: "D3–5", route: "昆明 → 大理", distance: "330 km · 3.5–4.5 h", note: "三晚已订 · 婚纱照" },
  { days: "D6–8", route: "大理 → 香格里拉", distance: "180 km · 3.5–4.5 h", note: "三晚均已确认" },
];

const mainDetourLeg = { days: "D9", route: "香格里拉 → 飞来寺", distance: "180 km · 4–5 h", note: "飞来寺车宿 1 晚 · 日照金山" };

const mainReturnLegs = [
  { days: "D10", route: "飞来寺 → 丽江", distance: "340 km · 6–7 h" },
  { days: "D11", route: "丽江 → 昆明", distance: "约520 km · 6–7 h" },
  { days: "D12", route: "昆明 → 南宁", distance: "约800 km · 9–10 h" },
  { days: "D13", route: "南宁 → 深圳", distance: "约720 km · 8–9 h" },
];

const weatherReturnLegs = [
  { days: "D9", route: "香格里拉 → 丽江", distance: "180 km · 3.5–4.5 h" },
  { days: "D10", route: "丽江 → 昆明", distance: "约520 km · 6–7 h" },
  { days: "D11", route: "昆明 → 南宁", distance: "约800 km · 9–10 h" },
  { days: "D12", route: "南宁休整", distance: "连住第 2 晚 · 补给休息" },
  { days: "D13", route: "南宁 → 深圳", distance: "约720 km · 8–9 h" },
];

const mapStops = [
  { x: 1280, y: 760, name: "深圳", day: "D1 / D13", anchor: "end" },
  { x: 1060, y: 750, name: "玉林", day: "D1", anchor: "middle" },
  { x: 690, y: 550, name: "昆明", day: "D2 / D11", anchor: "middle" },
  { x: 500, y: 450, name: "大理", day: "D3–5", anchor: "end" },
  { x: 400, y: 260, name: "香格里拉", day: "D6–8", anchor: "start" },
  { x: 300, y: 130, name: "飞来寺", day: "D9 · 车宿", anchor: "middle" },
  { x: 650, y: 310, name: "丽江", day: "D10", anchor: "start" },
  { x: 1050, y: 700, name: "南宁", day: "D12", anchor: "middle" },
];

const weatherMapStops = [
  { x: 1280, y: 760, name: "深圳", day: "D1 / D13", anchor: "end" },
  { x: 1060, y: 750, name: "玉林", day: "D1", anchor: "middle" },
  { x: 690, y: 550, name: "昆明", day: "D2 / D10", anchor: "middle" },
  { x: 500, y: 450, name: "大理", day: "D3–5", anchor: "end" },
  { x: 400, y: 260, name: "香格里拉", day: "D6–8", anchor: "start" },
  { x: 650, y: 310, name: "丽江", day: "D9", anchor: "start" },
  { x: 1050, y: 700, name: "南宁", day: "D11–12", anchor: "middle" },
];

const nanningStop = {
  id: "nanning", name: "南宁", subtitle: "返程休整", description: "主线在南宁住一晚；天气备选则连住两晚，用一天落脚、一天补给，让最后一程更从容。", duration: "1–2晚", theme: "分段返程", coordinates: { x: 0, y: 0 }, icon: "", recommendations: ["补给", "休整日", "待订住宿"], images: [],
};

const isSameCity = (city: string, destinationId: string, destinationName: string) =>
  destinationId === "meili" ? city === "梅里雪山" : city === destinationName;

export default function JourneyMap() {
  const [selectedId, setSelectedId] = useLocalStorageState("shanhai-yueyue:selected-stop", "dali");
  const [returnPlan] = useLocalStorageState<ReturnPlan>(RETURN_PLAN_STORAGE_KEY, "main");
  const activeTripDays = getTripDaysForReturnPlan(returnPlan);
  const routeDistance = getRouteDistanceForReturnPlan(returnPlan);
  const activeHotels = getHotelsForReturnPlan(returnPlan);
  const visibleDestinations = useMemo(
    () => [...destinations.filter((item) => item.id !== "baise" && (returnPlan === "main" || item.id !== "meili")), nanningStop],
    [returnPlan],
  );
  const selectedStopDays: Record<string, string> = returnPlan === "weather"
    ? { ...stopDays, lijiang: "Day 9", kunming: "Day 10", nanning: "Day 11", shenzhen: "Day 13" }
    : { ...stopDays, lijiang: "Day 10", kunming: "Day 11", nanning: "Day 12", shenzhen: "Day 13" };
  const destination = useMemo(
    () => visibleDestinations.find((item) => item.id === selectedId) ?? visibleDestinations[0],
    [selectedId, visibleDestinations],
  );
  const day = activeTripDays.find((item) => item.day === selectedStopDays[destination.id]);
  const image = destinationImages[destination.id];
  const stays = useMemo(
    () => activeHotels.filter((hotel) => isSameCity(hotel.city, destination.id, destination.name)),
    [activeHotels, destination],
  );
  const currentOutboundLegs = returnPlan === "weather" ? outboundLegs : [...outboundLegs, mainDetourLeg];
  const currentReturnLegs = returnPlan === "weather" ? weatherReturnLegs : mainReturnLegs;
  const currentMapStops = returnPlan === "weather" ? weatherMapStops : mapStops;

  return (
    <section id="journey-map" className="relative overflow-hidden bg-[#F7F3EA]">
      <div className="section-container relative z-10">
        <motion.div initial={{ opacity: 0, y: 18 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true, amount: 0.25 }} transition={{ duration: 0.55 }} className="max-w-2xl">
          <span className="section-number">01 / ROADBOOK</span>
          <h2 className="section-title text-left">这一路，<span className="highlight">绕山海归来</span></h2>
          <p className="mt-4 text-sm leading-7 text-[#526A59]">{returnPlan === "weather" ? "已启用天气备选：香格里拉之后不去飞来寺，改走丽江、昆明，在南宁连住两晚后直接回深圳。" : "主线在飞来寺车宿一晚等待日照金山；随后经丽江、昆明、南宁，回到深圳。"}</p>
        </motion.div>

        <motion.figure initial={{ opacity: 0, y: 18 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true, amount: 0.18 }} transition={{ duration: 0.55, delay: 0.08 }} className="mt-10 overflow-hidden rounded-2xl border border-[#102033]/10 bg-white shadow-[0_20px_55px_rgba(16,32,51,0.08)]">
          <div className="relative aspect-[1.25] overflow-hidden sm:aspect-[1.55] lg:aspect-[2.15]">
            <Image src="/images/route-loop-map.png" alt="深圳经玉林、云南、丽江、昆明、南宁后返回深圳的十三日自驾环线地图" fill sizes="(max-width: 1023px) 100vw, 1200px" className="object-cover" />
            <div className="absolute inset-0 bg-[linear-gradient(90deg,rgba(247,243,234,0.04),rgba(247,243,234,0.18))]" />
            <div className="absolute inset-x-0 top-0 flex items-center justify-between bg-gradient-to-b from-[#102033]/48 to-transparent px-5 py-4 text-[10px] font-mono tracking-[0.15em] text-white sm:px-7">
              <span>山海赴约 / 13 DAY LOOP</span><span>{routeDistance} KM · 09.25 — 10.07</span>
            </div>
            <svg viewBox="0 0 1672 941" role="img" aria-label={returnPlan === "weather" ? "天气备选的深圳云南自驾路线" : "飞来寺车宿主线的深圳云南自驾路线"} className="absolute inset-0 h-full w-full">
              <defs>
                <filter id="softRouteGlow" x="-20%" y="-30%" width="140%" height="160%"><feGaussianBlur stdDeviation="5" result="blur" /><feMerge><feMergeNode in="blur" /><feMergeNode in="SourceGraphic" /></feMerge></filter>
              </defs>
              <path d="M1280 760 C1208 748 1132 744 1060 750" fill="none" stroke="#C66A2B" strokeWidth="10" strokeLinecap="round" filter="url(#softRouteGlow)" />
              <path d="M1060 750 C930 720 785 635 690 550" fill="none" stroke="#C66A2B" strokeWidth="10" strokeLinecap="round" filter="url(#softRouteGlow)" />
              <path d={returnPlan === "weather" ? "M690 550 C610 515 550 485 500 450 S442 322 400 260" : "M690 550 C610 515 550 485 500 450 S442 322 400 260 S340 185 300 130"} fill="none" stroke="#C66A2B" strokeWidth="10" strokeLinecap="round" filter="url(#softRouteGlow)" />
              <path d={returnPlan === "weather" ? "M400 260 C470 278 565 294 650 310 S670 450 690 550 S940 670 1050 700 S1180 740 1280 760" : "M300 130 C390 208 535 270 650 310 S670 450 690 550 S940 670 1050 700 S1180 740 1280 760"} fill="none" stroke="#607E6C" strokeWidth="10" strokeLinecap="round" filter="url(#softRouteGlow)" />
              {currentMapStops.map((stop, index) => {
                const outbound = returnPlan === "weather" ? index < 5 : index < 6;
                return (
                  <g key={stop.name}>
                    <circle cx={stop.x} cy={stop.y} r="14" fill={outbound ? "#C66A2B" : "#607E6C"} stroke="#FFFDF8" strokeWidth="6" />
                    <text x={stop.x} y={stop.y - 25} textAnchor={stop.anchor as "start" | "middle" | "end"} fill="#102033" fontSize="25" fontWeight="700" style={{ paintOrder: "stroke", stroke: "#FFFDF8", strokeWidth: 6, strokeLinejoin: "round" }}>{stop.name}</text>
                    <text x={stop.x} y={stop.y + 38} textAnchor={stop.anchor as "start" | "middle" | "end"} fill="#526A59" fontSize="16" fontFamily="monospace" style={{ paintOrder: "stroke", stroke: "#FFFDF8", strokeWidth: 5, strokeLinejoin: "round" }}>{stop.day}</text>
                  </g>
                );
              })}
            </svg>
            <div className="absolute bottom-4 left-4 flex flex-wrap gap-2 sm:bottom-6 sm:left-6">
              <span className="rounded-full border border-[#C66A2B]/25 bg-[#FFFDF8]/90 px-3 py-1.5 text-[10px] font-medium text-[#102033] shadow-sm"><i className="mr-1.5 inline-block h-1.5 w-1.5 rounded-full bg-[#C66A2B]" />去程</span>
              <span className="rounded-full border border-[#607E6C]/25 bg-[#FFFDF8]/90 px-3 py-1.5 text-[10px] font-medium text-[#102033] shadow-sm"><i className="mr-1.5 inline-block h-1.5 w-1.5 rounded-full bg-[#607E6C]" />返程</span>
              <span className="rounded-full border border-[#102033]/10 bg-[#FFFDF8]/90 px-3 py-1.5 text-[10px] font-medium text-[#526A59] shadow-sm">{returnPlan === "weather" ? "南宁连住 2 晚" : "飞来寺车宿 1 晚"}</span>
            </div>
          </div>

          <figcaption className="grid border-t border-[#102033]/10 md:grid-cols-[1.22fr_0.78fr_0.85fr]">
            <div className="border-b border-[#102033]/10 p-5 md:border-b-0 md:border-r sm:p-6">
              <p className="font-mono text-[10px] tracking-[0.15em] text-[#C66A2B]">去程 / OUTBOUND · DAY 01—{returnPlan === "weather" ? "08" : "09"}</p>
              <div className="mt-3 grid gap-x-5 gap-y-2 sm:grid-cols-2">
                {currentOutboundLegs.map((leg) => <div key={leg.days} className="grid grid-cols-[2.8rem_minmax(0,1fr)] gap-2 text-[11px] leading-5"><span className="whitespace-nowrap font-mono text-[#C66A2B]">{leg.days}</span><p className="min-w-0"><b className="text-[#102033]">{leg.route}</b><span className="text-[#526A59]"> · {leg.distance}</span></p></div>)}
              </div>
            </div>
            <div className="border-b border-[#102033]/10 p-5 md:border-b-0 md:border-r sm:p-6">
              <p className="font-mono text-[10px] tracking-[0.15em] text-[#607E6C]">返程 / RETURN · DAY {returnPlan === "weather" ? "09—13" : "10—13"}</p>
              <div className="mt-3 space-y-2">
                {currentReturnLegs.map((leg) => <div key={leg.days} className="grid grid-cols-[2.8rem_minmax(0,1fr)] gap-2 text-[11px] leading-5"><span className="whitespace-nowrap font-mono text-[#607E6C]">{leg.days}</span><p className="min-w-0"><b className="text-[#102033]">{leg.route}</b><span className="text-[#526A59]"> · {leg.distance}</span></p></div>)}
              </div>
            </div>
            <div className="bg-[#FBFAF6] p-5 sm:p-6">
              <p className="font-mono text-[10px] tracking-[0.15em] text-[#526A59]">住宿进度 / STAYS</p>
              <p className="mt-3 text-sm font-semibold text-[#102033]">玉林家中 · 昆明1晚 · 大理3晚 · 香格里拉3晚</p>
              <p className="mt-2 text-[11px] leading-5 text-[#526A59]">{returnPlan === "weather" ? "已确认 5 项；丽江、昆明各待订 1 晚，南宁待订 2 晚；飞来寺不再预订。" : "已确认 6 项（含飞来寺车宿）；丽江、昆明、南宁各待订 1 晚。"}</p>
            </div>
          </figcaption>
        </motion.figure>

        <RouteContingencyPanel />

        <div className="mt-12 grid gap-8 lg:grid-cols-[0.78fr_1.22fr] lg:items-start lg:gap-12">
          <div role="tablist" aria-label="路线停靠站" className="grid grid-cols-2 gap-2 sm:grid-cols-4 lg:grid-cols-1">
            {visibleDestinations.map((item, index) => {
              const active = item.id === selectedId;
              return <motion.button key={item.id} id={`route-tab-${item.id}`} role="tab" type="button" aria-selected={active} aria-controls="route-detail" onClick={() => setSelectedId(item.id)} whileHover={{ x: 3 }} whileTap={{ scale: 0.98 }} transition={{ type: "spring", stiffness: 420, damping: 30 }} className={`relative min-h-14 overflow-hidden rounded-xl border px-4 py-3 text-left transition-colors ${active ? "border-[#C66A2B]/45 bg-[#C66A2B]/10 text-[#102033]" : "border-[#102033]/8 bg-white/70 text-[#526A59] hover:border-[#526A59]/25 hover:bg-white"}`}>
                {active && <motion.span layoutId="active-route-mark" className="absolute bottom-0 left-0 top-0 w-1 bg-[#C66A2B]" transition={{ type: "spring", stiffness: 420, damping: 30 }} />}
                <span className="mr-2 font-mono text-[10px] text-[#C66A2B]">{String(index + 1).padStart(2, "0")}</span><span className="font-medium">{item.name}</span><span className="mt-1 block text-[11px] text-[#A8A29E]">{item.subtitle}</span>
              </motion.button>;
            })}
          </div>

          <motion.article key={destination.id} id="route-detail" role="tabpanel" aria-labelledby={`route-tab-${destination.id}`} initial={{ opacity: 0, y: 10, scale: 0.99 }} animate={{ opacity: 1, y: 0, scale: 1 }} transition={{ type: "spring", stiffness: 360, damping: 32 }} className="self-start overflow-hidden rounded-2xl border border-[#102033]/10 bg-white shadow-[0_18px_48px_rgba(16,32,51,0.09)]">
            <div className="grid">
              <div className="relative h-[260px] sm:h-[340px] lg:h-[390px]">
                <Image src={image.url} alt={image.title} fill sizes="(max-width: 1023px) 100vw, 62vw" className="object-cover" style={{ objectPosition: destination.id === "meili" ? "center 48%" : "center" }} />
                <div className="absolute inset-0 bg-gradient-to-t from-[#102033]/70 via-[#102033]/5 to-transparent" />
                <p className="absolute bottom-5 left-5 font-mono text-[10px] tracking-[0.16em] text-white/80">STOP {String(destination.id === "nanning" ? 9 : destinations.findIndex((item) => item.id === destination.id) + 1).padStart(2, "0")}</p>
              </div>
              <div className="p-6 sm:p-8">
                <div className="flex items-start justify-between gap-4">
                  <div><p className="font-mono text-[10px] tracking-[0.18em] text-[#C66A2B]">{destination.theme.toUpperCase()}</p><h3 className="mt-2 font-serif text-3xl text-[#102033]">{destination.name}</h3></div>
                  {day && <span className="rounded-full bg-[#C66A2B]/10 px-3 py-1 text-[10px] font-medium text-[#A64D18]">{day.date}</span>}
                </div>
                <p className="mt-4 text-sm leading-7 text-[#526A59]">{destination.description}</p>
                {day && <div className="mt-5 grid grid-cols-3 border-y border-[#102033]/10 py-4 text-center"><div><b className="block text-sm text-[#102033]">{day.distance}</b><span className="text-[10px] text-[#A8A29E]">驾驶距离</span></div><div className="border-x border-[#102033]/10"><b className="block text-sm text-[#102033]">{day.duration}</b><span className="text-[10px] text-[#A8A29E]">预计用时</span></div><div><b className="block text-sm text-[#102033]">{day.weather.altitude}</b><span className="text-[10px] text-[#A8A29E]">所在海拔</span></div></div>}
                <div className="mt-5 grid gap-4 sm:grid-cols-[0.72fr_1.28fr]">
                  <div><p className="font-mono text-[10px] tracking-[0.14em] text-[#A8A29E]">本段重点</p><div className="mt-2 flex flex-wrap gap-1.5">{destination.recommendations.map((tip) => <span key={tip} className="rounded-full bg-[#F7F3EA] px-2.5 py-1 text-[10px] text-[#526A59]">{tip}</span>)}</div>{day && <p className="mt-3 text-[11px] leading-5 text-[#526A59]">{day.schedule.slice(0, 2).map((item) => `${item.time} ${item.activity}`).join(" · ")}</p>}</div>
                  <div><p className="font-mono text-[10px] tracking-[0.14em] text-[#A8A29E]">住宿与服务</p>{stays.length ? <div className="mt-2 space-y-2">{stays.map((stay) => <div key={stay.id} className="rounded-xl border border-[#102033]/10 bg-[#FBFAF6] p-3"><div className="flex flex-wrap items-center justify-between gap-2"><p className="text-[11px] font-semibold leading-5 text-[#102033]">{stay.name}</p><span className={`rounded-full px-2 py-0.5 text-[9px] ${stay.confirmed ? "bg-[#607E6C]/12 text-[#466151]" : "bg-[#C66A2B]/10 text-[#A64D18]"}`}>{stay.confirmed ? `已确认 ${stay.price}` : "待预订"}</span></div><p className="mt-1 text-[10px] text-[#526A59]">{stay.location}</p><div className="mt-2 flex flex-wrap gap-1">{stay.tags.map((tag) => <span key={tag} className="rounded-md bg-white px-1.5 py-0.5 text-[9px] text-[#526A59] ring-1 ring-[#102033]/[0.06]">{tag}</span>)}</div>{stay.reason.length > 0 && <ul className="mt-2 space-y-1 border-t border-[#102033]/[0.06] pt-2">{stay.reason.map((note) => <li key={note} className="text-[10px] leading-4 text-[#526A59]">· {note}</li>)}</ul>}</div>)}</div> : <p className="mt-2 rounded-xl bg-[#FBFAF6] p-3 text-[11px] leading-5 text-[#526A59]">当前没有住宿安排；此站仅作为出发与归来节点。</p>}</div>
                </div>
              </div>
            </div>
          </motion.article>
        </div>
      </div>
    </section>
  );
}
