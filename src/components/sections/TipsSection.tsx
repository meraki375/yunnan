"use client";

import { motion } from "framer-motion";
import { useLocalStorageState } from "@/hooks/useLocalStorageState";
import { RETURN_PLAN_STORAGE_KEY, type ReturnPlan } from "@/data/returnPlan";

const tips = [
  {
    icon: "🏔️",
    title: "高原反应预防",
    content:
      "香格里拉（3300m）至白马雪山垭口（约4300m）海拔变化明显。出发前如有基础疾病或担心高反，请向医生咨询并做好个人健康准备。",
    keyAction: "飞来寺车宿请先确认允许停放区域；保暖睡袋、保温水、便携氧气和满电电源必备。若不适加重，及时下撤并寻求医疗帮助。",
    priority: "high",
  },
  {
    icon: "🚗",
    title: "自驾注意事项",
    content:
      "主线全程约4380km，Day 2 玉林至昆明、Day 12 昆明至南宁与 Day 13 南宁至深圳都是长驾驶日，建议两人轮流驾驶、严控疲劳。",
    keyAction: "国庆期间提前加油，避免排长队。弯道务必减速鸣笛。",
    priority: "high",
  },
  {
    icon: "📸",
    title: "摄影最佳时间",
    content:
      "日照金山最佳时间6:30–7:00（10月初），龙龛码头日出6:30–7:00。傍晚光线最佳时段16:00–18:00。",
    keyAction: "使用RAW格式拍摄，带渐变镜控制光比。三脚架必备。",
    priority: "medium",
  },
  {
    icon: "🧥",
    title: "穿衣指南",
    content:
      "云南昼夜温差大。梅里雪山清晨可低至0°C以下，需准备全套冷暖衣物。",
    keyAction: "保暖内衣 + 羽绒服 + 防风外套 + 手套 + 帽子。洋葱式穿衣法。",
    priority: "medium",
  },
  {
    icon: "🍜",
    title: "美食推荐",
    content:
      "昆明：过桥米线、菌子火锅。大理：酸辣鱼、乳扇。香格里拉：牦牛火锅、酥油茶。",
    keyAction: "大理古城人民路、昆明老街、独克宗古城是美食集中地。",
    priority: "low",
  },
  {
    icon: "💰",
    title: "预算参考",
    content: "主线预算需预留弹性：飞来寺为车宿不计酒店费用，丽江、昆明与南宁住宿仍待预订；大理与香格里拉住宿已确认。油费和过路费以约4380km测算。",
    keyAction: "多备现金，高原地区部分商户不支持移动支付。",
    priority: "low",
  },
];

