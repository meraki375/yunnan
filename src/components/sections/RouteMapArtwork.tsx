import Image from "next/image";
import type { ReturnPlan } from "@/data/returnPlan";

type RouteMapArtworkProps = {
  plan: ReturnPlan;
  routeDistance: number;
};

const routeStops = {
  main: [
    { name: "深圳", day: "D1 / D13", x: 88, y: 76, tone: "outbound" },
    { name: "玉林", day: "D1", x: 69, y: 74, tone: "outbound" },
    { name: "昆明", day: "D2 / D11", x: 42, y: 59, tone: "outbound" },
    { name: "大理", day: "D3–5", x: 29, y: 47, tone: "outbound" },
    { name: "香格里拉", day: "D6–8", x: 24, y: 24, tone: "outbound" },
    { name: "飞来寺", day: "D9 · 车宿", x: 13, y: 12, tone: "outbound" },
    { name: "丽江", day: "D10", x: 39, y: 31, tone: "return" },
    { name: "南宁", day: "D12", x: 67, y: 69, tone: "return" },
  ],
  weather: [
    { name: "深圳", day: "D1 / D13", x: 88, y: 76, tone: "outbound" },
    { name: "玉林", day: "D1", x: 69, y: 74, tone: "outbound" },
    { name: "昆明", day: "D2 / D10", x: 42, y: 59, tone: "outbound" },
    { name: "大理", day: "D3–5", x: 29, y: 47, tone: "outbound" },
    { name: "香格里拉", day: "D6–8", x: 24, y: 24, tone: "outbound" },
    { name: "丽江", day: "D9", x: 39, y: 31, tone: "return" },
    { name: "南宁", day: "D11–12", x: 67, y: 69, tone: "return" },
  ],
} as const;

const photoCards = {
  main: [
    { src: "/images/destinations/meili-sunrise.jpg", label: "飞来寺 · 车宿等金山", className: "left-[5%] top-[35%]" },
    { src: "/images/destinations/lijiang-old-town.jpg", label: "丽江 · 古城一夜", className: "left-[44%] top-[10%]" },
    { src: "/images/destinations/nanning-qingxiu.jpg", label: "南宁 · 返程落脚", className: "right-[5%] bottom-[9%]" },
  ],
  weather: [
    { src: "/images/destinations/lijiang-old-town.jpg", label: "丽江 · 古城一夜", className: "left-[7%] top-[31%]" },
    { src: "/images/destinations/kunming-dianchi.jpg", label: "昆明 · 返程一夜", className: "left-[43%] top-[9%]" },
    { src: "/images/destinations/nanning-qingxiu.jpg", label: "南宁 · 连住两晚", className: "right-[5%] bottom-[9%]" },
  ],
} as const;

