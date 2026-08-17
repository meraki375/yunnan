const TRIP_START = new Date(2026, 8, 25);
const TRIP_END = new Date(2026, 9, 7);
const DAY_IN_MS = 24 * 60 * 60 * 1000;

function atStartOfLocalDay(timestamp: number) {
  const date = new Date(timestamp);
  return new Date(date.getFullYear(), date.getMonth(), date.getDate());
}

function differenceInDays(later: Date, earlier: Date) {
  return Math.round((later.getTime() - earlier.getTime()) / DAY_IN_MS);
}

export function getMemoTravelMoment(referenceTimestamp = Date.now()) {
  const today = atStartOfLocalDay(referenceTimestamp);

  if (today < TRIP_START) return `离启程还有 ${differenceInDays(TRIP_START, today)} 天`;
  if (today <= TRIP_END) return `旅程第 ${differenceInDays(today, TRIP_START) + 1} 天`;
  return `旅程已过 ${differenceInDays(today, TRIP_END)} 天`;
}

export function formatMemoTravelTime(createdAt: number, referenceTimestamp = Date.now()) {
  const date = new Intl.DateTimeFormat("zh-CN", { month: "numeric", day: "numeric" }).format(createdAt);
  return `${date} · ${getMemoTravelMoment(referenceTimestamp)}`;
}
