import sharp from "sharp";
import { mkdir } from "node:fs/promises";
import path from "node:path";
import { fileURLToPath } from "node:url";

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..");
const publicImages = path.join(root, "public/images");
const source = path.join(publicImages, "yunnan-roadbook-clean-base.png");
const output = path.join(publicImages, "downloads");
const destinations = (name) => path.join(publicImages, "destinations", name);

const colors = {
  navy: "#071B53", ink: "#0F2C68", green: "#15964A", orange: "#EE7621",
  blue: "#1675E8", purple: "#7D36DB", red: "#EF3B2D", gray: "#78889A",
  paper: "#FFFFFF", pale: "#F7FBFF", softGreen: "#F4FBF4",
};

const photo = {
  yulin: destinations("yulin-yuntian.jpg"),
  kunming: destinations("kunming-dianchi.jpg"),
  dali: destinations("dali-erhai.jpg"),
  shangri: destinations("shangrila-songzanlin.jpg"),
  meili: destinations("meili-sunrise.jpg"),
  lijiang: destinations("lijiang-old-town.jpg"),
  nanning: destinations("nanning-qingxiu.jpg"),
  shenzhen: destinations("shenzhen-bay.jpg"),
  napahai: path.join(publicImages, "itinerary", "day8-napahai.png"),
  meiliFresh: path.join(publicImages, "itinerary", "day9-meili.png"),
  lijiangFresh: path.join(publicImages, "itinerary", "day10-lijiang.png"),
  kunmingFresh: path.join(publicImages, "itinerary", "day11-kunming.png"),
  nanningFresh: path.join(publicImages, "itinerary", "day12-nanning.png"),
  nanningNight: path.join(publicImages, "itinerary", "day12-nanning-yongjiang.png"),
  shenzhenFresh: path.join(publicImages, "itinerary", "day13-shenzhen.png"),
};

const text = (x, y, value, size, fill = colors.navy, weight = 400, anchor = "start") =>
  `<text x="${x}" y="${y}" text-anchor="${anchor}" fill="${fill}" font-family="PingFang SC, Noto Sans CJK SC, Microsoft YaHei, sans-serif" font-size="${size}" font-weight="${weight}">${String(value).replaceAll("&", "&amp;").replaceAll("<", "&lt;").replaceAll(">", "&gt;")}</text>`;
const rect = (x, y, width, height, radius, fill, stroke = "none", strokeWidth = 1) => `<rect x="${x}" y="${y}" width="${width}" height="${height}" rx="${radius}" fill="${fill}" stroke="${stroke}" stroke-width="${strokeWidth}"/>`;
const svg = (content, width = 1536, height = 1024) => Buffer.from(`<svg xmlns="http://www.w3.org/2000/svg" width="${width}" height="${height}" viewBox="0 0 ${width} ${height}">${content}</svg>`);

const mainDays = [
  ["Day 9", "香格里拉 → 飞来寺", "· 约180km ｜4–5小时", "· 白马雪山｜梅里日落", "· 飞来寺观景台车宿 1 晚", photo.meiliFresh, colors.red, "10月3日", "（周五）"],
  ["Day 10", "飞来寺 → 丽江", "· 清晨守候日照金山", "· 约340km ｜6–7小时", "· 丽江古城夜游｜腊排骨", photo.lijiangFresh, colors.red, "10月4日", "（周六）"],
  ["Day 11", "丽江 → 昆明", "· 约520km ｜6小时", "· 途经大理段，午后抵昆", "· 滇池散步｜过桥米线", photo.kunmingFresh, colors.gray, "10月5日", "（周日）"],
  ["Day 12", "昆明 → 南宁", "· 约800km ｜9–10小时", "· 早出发，服务区分段休息", "· 夜游三街两巷｜酸嘢", photo.nanningFresh, colors.gray, "10月6日", "（周一）"],
  ["Day 13", "南宁 → 深圳", "· 约720km ｜8小时", "· 经深岑高速，安全返程", "· 深圳湾日落｜旅程收束", photo.shenzhenFresh, colors.gray, "10月7日", "（周二）"],
];

const backupDays = [
  ["Day 9", "香格里拉 → 丽江", "· 约180km ｜3.5–4.5小时", "· 沿虎跳峡方向南下", "· 丽江古城夜游｜鸡豆凉粉", photo.lijiangFresh, colors.green, "10月3日", "（周五）"],
  ["Day 10", "丽江 → 昆明", "· 约520km ｜6小时", "· 途经大理段，午后抵昆", "· 滇池散步｜过桥米线", photo.kunmingFresh, colors.gray, "10月4日", "（周六）"],
  ["Day 11", "昆明 → 南宁", "· 约800km ｜9–10小时", "· 早出发，服务区分段休息", "· 夜游三街两巷｜酸嘢", photo.nanningFresh, colors.gray, "10月5日", "（周日）"],
  ["Day 12", "南宁", "· 青秀山漫步｜邕江夜景", "· 本地早茶｜老友粉", "· 城市休整，补给后早休息", photo.nanningNight, colors.gray, "10月6日", "（周一）"],
  ["Day 13", "南宁 → 深圳", "· 约720km ｜8小时", "· 经深岑高速，安全返程", "· 深圳湾日落｜旅程收束", photo.shenzhenFresh, colors.gray, "10月7日", "（周二）"],
];

