"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { TOTAL_DISTANCE } from "@/data/tripData";
import { useLocalStorageState } from "@/hooks/useLocalStorageState";

type CostInputs = {
  travelers: number;
  fuelEfficiency: number;
  fuelPrice: number;
  tolls: number;
  pendingHotelAverage: number;
  foodPerPersonPerDay: number;
  tickets: number;
  parkingAndCarCare: number;
  photographyAndMisc: number;
  contingency: number;
};

const DAYS = 13;
const PENDING_HOTEL_NIGHTS = 4;
const CONFIRMED_STAYS = 298 + 780 + 694.96 + 317;

const INITIAL_INPUTS: CostInputs = {
  travelers: 2,
  fuelEfficiency: 8.5,
  fuelPrice: 7.6,
  tolls: 0,
  pendingHotelAverage: 0,
  foodPerPersonPerDay: 0,
  tickets: 0,
  parkingAndCarCare: 0,
  photographyAndMisc: 0,
  contingency: 0,
};

const FIELD_LABELS: Record<keyof CostInputs, string> = {
  travelers: "同行人数",
  fuelEfficiency: "油耗",
  fuelPrice: "油价",
  tolls: "过路费",
  pendingHotelAverage: "待订酒店均价",
  foodPerPersonPerDay: "餐饮预算",
  tickets: "门票与体验",
  parkingAndCarCare: "停车与车况",
  photographyAndMisc: "摄影与杂项",
  contingency: "备用金",
};

const currency = new Intl.NumberFormat("zh-CN", {
  style: "currency",
  currency: "CNY",
  minimumFractionDigits: 0,
  maximumFractionDigits: 2,
});

function money(value: number) {
  return currency.format(value);
}

function nonNegative(value: number) {
  return Number.isFinite(value) ? Math.max(0, value) : 0;
}

type NumberFieldProps = {
  label: string;
  hint: string;
  value: number;
  prefix?: string;
  suffix: string;
  onChange: (value: number) => void;
};

function NumberField({ label, hint, value, prefix = "¥", suffix, onChange }: NumberFieldProps) {
  return (
    <label className="group block rounded-xl border border-[#102033]/8 bg-white px-4 py-3.5 transition-colors focus-within:border-[#C66A2B]/55 focus-within:bg-[#FFFDF8]">
      <span className="flex items-baseline justify-between gap-3">
        <span className="text-sm font-medium text-[#102033]">{label}</span>
        <span className="text-[10px] text-[#526A59]">{hint}</span>
      </span>
      <span className="mt-2 flex items-center gap-2">
        <span className="w-3 text-base text-[#A8A29E]">{prefix}</span>
        <input
          type="number"
          min="0"
          step="0.01"
          inputMode="decimal"
          value={value || ""}
          placeholder="0"
          onChange={(event) => onChange(nonNegative(Number(event.target.value)))}
          className="min-w-0 flex-1 bg-transparent text-right font-mono text-base font-semibold tabular-nums text-[#102033] outline-none placeholder:text-[#A8A29E]/45"
          aria-label={label}
        />
        <span className="w-12 text-right text-[11px] text-[#A8A29E]">{suffix}</span>
      </span>
    </label>
  );
}

