export interface TripDay {
  day: string;
  date: string;
  from: string;
  to: string;
  distance: string;
  duration: string;
  route: string[];
  highlights: string[];
  hotel: {
    name: string;
    location: string;
    oxygen: boolean;
    price: string;
    rating: number;
    tags: string[];
  };
  weather: {
    temp: string;
    condition: string;
    altitude: string;
  };
  schedule: {
    time: string;
    activity: string;
    type: 'morning' | 'midday' | 'afternoon' | 'evening';
  }[];
  attractions: {
    name: string;
    description: string;
    bestTime: string;
    photoSpot: string;
    lens: string;
    image: string;
  }[];
}

export interface Destination {
  id: string;
  name: string;
  subtitle: string;
  description: string;
  duration: string;
  theme: string;
  coordinates: { x: number; y: number };
  icon: string;
  recommendations: string[];
  images: string[];
}

export interface Hotel {
  id: string;
  name: string;
  location: string;
  price: string;
  rating: number;
  tags: string[];
  reason: string[];
  distance: { landmark: string; distance: string }[];
  image: string;
  oxygen: boolean;
  heating: boolean;
  parking: boolean;
  lat: number;
  lng: number;
}

export interface PhotoSpot {
  id: string;
  name: string;
  bestTime: string;
  lens: string;
  description: string;
  tips: string[];
  image: string;
  rating: number;
}

export interface HotelExtended extends Hotel {
  confirmed: boolean;
  confirmedTags: string[];
  city: string;
}

/** 总里程 (km) — 单一数据源，所有模块读取此字段 */
export const TOTAL_DISTANCE = 3960;

/** 最高海拔 (m) */
export const MAX_ALTITUDE = 4300;

export interface CityWeather {
  city: string;
  altitude: string;
  temp: string;
  condition: string;
  advice: string[];
}
