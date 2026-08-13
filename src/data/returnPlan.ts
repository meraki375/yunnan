import type { HotelExtended, TripDay } from "./trip";
import { hotelsData, tripDays } from "./tripData";

export type ReturnPlan = "main" | "weather";

export const RETURN_PLAN_STORAGE_KEY = "shanhai-yueyue:return-plan";
export const MAIN_ROUTE_DISTANCE = 4380;
export const WEATHER_ROUTE_DISTANCE = 4040;
const pendingHotelNightsByPlan: Record<ReturnPlan, number> = { main: 3, weather: 4 };

const kunmingReturnHotel: HotelExtended = {
  id: "hotel-kunming-return",
  name: "昆明｜返程住宿待预订",
  location: "昆明 · 返程休整",
  price: "—",
  rating: 0,
  tags: ["返程", "1晚", "待预订"],
  reason: ["返程再次经过昆明时使用。", "与 Day 2 已确认的昆明酒店为不同住宿日期，请按实际需要预订。"],
  distance: [],
  image: "",
  oxygen: false,
  heating: false,
  parking: true,
  lat: 25.04,
  lng: 102.71,
  confirmed: false,
  confirmedTags: ["待预订", "返程", "1晚"],
  city: "昆明",
};

const feilaiCarSleep: HotelExtended = {
  id: "stay-feilai-car",
  name: "飞来寺｜后备厢车宿",
  location: "飞来寺停车区域 · 以现场允许停放区域为准",
  price: "¥0",
  rating: 0,
  tags: ["已确定车宿", "1晚", "后备厢床铺", "自带被褥", "日照金山"],
  reason: [
    "10月3日晚车宿 1 晚，清晨直接前往观景点等待日照金山。",
    "已准备后备厢床铺与被褥；夜间气温低，补充睡袋、保温水和满电电源。",
    "抵达后先确认停车区域、夜间管理与洗手间等公共设施的开放情况。",
  ],
  distance: [{ landmark: "飞来寺观景台", distance: "以当晚停车位置为准" }],
  image: "/images/hotels/feilai-car-sleep.png",
  oxygen: false,
  heating: false,
  parking: true,
  lat: 28.45,
  lng: 98.88,
  confirmed: true,
  confirmedTags: ["车宿已确认", "1晚", "¥0"],
  city: "梅里雪山",
};

function getNanningReturnHotel(nights: 1 | 2): HotelExtended {
  return {
  id: "hotel-nanning-return",
  name: "南宁｜返程住宿待预订",
  location: "南宁 · 返程休整",
  price: "—",
  rating: 0,
  tags: ["返程", `${nights}晚`, "分段返程"],
  reason: [nights === 2 ? "在南宁连住两晚，让丽江至深圳的返程保留一整天休整与补给时间。" : "主线返程在南宁住一晚，避免昆明直返深圳的连续长途驾驶。"],
  distance: [],
  image: "",
  oxygen: false,
  heating: false,
  parking: true,
  lat: 22.82,
  lng: 108.32,
  confirmed: false,
  confirmedTags: ["待预订", "返程", `${nights}晚`],
  city: "南宁",
  };
}

