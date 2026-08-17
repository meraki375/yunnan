"use client";

import { useEffect, useState, type FormEvent, type KeyboardEvent } from "react";
import {
  CheckIcon,
  CloudArrowUpIcon,
  EllipsisHorizontalCircleIcon,
  FaceSmileIcon,
  CakeIcon,
  HomeIcon,
  MapPinIcon,
  PlusIcon,
  ShoppingBagIcon,
  TrashIcon,
} from "@heroicons/react/24/outline";
import { motion } from "framer-motion";
import { useTripData } from "@/components/providers/TripDataProvider";
import { MEMO_CATEGORIES, type MemoCategory, type TripMemo } from "@/data/tripState";
import { formatMemoTravelTime } from "@/lib/memoTravelTime";

type MemoIcon = typeof ShoppingBagIcon;

const categoryDetails: Record<MemoCategory, { label: string; hint: string; icon: MemoIcon; accent: string; accentSoft: string; rotation: string }> = {
  clothing: { label: "衣", hint: "穿什么", icon: ShoppingBagIcon, accent: "#A63D40", accentSoft: "#F5DEDA", rotation: "-rotate-[0.65deg]" },
  food: { label: "食", hint: "吃什么", icon: CakeIcon, accent: "#B76A27", accentSoft: "#F7E6D2", rotation: "rotate-[0.45deg]" },
  lodging: { label: "住", hint: "住哪里", icon: HomeIcon, accent: "#526A59", accentSoft: "#E1EADF", rotation: "-rotate-[0.35deg]" },
  transport: { label: "行", hint: "怎么走", icon: MapPinIcon, accent: "#49677A", accentSoft: "#DCE8EC", rotation: "rotate-[0.7deg]" },
  other: { label: "其他", hint: "随手记", icon: EllipsisHorizontalCircleIcon, accent: "#6E6459", accentSoft: "#ECE6DD", rotation: "-rotate-[0.5deg]" },
  mood: { label: "心情", hint: "此刻感受", icon: FaceSmileIcon, accent: "#B65B46", accentSoft: "#F3DDD4", rotation: "rotate-[0.35deg]" },
};

const memoFilters: Array<{ id: "all" | MemoCategory; label: string }> = [{ id: "all", label: "全部" }, ...MEMO_CATEGORIES];

function getEmptyMessage(activeCategory: "all" | MemoCategory, hasMemos: boolean) {
  if (!hasMemos) return "下一段旅程，从一张值得留下的便签开始。";
  return `这一页还没有和“${categoryDetails[activeCategory as MemoCategory].label}”有关的便签。`;
}