export default function CostCalculatorSection() {
  const [inputs, setInputs] = useLocalStorageState<CostInputs>("shanhai-yueyue:cost-inputs", INITIAL_INPUTS);
  const [lastChanged, setLastChanged] = useState<keyof CostInputs | null>(null);
  const update = <K extends keyof CostInputs>(key: K, value: CostInputs[K]) => {
    setInputs((previous) => ({ ...previous, [key]: value }));
    setLastChanged(key);
  };

  const travelers = Math.max(1, Math.round(nonNegative(inputs.travelers)) || 1);
  const fuel = (TOTAL_DISTANCE / 100) * nonNegative(inputs.fuelEfficiency) * nonNegative(inputs.fuelPrice);
  const pendingHotel = PENDING_HOTEL_NIGHTS * nonNegative(inputs.pendingHotelAverage);
  const food = DAYS * travelers * nonNegative(inputs.foodPerPersonPerDay);
  const flexibleCosts = nonNegative(inputs.tolls)
    + pendingHotel
    + food
    + nonNegative(inputs.tickets)
    + nonNegative(inputs.parkingAndCarCare)
    + nonNegative(inputs.photographyAndMisc)
    + nonNegative(inputs.contingency);
  const total = CONFIRMED_STAYS + fuel + flexibleCosts;

  return (
    <section id="costs" className="relative overflow-hidden bg-[#F7F3EA] py-24 sm:py-32">
      <div className="pointer-events-none absolute left-0 top-16 h-72 w-72 rounded-full bg-[#C66A2B]/8 blur-3xl" />
      <div className="section-container relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.55 }}
          className="section-header"
        >
          <span className="section-number">05 / BUDGET</span>
          <h2 className="section-title">成本<span className="highlight">计算</span></h2>
          <p className="section-editorial">已确认费用先落账，其余项目按你的实际开销自由补全</p>
          <div className="section-divider" />
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, ease: "easeOut" }}
          className="mx-auto grid max-w-6xl overflow-hidden rounded-[24px] border border-[#102033]/10 bg-white shadow-[0_20px_60px_rgba(16,32,51,0.07)] lg:grid-cols-[0.9fr_1.1fr]"
        >
          <div className="border-b border-[#526A59]/18 bg-[#E7EFE8] px-6 py-8 text-[#102033] sm:px-9 lg:border-b-0 lg:border-r">
            <div className="flex items-start justify-between gap-4">
              <div>
                <p className="font-mono text-[10px] tracking-[0.18em] text-[#526A59]">ESTIMATED TOTAL</p>
                <p className="mt-3 font-serif text-4xl leading-none sm:text-5xl">{money(total)}</p>
                <p className="mt-3 text-sm text-[#526A59]">按 {travelers} 人同行，约 {money(total / travelers)} / 人</p>
              </div>
              <span className="rounded-full border border-[#526A59]/25 bg-white/55 px-3 py-1.5 font-mono text-[10px] tracking-[0.08em] text-[#526A59]">{DAYS} DAYS</span>
            </div>

            <div className="mt-8 border-y border-[#526A59]/18 py-5">
              <div className="flex items-center justify-between gap-4">
                <div>
                  <p className="text-xs text-[#526A59]">已确认住宿</p>
                  <p className="mt-1 text-xl font-semibold tabular-nums">{money(CONFIRMED_STAYS)}</p>
                </div>
                <span className="rounded-full bg-[#526A59] px-2.5 py-1 text-[10px] text-white">3 个订单 · 6 晚</span>
              </div>
              <div className="mt-4 space-y-2 text-xs text-[#526A59]">
                <p className="flex justify-between gap-3"><span>大理缦山缦海 · 3 晚</span><span className="tabular-nums">¥780</span></p>
                <p className="flex justify-between gap-3"><span>香格里拉如愿 · 2 晚</span><span className="tabular-nums">¥694.96</span></p>
                <p className="flex justify-between gap-3"><span>阅归 Scenic · 第 3 晚</span><span className="tabular-nums">¥317</span></p>
              </div>
            </div>

            <dl className="mt-6 grid grid-cols-2 gap-x-5 gap-y-4">
              <div><dt className="text-[10px] text-[#526A59]">预计油费</dt><dd className="mt-1 text-sm font-medium tabular-nums">{money(fuel)}</dd></div>
              <div><dt className="text-[10px] text-[#526A59]">待订住宿</dt><dd className="mt-1 text-sm font-medium tabular-nums">{money(pendingHotel)}</dd></div>
              <div><dt className="text-[10px] text-[#526A59]">餐饮</dt><dd className="mt-1 text-sm font-medium tabular-nums">{money(food)}</dd></div>
              <div><dt className="text-[10px] text-[#526A59]">其他弹性支出</dt><dd className="mt-1 text-sm font-medium tabular-nums">{money(flexibleCosts - pendingHotel - food)}</dd></div>
            </dl>

            <p className="mt-7 text-[11px] leading-relaxed text-[#526A59]">计算数据仅保存在这台设备的浏览器内，不会上传到服务器；清除浏览器网站数据后会一并清除。</p>
          </div>

          <div className="px-5 py-7 sm:px-8 sm:py-8">
            <div className="mb-5 flex items-end justify-between gap-4">
              <div>
                <p className="font-mono text-[10px] tracking-[0.15em] text-[#C66A2B]">YOUR INPUTS</p>
                <h3 className="mt-1 text-lg font-semibold text-[#102033]">填写待确认成本</h3>
                <div aria-live="polite" className="mt-1 h-4">
                  {lastChanged && <motion.p key={lastChanged} initial={{ opacity: 0, y: 4 }} animate={{ opacity: 1, y: 0 }} className="text-[10px] text-[#526A59]">已按“{FIELD_LABELS[lastChanged]}”更新总预算</motion.p>}
                </div>
              </div>
              <motion.button
                type="button"
                onClick={() => { setInputs(INITIAL_INPUTS); setLastChanged(null); }}
                whileTap={{ scale: 0.95 }}
                className="rounded-full border border-[#102033]/12 px-3 py-1.5 text-[11px] text-[#526A59] transition-colors hover:border-[#526A59]/45 hover:bg-[#526A59]/5"
              >
                恢复默认
              </motion.button>
            </div>

            <div className="grid gap-3 sm:grid-cols-2">
              <NumberField label="同行人数" hint="至少 1 人" value={inputs.travelers} prefix="" suffix="人" onChange={(value) => update("travelers", Math.max(1, Math.round(value) || 1))} />
              <NumberField label="过路费" hint="全程估算" value={inputs.tolls} suffix="总额" onChange={(value) => update("tolls", value)} />
              <NumberField label="油耗" hint={`${TOTAL_DISTANCE} km`} value={inputs.fuelEfficiency} prefix="" suffix="L/100km" onChange={(value) => update("fuelEfficiency", value)} />
              <NumberField label="油价" hint="按实际油品" value={inputs.fuelPrice} prefix="¥" suffix="/ L" onChange={(value) => update("fuelPrice", value)} />
              <NumberField label="待订酒店均价" hint={`${PENDING_HOTEL_NIGHTS} 晚待订`} value={inputs.pendingHotelAverage} suffix="/ 晚" onChange={(value) => update("pendingHotelAverage", value)} />
              <NumberField label="餐饮预算" hint={`${DAYS} 天 × ${travelers} 人`} value={inputs.foodPerPersonPerDay} suffix="/人/天" onChange={(value) => update("foodPerPersonPerDay", value)} />
              <NumberField label="门票与体验" hint="景区、活动" value={inputs.tickets} suffix="总额" onChange={(value) => update("tickets", value)} />
              <NumberField label="停车与车况" hint="停车、洗车等" value={inputs.parkingAndCarCare} suffix="总额" onChange={(value) => update("parkingAndCarCare", value)} />
              <NumberField label="摄影与杂项" hint="耗材、临时支出" value={inputs.photographyAndMisc} suffix="总额" onChange={(value) => update("photographyAndMisc", value)} />
              <NumberField label="备用金" hint="建议预留" value={inputs.contingency} suffix="总额" onChange={(value) => update("contingency", value)} />
            </div>

            <div className="mt-5 rounded-xl bg-[#F7F3EA] px-4 py-3 text-[11px] leading-relaxed text-[#526A59]">
              待订住宿包括飞来寺 2 晚、丽江 1 晚、百色 1 晚。玉林为家中团圆，不计酒店费用；昆明、大理与香格里拉住宿已确认。
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