const mainTripDays: TripDay[] = tripDays.map((day) => {
  if (day.day === "Day 9") return {
    ...day,
    highlights: ["白马雪山", "飞来寺车宿", "梅里日落"],
    hotel: { name: "飞来寺｜车宿 1 晚", location: "飞来寺停车区域 · 以现场允许区域为准", oxygen: false, price: "¥0", rating: 0, tags: ["主线", "车宿", "1晚", "不订酒店"] },
    schedule: [
      { time: "08:00", activity: "香格里拉出发，经奔子栏向德钦前进", type: "morning" },
      { time: "12:00", activity: "白马雪山垭口短暂停留，注意保暖与高反", type: "midday" },
      { time: "15:30", activity: "抵达飞来寺，确认允许停车区域与夜间安全", type: "afternoon" },
      { time: "17:30", activity: "等待梅里雪山日落，车宿前补水与保暖准备", type: "evening" },
    ],
  };
  if (day.day === "Day 10") return {
    ...day,
    from: "飞来寺", to: "丽江", distance: "约340km", duration: "6–7h",
    route: ["飞来寺", "德钦", "丽江古城"], highlights: ["梅里晨光", "丽江古城", "返程落脚"],
    hotel: { name: "丽江｜住宿未预订", location: "丽江古城附近", oxygen: false, price: "—", rating: 0, tags: ["主线", "1晚", "古城休整"] },
    weather: { temp: "20°C", condition: "晴", altitude: "2400m" },
    schedule: [
      { time: "06:20", activity: "清晨看完日照金山后整理车宿装备、早餐", type: "morning" },
      { time: "09:00", activity: "飞来寺出发，沿德钦方向前往丽江", type: "morning" },
      { time: "13:00", activity: "沿途午餐与补给", type: "midday" },
      { time: "16:00", activity: "抵达丽江，入住待订酒店，古城慢逛", type: "afternoon" },
    ],
    attractions: [{ name: "丽江古城", description: "看完日照金山后回到石板路与灯火里，住一晚再继续向昆明返程。", bestTime: "17:00", photoSpot: "四方街巷口", lens: "35mm", image: "" }],
  };
  if (day.day === "Day 11") return {
    ...day,
    from: "丽江", to: "昆明", distance: "约520km", duration: "6–7h",
    route: ["丽江", "大理方向", "昆明"], highlights: ["返程入昆", "夜间休整", "待订住宿"],
    hotel: { name: kunmingReturnHotel.name, location: kunmingReturnHotel.location, oxygen: false, price: "—", rating: 0, tags: ["主线", "1晚", "待预订"] },
    weather: { temp: "22°C", condition: "晴", altitude: "1890m" },
    schedule: [
      { time: "08:00", activity: "丽江出发，前往昆明", type: "morning" },
      { time: "12:30", activity: "沿途午餐与轮换驾驶", type: "midday" },
      { time: "16:00", activity: "抵达昆明，入住返程待订酒店", type: "afternoon" },
      { time: "19:00", activity: "简单晚餐，早休息", type: "evening" },
    ],
    attractions: [{ name: "昆明返程夜", description: "用一晚把高原返程拆开，次日再进入广西方向。", bestTime: "傍晚", photoSpot: "酒店周边", lens: "35mm", image: "" }],
  };
  if (day.day === "Day 12") return {
    ...day,
    from: "昆明", to: "南宁", distance: "约800km", duration: "9–10h",
    route: ["昆明", "兴义方向", "南宁"], highlights: ["长途返程", "南宁落脚", "安全休整"],
    hotel: { name: "南宁｜返程住宿待预订", location: "南宁 · 返程休整", oxygen: false, price: "—", rating: 0, tags: ["主线", "1晚", "待预订"] },
    weather: { temp: "28°C", condition: "晴", altitude: "80m" },
    schedule: [
      { time: "07:00", activity: "昆明出发，前往南宁", type: "morning" },
      { time: "12:30", activity: "服务区午餐、加油与轮换驾驶", type: "midday" },
      { time: "18:00", activity: "抵达南宁，入住待订酒店", type: "afternoon" },
      { time: "20:00", activity: "补给后早休息", type: "evening" },
    ],
    attractions: [{ name: "南宁落脚", description: "今天以安全抵达为先，为最后一程回深圳保留体力。", bestTime: "傍晚", photoSpot: "酒店周边", lens: "35mm", image: "" }],
  };
  if (day.day === "Day 13") return {
    ...day,
    from: "南宁", to: "深圳", distance: "约720km", duration: "8–9h",
    route: ["南宁", "广州", "深圳"], highlights: ["最后一程", "安全归来", "旅途收束"],
    hotel: { name: "家", location: "深圳", oxygen: false, price: "¥0", rating: 5, tags: ["已确定", "抵达"] },
    schedule: [
      { time: "07:30", activity: "南宁出发，踏上最后一程", type: "morning" },
      { time: "12:00", activity: "服务区午餐与休整", type: "midday" },
      { time: "17:00", activity: "抵达深圳，安全到家", type: "afternoon" },
    ],
    attractions: [{ name: "回到深圳", description: "十三天的路最终回到日常；把照片和记忆慢慢整理成册。", bestTime: "傍晚", photoSpot: "城市天际线", lens: "35mm", image: "" }],
  };
  return day;
});

