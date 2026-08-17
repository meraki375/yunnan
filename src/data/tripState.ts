export type CostInputs = {
  travelers: number;
  fuelEfficiency: number;
  fuelPrice: number;
  tolls: number;
  pendingHotelAverage: number;
  foodPerPersonPerDay: number;
  tickets: number;
  parkingAndCarCare: number;
  photographyAndMisc: number;
  contingency: number;
};

export const INITIAL_COST_INPUTS: CostInputs = {
  travelers: 2,
  fuelEfficiency: 8.5,
  fuelPrice: 7.6,
  tolls: 0,
  pendingHotelAverage: 0,
  foodPerPersonPerDay: 0,
  tickets: 0,
  parkingAndCarCare: 0,
  photographyAndMisc: 0,
  contingency: 0,
};

export const COST_INPUTS_STORAGE_KEY = "shanhai-yueyue:cost-inputs";
export const PACKING_STORAGE_KEY = "shanhai-yueyue:packing-checked";
export const MEMOS_STORAGE_KEY = "shanhai-yueyue:memos";

export const MEMO_CATEGORIES = [
  { id: "clothing", label: "衣" },
  { id: "food", label: "食" },
  { id: "lodging", label: "住" },
  { id: "transport", label: "行" },
  { id: "other", label: "其他" },
  { id: "mood", label: "心情" },
] as const;

export type MemoCategory = (typeof MEMO_CATEGORIES)[number]["id"];

export type TripMemo = {
  _id: string;
  text: string;
  category: MemoCategory;
  completed: boolean;
  createdAt: number;
  updatedAt: number;
};
