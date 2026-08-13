"use client";

import Image from "next/image";
import { useEffect, useState } from "react";
import { motion } from "framer-motion";

const downloads = [
  { key: "a", title: "主线 · 飞来寺车宿", description: "完全沿用原版攻略的地图、卡片和底部版式，只更新为主线返程。", image: "/images/downloads/yunnan-plan-a-original-style.png", filename: "云南13天自驾攻略-主线-飞来寺车宿.png", tone: "amber" },
  { key: "b", title: "备选 · 跳过飞来寺", description: "完全沿用原版攻略的地图、卡片和底部版式，只更新为天气备选返程。", image: "/images/downloads/yunnan-plan-b-original-style.png", filename: "云南13天自驾攻略-备选-跳过飞来寺.png", tone: "sage" },
] as const;

export default function RoadbookDownloadSection() {
  const [preview, setPreview] = useState<(typeof downloads)[number] | null>(null);

  useEffect(() => {
    const closeOnEscape = (event: KeyboardEvent) => {
      if (event.key === "Escape") setPreview(null);
    };
    window.addEventListener("keydown", closeOnEscape);
    return () => window.removeEventListener("keydown", closeOnEscape);
  }, []);

  return <section id="roadbook-download" className="relative overflow-hidden bg-[#F7F3EA] py-20 sm:py-28">
    <div className="section-container relative z-10">
      <motion.div initial={{ opacity: 0, y: 16 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true, amount: 0.25 }} transition={{ duration: 0.5 }} className="mx-auto max-w-2xl text-center">
        <span className="section-number">07 / DOWNLOAD</span>
        <h2 className="section-title">两条路，<span className="highlight">两张攻略</span></h2>
        <p className="mt-4 text-sm leading-7 text-[#526A59]">点击海报可放大查看；需要保存时，再使用卡片下方的下载按钮。备选图不会出现飞来寺或百色。</p>
      </motion.div>
      <div className="mx-auto mt-10 grid max-w-6xl gap-8 lg:grid-cols-2">
        {downloads.map((item, index) => <motion.figure key={item.key} initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true, amount: 0.1 }} transition={{ duration: 0.5, delay: index * 0.08 }} className="overflow-hidden rounded-2xl border border-[#102033]/10 bg-white p-2 shadow-[0_18px_45px_rgba(16,32,51,0.08)] sm:p-3">
          <button type="button" onClick={() => setPreview(item)} className="group block w-full cursor-zoom-in text-left focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[#C66A2B]" aria-label={`放大查看${item.title}图片版攻略`}><div className="relative aspect-[1.5] overflow-hidden rounded-xl bg-[#EDF3F8]"><Image src={item.image} alt={`${item.title}图片版攻略`} fill sizes="(max-width: 1023px) 100vw, 720px" className="object-contain transition-transform duration-500 group-hover:scale-[1.015]" /><span className="absolute right-3 top-3 inline-flex items-center gap-1 rounded-full bg-[#102033]/80 px-2.5 py-1.5 text-[11px] font-medium text-white opacity-0 backdrop-blur transition-opacity group-hover:opacity-100">⌕ 放大查看</span></div></button>
          <figcaption className="flex flex-col gap-3 px-3 pb-2 pt-4 sm:flex-row sm:items-center sm:justify-between"><div><h3 className="text-sm font-semibold text-[#102033]">{item.title}</h3><p className="mt-1 text-[11px] leading-5 text-[#526A59]">{item.description}</p></div><a href={item.image} download={item.filename} className={`inline-flex shrink-0 items-center justify-center gap-1.5 rounded-full px-3 py-2 text-[11px] font-medium ${item.tone === "amber" ? "bg-[#FFF3E6] text-[#A64D18]" : "bg-[#E7EFE8] text-[#466151]"}`}>↓ 下载图片</a></figcaption>
        </motion.figure>)}
      </div>
    </div>
    {preview && <div className="fixed inset-0 z-[100] flex items-center justify-center bg-[#102033]/80 p-4 backdrop-blur-sm" role="dialog" aria-modal="true" aria-label={`${preview.title}大图预览`} onMouseDown={() => setPreview(null)}>
      <div className="relative flex max-h-[94vh] w-full max-w-7xl flex-col rounded-2xl bg-white p-2 shadow-2xl" onMouseDown={(event) => event.stopPropagation()}>
        <div className="flex items-center justify-between gap-4 px-3 py-2"><p className="text-sm font-semibold text-[#102033]">{preview.title}</p><div className="flex items-center gap-2"><a href={preview.image} download={preview.filename} className="rounded-full bg-[#FFF3E6] px-3 py-1.5 text-xs font-medium text-[#A64D18]">↓ 下载图片</a><button type="button" onClick={() => setPreview(null)} className="rounded-full px-2.5 py-1.5 text-sm text-[#526A59] transition hover:bg-[#F7F3EA]" aria-label="关闭预览">×</button></div></div>
        <div className="relative min-h-0 flex-1 overflow-auto rounded-xl bg-[#EDF3F8]"><Image src={preview.image} alt={`${preview.title}图片版攻略大图`} width={1536} height={1024} priority className="h-auto w-full min-w-[760px] object-contain" /></div>
      </div>
    </div>}
  </section>;
}