const backupTripDays: TripDay[] = tripDays.map((day) => {
  if (day.day === "Day 9") return {
    ...day,
    from: "香格里拉", to: "丽江", distance: "约180km", duration: "3.5–4.5h",
    route: ["香格里拉", "虎跳峡方向", "丽江古城"],
    highlights: ["天气备选", "分段返程", "丽江古城"],
    hotel: { name: "丽江｜住宿未预订", location: "丽江古城附近", oxygen: false, price: "—", rating: 0, tags: ["备选方案", "1晚", "古城休整"] },
    weather: { temp: "20°C", condition: "晴转多云", altitude: "2400m" },
    schedule: [
      { time: "09:00", activity: "确认不前往飞来寺，离开香格里拉前往丽江", type: "morning" },
      { time: "12:30", activity: "沿途午餐与短暂休整", type: "midday" },
      { time: "15:30", activity: "抵达丽江，入住待订酒店", type: "afternoon" },
      { time: "18:30", activity: "丽江古城慢逛，早点休息", type: "evening" },
    ],
    attractions: [{ name: "丽江古城", description: "把梅里雪山的不确定性留在身后，在古城住一晚，给返程腾出从容。", bestTime: "17:00", photoSpot: "四方街巷口", lens: "35mm", image: "" }],
  };
  if (day.day === "Day 10") return {
    ...day,
    from: "丽江", to: "昆明", distance: "约520km", duration: "6–7h",
    route: ["丽江", "大理方向", "昆明"], highlights: ["返程入昆", "夜间休整", "待订住宿"],
    hotel: { name: kunmingReturnHotel.name, location: kunmingReturnHotel.location, oxygen: false, price: "—", rating: 0, tags: ["备选方案", "1晚", "待预订"] },
    weather: { temp: "22°C", condition: "晴", altitude: "1890m" },
    schedule: [
      { time: "08:00", activity: "丽江出发，前往昆明", type: "morning" },
      { time: "12:30", activity: "沿途午餐、加油与轮换驾驶", type: "midday" },
      { time: "16:00", activity: "抵达昆明，入住待订酒店", type: "afternoon" },
      { time: "20:00", activity: "简单补给，早休息", type: "evening" },
    ],
    attractions: [{ name: "昆明返程夜", description: "提前在昆明住一晚，避免直接进入长距离返程。", bestTime: "傍晚", photoSpot: "酒店周边", lens: "35mm", image: "" }],
  };
  if (day.day === "Day 11") return {
    ...day,
    from: "昆明", to: "南宁", distance: "约800km", duration: "9–10h",
    route: ["昆明", "兴义方向", "南宁"], highlights: ["长途返程", "南宁休整", "降低疲劳"],
    hotel: { name: "南宁｜返程住宿待预订", location: "南宁 · 返程休整", oxygen: false, price: "—", rating: 0, tags: ["备选方案", "第1晚", "待预订"] },
    weather: { temp: "28°C", condition: "晴", altitude: "80m" },
    schedule: [
      { time: "07:00", activity: "昆明出发，进入广西方向长途返程", type: "morning" },
      { time: "12:30", activity: "服务区午餐、加油与轮换驾驶", type: "midday" },
      { time: "15:00", activity: "办理南宁待订住宿，留出休整时间", type: "afternoon" },
      { time: "19:00", activity: "简单晚餐，早休息", type: "evening" },
    ],
    attractions: [{ name: "南宁休整", description: "抵达后连住两晚，用完整一天卸下长途驾驶的疲劳。", bestTime: "下午", photoSpot: "酒店周边", lens: "35mm", image: "" }],
  };
  if (day.day === "Day 12") return {
    ...day,
    from: "南宁", to: "南宁", distance: "市内休整", duration: "全天",
    route: ["南宁"], highlights: ["连住第2晚", "补给休整", "最后一程准备"],
    hotel: { name: "南宁｜返程住宿待预订", location: "南宁 · 返程休整", oxygen: false, price: "—", rating: 0, tags: ["备选方案", "第2晚", "待预订"] },
    weather: { temp: "28°C", condition: "晴", altitude: "80m" },
    schedule: [
      { time: "09:30", activity: "南宁慢节奏早餐，检查车辆与返程路线", type: "morning" },
      { time: "12:30", activity: "市内午餐与补给，避开长途驾驶", type: "midday" },
      { time: "15:00", activity: "整理照片、行李和次日通行安排", type: "afternoon" },
      { time: "18:30", activity: "南宁晚餐，连住第2晚，早休息", type: "evening" },
    ],
    attractions: [{ name: "南宁休整日", description: "不再绕行玉林，把最后一个完整白天留给睡眠、补给和车辆整理。", bestTime: "全天", photoSpot: "青秀山或酒店周边", lens: "35mm", image: "" }],
  };
  if (day.day === "Day 13") return {
    ...day,
    from: "南宁", to: "深圳", distance: "约720km", duration: "8–9h",
    route: ["南宁", "广州", "深圳"], highlights: ["最后一程", "安全归来", "旅途收束"],
    hotel: { name: "家", location: "深圳", oxygen: false, price: "¥0", rating: 5, tags: ["已确定", "抵达"] },
    schedule: [
      { time: "07:30", activity: "南宁出发，踏上最后一程", type: "morning" },
      { time: "12:00", activity: "服务区午餐与休整", type: "midday" },
      { time: "17:00", activity: "抵达深圳，安全到家", type: "afternoon" },
      { time: "18:30", activity: "整理照片与行李，为旅程收尾", type: "evening" },
    ],
    attractions: [{ name: "回到深圳", description: "十三天的路最终回到日常；把照片和记忆慢慢整理成册。", bestTime: "傍晚", photoSpot: "城市天际线", lens: "35mm", image: "" }],
  };
  return day;
});

