import sharp from "sharp";
import { mkdir } from "node:fs/promises";
import path from "node:path";
import { fileURLToPath } from "node:url";

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..");
const images = path.join(root, "public/images");
const destination = (name) => path.join(images, "destinations", name);
const outDir = path.join(images, "downloads");

const palette = {
  ink: "#102033", muted: "#557062", paper: "#FFFEFA", warm: "#F7F3EA",
  orange: "#EE7A21", green: "#17964B", blue: "#2376EA", purple: "#7B3FE4",
  red: "#EF3B2D", slate: "#758396", line: "#BFCDE0",
};

const photo = {
  yulin: destination("yulin-yuntian.jpg"),
  kunming: destination("kunming-dianchi.jpg"),
  dali: destination("dali-erhai.jpg"),
  shangri: destination("shangrila-songzanlin.jpg"),
  meili: destination("meili-sunrise.jpg"),
  lijiang: destination("lijiang-old-town.jpg"),
  nanning: destination("nanning-qingxiu.jpg"),
  shenzhen: destination("shenzhen-bay.jpg"),
};

const mainDays = [
  ["D1", "深圳 → 玉林", "约460km｜6–7小时", "车宿至玉林，晚上家人中秋团圆", photo.yulin, "#E8F3EA"],
  ["D2", "玉林 → 昆明", "约850km｜10–11小时", "沿途休整，晚住曼棠 V 酒店", photo.kunming, "#E8F3EA"],
  ["D3", "昆明 → 大理", "约330km｜3.5–4.5小时", "抵达大理，入住缦山缦海", photo.dali, "#EDF4FF"],
  ["D4", "大理", "市内行程", "龙龛码头、海东公路与日落", photo.dali, "#EDF4FF"],
  ["D5", "大理", "市内行程", "全天婚纱照拍摄，留足机动时间", photo.dali, "#EDF4FF"],
  ["D6", "大理 → 香格里拉", "约180km｜3.5–4.5小时", "独克宗古城，入住供氧酒店", photo.shangri, "#F2ECFB"],
  ["D7", "香格里拉", "市内行程", "松赞林寺、独克宗与龟山公园", photo.shangri, "#F2ECFB"],
  ["D8", "香格里拉", "环湖行程", "纳帕海环湖，检查次日天气", photo.shangri, "#F2ECFB"],
  ["D9", "香格里拉 → 飞来寺", "约180km｜4–5小时", "白马雪山、梅里日落，车宿", photo.meili, "#FFF0E8"],
  ["D10", "飞来寺 → 丽江", "约340km｜6–7小时", "日照金山后返程，丽江待订", photo.lijiang, "#FFF0E8"],
  ["D11", "丽江 → 昆明", "约520km｜6小时", "昆明返程住一晚，酒店待订", photo.kunming, "#F0F3F1"],
  ["D12", "昆明 → 南宁", "约800km｜9–10小时", "南宁待订一晚，避免疲劳驾驶", photo.nanning, "#F0F3F1"],
  ["D13", "南宁 → 深圳", "约720km｜8小时", "安全收束，回到深圳", photo.shenzhen, "#F0F3F1"],
];

const backupDays = [
  ...mainDays.slice(0, 8),
  ["D9", "香格里拉 → 丽江", "约180km｜3.5–4.5小时", "直接南下，不经过飞来寺", photo.lijiang, "#EAF4EA"],
  ["D10", "丽江 → 昆明", "约520km｜6小时", "昆明待订一晚，缓冲返程", photo.kunming, "#EAF4EA"],
  ["D11", "昆明 → 南宁", "约800km｜9–10小时", "入住南宁待订第 1 晚", photo.nanning, "#EAF4EA"],
  ["D12", "南宁", "市内行程", "休整一晚，南宁待订第 2 晚", photo.nanning, "#EAF4EA"],
  ["D13", "南宁 → 深圳", "约720km｜8小时", "安全抵达深圳", photo.shenzhen, "#F0F3F1"],
];