export default function MemoSection() {
  const [draft, setDraft] = useState("");
  const [category, setCategory] = useState<MemoCategory>("other");
  const [activeCategory, setActiveCategory] = useState<"all" | MemoCategory>("all");
  const [currentTimestamp, setCurrentTimestamp] = useState(() => Date.now());
  const { memos, addMemo, deleteMemo, toggleMemo, syncError, syncStatus } = useTripData();
  const isSaving = syncStatus === "saving" || syncStatus === "connecting";
  const visibleMemos = activeCategory === "all" ? memos : memos.filter((memo) => memo.category === activeCategory);

  useEffect(() => {
    const timer = window.setInterval(() => setCurrentTimestamp(Date.now()), 60 * 60 * 1000);
    return () => window.clearInterval(timer);
  }, []);

  const selectFilter = (nextCategory: "all" | MemoCategory) => {
    setActiveCategory(nextCategory);
    if (nextCategory !== "all") setCategory(nextCategory);
  };

  const submit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (!draft.trim()) return;
    await addMemo(draft, category);
    setDraft("");
  };

  const submitWithShortcut = (event: KeyboardEvent<HTMLTextAreaElement>) => {
    if ((event.metaKey || event.ctrlKey) && event.key === "Enter" && draft.trim() && !isSaving) {
      event.preventDefault();
      const form = event.currentTarget.form;
      form?.requestSubmit();
    }
  };

  return (
    <section id="memos" className="relative overflow-hidden bg-[#102033] py-24 text-[#FFFDF8] sm:py-32">
      <div className="pointer-events-none absolute -left-24 top-12 h-80 w-80 rounded-full bg-[#C66A2B]/18 blur-3xl" />
      <div className="pointer-events-none absolute right-[-9rem] top-1/2 h-96 w-96 rounded-full bg-[#526A59]/24 blur-3xl" />
      <div className="pointer-events-none absolute left-[9%] top-48 h-px w-44 -rotate-12 bg-[#E8B384]/25" />

      <div className="section-container relative z-10">
        <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.55 }} className="mx-auto max-w-4xl">
          <span className="font-mono text-xs tracking-[0.25em] text-[#E8B384]">06 / NOTE WALL</span>
          <div className="mt-3 flex flex-wrap items-end justify-between gap-4">
            <div>
              <h2 className="font-display text-4xl font-normal tracking-tight sm:text-5xl">旅行<span className="text-[#E8B384]">便签墙</span></h2>
              <p className="mt-3 max-w-xl text-sm leading-6 text-[#E7EFE8]/72">写下沿途想起的小事、好吃的一餐，或此刻只想留给自己的心情。</p>
            </div>
            <span className={`inline-flex items-center gap-2 rounded-full border px-3 py-1.5 font-mono text-[10px] tracking-[0.08em] ${syncStatus === "error" ? "border-[#E8B384]/60 bg-[#C66A2B]/15 text-[#F9D4B9]" : "border-[#E7EFE8]/20 bg-white/5 text-[#E7EFE8]/70"}`}>
              <CloudArrowUpIcon className="h-3.5 w-3.5" />
              {syncStatus === "error" ? "SYNC NEEDS ATTENTION" : isSaving ? "SAVING NOTE" : "CLOUD SAVED"}
            </span>
          </div>
        </motion.div>

        <div className="mx-auto mt-9 max-w-4xl overflow-x-auto pb-2 [scrollbar-width:none] [&::-webkit-scrollbar]:hidden" role="tablist" aria-label="筛选旅行便签">
          <div className="inline-flex min-w-max gap-1 rounded-full border border-[#FFFDF8]/14 bg-[#091725]/45 p-1.5">
            {memoFilters.map((filter) => {
              const selected = activeCategory === filter.id;
              const Icon = filter.id === "all" ? null : categoryDetails[filter.id].icon;
              return (
                <button
                  key={filter.id}
                  id={`memo-filter-${filter.id}`}
                  type="button"
                  role="tab"
                  aria-selected={selected}
                  aria-controls="memo-wall"
                  onClick={() => selectFilter(filter.id)}
                  className={`inline-flex min-h-10 items-center gap-1.5 rounded-full px-3.5 text-xs transition-colors focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#E8B384] ${selected ? "bg-[#F7F3EA] font-semibold text-[#102033]" : "text-[#E7EFE8]/65 hover:bg-white/10 hover:text-[#FFFDF8]"}`}
                >
                  {Icon && <Icon className="h-3.5 w-3.5" />}
                  {filter.label}
                </button>
              );
            })}
          </div>
        </div>

        <motion.form onSubmit={submit} initial={{ opacity: 0, y: 18 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.45, delay: 0.08 }} className="relative mx-auto mt-8 max-w-[47rem] overflow-hidden rounded-[6px_22px_10px_24px] bg-[#F7F3EA] px-5 pb-5 pt-6 text-[#102033] shadow-[14px_16px_0_rgba(198,106,43,0.26)] sm:px-8 sm:pb-6 sm:pt-7">
          <div className="pointer-events-none absolute inset-x-0 top-14 border-t border-dashed border-[#C66A2B]/30" />
          <div className="pointer-events-none absolute right-6 top-0 h-9 w-24 -rotate-3 bg-[#C66A2B]/18" />
          <div className="relative flex items-center justify-between gap-4">
            <p className="font-mono text-[10px] tracking-[0.18em] text-[#C66A2B]">DROP A NOTE</p>
            <span className="font-mono text-[10px] text-[#526A59]">{draft.length}/280</span>
          </div>
          <label className="relative mt-6 block">
            <span className="sr-only">写一张旅行便签</span>
            <textarea value={draft} onChange={(event) => setDraft(event.target.value)} onKeyDown={submitWithShortcut} rows={3} maxLength={280} placeholder="今天想留下什么？比如：进香格里拉前记得买氧气瓶……" className="w-full resize-none bg-transparent font-serif text-xl leading-8 text-[#102033] outline-none placeholder:text-[#A8A29E] sm:text-2xl" />
          </label>
          <div className="relative mt-4 flex flex-wrap items-end justify-between gap-4 border-t border-[#102033]/10 pt-4">
            <fieldset className="min-w-0">
              <legend className="mb-2 font-mono text-[9px] tracking-[0.14em] text-[#526A59]">给便签盖个标签</legend>
              <div className="flex flex-wrap gap-1.5">
                {MEMO_CATEGORIES.map((item) => {
                  const detail = categoryDetails[item.id];
                  const Icon = detail.icon;
                  const selected = category === item.id;
                  return (
                    <button key={item.id} type="button" onClick={() => setCategory(item.id)} aria-pressed={selected} title={detail.hint} className={`inline-flex min-h-9 items-center gap-1.5 rounded-full border px-2.5 text-[11px] font-medium transition-colors focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#102033] ${selected ? "border-transparent text-white" : "border-[#102033]/10 bg-white/55 text-[#526A59] hover:border-[#102033]/25 hover:text-[#102033]"}`} style={selected ? { backgroundColor: detail.accent } : undefined}>
                      <Icon className="h-3.5 w-3.5" />
                      {item.label}
                    </button>
                  );
                })}
              </div>
            </fieldset>
            <button type="submit" disabled={!draft.trim() || isSaving} className="inline-flex min-h-10 shrink-0 items-center gap-2 rounded-full bg-[#102033] px-4 text-xs font-medium text-white transition-colors hover:bg-[#C66A2B] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#102033] disabled:cursor-not-allowed disabled:opacity-45">
              <PlusIcon className="h-4 w-4" /> 留在墙上
            </button>
          </div>
        </motion.form>

        {syncError && <p role="alert" className="mx-auto mt-6 max-w-4xl rounded-xl border border-[#E8B384]/35 bg-[#C66A2B]/10 px-3 py-2 text-xs leading-5 text-[#F9D4B9]">{syncError}</p>}

        <div id="memo-wall" role="tabpanel" aria-labelledby={`memo-filter-${activeCategory}`} className="mx-auto mt-10 max-w-4xl">
          {visibleMemos.length === 0 ? (
            <div className="relative mx-auto flex min-h-52 max-w-sm items-center justify-center overflow-hidden rounded-[4px_20px_8px_18px] bg-[#E7EFE8] px-8 text-center text-[#102033] shadow-[9px_11px_0_rgba(198,106,43,0.23)]">
              <div className="absolute left-5 top-0 h-7 w-20 -rotate-3 bg-[#C66A2B]/24" />
              <p className="font-serif text-xl leading-8 text-[#526A59]">{getEmptyMessage(activeCategory, memos.length > 0)}</p>
            </div>
          ) : (
            <ul className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
              {visibleMemos.map((memo, index) => <MemoNote key={memo._id} memo={memo} index={index} currentTimestamp={currentTimestamp} isSaving={isSaving} onToggle={toggleMemo} onDelete={deleteMemo} />)}
            </ul>
          )}
        </div>
      </div>
    </section>
  );
}

