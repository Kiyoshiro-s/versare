export type Bean = {
  id: number;
  name: string;
  origin: string;
  farm: string;
  process: string;
  roast: number; // 1-5
  taste: string;
  memo: string;
  image?: string;
};

export type Recipe = {
  id: number;
  title: string;
  bean: string;
  method: string;
  grind: string;
  dose: string;
  water: string;
  temp: string;
  time: string;
  memo: string;
  image?: string;
  video?: string;
};

export type Cafe = {
  id: number;
  name: string;
  location: string;
  drink: string;
  type: string;
  memo: string;
  image?: string;
};
