/**
 * 山海赴约 · 本地影像索引
 * 每一张图片都对应行程中的真实地点，下载后随项目发布，避免远程资源失效或出现无关画面。
 */

export interface TravelImage {
  title: string;
  url: string;
  source: "local";
  sourceUrl: string;
  description: string;
}

export interface TravelImages {
  hero: TravelImage;
  dali: { erhai: TravelImage; xizhou: TravelImage; longkan: TravelImage };
  shangrila: { dukezong: TravelImage; songzanlin: TravelImage; napahai: TravelImage };
  meili: { sunrise: TravelImage; feilaiTemple: TravelImage };
  scenery: { yunnanMountain: TravelImage; kunming: TravelImage; yulin: TravelImage };
}

const sources = {
  shenzhen: "https://pc.nfnews.com/39/4061202.html",
  yulin: "https://www.sohu.com/a/841189656_100306",
  kunming: "https://www.sohu.com/a/470420446_124709",
  dali: "https://english.news.cn/20241101/7df0d5fb80414aec8a5865ccd7962731/c.html",
  shangrila: "https://www.visitourchina.com/diqing-shangri-la/attraction/songzanlin-monastery.html",
  meili: "https://sg.trip.com/travel-guide/attraction/deqin/meili-snow-mountain-national-park-sunrise-on-the-golden-mountain-145242933/",
  nanning: "https://www.sohu.com/a/760247685_121106875",
  lijiang: "https://m.cnhubei.com/content/2024-05/17/content_17909342.html",
  baise: "https://you.ctrip.com/sight/baise524/2020987.html",
};

const image = (title: string, url: string, sourceUrl: string, description: string): TravelImage => ({
  title,
  url,
  source: "local",
  sourceUrl,
  description,
});

const shenzhen = image("深圳湾春笋", "/images/destinations/shenzhen-bay.jpg", sources.shenzhen, "深圳湾的城市天际线与华润大厦");
const yulin = image("玉林云天文化城", "/images/destinations/yulin-yuntian.jpg", sources.yulin, "云天文化城的仿古建筑群");
const kunming = image("滇池与西山", "/images/destinations/kunming-dianchi.jpg", sources.kunming, "从西山远望滇池与昆明城");
const dali = image("苍山洱海", "/images/destinations/dali-erhai.jpg", sources.dali, "苍山脚下的洱海与白族村落");
const shangrila = image("松赞林寺", "/images/destinations/shangrila-songzanlin.jpg", sources.shangrila, "香格里拉松赞林寺的金顶与山谷");
const meili = image("梅里日照金山", "/images/destinations/meili-sunrise.jpg", sources.meili, "清晨阳光落在梅里雪山的峰顶");
const heroMeili = image("梅里云海晨光", "/images/route/meili.jpg", sources.meili, "云海铺在梅里雪山脚下的清晨暖光");
const nanning = image("南宁青秀山", "/images/destinations/nanning-qingxiu.jpg", sources.nanning, "青秀山的龙象塔与林间长廊");
const lijiang = image("丽江古城", "/images/destinations/lijiang-old-town.jpg", sources.lijiang, "丽江古城的石板路与纳西建筑");
const baise = image("百色解放街", "/images/destinations/baise-jiefang.jpg", sources.baise, "百色解放街的城市建筑风景");

export const travelImages: TravelImages = {
  hero: heroMeili,
  dali: { erhai: dali, xizhou: dali, longkan: dali },
  shangrila: { dukezong: shangrila, songzanlin: shangrila, napahai: shangrila },
  meili: { sunrise: meili, feilaiTemple: meili },
  scenery: { yunnanMountain: meili, kunming, yulin },
};

export const destinationImages: Record<string, TravelImage> = {
  shenzhen,
  yulin,
  kunming,
  dali,
  shangrila,
  meili,
  lijiang,
  baise,
  nanning,
};

export const fallbackImage =
  "data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='800' height='600' viewBox='0 0 800 600'%3E%3Crect width='800' height='600' fill='%23102033'/%3E%3Ctext x='400' y='310' font-family='serif' font-size='20' fill='%23d89b3c' text-anchor='middle'%3E%E5%B1%B1%E6%B5%B7%E8%B5%B4%E7%BA%A6%3C/text%3E%3C/svg%3E";

export const placeholderImage =
  "data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='800' height='600' viewBox='0 0 800 600'%3E%3Crect width='800' height='600' fill='%23F7F3EA'/%3E%3Ctext x='400' y='300' font-family='serif' font-size='13' fill='%23A8A29E' text-anchor='middle'%3E%E5%BE%85%E8%A1%A5%E5%85%85%3C/text%3E%3C/svg%3E";

export default travelImages;