function MemoNote({ memo, index, currentTimestamp, isSaving, onToggle, onDelete }: { memo: TripMemo; index: number; currentTimestamp: number; isSaving: boolean; onToggle: (memo: TripMemo) => Promise<void>; onDelete: (memoId: string) => Promise<void> }) {
  const detail = categoryDetails[memo.category];
  const Icon = detail.icon;

  return (
    <motion.li initial={{ opacity: 0, y: 14 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.32, delay: Math.min(index * 0.05, 0.2) }} className={`group relative min-h-48 overflow-hidden rounded-[5px_19px_8px_20px] bg-[#FFFDF8] p-5 text-[#102033] shadow-[7px_9px_0_rgba(8,22,36,0.22)] transition-transform duration-200 hover:-translate-y-1 ${detail.rotation}`}>
      <div className="absolute inset-x-0 top-0 h-1.5" style={{ backgroundColor: detail.accent }} />
      <div className="flex items-start justify-between gap-3">
        <span className="inline-flex items-center gap-1.5 rounded-full px-2.5 py-1 font-mono text-[10px] tracking-[0.07em]" style={{ backgroundColor: detail.accentSoft, color: detail.accent }}>
          <Icon className="h-3.5 w-3.5" />
          {detail.label}
        </span>
        <button type="button" onClick={() => void onDelete(memo._id)} disabled={isSaving} aria-label="删除这张便签" className="rounded-full p-1.5 text-[#526A59]/60 opacity-100 transition-colors hover:bg-[#F5DEDA] hover:text-[#A63D40] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#102033] sm:opacity-0 sm:group-hover:opacity-100 sm:group-focus-within:opacity-100">
          <TrashIcon className="h-4 w-4" />
        </button>
      </div>
      <p className={`mt-5 font-serif text-lg leading-8 ${memo.completed ? "text-[#526A59]/55 line-through" : "text-[#102033]"}`}>{memo.text}</p>
      <div className="absolute inset-x-5 bottom-4 flex items-center justify-between gap-3 border-t border-dashed border-[#102033]/12 pt-3">
        <span className="font-mono text-[9px] tracking-[0.04em] text-[#526A59]">{formatMemoTravelTime(memo.createdAt, currentTimestamp)}</span>
        <button type="button" onClick={() => void onToggle(memo)} disabled={isSaving} aria-label={memo.completed ? "将便签标记为未完成" : "将便签标记为已完成"} className={`inline-flex min-h-8 items-center gap-1.5 rounded-full px-2 text-[10px] font-medium transition-colors focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#102033] ${memo.completed ? "bg-[#E1EADF] text-[#526A59]" : "text-[#526A59] hover:bg-[#E7EFE8]"}`}>
          <span className={`flex h-4 w-4 items-center justify-center rounded-full border ${memo.completed ? "border-[#526A59] bg-[#526A59] text-white" : "border-[#526A59]/45"}`}><CheckIcon className={`h-3 w-3 stroke-[2.5] ${memo.completed ? "" : "text-transparent"}`} /></span>
          {memo.completed ? "已收好" : "完成"}
        </button>
      </div>
    </motion.li>
  );
}
