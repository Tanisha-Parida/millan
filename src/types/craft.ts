export interface CraftItem {
  id: string;
  title: string;
  category: string; // "Textiles" | "Pottery & Terracotta" | "Handloom Weaving" | "Dhokra Metalcraft" | "Woodwork & Inlay" | "Leathercraft & Mojaris" | "Stone & Marble Carving" | "Folk & Tribal Art"
  subCategory: string;
  region: string;
  state: string;
  image: string;
  priceINR: number;
  artisan: string;
  lineage: string;
  hoursToCraft: number;
  materials: string;
  pohhIndex?: number; // Optional historical metadata
  audioNarrative: {
    dialect: string;
    vernacularQuote: string;
    englishTranslation: string;
  };
  hash?: string;
}

export interface CraftCategory {
  id: string;
  title: string;
  subtitle: string;
  description: string;
  image: string;
}

export interface SignatureHub {
  state: string;
  cluster: string;
  description: string;
}

export interface IndianState {
  name: string;
  type: string;
}