export default function TipsSection() {
  const [returnPlan] = useLocalStorageState<ReturnPlan>(RETURN_PLAN_STORAGE_KEY, "main");
  const activeTips = returnPlan === "weather" ? tips.map((tip) => {
    if (tip.title === "高原反应预防") return {
      ...tip,
      content: "备选路线最高停留在香格里拉约3300m，随后下撤至丽江、昆明与南宁，海拔压力明显降低。",
      keyAction: "香格里拉仍建议放慢节奏；确认不去飞来寺后，无需准备白马雪山垭口的极寒装备。",
    };
    if (tip.title === "自驾注意事项") return {
      ...tip,
      content: "备选全程约4040km；Day 2 玉林至昆明、Day 11 昆明至南宁，以及 Day 13 南宁至深圳都是长驾驶日。南宁连住两晚后再走最后一程。",
    };
    if (tip.title === "摄影最佳时间") return {
      ...tip,
      content: "备选路线不等日照金山；把清晨留给丽江古城与玉龙雪山视野，傍晚重点拍古城灯火和沿途秋色。",
    };
    if (tip.title === "穿衣指南") return {
      ...tip,
      content: "不去飞来寺后无需按梅里雪山清晨的极寒准备，但香格里拉早晚仍冷，保留羽绒服与防风外套即可。",
    };
    if (tip.title === "预算参考") return {
      ...tip,
      content: "天气备选下，丽江、昆明各待订1晚，南宁待订2晚；飞来寺一晚无需预订，备选返程不经过百色。油费与过路费可按实际导航再更新。",
    };
    return tip;
  }) : tips;
  const highPriority = activeTips.filter((t) => t.priority === "high");
  const mediumPriority = activeTips.filter((t) => t.priority === "medium");
  const lowPriority = activeTips.filter((t) => t.priority === "low");

  return (
    <section
      id="tips"
      className="relative py-24 sm:py-32 bg-white overflow-hidden"
    >
      {/* Decorative */}
      <div className="absolute bottom-0 left-0 w-80 h-80 rounded-full bg-[#526A59]/4 blur-3xl pointer-events-none" />
      <div className="absolute top-20 right-10 w-60 h-60 rounded-full bg-[#C66A2B]/5 blur-3xl pointer-events-none" />

      <div className="section-container relative z-10">
        {/* Section header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="section-header"
        >
          <span className="section-number">06 / APPENDIX</span>
          <h2 className="section-title">
            实用<span className="highlight">附录</span>
          </h2>
          <p className="section-editorial">
            出发前必读的高原安全、驾驶与旅行经验
          </p>
          <div className="section-divider" />
        </motion.div>

        <div className="max-w-5xl mx-auto">
          {/* Two-column layout */}
          <div className="grid md:grid-cols-2 gap-8">
            {/* Left column: High + Medium priority */}
            <div className="space-y-6">
              {/* Key action box - 出发前记住 */}
              <motion.div
                initial={{ opacity: 0, y: 16 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                className="p-4 rounded-xl border border-[#C66A2B]/15 bg-[#C66A2B]/5"
              >
                <h3 className="text-xs font-bold text-[#C66A2B] mb-2 flex items-center gap-1.5">
                  <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
                    <path d="M7 1v12M1 7h12" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
                  </svg>
                  出发前记住
                </h3>
                <ul className="space-y-2">
                  {highPriority.map((tip) => (
                    <li key={tip.title} className="flex items-start gap-2">
                      <span className="text-sm flex-shrink-0">{tip.icon}</span>
                      <div>
                        <span className="text-sm font-medium text-[#102033]">
                          {tip.title}：
                        </span>
                        <span className="text-[12px] text-[#334155]">
                          {tip.keyAction}
                        </span>
                      </div>
                    </li>
                  ))}
                </ul>
              </motion.div>

              {/* Medium priority tips */}
              {mediumPriority.map((tip, index) => (
                <motion.div
                  key={tip.title}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.4, delay: index * 0.08 }}
                  className="magazine-card p-5"
                >
                  <div className="flex items-start gap-3 mb-2">
                    <div className="w-9 h-9 rounded-lg bg-[#F7F3EA] flex items-center justify-center text-lg flex-shrink-0">
                      {tip.icon}
                    </div>
                    <div className="flex-1 min-w-0">
                      <h3 className="text-sm font-bold text-[#102033]">
                        {tip.title}
                      </h3>
                    </div>
                  </div>
                  <p className="text-xs text-[#334155] leading-relaxed mb-2.5 ml-[48px]">
                    {tip.content}
                  </p>
                  <div className="ml-[48px] p-2.5 rounded-lg bg-[#F7F3EA] text-[11px] text-[#526A59] border border-[#526A59]/8">
                    <strong>💡 建议：</strong>
                    {tip.keyAction}
                  </div>
                </motion.div>
              ))}
            </div>

            {/* Right column: Low priority tips */}
            <div className="space-y-6">
              {lowPriority.map((tip, index) => (
                <motion.div
                  key={tip.title}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.4, delay: index * 0.08 }}
                  className="magazine-card p-5"
                >
                  <div className="flex items-start gap-3 mb-2">
                    <div className="w-9 h-9 rounded-lg bg-[#F7F3EA] flex items-center justify-center text-lg flex-shrink-0">
                      {tip.icon}
                    </div>
                    <div className="flex-1 min-w-0">
                      <h3 className="text-sm font-bold text-[#102033]">
                        {tip.title}
                      </h3>
                    </div>
                  </div>
                  <p className="text-xs text-[#334155] leading-relaxed mb-2.5 ml-[48px]">
                    {tip.content}
                  </p>
                  <div className="ml-[48px] p-2.5 rounded-lg bg-[#F7F3EA] text-[11px] text-[#526A59] border border-[#526A59]/8">
                    <strong>💡 建议：</strong>
                    {tip.keyAction}
                  </div>
                </motion.div>
              ))}

              {/* Risk reminder */}
              <motion.div
                initial={{ opacity: 0, y: 16 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                className="p-4 rounded-xl border border-[#A63D40]/12 bg-[#A63D40]/4"
              >
                <h3 className="text-xs font-bold text-[#A63D40] mb-2 flex items-center gap-1.5">
                  <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
                    <path d="M7 5v3M7 11v.01" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/>
                    <circle cx="7" cy="7" r="6" stroke="currentColor" strokeWidth="1.5"/>
                  </svg>
                  安全提醒
                </h3>
                <ul className="space-y-1.5 text-[12px] text-[#334155]">
                  <li className="flex items-start gap-2">
                    <span className="text-[#A63D40]">·</span>
                    <span>高原反应因人而异，严重时立即下撤至低海拔</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-[#A63D40]">·</span>
                    <span>香格里拉到梅里道路多弯，冬季可能有暗冰</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-[#A63D40]">·</span>
                    <span>购买旅游保险，含高原意外和紧急救援</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-[#A63D40]">·</span>
                    <span>尊重当地民族文化，拍摄人像前请征得同意</span>
                  </li>
                </ul>
              </motion.div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
