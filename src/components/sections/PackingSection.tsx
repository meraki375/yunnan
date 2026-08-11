"use client";

import { motion } from "framer-motion";
import { packingList } from "@/data/tripData";
import { useLocalStorageState } from "@/hooks/useLocalStorageState";

export default function PackingSection() {
  const [checkedItemIds, setCheckedItemIds] = useLocalStorageState<string[]>("shanhai-yueyue:packing-checked", []);
  const checkedItems = new Set(checkedItemIds);

  const toggleItem = (item: string) => {
    setCheckedItemIds((prev) => {
      const next = new Set(prev);
      if (next.has(item)) next.delete(item);
      else next.add(item);
      return [...next];
    });
  };

  const totalItems = packingList.reduce((acc, cat) => acc + cat.items.length, 0);
  const checkedCount = checkedItems.size;
  const progress = totalItems > 0 ? (checkedCount / totalItems) * 100 : 0;

  return (
    <section id="packing" className="relative py-24 sm:py-32 bg-white overflow-hidden">
      {/* Decorative */}
      <div className="absolute top-0 right-0 w-72 h-72 rounded-full bg-[#526A59]/4 blur-3xl pointer-events-none" />

      <div className="section-container relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="section-header"
        >
          <span className="section-number">04 / PACKING</span>
          <h2 className="section-title">
            行李<span className="highlight">清单</span>
          </h2>
          <p className="section-editorial">
            从摄影装备到高原药品，逐项准备，整装待发
          </p>
          <div className="section-divider" />
        </motion.div>

        {/* Progress bar */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="max-w-3xl mx-auto mb-14"
        >
          <div className="magazine-card p-5">
            <div className="flex items-center justify-between mb-2.5">
              <span className="text-xs text-[#334155] font-medium">
                准备进度
              </span>
              <span className="text-[10px] text-[#A8A29E] font-mono">
                {checkedCount}/{totalItems}
              </span>
            </div>
            <div className="relative h-1 bg-[#F7F3EA] rounded-full overflow-hidden">
              <motion.div
                className="h-full rounded-full"
                style={{
                  background: `linear-gradient(90deg, #526A59, #C66A2B)`,
                }}
                initial={{ width: 0 }}
                animate={{ width: `${progress}%` }}
                transition={{ duration: 0.5, ease: "easeOut" }}
              >
                <motion.div
                  className="absolute right-0 top-1/2 -translate-y-1/2 w-2 h-2 rounded-full bg-[#C66A2B]"
                  style={{ display: progress > 0 && progress < 100 ? "block" : "none" }}
                />
              </motion.div>
            </div>
          </div>
        </motion.div>

        {/* Categories - 2 columns on desktop */}
        <div className="max-w-4xl mx-auto grid sm:grid-cols-2 gap-5 sm:gap-7">
          {packingList.map((category, catIndex) => {
            const categoryChecked = category.items.filter(item => checkedItems.has(item)).length;
            const categoryTotal = category.items.length;

            return (
              <motion.div
                key={category.category}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: catIndex * 0.06 }}
                className="magazine-card overflow-hidden"
              >
                <div className="px-5 py-3.5 border-b border-[#A8A29E]/8">
                  <div className="flex items-center justify-between">
                    <h3 className="text-sm font-bold text-[#102033]">
                      {category.category}
                    </h3>
                    <span className="text-[10px] text-[#A8A29E] font-mono">
                      {categoryChecked}/{categoryTotal}
                    </span>
                  </div>
                </div>
                <div className="p-4 space-y-0.5">
                  {category.items.map((item) => (
                    <label
                      key={item}
                      className="flex min-h-11 items-center gap-3 p-2 rounded-lg cursor-pointer hover:bg-[#F7F3EA]/60 transition-colors group"
                    >
                      <input
                        type="checkbox"
                        checked={checkedItems.has(item)}
                        onChange={() => toggleItem(item)}
                        className="sr-only peer"
                      />
                      <div
                        className={`w-4 h-4 rounded border-2 flex items-center justify-center transition-all flex-shrink-0 ${
                          checkedItems.has(item)
                            ? "bg-[#526A59] border-[#526A59]"
                            : "border-[#A8A29E]/30 group-hover:border-[#526A59]/40"
                        }`}
                      >
                        {checkedItems.has(item) && (
                          <svg width="10" height="10" viewBox="0 0 12 12" fill="none">
                            <path d="M2.5 6l2.5 2.5 4.5-5" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                          </svg>
                        )}
                      </div>
                      <span
                        className={`text-sm transition-colors ${
                          checkedItems.has(item)
                            ? "text-[#A8A29E] line-through"
                            : "text-[#334155]"
                        }`}
                      >
                        {item}
                      </span>
                    </label>
                  ))}
                </div>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