export default function RouteMapArtwork({ plan, routeDistance }: RouteMapArtworkProps) {
  const isWeather = plan === "weather";
  const stops = routeStops[plan];

  return (
    <div className="relative h-full w-full overflow-hidden bg-[#E8F0EC]" aria-label={`${isWeather ? "天气备选" : "梅里主线"}路线示意图`}>
      <div className="absolute inset-0 opacity-60 [background-image:radial-gradient(rgba(82,106,89,0.19)_0.8px,transparent_0.8px)] [background-size:13px_13px]" />
      <div className="absolute -left-[8%] top-[18%] h-[78%] w-[46%] rounded-[50%] border border-[#607E6C]/20" />
      <div className="absolute -right-[12%] -top-[38%] h-[108%] w-[56%] rounded-[50%] border border-[#607E6C]/20" />
      <div className="absolute left-[17%] top-[58%] h-[1px] w-[65%] -rotate-[17deg] bg-[#607E6C]/15" />

      <div className="absolute inset-x-0 top-0 z-20 flex items-center justify-between bg-gradient-to-b from-[#102033]/70 to-transparent px-5 py-4 text-[10px] font-mono tracking-[0.15em] text-white sm:px-7">
        <span>{isWeather ? "PLAN B / WEATHER RETURN" : "PLAN A / MEILI RETURN"}</span>
        <span>{routeDistance} KM · 09.25 — 10.07</span>
      </div>

      <svg viewBox="0 0 100 100" preserveAspectRatio="none" className="absolute inset-0 h-full w-full" aria-hidden="true">
        <defs>
          <filter id="routeMapGlow" x="-20%" y="-20%" width="140%" height="140%"><feGaussianBlur stdDeviation="0.6" result="blur" /><feMerge><feMergeNode in="blur" /><feMergeNode in="SourceGraphic" /></feMerge></filter>
        </defs>
        <path d={isWeather ? "M88 76 C78 78 74 76 69 74 S49 65 42 59 S33 51 29 47 S25 34 24 24" : "M88 76 C78 78 74 76 69 74 S49 65 42 59 S33 51 29 47 S25 34 24 24 S17 16 13 12"} fill="none" stroke="#C66A2B" strokeWidth="1.45" strokeLinecap="round" filter="url(#routeMapGlow)" />
        <path d={isWeather ? "M24 24 C30 25 35 28 39 31 S41 50 42 59 S59 65 67 69 S80 74 88 76" : "M13 12 C22 18 31 25 39 31 S41 50 42 59 S59 65 67 69 S80 74 88 76"} fill="none" stroke="#607E6C" strokeWidth="1.45" strokeLinecap="round" filter="url(#routeMapGlow)" />
      </svg>

      {stops.map((stop) => (
        <div key={stop.name} className="absolute z-10 -translate-x-1/2 -translate-y-1/2" style={{ left: `${stop.x}%`, top: `${stop.y}%` }}>
          <span className={`mx-auto block h-3 w-3 rounded-full border-[3px] border-[#FFFDF8] shadow-[0_2px_6px_rgba(16,32,51,0.16)] ${stop.tone === "outbound" ? "bg-[#C66A2B]" : "bg-[#607E6C]"}`} />
          <div className="mt-1 whitespace-nowrap text-center [text-shadow:0_1px_0_#FFFDF8,1px_0_0_#FFFDF8,-1px_0_0_#FFFDF8]">
            <p className="text-[10px] font-semibold text-[#102033] sm:text-xs">{stop.name}</p>
            <p className="mt-0.5 font-mono text-[8px] text-[#526A59] sm:text-[9px]">{stop.day}</p>
          </div>
        </div>
      ))}

      <div className="absolute inset-x-0 bottom-3 z-20 flex flex-wrap gap-2 px-4 sm:bottom-5 sm:px-6">
        <span className="rounded-full border border-[#C66A2B]/25 bg-[#FFFDF8]/90 px-3 py-1.5 text-[10px] font-medium text-[#102033] shadow-sm"><i className="mr-1.5 inline-block h-1.5 w-1.5 rounded-full bg-[#C66A2B]" />去程</span>
        <span className="rounded-full border border-[#607E6C]/25 bg-[#FFFDF8]/90 px-3 py-1.5 text-[10px] font-medium text-[#102033] shadow-sm"><i className="mr-1.5 inline-block h-1.5 w-1.5 rounded-full bg-[#607E6C]" />返程</span>
        <span className="rounded-full border border-[#102033]/10 bg-[#FFFDF8]/90 px-3 py-1.5 text-[10px] font-medium text-[#526A59] shadow-sm">{isWeather ? "南宁连住 2 晚" : "飞来寺车宿 1 晚"}</span>
      </div>

      <div className="pointer-events-none absolute inset-0 hidden lg:block">
        {photoCards[plan].map((card) => (
          <figure key={card.label} className={`absolute w-28 overflow-hidden rounded-lg border border-white/80 bg-white/90 p-1.5 shadow-[0_10px_25px_rgba(16,32,51,0.14)] ${card.className}`}>
            <div className="relative aspect-[4/3] overflow-hidden rounded-[4px]"><Image src={card.src} alt="" fill sizes="112px" className="object-cover" /></div>
            <figcaption className="mt-1 truncate px-0.5 text-[8px] font-medium text-[#526A59]">{card.label}</figcaption>
          </figure>
        ))}
      </div>
    </div>
  );
}