const esc = (value) => String(value).replaceAll("&", "&amp;").replaceAll("<", "&lt;").replaceAll(">", "&gt;");
const svg = (body) => Buffer.from(`<svg xmlns="http://www.w3.org/2000/svg" width="1920" height="1280" viewBox="0 0 1920 1280">${body}</svg>`);
const text = (x, y, value, size, color = palette.ink, weight = 400, anchor = "start") => `<text x="${x}" y="${y}" text-anchor="${anchor}" fill="${color}" font-family="PingFang SC, Noto Sans CJK SC, Arial, sans-serif" font-size="${size}" font-weight="${weight}">${esc(value)}</text>`;
const rounded = (x, y, width, height, radius, fill, stroke = "none", sw = 1) => `<rect x="${x}" y="${y}" width="${width}" height="${height}" rx="${radius}" fill="${fill}" stroke="${stroke}" stroke-width="${sw}"/>`;

function routeStroke(pathData, color, dashed = false) {
  return `<path d="${pathData}" fill="none" stroke="#FFFDF8" stroke-width="17" stroke-linecap="round" stroke-linejoin="round"/><path d="${pathData}" fill="none" stroke="${color}" stroke-width="8" stroke-linecap="round" stroke-linejoin="round"${dashed ? ' stroke-dasharray="13 12"' : ""}/>`;
}

function mapPhotoCard({ x, y, city, note, tone }) {
  return `${rounded(x - 4, y - 4, 130, 88, 10, "none", tone, 2)}${rounded(x, y + 47, 122, 19, 0, "#102033", "none")}${text(x + 8, y + 61, city, 13, "#FFFFFF", 700)}${text(x + 128, y + 80, note, 12, tone, 700, "end")}`;
}

function routeLayer(isBackup) {
  const legs = isBackup
    ? [
      ["M1080 818 C930 808 705 785 390 570", palette.green],
      ["M390 570 C468 618 634 741 850 796", palette.orange],
      ["M850 796 C785 778 747 760 710 745", palette.blue],
      ["M710 745 C661 727 622 711 590 700", palette.purple],
      ["M590 700 C550 625 518 498 468 438", palette.green],
      ["M468 438 C516 548 664 742 850 796 S1000 819 1080 818", palette.slate, true],
    ]
    : [
      ["M1080 818 C930 808 705 785 390 570", palette.green],
      ["M390 570 C468 618 634 741 850 796", palette.orange],
      ["M850 796 C785 778 747 760 710 745", palette.blue],
      ["M710 745 C661 727 622 711 590 700", palette.purple],
      ["M590 700 C474 610 317 417 210 280", palette.red],
      ["M210 280 C270 292 357 325 420 366", palette.red],
      ["M420 366 C480 458 480 610 585 682 S766 778 850 796 S1000 820 1080 818", palette.slate, true],
    ];
  const cities = isBackup
    ? [[1080,818,"深圳","出发 / 返程", palette.green],[955,822,"南宁","D11–12", palette.slate],[850,796,"昆明","D2 / D10", palette.orange],[710,745,"大理","D3–5", palette.blue],[590,700,"香格里拉","D6–8", palette.purple],[468,438,"丽江","D9", palette.green],[390,570,"玉林","D1", palette.green]]
    : [[1080,818,"深圳","出发 / 返程", palette.green],[955,822,"南宁","D12", palette.slate],[850,796,"昆明","D2 / D11", palette.orange],[710,745,"大理","D3–5", palette.blue],[590,700,"香格里拉","D6–8", palette.purple],[210,280,"飞来寺","车宿 1 晚", palette.red],[420,366,"丽江","D10", palette.slate],[390,570,"玉林","D1", palette.green]];
  return `${legs.map(([pathData, color, dashed]) => routeStroke(pathData, color, dashed)).join("")}${cities.map(([x, y, city, sub, color]) => `<circle cx="${x}" cy="${y}" r="13" fill="${color}" stroke="#FFFDF8" stroke-width="6"/>${text(x, y - 22, city, 20, palette.ink, 700, "middle")}${text(x, y + 37, sub, 12, palette.muted, 500, "middle")}`).join("")}`;
}

async function thumb(input, width = 118, height = 62) {
  return sharp(input).resize(width, height, { fit: "cover", position: "attention" }).jpeg({ quality: 86 }).toBuffer();
}

