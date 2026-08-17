"use client";

import { motion } from "framer-motion";

export default function Footer() {
  const scrollTo = (id: string) => {
    const el = document.getElementById(id);
    if (el) {
      const top = el.getBoundingClientRect().top + window.scrollY - 80;
      window.scrollTo({ top, behavior: "smooth" });
    }
  };

  return (
    <footer className="relative overflow-hidden border-t border-[#102033]/12 bg-[#EEE7DA] text-[#102033]">
      <div className="pointer-events-none absolute inset-x-0 top-0 h-1 bg-[#C66A2B]" />
      <div className="pointer-events-none absolute left-[7%] top-0 h-20 border-l border-dashed border-[#526A59]/30" />
      <div className="pointer-events-none absolute right-[12%] top-0 h-12 border-l border-dashed border-[#C66A2B]/35" />

      <div className="relative z-10 mx-auto max-w-7xl px-6 py-16 sm:py-20">
        {/* Closing editorial */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mb-12 text-center sm:mb-16"
        >
          <p className="mb-4 font-mono text-[10px] tracking-[0.2em] text-[#C66A2B]">
            · EPILOGUE ·
          </p>
          <h2 className="mx-auto max-w-2xl font-serif text-2xl font-semibold leading-relaxed text-[#102033] sm:text-3xl md:text-4xl">
            「穿越 3960 公里，把团圆、雪山与归途写进同一页。」
          </h2>
          <p className="mt-4 font-mono text-[10px] tracking-[0.08em] text-[#526A59] sm:text-xs">
            E 98.88° N 28.45° · 梅里雪山 · 卡瓦格博峰
          </p>
        </motion.div>

        {/* Data colophon */}
        <div className="grid grid-cols-2 gap-x-6 gap-y-9 border-y border-[#102033]/12 py-8 sm:grid-cols-2 sm:gap-8 sm:py-10 lg:grid-cols-4">
          {/* Brand */}
          <div className="col-span-2 lg:col-span-2">
            <h3 className="mb-2 font-display text-lg font-normal tracking-[0.03em]">
              <span className="text-[#C66A2B]">山海</span>赴约
            </h3>
            <p className="max-w-md text-xs leading-relaxed text-[#334155]">
              一册写给山川与彼此的自驾路书
              <br />
              深圳出发 · 玉林 · 昆明 · 大理 · 香格里拉 · 梅里 · 丽江 · 昆明 · 南宁 · 深圳
              <br />
              2026 中秋 × 国庆 · 婚纱照之旅
            </p>
            <div className="flex items-center gap-4 mt-4">
              <div className="flex items-center gap-1.5 font-mono text-[10px] text-[#526A59]">
                <span className="w-1.5 h-1.5 rounded-full bg-[#526A59]" />
                13 DAYS
              </div>
              <div className="flex items-center gap-1.5 font-mono text-[10px] text-[#526A59]">
                <span className="w-1.5 h-1.5 rounded-full bg-[#C66A2B]" />
                4040–4380 KM
              </div>
              <div className="flex items-center gap-1.5 font-mono text-[10px] text-[#526A59]">
                <span className="w-1.5 h-1.5 rounded-full bg-[#A63D40]" />
                4300 M
              </div>
            </div>
          </div>

          {/* Navigation */}
          <div>
            <h4 className="mb-4 font-mono text-[10px] uppercase tracking-[0.16em] text-[#C66A2B]">
              01–07
            </h4>
            <ul className="space-y-2">
              {[
                { id: "journey-map", label: "路线", num: "01" },
                { id: "timeline", label: "日记", num: "02" },
                { id: "travel-intel", label: "情报", num: "03" },
              ].map((link) => (
                <li key={link.id}>
                  <motion.button
                    onClick={() => scrollTo(link.id)}
                    whileHover={{ x: 2 }}
                    whileTap={{ scale: 0.95 }}
                    className="group flex items-center gap-2 text-xs text-[#334155] transition-colors hover:text-[#C66A2B]"
                  >
                    <span className="font-mono text-[9px] text-[#526A59] transition-colors group-hover:text-[#C66A2B]">
                      {link.num}
                    </span>
                    <span>{link.label}</span>
                  </motion.button>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h4 className="mb-4 font-mono text-[10px] uppercase tracking-[0.16em] text-[#C66A2B]">
              04–07
            </h4>
            <ul className="space-y-2">
              {[
                { id: "packing", label: "行囊", num: "04" },
                { id: "costs", label: "预算", num: "05" },
                { id: "memos", label: "备忘", num: "06" },
                { id: "tips", label: "附录", num: "07" },
              ].map((link) => (
                <li key={link.id}>
                  <motion.button
                    onClick={() => scrollTo(link.id)}
                    whileHover={{ x: 2 }}
                    whileTap={{ scale: 0.95 }}
                    className="group flex items-center gap-2 text-xs text-[#334155] transition-colors hover:text-[#C66A2B]"
                  >
                    <span className="font-mono text-[9px] text-[#526A59] transition-colors group-hover:text-[#C66A2B]">
                      {link.num}
                    </span>
                    <span>{link.label}</span>
                  </motion.button>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Bottom bar */}
        <div className="flex flex-col items-center justify-between gap-3 pt-6 text-center sm:flex-row sm:text-left">
          <p className="font-mono text-[10px] text-[#526A59]">
            © 2026 · YUNNAN 13 DAYS · DESIGNED WITH CARE
          </p>
          <div className="flex flex-wrap items-center justify-center gap-x-3 gap-y-1 font-mono text-[10px] text-[#526A59] sm:justify-end">
            <span>数据更新：2026.09</span>
            <span className="hidden h-3 w-px bg-[#102033]/15 sm:block" />
            <span>路线编号：YN-2026-09</span>
          </div>
        </div>
      </div>
    </footer>
  );
}