function segment(pathData, color, dashed = false) {
  return `<path d="${pathData}" fill="none" stroke="#FFFFFF" stroke-width="9" stroke-linecap="round"/><path d="${pathData}" fill="none" stroke="${color}" stroke-width="4" stroke-linecap="round"${dashed ? ' stroke-dasharray="7 6"' : ""}/>`;
}

async function smallPhoto(input) {
  return sharp(input).resize(81, 57, { fit: "cover", position: "attention" }).jpeg({ quality: 92 }).toBuffer();
}

async function createPoster({ plan, days, isBackup }) {
  const layers = [{ input: source, left: 0, top: 0 }];
  const routeText = isBackup
    ? "深圳 → 玉林 → 昆明 → 大理 → 香格里拉 → 丽江 → 昆明 → 南宁 → 深圳"
    : "深圳 → 玉林 → 昆明 → 大理 → 香格里拉 → 飞来寺 / 梅里雪山 → 丽江 → 昆明 → 南宁 → 深圳";
  const returnRoute = "M327 280 C302 378 305 470 313 550 C404 601 533 625 607 631 C683 641 740 650 776 657";
  const backupToLijiang = "M169 355 C205 335 267 300 327 280";

  const dayEight = ["Day 8", "香格里拉深度游", "· 纳帕海环湖 / 伊拉草原", "· 松赞林寺｜独克宗古城", "· 酥油茶 / 牦牛肉火锅", photo.napahai, colors.purple, "10月2日", "（周四）"];
  const expandedDays = [dayEight, ...days];
  const dayCards = expandedDays.map((item, index) => {
    const [day, title, line1, line2, line3, , color, date, weekday] = item;
    const y = 594 + index * 81;
    // Exact Day 1 card geometry: 73px row, 72×65 date block, 84×57 photo.
    return `${rect(966, y, 559, 73, 10, "#FFFFFF", color, 1.2)}${rect(971, y + 4, 72, 65, 9, "#F7FBF8", color, 1)}${text(1007, y + 22, day, 13.5, color, 700, "middle")}${text(1007, y + 41, date, 10, colors.ink, 600, "middle")}${text(1007, y + 57, weekday, 10, colors.ink, 600, "middle")}${text(1058, y + 19, title, 14.2, colors.ink, 700)}${text(1058, y + 36, line1, 9.4, colors.ink, 500)}${text(1058, y + 49, line2, 9.4, colors.ink, 500)}${text(1058, y + 62, line3, 9.4, colors.ink, 500)}${rect(1431, y + 8, 84, 57, 7, "#FFFFFF", color, 1)}`;
  }).join("");

  const overlay = [
    rect(35, 62, 880, 49, 0, "#FFFFFF"),
    text(39, 82, routeText, 12, colors.ink, 700),
    rect(270, 118, 158, 53, 4, "#FFFFFF"), text(287, 139, "自驾里程", 11, colors.ink, 700), text(287, 158, isBackup ? "约4040公里" : "约4380公里", 13, colors.ink, 700),
    rect(660, 118, 258, 53, 4, "#FFFFFF"), text(677, 139, "核心体验", 11, colors.ink, 700), text(677, 158, isBackup ? "天气备选 / 稳妥返程" : "车宿飞来寺 / 日照金山", 11.5, colors.ink, 700),
    ...(isBackup ? [segment(backupToLijiang, colors.green)] : []),
    segment(returnRoute, colors.gray, true),
    // Remove the old 百色 stop inherited from the supplied original guide map.
    rect(510, 322, 102, 60, 6, "#F8FBFC", "#C9E6EE", 1),
    text(561, 347, "南宁", 16, colors.ink, 700, "middle"),
    text(561, 366, isBackup ? "D11–12｜住2晚" : "D12｜住1晚", 10, colors.gray, 700, "middle"),
    rect(494, 588, 222, 34, 7, "#FFFFFF", "#B8C7D5", 1),
    text(505, 608, isBackup ? "备选：香格里拉 → 丽江 → 昆明 → 南宁（住2晚）→ 深圳" : "主线：飞来寺车宿 → 丽江 → 昆明 → 南宁（住1晚）→ 深圳", 9.4, colors.gray, 700),
    // Keep Day 8 onwards exactly in the same visual system as the original Day 1 card.
    rect(964, 588, 564, 498, 0, "#FFFFFF"),
    dayCards,
    rect(24, 1036, 916, 52, 12, "#FFFFFF", "#B8C7D5", 1.1),
    text(48, 1058, isBackup ? "备选返程：香格里拉 → 丽江 → 昆明 → 南宁住 2 晚 → 深圳" : "主线返程：飞来寺车宿 → 丽江 → 昆明 → 南宁住 1 晚 → 深圳", 13, isBackup ? colors.green : colors.red, 700),
    text(48, 1078, "行程以实时天气、路况及体力状态为准。", 11, colors.gray, 500),
  ].join("");

  layers.push({ input: svg(overlay, 1536, 1110), left: 0, top: 0 });
  for (let index = 0; index < expandedDays.length; index += 1) layers.push({ input: await smallPhoto(expandedDays[index][5]), left: 1433, top: 602 + index * 81 });

  await sharp({ create: { width: 1536, height: 1110, channels: 4, background: "#F7F3EA" } })
    .composite(layers)
    .png({ compressionLevel: 9 })
    .toFile(path.join(output, `yunnan-plan-${plan}-original-style.png`));
}

await mkdir(output, { recursive: true });
await createPoster({ plan: "a", days: mainDays, isBackup: false });
await createPoster({ plan: "b", days: backupDays, isBackup: true });