async function buildPoster({ plan, subtitle, distance, days, isBackup }) {
  const assets = [];
  const baseMap = await sharp(path.join(images, "route-loop-map.png")).resize(1120, 650, { fit: "cover", position: "center" }).modulate({ brightness: 1.03, saturation: 0.78 }).png().toBuffer();
  assets.push({ input: svg(`<rect width="1920" height="1280" fill="${palette.warm}"/>`), left: 0, top: 0 });
  assets.push({ input: baseMap, left: 45, top: 230 });

  const mapPhotos = isBackup
    ? [
      { x: 105, y: 344, city: "大理", note: "洱海", tone: palette.blue, image: photo.dali },
      { x: 500, y: 543, city: "香格里拉", note: "松赞林寺", tone: palette.purple, image: photo.shangri },
      { x: 325, y: 330, city: "丽江", note: "古城", tone: palette.green, image: photo.lijiang },
    ]
    : [
      { x: 90, y: 382, city: "梅里雪山", note: "日照金山", tone: palette.red, image: photo.meili },
      { x: 338, y: 295, city: "丽江", note: "古城", tone: palette.slate, image: photo.lijiang },
      { x: 105, y: 628, city: "大理", note: "洱海", tone: palette.blue, image: photo.dali },
      { x: 490, y: 548, city: "香格里拉", note: "松赞林寺", tone: palette.purple, image: photo.shangri },
    ];

  const rootOverlay = [
    rounded(22, 22, 1155, 1236, 24, "none", "#2F61A1", 1.4),
    rounded(1198, 22, 700, 1236, 24, palette.paper, "#B6C5D9", 1.4),
    text(56, 72, "深圳 → 云南 13 天自驾攻略（最终版）", 42, "#102C62", 700),
    text(56, 108, `PLAN ${plan}  /  ${subtitle}`, 18, isBackup ? palette.green : palette.orange, 700),
    text(56, 139, isBackup ? "深圳 → 玉林 → 昆明 → 大理 → 香格里拉 → 丽江 → 昆明 → 南宁 → 深圳" : "深圳 → 玉林 → 昆明 → 大理 → 香格里拉 → 飞来寺 → 丽江 → 昆明 → 南宁 → 深圳", 18, palette.ink, 600),
    rounded(56, 158, 1088, 59, 12, "#F6FAF6", "#B8C9D7"),
    text(88, 183, "▣  总时长", 13, palette.muted, 700), text(88, 204, "9月25日 — 10月7日 · 共13天", 15, palette.ink, 700),
    text(350, 183, "▰  自驾里程", 13, palette.muted, 700), text(350, 204, `约 ${distance} 公里`, 15, palette.ink, 700),
    text(604, 183, "△  最高海拔", 13, palette.muted, 700), text(604, 204, "约 4300 米 · 梅里雪山", 15, palette.ink, 700),
    text(875, 183, "★  核心体验", 13, palette.muted, 700), text(875, 204, isBackup ? "避险返程 / 大理婚纱照" : "车宿飞来寺 / 日照金山", 15, palette.ink, 700),
    rounded(45, 230, 1120, 650, 18, "none", "#B6C5D9", 1.3),
    text(73, 260, isBackup ? "ROUTE MAP  /  备选路线 · 跳过飞来寺" : "ROUTE MAP  /  主线路线 · 飞来寺车宿", 15, palette.ink, 700),
    routeLayer(isBackup),
    ...mapPhotos.map(mapPhotoCard),
    rounded(66, 782, 305, 74, 10, "#FFFDF8", "#C4D1DE"),
    text(86, 808, "路线图例", 14, palette.ink, 700),
    text(86, 833, isBackup ? "绿色备选段 · 灰色虚线返程" : "绿 / 橙 / 蓝 / 紫 / 红分段 · 灰色返程", 12, palette.muted, 600),
    rounded(45, 900, 536, 155, 15, "#FFFDF8", "#C7D4E2"),
    rounded(610, 900, 555, 155, 15, "#FFFDF8", "#C7D4E2"),
    text(72, 933, "✦ 行程亮点", 21, palette.ink, 700),
    text(72, 961, isBackup ? "中秋团圆 · 大理婚纱照 · 香格里拉三晚" : "中秋团圆 · 大理婚纱照 · 香格里拉三晚 · 梅里日照金山", 15, palette.muted),
    text(72, 988, isBackup ? "D9 直接丽江，避开高海拔与天气风险" : "D9 车宿飞来寺；D10 清晨等日照金山", 15, isBackup ? palette.green : palette.orange, 700),
    text(72, 1021, "路线图例：橙色为去程，绿色为返程 / 当前方案", 13, palette.muted),
    text(637, 933, "▲ 注意事项", 21, palette.ink, 700),
    text(637, 961, isBackup ? "触发：飞来寺云量大、降水或道路条件不佳" : "车宿前确认停车与夜间管理，备睡袋、氧气、电源", 15, palette.muted),
    text(637, 988, isBackup ? "10月2日晚判断天气；条件不稳即切换备选" : "高反预防：慢行、补水，避免剧烈运动", 15, palette.muted),
    text(637, 1021, "住宿：已订玉林、昆明首晚、大理、香格里拉；其余见右侧", 13, palette.muted),
    rounded(45, 1075, 1120, 151, 15, "#F4F7F5", "#C9D8CD"),
    text(73, 1110, "住宿与返程核对", 20, palette.ink, 700),
    text(73, 1141, isBackup ? "待订：丽江 1 晚 · 昆明返程 1 晚 · 南宁 2 晚" : "待订：丽江 1 晚 · 昆明返程 1 晚 · 南宁 1 晚", 17, isBackup ? palette.green : palette.orange, 700),
    text(73, 1173, isBackup ? "D9 香格里拉→丽江 ｜ D10 丽江→昆明 ｜ D11 昆明→南宁 ｜ D12 南宁休整" : "D10 飞来寺→丽江 ｜ D11 丽江→昆明 ｜ D12 昆明→南宁 ｜ D13 南宁→深圳", 15, palette.muted),
    text(73, 1203, "提示：距离与时间为自驾估算，请按实时路况、天气与体力调整。", 13, palette.muted),
    text(1240, 76, "🚗  详细行程安排", 25, palette.ink, 700),
    text(1240, 105, isBackup ? "PLAN B · 天气备选" : "PLAN A · 梅里主线", 14, isBackup ? palette.green : palette.orange, 700),
  ].join("");

  const dayLayer = days.map((day, index) => {
    const y = 124 + index * 84;
    const [dayNo, route, distanceText, detail, , fill] = day;
    return `${rounded(1224, y, 646, 74, 13, fill, "#B7C8D9", 1.1)}${rounded(1233, y + 8, 68, 58, 10, "#FFFDF8", "#B6C7D9")}${text(1267, y + 31, dayNo, 18, index >= 8 ? palette.orange : palette.green, 800, "middle")}${text(1267, y + 52, index === 0 ? "9/25" : index === 12 ? "10/7" : "", 10, palette.muted, 600, "middle")}${text(1320, y + 26, route, 18, palette.ink, 700)}${text(1320, y + 47, distanceText, 12, palette.muted, 700)}${text(1320, y + 64, detail, 12, palette.muted)}${rounded(1770, y + 7, 88, 60, 9, "#FFFFFF", "#D4DFE8")}`;
  }).join("");
  for (const card of mapPhotos) {
    assets.push({ input: await thumb(card.image, 122, 66), left: card.x, top: card.y });
  }
  assets.push({ input: svg(rootOverlay + dayLayer), left: 0, top: 0 });
  for (let index = 0; index < days.length; index += 1) {
    assets.push({ input: await thumb(days[index][4]), left: 1772, top: 131 + index * 84 });
  }

  await sharp({ create: { width: 1920, height: 1280, channels: 4, background: palette.warm } })
    .composite(assets)
    .jpeg({ quality: 94, chromaSubsampling: "4:4:4" })
    .toFile(path.join(outDir, `yunnan-plan-${plan.toLowerCase()}-detail.jpg`));
}

await mkdir(outDir, { recursive: true });
await buildPoster({ plan: "A", subtitle: "梅里主线 · 飞来寺车宿", distance: "4380", days: mainDays, isBackup: false });
await buildPoster({ plan: "B", subtitle: "天气备选 · 跳过飞来寺", distance: "4040", days: backupDays, isBackup: true });
