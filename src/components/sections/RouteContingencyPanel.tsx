"use client";

import { motion } from "framer-motion";
import { useLocalStorageState } from "@/hooks/useLocalStorageState";
import { RETURN_PLAN_STORAGE_KEY, type ReturnPlan } from "@/data/returnPlan";

type RoutePlan = {
  eyebrow: string;
  title: string;
  description: string;
  decision: string;
  legs: { day: string; date: string; route: string; note: string }[];
  lodging: string[];
  tone: "amber" | "sage";
};

const plans: Record<ReturnPlan, RoutePlan> = {
  main: {
    eyebrow: "PLAN A / 梅里主线",
    title: "天气合适，就在飞来寺车宿一晚等日照金山",
    description: "从香格里拉经白马雪山到飞来寺车宿一晚；看完晨光后，经丽江、昆明、南宁回深圳。",
    decision: "10月2日晚上查看飞来寺与白马雪山的次日天气；预报稳定时，继续主线。",
    legs: [
      { day: "D9", date: "10.03", route: "香格里拉 → 飞来寺", note: "飞来寺车宿 1 晚 · 梅里日落" },
      { day: "D10", date: "10.04", route: "飞来寺 → 丽江", note: "日照金山后前往丽江" },
      { day: "D11", date: "10.05", route: "丽江 → 昆明", note: "昆明住 1 晚" },
      { day: "D12", date: "10.06", route: "昆明 → 南宁", note: "南宁住 1 晚" },
      { day: "D13", date: "10.07", route: "南宁 → 深圳", note: "完成返程" },
    ],
    lodging: ["飞来寺车宿 1 晚 · 不订酒店", "丽江、昆明、南宁各待订 1 晚", "主线不经过百色"],
    tone: "amber",
  },
  weather: {
    eyebrow: "PLAN B / 天气备选",
    title: "香格里拉已尽兴、次日天气不佳，就提前回程",
    description: "不再绕行飞来寺与梅里雪山；把高海拔的不确定性换成更从容的分段返程。",
    decision: "触发条件：10月2日晚预报显示飞来寺云量大、降水或道路条件不佳，且香格里拉已完成想去的行程。",
    legs: [
      { day: "D9", date: "10.03", route: "香格里拉 → 丽江", note: "丽江住 1 晚，古城慢逛" },
      { day: "D10", date: "10.04", route: "丽江 → 昆明", note: "昆明住 1 晚，分段休整" },
      { day: "D11", date: "10.05", route: "昆明 → 南宁", note: "南宁连住第 1 晚" },
      { day: "D12", date: "10.06", route: "南宁休整", note: "南宁连住第 2 晚，补给休息" },
      { day: "D13", date: "10.07", route: "南宁 → 深圳", note: "完成返程" },
    ],
    lodging: ["飞来寺 1 晚不再预订", "丽江、昆明各待订 1 晚", "南宁待订 2 晚 · 不经过百色"],
    tone: "sage",
  },
};

