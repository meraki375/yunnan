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
};

const text = (x, y, value, size, fill = colors.navy, weight = 400, anchor = "start") =>
  `<text x="${x}" y="${y}" text-anchor="${anchor}" fill="${fill}" font-family="PingFang SC, Noto Sans CJK SC, Microsoft YaHei, sans-serif" font-size="${size}" font-weight="${weight}">${String(value).replaceAll("&", "&amp;").replaceAll("<", "&lt;").replaceAll(">", "&gt;")}</text>`;
const rect = (x, y, width, height, radius, fill, stroke = "none", strokeWidth = 1) => `<rect x="${x}" y="${y}" width="${width}" height="${height}" rx="${radius}" fill="${fill}" stroke="${stroke}" stroke-width="${strokeWidth}"/>`;
const svg = (content) => Buffer.from(`<svg xmlns="http://www.w3.org/2000/svg" width="1536" height="1024" viewBox="0 0 1536 1024">${content}</svg>`);

const dayY = [42, 123, 204, 286, 368, 449, 518, 600, 662, 743, 824, 886, 946];

const mainDays = [
  ["Day 9", "香格里拉 → 飞来寺", "· 约180km ｜4–5小时", "· 白马雪山｜梅里日落｜车宿 1 晚", photo.meili, colors.red],
  ["Day 10", "飞来寺 → 丽江", "· 清晨等日照金山后返程", "· 约340km ｜6–7小时｜丽江待订", photo.lijiang, colors.red],
  ["Day 11", "丽江 → 昆明", "· 约520km ｜6小时", "· 昆明返程住 1 晚｜酒店待订", photo.kunming, colors.gray],
  ["Day 12", "昆明 → 南宁", "· 约800km ｜9–10小时", "· 南宁待订 1 晚｜避免疲劳驾驶", photo.nanning, colors.gray],
  ["Day 13", "南宁 → 深圳", "· 约720km ｜8小时", "· 返抵深圳｜旅程收束", photo.shenzhen, colors.gray],
];

const backupDays = [
  ["Day 9", "香格里拉 → 丽江", "· 约180km ｜3.5–4.5小时", "· 直接南下｜跳过飞来寺", photo.lijiang, colors.green],
  ["Day 10", "丽江 → 昆明", "· 约520km ｜6小时", "· 昆明待订 1 晚｜缓冲返程", photo.kunming, colors.gray],
  ["Day 11", "昆明 → 南宁", "· 约800km ｜9–10小时", "· 南宁待订第 1 晚", photo.nanning, colors.gray],
  ["Day 12", "南宁", "· 市内休整", "· 南宁待订第 2 晚", photo.nanning, colors.gray],
  ["Day 13", "南宁 → 深圳", "· 约720km ｜8小时", "· 返抵深圳｜旅程收束", photo.shenzhen, colors.gray],
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

  const dayCards = days.map((item, index) => {
    const [day, title, line1, line2, , color] = item;
    const y = dayY[index + 8] - 3;
    return `${rect(966, y, 559, 73, 10, "#FFFFFF", color, 1.2)}${rect(971, y + 4, 72, 65, 9, "#F7FBF8", color, 1)}${text(1007, y + 26, day, 14, color, 700, "middle")}${text(1058, y + 22, title, 15, colors.ink, 700)}${text(1058, y + 42, line1, 11, colors.ink, 500)}${text(1058, y + 58, line2, 10.5, colors.ink, 500)}${rect(1431, y + 8, 84, 57, 7, "#FFFFFF", color, 1)}`;
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
    rect(964, 649, 564, 371, 0, "#FFFFFF"),
    dayCards,
    text(1050, 648, isBackup ? "D9 起走天气备选：不经过飞来寺" : "D9 起走梅里主线：飞来寺车宿 1 晚", 10.5, isBackup ? colors.green : colors.red, 700),
  ].join("");

  layers.push({ input: svg(overlay), left: 0, top: 0 });
  for (let index = 0; index < days.length; index += 1) layers.push({ input: await smallPhoto(days[index][4]), left: 1433, top: dayY[index + 8] + 5 });

  await sharp({ create: { width: 1536, height: 1024, channels: 4, background: "#FFFFFF" } })
    .composite(layers)
    .png({ compressionLevel: 9 })
    .toFile(path.join(output, `yunnan-plan-${plan}-original-style.png`));
}

await mkdir(output, { recursive: true });
await createPoster({ plan: "a", days: mainDays, isBackup: false });
await createPoster({ plan: "b", days: backupDays, isBackup: true });