export function getTripDaysForReturnPlan(plan: ReturnPlan) {
  return plan === "weather" ? backupTripDays : mainTripDays;
}

export function getRouteDistanceForReturnPlan(plan: ReturnPlan) {
  return plan === "weather" ? WEATHER_ROUTE_DISTANCE : MAIN_ROUTE_DISTANCE;
}

export function getMaxAltitudeForReturnPlan(plan: ReturnPlan) {
  return plan === "weather" ? 3300 : 4300;
}

export function getHotelsForReturnPlan(plan: ReturnPlan) {
  const baseHotels = hotelsData.filter((hotel) => hotel.id !== "hotel-baise" && hotel.id !== "hotel-feilai");
  if (plan === "main") return [...baseHotels, feilaiCarSleep, kunmingReturnHotel, getNanningReturnHotel(1)];
  return [...baseHotels, kunmingReturnHotel, getNanningReturnHotel(2)];
}

export function getPendingHotelNights(plan: ReturnPlan) {
  return pendingHotelNightsByPlan[plan];
}

export function getPendingHotelSummary(plan: ReturnPlan) {
  return plan === "weather"
    ? "待订住宿包括丽江 1 晚、昆明 1 晚、南宁 2 晚；飞来寺不再预订，备选返程不再经过百色。"
    : "待订住宿包括丽江 1 晚、昆明 1 晚、南宁 1 晚；飞来寺车宿 1 晚，不计酒店费用；主线不再经过百色。";
}