export default function RouteContingencyPanel() {
  const [mode, setMode] = useLocalStorageState<ReturnPlan>(RETURN_PLAN_STORAGE_KEY, "main");
  const plan = plans[mode];
  const accent = plan.tone === "amber" ? "#C66A2B" : "#607E6C";
  const wash = plan.tone === "amber" ? "bg-[#FFF8F0]" : "bg-[#F0F5EF]";

  return (
    <motion.section
      initial={{ opacity: 0, y: 18 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.2 }}
      transition={{ duration: 0.5 }}
      aria-labelledby="weather-route-title"
      className="mt-7 overflow-hidden rounded-2xl border border-[#526A59]/18 bg-white shadow-[0_16px_40px_rgba(16,32,51,0.06)]"
    >
      <div className="grid gap-5 border-b border-[#102033]/10 p-5 sm:p-7 lg:grid-cols-[1fr_auto] lg:items-end">
        <div className="max-w-2xl">
          <p className="font-mono text-[10px] tracking-[0.16em] text-[#607E6C]">WEATHER DECISION / 行程分岔</p>
          <h3 id="weather-route-title" className="mt-2 font-serif text-2xl text-[#102033] sm:text-3xl">梅里不是必达项，天气不对就提前归途</h3>
          <p className="mt-3 text-xs leading-6 text-[#526A59]">10月2日晚做一次判断即可：主线继续追日照金山；备选则直接从香格里拉回丽江，避开飞来寺一晚的天气风险。</p>
        </div>
        <div role="tablist" aria-label="返程方案选择" className="inline-flex self-start rounded-xl bg-[#F7F3EA] p-1" style={{ width: "fit-content" }}>
          {(["main", "weather"] as ReturnPlan[]).map((item) => {
            const selected = mode === item;
            return <button key={item} type="button" role="tab" aria-selected={selected} onClick={() => setMode(item)} className={`relative min-h-11 rounded-lg px-3 text-[11px] font-medium transition-colors sm:px-4 ${selected ? "bg-white text-[#102033] shadow-sm" : "text-[#526A59] hover:text-[#102033]"}`}>
              {selected && <motion.span layoutId="route-plan-active" className="absolute inset-0 -z-10 rounded-lg bg-white shadow-sm" transition={{ type: "spring", stiffness: 420, damping: 32 }} />}
              {item === "main" ? "主线 · 去飞来寺" : "备选 · 直接回程"}
            </button>;
          })}
        </div>
      </div>

      <motion.div key={mode} initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.28 }} className="p-5 sm:p-7">
        <div className="flex flex-wrap items-center gap-3">
          <span className="font-mono text-[10px] tracking-[0.16em]" style={{ color: accent }}>{plan.eyebrow}</span>
          <span className={`rounded-full px-2.5 py-1 text-[10px] text-[#526A59] ${wash}`}>选择会保存在此浏览器</span>
        </div>
        <h4 className="mt-3 text-lg font-semibold text-[#102033]">{plan.title}</h4>
        <p className="mt-2 max-w-3xl text-xs leading-6 text-[#526A59]">{plan.description}</p>

        <ol className="mt-5 grid gap-2" style={{ gridTemplateColumns: "repeat(auto-fit, minmax(10.5rem, 1fr))" }}>
            {plan.legs.map((leg, index) => <li key={`${leg.day}-${leg.route}`} className="relative min-w-0 rounded-xl border border-[#102033]/10 bg-[#FBFAF6] p-3.5">
              <span className="font-mono text-[10px]" style={{ color: accent }}>{leg.day} · {leg.date}</span>
              <p className="mt-2 text-xs font-semibold leading-5 text-[#102033]">{leg.route}</p>
              <p className="mt-1 text-[10px] leading-4 text-[#526A59]">{leg.note}</p>
              {index < plan.legs.length - 1 && <span aria-hidden="true" className="absolute -right-2 top-1/2 z-10 hidden h-px w-2 bg-[#526A59]/25 xl:block" />}
            </li>)}
        </ol>
        <aside className={`mt-3 flex flex-col gap-2 rounded-xl px-4 py-3 sm:flex-row sm:items-center ${wash}`}>
          <p className="shrink-0 font-mono text-[10px] tracking-[0.14em]" style={{ color: accent }}>住宿变化</p>
          <ul className="flex flex-wrap gap-x-4 gap-y-1">
            {plan.lodging.map((item) => <li key={item} className="text-[11px] leading-5 text-[#526A59]">· {item}</li>)}
          </ul>
        </aside>

        <div className="mt-5 border-t border-[#102033]/10 pt-4 text-[11px] leading-5 text-[#526A59]">
          <span className="mr-2 font-medium text-[#102033]">出发前判断：</span>{plan.decision}
        </div>
      </motion.div>
    </motion.section>
  );
}
