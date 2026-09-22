import React, { useState, useMemo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  Search,
  ShoppingBag,
  Volume2,
  VolumeX,
  Sparkles,
  ShieldCheck,
  ArrowUpRight,
  ExternalLink,
  Menu,
  QrCode,
  CheckCircle2,
  X,
  Cpu,
  Heart,
  MapPin,
  ArrowLeft,
  ChevronRight,
  ChevronLeft,
} from '../lib/lucide-react';

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
  pohhIndex: number; // Proof of Human Hand authenticity percentage
  audioNarrative: {
    dialect: string;
    vernacularQuote: string;
    englishTranslation: string;
  };
  hash: string;
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

export const CRAFT_CATEGORIES: CraftCategory[] = [
  {
    id: 'Textiles',
    title: 'Textiles',
    subtitle: 'Regional | Textiles',
    description: 'Rich woven Banarasi, Chanderi, Patola & Kanchipuram silk folds.',
    image: '/images/ikat.jpg',
  },
  {
    id: 'Pottery & Terracotta',
    title: 'Pottery & Terracotta',
    subtitle: 'Regional | Pottery',
    description: 'Hand-turned earthenware, Khurja ceramics & Longpi stone pots.',
    image: '/images/pottery.jpg',
  },
  {
    id: 'Handloom Weaving',
    title: 'Handloom Weaving',
    subtitle: 'Regional | Weaving',
    description: 'Traditional geometric pit-loom & backstrap loom heritage fabrics.',
    image: '/images/weaver.jpg',
  },
  {
    id: 'Dhokra Metalcraft',
    title: 'Dhokra Metalcraft',
    subtitle: 'Regional | Metalcraft',
    description: '4,000-year-old lost-wax cast bell metal & brass tribal artifacts.',
    image: '/images/dhokra.jpg',
  },
  {
    id: 'Woodwork & Inlay',
    title: 'Woodwork & Inlay',
    subtitle: 'Regional | Woodcraft',
    description: 'Carved Kashmir walnut, Channapatna lacquer & brass inlay.',
    image: '/images/toys.jpg',
  },
  {
    id: 'Leathercraft & Mojaris',
    title: 'Leathercraft & Mojaris',
    subtitle: 'Regional | Leather',
    description: 'Hand-stitched embroidered Mojaris, Juttis & Kolhapuri footwear.',
    image: '/images/leathercraft-mojari.jpg',
  },
  {
    id: 'Stone & Marble Carving',
    title: 'Stone & Marble Carving',
    subtitle: 'Regional | Stonework',
    description: 'Perforated marble jaali screens, Agra pietra dura & Konark carving.',
    image: '/images/jharokha-gate.jpg',
  },
  {
    id: 'Folk & Tribal Art',
    title: 'Folk & Tribal Art',
    subtitle: 'REGIONAL | FINE ART',
    description: 'Madhubani, Pattachitra, Warli & sacred Gond tribal canvases.',
    image: '/images/folk-tribal-art.jpg',
  },
];

// All 28 States and 8 Union Territories
export const ALL_INDIAN_STATES = [
  { name: 'Andhra Pradesh', type: 'State' },
  { name: 'Arunachal Pradesh', type: 'State' },
  { name: 'Assam', type: 'State' },
  { name: 'Bihar', type: 'State' },
  { name: 'Chhattisgarh', type: 'State' },
  { name: 'Goa', type: 'State' },
  { name: 'Gujarat', type: 'State' },
  { name: 'Haryana', type: 'State' },
  { name: 'Himachal Pradesh', type: 'State' },
  { name: 'Jharkhand', type: 'State' },
  { name: 'Karnataka', type: 'State' },
  { name: 'Kerala', type: 'State' },
  { name: 'Madhya Pradesh', type: 'State' },
  { name: 'Maharashtra', type: 'State' },
  { name: 'Manipur', type: 'State' },
  { name: 'Meghalaya', type: 'State' },
  { name: 'Mizoram', type: 'State' },
  { name: 'Nagaland', type: 'State' },
  { name: 'Odisha', type: 'State' },
  { name: 'Punjab', type: 'State' },
  { name: 'Rajasthan', type: 'State' },
  { name: 'Sikkim', type: 'State' },
  { name: 'Tamil Nadu', type: 'State' },
  { name: 'Telangana', type: 'State' },
  { name: 'Tripura', type: 'State' },
  { name: 'Uttar Pradesh', type: 'State' },
  { name: 'Uttarakhand', type: 'State' },
  { name: 'West Bengal', type: 'State' },
  // 8 Union Territories
  { name: 'Andaman & Nicobar Islands', type: 'Union Territory' },
  { name: 'Chandigarh', type: 'Union Territory' },
  { name: 'Dadra & Nagar Haveli and Daman & Diu', type: 'Union Territory' },
  { name: 'Delhi (NCT)', type: 'Union Territory' },
  { name: 'Jammu & Kashmir', type: 'Union Territory' },
  { name: 'Ladakh', type: 'Union Territory' },
  { name: 'Lakshadweep', type: 'Union Territory' },
  { name: 'Puducherry', type: 'Union Territory' },
];

export const SIGNATURE_HUBS_BY_CATEGORY: Record<string, SignatureHub[]> = {
  'Textiles': [
    { state: 'Uttar Pradesh', cluster: 'Banaras & Mubarakpur', description: 'Real Zari Kadhwa Silk Brocades' },
    { state: 'Gujarat', cluster: 'Patan & Kutch', description: 'Double Ikat Patola & Desert Bandhani' },
    { state: 'Madhya Pradesh', cluster: 'Chanderi & Maheshwar', description: 'Gossamer Zari Cotton-Silk Weaves' },
    { state: 'Assam', cluster: 'Sualkuchi', description: 'Endemic Golden Muga Wild Silk' },
    { state: 'West Bengal', cluster: 'Phulia & Shantipur', description: 'Fine Muslin Jamdani & Baluchari' },
    { state: 'Tamil Nadu', cluster: 'Kanchipuram & Arani', description: 'Pure Mulberry Silk Temple Borders' },
  ],
  'Pottery & Terracotta': [
    { state: 'Uttar Pradesh', cluster: 'Khurja & Nizamabad', description: 'Celadon Ceramics & Smoked Black Clay' },
    { state: 'Rajasthan', cluster: 'Jaipur & Alwar', description: 'Persian Quartz Blue Pottery & Kagzi Clay' },
    { state: 'Manipur', cluster: 'Longpi (Ukhrul)', description: 'Serpentine Rock Wheel-less Earthenware' },
    { state: 'West Bengal', cluster: 'Bankura & Bishnupur', description: 'Ancient Terracotta Votive Sculptures' },
    { state: 'Jammu & Kashmir', cluster: 'Srinagar Old City', description: 'Glazed Kashmiri Dal Lake Clay Ware' },
  ],
  'Handloom Weaving': [
    { state: 'Odisha', cluster: 'Bargarh & Nuapatna', description: 'Sambalpuri & Maniabandha Bandha Ikat' },
    { state: 'Andhra Pradesh', cluster: 'Pochampally & Mangalagiri', description: 'Geometric Telia Rumal & Fine Cottons' },
    { state: 'Nagaland', cluster: 'Kohima & Dimapur', description: 'Backstrap Loom Clan Diamond Shawls' },
    { state: 'Himachal Pradesh', cluster: 'Kullu & Kinnaur', description: 'Geometric Bordered Yak & Merino Wool' },
  ],
  'Dhokra Metalcraft': [
    { state: 'Chhattisgarh', cluster: 'Bastar & Kondagaon', description: 'Sacred Tribal Lost-Wax Metallurgy' },
    { state: 'Odisha', cluster: 'Dhenkanal & Sadeibareni', description: 'Brass Filigree Wire Coil Sculptures' },
    { state: 'West Bengal', cluster: 'Bikna & Dariapur', description: 'Pai Rice Measures & Folk Idols' },
    { state: 'Jharkhand', cluster: 'Hazaribagh & Malhor', description: 'Ancient Tribal Bell-Metal Artifacts' },
  ],
  'Woodwork & Inlay': [
    { state: 'Karnataka', cluster: 'Channapatna & Mysuru', description: 'Organic Turmeric Lacquerware & Rosewood' },
    { state: 'Jammu & Kashmir', cluster: 'Srinagar Jaali Guild', description: 'Deep Relief Root Walnut Woodcraft' },
    { state: 'Punjab', cluster: 'Hoshiarpur', description: 'Fine Sheesham Wood Brass Inlay (Tarkashi)' },
    { state: 'Kerala', cluster: 'Thrissur & Nilambur', description: 'Rosewood Temple Carvings & Nettur Petti' },
  ],
  'Leathercraft & Mojaris': [
    { state: 'Rajasthan', cluster: 'Jaipur & Jodhpur', description: 'Hand-Stitched Silk Embroidered Mojaris' },
    { state: 'Punjab', cluster: 'Muktsar & Fazilka', description: 'Real Gold Tilla Needlework Royal Juttis' },
    { state: 'Maharashtra', cluster: 'Kolhapur & Athani', description: 'Natural Tanned Hand-Braided Chappals' },
  ],
  'Stone & Marble Carving': [
    { state: 'Rajasthan', cluster: 'Makrana & Jaipur', description: 'Pure Calcite Marble Jaali & Statuary' },
    { state: 'Uttar Pradesh', cluster: 'Agra Naqqashi', description: 'Mughal Pietra Dura Semi-Precious Inlay' },
    { state: 'Odisha', cluster: 'Konark & Puri', description: 'Khondalite & Black Chlorite Temple Carving' },
    { state: 'Tamil Nadu', cluster: 'Mahabalipuram', description: 'Pallava Monolithic Granite Sculptures' },
  ],
  'Folk & Tribal Art': [
    { state: 'Bihar', cluster: 'Madhubani (Mithila)', description: 'Godna & Kachni Natural Pigment Murals' },
    { state: 'Maharashtra', cluster: 'Palghar & Dahanu', description: 'Ritualistic Rice Paste Warli Murals' },
    { state: 'Odisha', cluster: 'Raghurajpur Heritage Village', description: 'Etched Palm Leaf Tala Pattachitra' },
    { state: 'Madhya Pradesh', cluster: 'Dindori (Gond)', description: 'Sacred Forest Dot-and-Line Folk Canvases' },
    { state: 'Rajasthan', cluster: 'Nathdwara & Bhilwara', description: 'Shrinathji Temple Pichwai & Phad Scrolls' },
  ],
};

const VAULT_ITEMS: CraftItem[] = [
  // --- TEXTILES ---
  {
    id: 'VLT-IKAT-01',
    title: 'Sambalpuri Bandha Silk Saree',
    category: 'Textiles',
    subCategory: 'Pit-Loom Bandha',
    region: 'Barpali',
    state: 'Odisha',
    image: '/images/ikat.jpg',
    priceINR: 14800,
    artisan: 'Minati & Dinabandhu Meher',
    lineage: '5th Gen Master Pit-Loom Weaver',
    hoursToCraft: 36,
    materials: 'Mulberry Tussar Silk, Organic Indigo & Manjistha Root',
    pohhIndex: 99.4,
    audioNarrative: {
      dialect: 'Sambalpuri Kosli',
      vernacularQuote: 'ମୋର ଏଇ ଶାଢ଼ୀ ବୁଣିବା ପାଇଁ ୩୬ ଘଣ୍ଟା ଲାଗିଲା। ସବୁ ସୂତା କୁ ହାତରେ ବାନ୍ଧି ପ୍ରାକୃତିକ ରଙ୍ଗ ଦିଆଯାଇଛି।',
      englishTranslation: 'It took 36 hours of hand calculation on our wooden pit loom. Every single yarn was tied and dip-dyed in natural indigo before weaving the sacred conch motifs.',
    },
    hash: '0x88f2a93c1b09e4d7',
  },
  {
    id: 'VLT-BNRS-05',
    title: 'Banarasi Real Zari Brocade',
    category: 'Textiles',
    subCategory: 'Kadhwa Weave',
    region: 'Varanasi',
    state: 'Uttar Pradesh',
    image: '/images/embroidery.jpg',
    priceINR: 16200,
    artisan: 'Mohammad Shahid Ansari',
    lineage: 'Kadhwa Brocade Weaver Lineage',
    hoursToCraft: 40,
    materials: 'Katan Silk, Pure Silver & Gold Electroplated Zari',
    pohhIndex: 99.3,
    audioNarrative: {
      dialect: 'Bhojpuri / Banarasi',
      vernacularQuote: 'कढ़वा कढ़ने में महीनों बीत जाते हैं। हर बूटी अलग धागे से हाथ से काढ़ी जाती है।',
      englishTranslation: 'Kadhwa weaving leaves no loose threads behind. Each floral bootie is woven individually by hand onto raw mulberry warp.',
    },
    hash: '0x81b7a421ef32c908',
  },
  {
    id: 'VLT-KTCH-03',
    title: 'Kutch Mirrorwork & Ajrakh Stole',
    category: 'Textiles',
    subCategory: 'Desert Mirrorwork',
    region: 'Bhujodi',
    state: 'Gujarat',
    image: '/images/embroidery.jpg',
    priceINR: 9200,
    artisan: 'Fatimabai Khatri',
    lineage: 'Suf & Abhla Embroidery Matriarch',
    hoursToCraft: 32,
    materials: 'Khadi Cotton, Silk Floss, Hand-Blown Abhla Mirrors',
    pohhIndex: 98.9,
    audioNarrative: {
      dialect: 'Kutchi',
      vernacularQuote: 'એક એક કાચ હાથથી ટાંકેલો છે. રણમાં સૂર્યનો તડકો ચમકે એમ આ દર્પણ ચમકે છે.',
      englishTranslation: 'Each miniature mirror is secured using intricate interlacing stitches without breaking glass. Under desert moonlight, it reflects pure starlight.',
    },
    hash: '0x32e9f0814bb65c41',
  },
  {
    id: 'VLT-ASMT-04',
    title: 'Muga Golden Wild Silk Stole',
    category: 'Textiles',
    subCategory: 'Wild Golden Silk',
    region: 'Sualkuchi',
    state: 'Assam',
    image: '/images/weaver.jpg',
    priceINR: 11500,
    artisan: 'Pranita Kalita',
    lineage: 'Royal Ahom Weaving Guild',
    hoursToCraft: 28,
    materials: 'Endemic Muga Silk (Antheraea Assamensis), Natural Gold Sheen',
    pohhIndex: 99.6,
    audioNarrative: {
      dialect: 'Assamese',
      vernacularQuote: 'মুগা ৰেচমৰ সোণালী ৰং কেতিয়াও ম্লান নহয়, ধোৱাৰ পিছত অধিক উজ্জ্বল হৈ পৰে।',
      englishTranslation: 'The golden luster of pure Muga silk never fades; with every natural wash it glistens with deeper royal amber.',
    },
    hash: '0x49c1e092bb83df12',
  },

  // --- POTTERY & TERRACOTTA ---
  {
    id: 'VLT-CLAY-06',
    title: 'Nizamabad Hand-Engraved Black Urn',
    category: 'Pottery & Terracotta',
    subCategory: 'Smoked Terracotta',
    region: 'Nizamabad',
    state: 'Uttar Pradesh',
    image: '/images/pottery.jpg',
    priceINR: 5200,
    artisan: 'Ram Kinkar Prajapati',
    lineage: 'National Merit Kaarigar Lineage',
    hoursToCraft: 18,
    materials: 'Riverbed Silt Clay, Rice-Husk Reduction Luster, Mustard Oil Slip',
    pohhIndex: 98.7,
    audioNarrative: {
      dialect: 'Awadhi / Bhojpuri',
      vernacularQuote: 'नदी की माटी से चाक पर गढ़ा है। धान की भूसी की धुआंधार भट्ठी से यह काला कुदरती रंग और चांदी जैसी नक्काशी निकली है।',
      englishTranslation: 'Sculpted from riverbed sediment on the traditional kick wheel. The deep black sheen comes strictly from smoked rice husks sealed in the kiln.',
    },
    hash: '0x43b1e772f88a91c5',
  },
  {
    id: 'VLT-JPTR-07',
    title: 'Jaipur Turquoise Blue Pottery Jar',
    category: 'Pottery & Terracotta',
    subCategory: 'Quartz Glaze',
    region: 'Jaipur',
    state: 'Rajasthan',
    image: '/images/pottery.jpg',
    priceINR: 4400,
    artisan: 'Gopal Saini',
    lineage: 'Royal Amber Glaze Master',
    hoursToCraft: 16,
    materials: 'Quartz Powder, Multani Mitti, Copper Oxide & Natural Gum',
    pohhIndex: 98.5,
    audioNarrative: {
      dialect: 'Marwari',
      vernacularQuote: 'बिना मिट्टी के कांच, क्वार्ट्ज़ और गोंद से गढ़ा जाता है। फिर तांबे के नीले रंग से रंगते हैं।',
      englishTranslation: 'Made without conventional clay—utilizing pulverized quartz crystal and copper oxides to achieve Persian turquoise blue that never cracks.',
    },
    hash: '0x99a3b814df22ec77',
  },
  {
    id: 'VLT-MNPR-08',
    title: 'Longpi Black Serpent Stone Pot',
    category: 'Pottery & Terracotta',
    subCategory: 'Stone & Clay Coil',
    region: 'Ukhrul',
    state: 'Manipur',
    image: '/images/pottery.jpg',
    priceINR: 3800,
    artisan: 'Athei Wungnaoshang',
    lineage: 'Tangkhul Naga Clan Pottery',
    hoursToCraft: 14,
    materials: 'Weathered Serpentine Rock, River Clay, Chirong Mahi Leaf Polish',
    pohhIndex: 99.2,
    audioNarrative: {
      dialect: 'Tangkhul Naga',
      vernacularQuote: 'Longpi pot is made without pottery wheel, hand-shaped from crushed black river stone and polished with tree leaves.',
      englishTranslation: 'Hand-beaten from crushed riverbed serpentine stone without any potter’s wheel. Polished with local tree leaves while hot from open fire.',
    },
    hash: '0x71d2e994af18c023',
  },

  // --- HANDLOOM WEAVING ---
  {
    id: 'VLT-WEAV-09',
    title: 'Pochampally Telia Rumal Ikat',
    category: 'Handloom Weaving',
    subCategory: 'Double Ikat',
    region: 'Nalgonda',
    state: 'Andhra Pradesh',
    image: '/images/weaver.jpg',
    priceINR: 8400,
    artisan: 'G. Yadaiah',
    lineage: 'Telia Rumal Guild Weaver',
    hoursToCraft: 26,
    materials: 'Fine Handspun Cotton, Castor Oil Treatment, Natural Alizarin Red',
    pohhIndex: 99.3,
    audioNarrative: {
      dialect: 'Telugu',
      vernacularQuote: 'నూనెలో నానబెట్టిన దారాలతో నేసిన బట్ట. రంగు ఎప్పటికీ చెరిగిపోదు.',
      englishTranslation: 'Pre-treated in natural castor oil vats before weaving. The double ikat alignment requires two weeks of mental warp-weft geometry.',
    },
    hash: '0x7a29bf01de8390b1',
  },
  {
    id: 'VLT-WEAV-10',
    title: 'Kullu Handwoven Geometric Pattu',
    category: 'Handloom Weaving',
    subCategory: 'Himalayan Wool',
    region: 'Kullu',
    state: 'Himachal Pradesh',
    image: '/images/weaver.jpg',
    priceINR: 6900,
    artisan: 'Devi Chand Thakur',
    lineage: 'Parvati Valley Loom Weaver',
    hoursToCraft: 22,
    materials: 'Indigenous Desi Wool, Walnut Bark Dye, Dokhru Geometric Motifs',
    pohhIndex: 98.8,
    audioNarrative: {
      dialect: 'Kulvi / Pahari',
      vernacularQuote: 'पहाड़ी भेड़ों के ऊन से हाथों से कात कर यह शॉल बुना गया है।',
      englishTranslation: 'Hand-spun from high-altitude Himalayan sheep wool and colored with wild walnut bark infusions.',
    },
    hash: '0x88ea3091cb52d809',
  },

  // --- DHOKRA METALCRAFT ---
  {
    id: 'VLT-DHKR-11',
    title: 'Bastar Lost-Wax Sacred Nandi Bull',
    category: 'Dhokra Metalcraft',
    subCategory: 'Lost-Wax Metallurgy',
    region: 'Kondagaon',
    state: 'Chhattisgarh',
    image: '/images/dhokra.jpg',
    priceINR: 8900,
    artisan: 'Sukhiram Baghel',
    lineage: 'Tribal Lost-Wax Cast Master',
    hoursToCraft: 28,
    materials: 'Scrap Brass, Wild Forest Beeswax, Riverbed Anthill Mud',
    pohhIndex: 99.8,
    audioNarrative: {
      dialect: 'Bhatri / Gondi',
      vernacularQuote: 'ଜଙ୍ଗଲ ମହୁଫେଣା ର ମହମ ରେ ପ୍ରଥମେ ନନ୍ଦୀ ବଳଦ ତିଆରି ହୁଏ। ତା’ପରେ ତରଳ ପିତ୍ତଳ ଢଳା ଯାଏ।',
      englishTranslation: 'First, the sacred bull is coaxed out of wild forest beeswax threads. When molten metal is poured, the wax vanishes into the earth, leaving pure metal bone.',
    },
    hash: '0x99e4c5b128fa0327',
  },
  {
    id: 'VLT-DHOD-12',
    title: 'Dhenkanal Dhokra Tribal Horn Blower',
    category: 'Dhokra Metalcraft',
    subCategory: 'Bell Metal Casting',
    region: 'Dhenkanal',
    state: 'Odisha',
    image: '/images/dhokra.jpg',
    priceINR: 6400,
    artisan: 'Pabitra Pradhan',
    lineage: 'Ghadua Brass Guild Lineage',
    hoursToCraft: 20,
    materials: 'Brass Alloy, Wild Beeswax, Riverbed Clay Core',
    pohhIndex: 99.4,
    audioNarrative: {
      dialect: 'Odia',
      vernacularQuote: 'ପିତ୍ତଳ ତାର କୁ ବଳି କରି ଏହି ମୂର୍ତ୍ତି ଗଢ଼ାଯାଏ। ପ୍ରତି ଖଣ୍ଡ ଅନନ୍ୟ, କୌଣସି ଡାଇ ନାହିଁ।',
      englishTranslation: 'Coiled by hand with brass filigree threads. Each sculpture is unique because the mold is shattered in the firing process.',
    },
    hash: '0x29ef4021cd87ba90',
  },

  // --- WOODWORK & INLAY ---
  {
    id: 'VLT-WOOD-13',
    title: 'Channapatna Organic Lacquer Toy',
    category: 'Woodwork & Inlay',
    subCategory: 'Organic Lacquerware',
    region: 'Ramanagara',
    state: 'Karnataka',
    image: '/images/toys.jpg',
    priceINR: 2400,
    artisan: 'Basavaraj Gowda',
    lineage: '4th Gen Royal Toy Artisan',
    hoursToCraft: 9,
    materials: 'Aale Mara (Wrightia Tinctoria), Natural Turmeric & Kumkum Resin Lacquer',
    pohhIndex: 97.9,
    audioNarrative: {
      dialect: 'Kannada',
      vernacularQuote: 'ಆಲೆ ಮರದಿಂದ ಮಾಡಿದ ನೈಸರ್ಗಿಕ ಆಟಿಕೆ. ಅರಿಶಿನ ಮತ್ತು ನೈಸರ್ಗಿಕ ಬಣ್ಣಗಳನ್ನು ಮಾತ್ರ ಬಳಸುತ್ತೇವೆ, ಮಕ್ಕಳಿಗೆ ಸಂಪೂರ್ಣ ಸುರಕ್ಷಿತ.',
      englishTranslation: 'Turned on the lathe from ivory-wood (Aale Mara). Colored solely with food-grade turmeric, indigo, and organic sealing wax.',
    },
    hash: '0x12a9c3d478e9b601',
  },
  {
    id: 'VLT-KSHM-14',
    title: 'Kashmir Carved Walnut Wood Box',
    category: 'Woodwork & Inlay',
    subCategory: 'Relief Jaali Carving',
    region: 'Srinagar',
    state: 'Jammu & Kashmir',
    image: '/images/toys.jpg',
    priceINR: 8800,
    artisan: 'Ghulam Rasool Mir',
    lineage: 'Sheen Walnut Woodcarver Dynasty',
    hoursToCraft: 26,
    materials: 'Root Walnut Wood (Doon Kaal), Pure Beeswax Polish',
    pohhIndex: 99.5,
    audioNarrative: {
      dialect: 'Kashmiri',
      vernacularQuote: 'أکھ اک لکڑی ہند پھول چھو أسی ہतھہ سیت تراشان۔ أکھ ژھین تراوس ۲۶ گنٛٹہ لگان۔',
      englishTranslation: 'Carved from the subterranean roots of seasoned walnut trees. Every grape leaf relief is incised with miniature chisels without mechanical routers.',
    },
    hash: '0x62c01948ef11b782',
  },

  // --- LEATHERCRAFT & MOJARIS ---
  {
    id: 'VLT-LTHR-15',
    title: 'Jaipur Zari Embroidered Royal Mojari',
    category: 'Leathercraft & Mojaris',
    subCategory: 'Royal Mojari',
    region: 'Jaipur',
    state: 'Rajasthan',
    image: '/images/leathercraft-mojari.jpg',
    priceINR: 4200,
    artisan: 'Bhagwan Das Raigar',
    lineage: 'Mughal Court Mojari Kaarigar',
    hoursToCraft: 16,
    materials: 'Vegetable-Tanned Buffalo Hide, Pure Brass & Copper Zari Threads, Velvet Lining',
    pohhIndex: 98.9,
    audioNarrative: {
      dialect: 'Marwari',
      vernacularQuote: 'हाथ की सुई से एक-एक तार पिरोया जाता है। यह मोजड़ी जितनी पुरानी होगी, उतनी ही नरम होगी।',
      englishTranslation: 'Stitched with double-twisted wax threads through supple hand-cured leather. The embroidered curling toe design protects against desert sand.',
    },
    hash: '0x44c1920ef8821901',
  },
  {
    id: 'VLT-LTHR-16',
    title: 'Kolhapuri Hand-Braided Leather Footwear',
    category: 'Leathercraft & Mojaris',
    subCategory: 'Kolhapuri Chappal',
    region: 'Kolhapur',
    state: 'Maharashtra',
    image: '/images/leathercraft-mojari.jpg',
    priceINR: 3600,
    artisan: 'Sanjay Satpute',
    lineage: 'Shahu Maharaj Royal Cobbler Guild',
    hoursToCraft: 14,
    materials: 'Babool Bark Tanned Leather, Goat Leather Braids, Mustard Oil Curing',
    pohhIndex: 99.1,
    audioNarrative: {
      dialect: 'Marathi',
      vernacularQuote: 'बाभळीच्या सालीने कमावलेले अस्सल कातडे. सुई-दोऱ्याने विणलेली ही खरी कोल्हापुरी आहे.',
      englishTranslation: 'Vegetable-cured using ancient acacia bark and mustard oil baths without chemical dyes. Braided entirely by hand.',
    },
    hash: '0x91dfa214ee31b790',
  },

  // --- STONE & MARBLE CARVING ---
  {
    id: 'VLT-STNE-17',
    title: 'Agra Pietra Dura Marble Inlay Plate',
    category: 'Stone & Marble Carving',
    subCategory: 'Parchin Kari Inlay',
    region: 'Agra',
    state: 'Uttar Pradesh',
    image: '/images/jharokha-gate.jpg',
    priceINR: 12500,
    artisan: 'Ustad Munna Khan',
    lineage: 'Taj Mahal Pietra Dura Master Dynasty',
    hoursToCraft: 34,
    materials: 'Makrana Pure White Marble, Lapis Lazuli, Malachite, Jasper & Corundum Gemstones',
    pohhIndex: 99.7,
    audioNarrative: {
      dialect: 'Hindustani',
      vernacularQuote: 'संगमरमर की छाती पर हीरा-तराश से फूल खोदे जाते हैं, फिर लाजवर्द और अकीक पत्थर भरे जाते हैं।',
      englishTranslation: 'Chiseled into pure Makrana calcite marble with diamond-tipped styluses. Over 240 petals of lapis and malachite are inlaid seamlessly.',
    },
    hash: '0x992cb412e88a91c3',
  },
  {
    id: 'VLT-STNE-18',
    title: 'Konark Black Chlorite Sun Relief',
    category: 'Stone & Marble Carving',
    subCategory: 'Chlorite Temple Carving',
    region: 'Konark',
    state: 'Odisha',
    image: '/images/jharokha-gate.jpg',
    priceINR: 15400,
    artisan: 'Rabi Narayan Maharana',
    lineage: 'Kalinga Silpi Guild Master',
    hoursToCraft: 42,
    materials: 'Black Chlorite Stone (Muguni Pathara), Diamond Dust Polish',
    pohhIndex: 99.8,
    audioNarrative: {
      dialect: 'Odia',
      vernacularQuote: 'କୋଣାର୍କ ସୂର୍ଯ୍ୟ ମନ୍ଦିର ର ପ୍ରାଚୀନ ଶୈଳୀରେ କଳା ମୁଗୁନି ପଥର କୁ ଛେଣି ରେ କାଟି ଏହି ମୂର୍ତ୍ତି ଗଢ଼ା ଯାଇଛି।',
      englishTranslation: 'Hewn strictly according to ancient Silpa Prakasa geometry using hammer and tempered chisels on dense volcanic chlorite.',
    },
    hash: '0x77e1c094ff221890',
  },

  // --- FOLK & TRIBAL ART ---
  {
    id: 'VLT-MTHL-19',
    title: 'Mithila Sacred Tree of Life Canvas',
    category: 'Folk & Tribal Art',
    subCategory: 'Natural Pigment Painting',
    region: 'Madhubani',
    state: 'Bihar',
    image: '/images/folk-tribal-art.jpg',
    priceINR: 6800,
    artisan: 'Sunita Devi Paswan',
    lineage: 'Godna & Kachni Tradition Keeper',
    hoursToCraft: 24,
    materials: 'Raw Khadi Canvas, Turmeric, Lampblack Soot, Wild Flower Dyes',
    pohhIndex: 99.5,
    audioNarrative: {
      dialect: 'Maithili',
      vernacularQuote: 'बांस की पतली तीली से हमने यह चित्र बनाया है। हर पत्ते और चिड़िया में हमारी कुलदेवी का आशीर्वाद है।',
      englishTranslation: 'Painted with a fine bamboo nib on handmade khadi. The pigments are extracted by boiling berries, marigold petals, and soot from mustard lamps.',
    },
    hash: '0x55b88231a477dc19',
  },
  {
    id: 'VLT-PTTR-20',
    title: 'Raghurajpur Palm Leaf Pattachitra',
    category: 'Folk & Tribal Art',
    subCategory: 'Etched Palm Leaf (Tala)',
    region: 'Puri',
    state: 'Odisha',
    image: '/images/madhubani.jpg',
    priceINR: 7400,
    artisan: 'Akshaya Kumar Barik',
    lineage: 'Chitrakara Heritage Lineage',
    hoursToCraft: 30,
    materials: 'Sun-Dried Tala Palm Leaves, Iron Stylus (Lekhani), Lampblack Ink',
    pohhIndex: 99.7,
    audioNarrative: {
      dialect: 'Odia',
      vernacularQuote: 'ଶୁଖିଲା ତାଳପତ୍ର ଉପରେ ଲୁହା କଲମ ରେ କୋରି କଳା କାଳି ଘଷି ଏହି ଚିତ୍ର ହୋଇଛି।',
      englishTranslation: 'Incised with a sharp iron stylus onto dried palm leaves stitched with silk cords, then rubbed with lampblack soot to reveal the microscopic narrative.',
    },
    hash: '0x44d18872ac30fe19',
  },
  {
    id: 'VLT-WRLI-21',
    title: 'Warli Sacred Tarpa Dance Canvas',
    category: 'Folk & Tribal Art',
    subCategory: 'Tribal Ochre Art',
    region: 'Palghar',
    state: 'Maharashtra',
    image: '/images/madhubani.jpg',
    priceINR: 4900,
    artisan: 'Jivya Soma Mashe Family',
    lineage: 'Living Warli Clan Elders',
    hoursToCraft: 18,
    materials: 'Cow Dung & Mud Base, Rice Paste Pigment, Bamboo Twig',
    pohhIndex: 98.9,
    audioNarrative: {
      dialect: 'Warli / Marathi',
      vernacularQuote: 'तांदळाच्या पिठाने आणि बांबूच्या काडीने ही गोल तारपा नृत्याची चित्रं रेखाटली आहेत.',
      englishTranslation: 'Drawn using edible rice paste mixed with natural tree gum onto earthen mud-washed canvas, depicting the perpetual spiral of agrarian life.',
    },
    hash: '0x18ac9041be552d71',
  },
];

interface ArtisanVaultGridProps {
  onAddToCart?: (item: CraftItem) => void;
  cartCount?: number;
  onOpenCart?: () => void;
}

export const ArtisanVaultGrid: React.FC<ArtisanVaultGridProps> = ({
  onAddToCart,
  cartCount = 0,
  onOpenCart,
}) => {
  // Navigation & Filtering State Machine
  const [activeView, setActiveView] = useState<'categories' | 'states' | 'results'>('categories');
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);
  const [selectedState, setSelectedState] = useState<string | null>(null);
  const [searchQuery, setSearchQuery] = useState<string>('');

  // State Overlay Controls
  const [stateTab, setStateTab] = useState<'all' | 'famous'>('famous');
  const [stateSearchQuery, setStateSearchQuery] = useState<string>('');

  // Level 1 Pagination
  const [categoryPage, setCategoryPage] = useState<number>(0); // 0 = page 1 (items 0-3), 1 = page 2 (items 4-7)

  // Interactive Modals & Player
  const [activeLivingLabel, setActiveLivingLabel] = useState<CraftItem | null>(null);
  const [playingAudioId, setPlayingAudioId] = useState<string | null>(null);
  const [savedWishlist, setSavedWishlist] = useState<string[]>([]);

  // Toggle wishlist
  const toggleWishlist = (id: string) => {
    setSavedWishlist((prev) =>
      prev.includes(id) ? prev.filter((x) => x !== id) : [...prev, id]
    );
  };

  // Audio Playback Handler
  const handleToggleAudio = (item: CraftItem) => {
    if (playingAudioId === item.id) {
      setPlayingAudioId(null);
    } else {
      setPlayingAudioId(item.id);
    }
  };

  // Category Selection Trigger
  const handleSelectCategory = (categoryId: string) => {
    setSelectedCategory(categoryId);
    setSelectedState(null);
    setStateSearchQuery('');
    setStateTab('famous');
    setActiveView('states');
  };

  // State Selection Trigger
  const handleSelectState = (stateName: string) => {
    setSelectedState(stateName);
    setActiveView('results');
  };

  // Reset Everything to Level 1
  const handleResetFilter = () => {
    setSelectedCategory(null);
    setSelectedState(null);
    setSearchQuery('');
    setStateSearchQuery('');
    setActiveView('categories');
  };

  // Back to Level 2 (State Selector)
  const handleBackToStates = () => {
    setSelectedState(null);
    setActiveView('states');
  };

  // Back to Level 1 (Categories)
  const handleBackToCategories = () => {
    setSelectedCategory(null);
    setSelectedState(null);
    setActiveView('categories');
  };

  // Curated Signature Hubs for Current Category
  const signatureHubs = useMemo(() => {
    if (!selectedCategory) return [];
    return SIGNATURE_HUBS_BY_CATEGORY[selectedCategory] || [];
  }, [selectedCategory]);

  const signatureStateNames = useMemo(() => {
    return new Set(signatureHubs.map((h) => h.state.toLowerCase()));
  }, [signatureHubs]);

  // Filtered States list for Level 2
  const filteredStates = useMemo(() => {
    let list = ALL_INDIAN_STATES;

    // Filter by tab
    if (stateTab === 'famous' && selectedCategory) {
      list = list.filter((s) => signatureStateNames.has(s.name.toLowerCase()));
    }

    // Filter by search query
    if (stateSearchQuery.trim()) {
      const q = stateSearchQuery.toLowerCase().trim();
      list = list.filter((s) => s.name.toLowerCase().includes(q));
    }

    return list;
  }, [stateTab, selectedCategory, signatureStateNames, stateSearchQuery]);

  // Filtered Results for Level 3
  const filteredArtisans = useMemo(() => {
    if (!selectedCategory || !selectedState) return [];

    let items = VAULT_ITEMS.filter((item) => {
      const catMatch =
        item.category.toLowerCase().includes(selectedCategory.toLowerCase()) ||
        selectedCategory.toLowerCase().includes(item.category.toLowerCase());
      const stateMatch =
        item.state.toLowerCase() === selectedState.toLowerCase() ||
        item.state.toLowerCase().includes(selectedState.toLowerCase()) ||
        selectedState.toLowerCase().includes(item.state.toLowerCase());
      return catMatch && stateMatch;
    });

    // Also match general search query if typed in toolbar
    if (searchQuery.trim()) {
      const q = searchQuery.toLowerCase().trim();
      items = items.filter(
        (i) =>
          i.title.toLowerCase().includes(q) ||
          i.region.toLowerCase().includes(q) ||
          i.materials.toLowerCase().includes(q) ||
          i.artisan.toLowerCase().includes(q)
      );
    }

    // If zero pre-seeded items exist for this exact State + Category combination,
    // generate an authentic regional artisan collective preview card so the user gets zero dead-ends!
    if (items.length === 0) {
      const sigHub = signatureHubs.find(
        (h) => h.state.toLowerCase() === selectedState.toLowerCase()
      );
      const clusterTitle = sigHub ? sigHub.cluster : `${selectedState} Master Guild`;
      const clusterDesc = sigHub ? sigHub.description : `Sovereign ${selectedCategory} Heritage Cluster`;

      const fallbackItem: CraftItem = {
        id: `VLT-GEN-${selectedState.slice(0, 3).toUpperCase()}-${selectedCategory.slice(0, 3).toUpperCase()}`,
        title: `${clusterTitle} ${selectedCategory}`,
        category: selectedCategory,
        subCategory: clusterDesc,
        region: sigHub ? sigHub.cluster.split('&')[0].trim() : 'Craft District',
        state: selectedState,
        image:
          CRAFT_CATEGORIES.find((c) => c.id === selectedCategory)?.image ||
          '/images/potter-jharokha.jpg',
        priceINR: 7800,
        artisan: `${selectedState} Artisan Cooperative`,
        lineage: 'Generational Craft Guild Collective',
        hoursToCraft: 24,
        materials: `Sovereign ${selectedCategory} materials ethically harvested in ${selectedState}`,
        pohhIndex: 99.2,
        audioNarrative: {
          dialect: `${selectedState} Regional Dialect`,
          vernacularQuote: `Our craft sanctuary in ${selectedState} preserves traditional techniques handed down across centuries.`,
          englishTranslation: `Direct artisan escrow ensures that master families in ${selectedState} receive fair compensation without intermediary markups.`,
        },
        hash: `0x${Math.random().toString(16).slice(2, 10)}${Math.random().toString(16).slice(2, 10)}`,
      };

      return [fallbackItem];
    }

    return items;
  }, [selectedCategory, selectedState, searchQuery, signatureHubs]);

  // Global search across all categories if user searches from root view
  const globalSearchMatches = useMemo(() => {
    if (!searchQuery.trim()) return [];
    const q = searchQuery.toLowerCase().trim();
    return VAULT_ITEMS.filter(
      (item) =>
        item.title.toLowerCase().includes(q) ||
        item.category.toLowerCase().includes(q) ||
        item.state.toLowerCase().includes(q) ||
        item.region.toLowerCase().includes(q) ||
        item.materials.toLowerCase().includes(q)
    );
  }, [searchQuery]);

  return (
    <section
      id="artisan-vault"
      className="relative w-full py-20 px-4 sm:px-6 lg:px-8 bg-gradient-to-b from-[#161311] via-[#1c1714] to-[#120f0d] text-[#EDE6DD] overflow-hidden"
    >
      {/* Ambient background glows */}
      <div className="absolute top-1/4 left-1/2 -translate-x-1/2 w-[700px] h-[500px] bg-[#D4AF37]/5 blur-[140px] pointer-events-none rounded-full" />
      <div className="absolute bottom-10 right-10 w-[400px] h-[400px] bg-[#C85A32]/5 blur-[120px] pointer-events-none rounded-full" />

      {/* ------------------------------------------------------------- */}
      {/* 1. TOP NAVIGATION BAR */}
      {/* ------------------------------------------------------------- */}
      <div className="max-w-6xl mx-auto mb-10">
        <header className="flex items-center justify-between px-5 py-3.5 rounded-2xl bg-[#201a15]/80 backdrop-blur-md border border-[#D4AF37]/20 shadow-lg shadow-black/40">
          {/* Left: Hamburger menu icon */}
          <button
            onClick={() => setActiveView('categories')}
            className="w-10 h-10 rounded-xl bg-[#28211b] border border-[#D4AF37]/25 flex items-center justify-center text-[#D4AF37] hover:bg-[#D4AF37]/15 transition-colors"
            title="Navigation Menu"
            aria-label="Navigation Menu"
          >
            <Menu size={18} />
          </button>

          {/* Center: Dual-line branding */}
          <div className="text-center">
            <h1 className="font-serif-luxury text-base sm:text-lg font-bold tracking-[0.15em] text-[#F3E8DC] uppercase">
              MILAAN:
            </h1>
            <span className="font-cormorant italic text-xs sm:text-sm text-[#D4AF37] tracking-wider block -mt-0.5">
              The Artisan Vault
            </span>
          </div>

          {/* Right: Search icon & Shopping bag with badge */}
          <div className="flex items-center gap-3">
            <button
              onClick={() => {
                const el = document.getElementById('vault-search-input');
                el?.focus();
              }}
              className="w-10 h-10 rounded-xl bg-[#28211b] border border-[#D4AF37]/25 flex items-center justify-center text-[#EDE6DD]/70 hover:text-white hover:border-[#D4AF37]/50 transition-colors"
              title="Search Vault"
              aria-label="Search Vault"
            >
              <Search size={17} />
            </button>

            <button
              onClick={onOpenCart}
              className="relative w-10 h-10 rounded-xl bg-[#28211b] border border-[#D4AF37]/25 flex items-center justify-center text-[#D4AF37] hover:bg-[#D4AF37]/15 transition-colors"
              title="View Cart"
              aria-label="View Cart"
            >
              <ShoppingBag size={17} />
              {cartCount > 0 && (
                <span className="absolute -top-1 -right-1 w-5 h-5 rounded-full bg-[#C85A32] text-white text-[11px] font-bold flex items-center justify-center border border-black shadow">
                  {cartCount}
                </span>
              )}
            </button>
          </div>
        </header>
      </div>

      {/* ------------------------------------------------------------- */}
      {/* 2. SECTION TOOLBAR (Title + Real-time Search) */}
      {/* ------------------------------------------------------------- */}
      <div className="max-w-6xl mx-auto mb-10">
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 border-b border-[#D4AF37]/15 pb-6">
          <div>
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#D4AF37]/10 border border-[#D4AF37]/30 text-[#D4AF37] text-xs font-telemetry mb-2">
              <Sparkles size={13} />
              <span>SOVEREIGN DISCOVERY ENGINE</span>
            </div>
            <h2 className="font-serif-luxury text-3xl sm:text-4xl text-[#F3E8DC] font-normal tracking-tight">
              The Artisan Vault
            </h2>
            <p className="text-xs sm:text-sm text-[#A89F91] max-w-xl mt-1.5 font-sans leading-relaxed">
              Drill down through sovereign Indian craft traditions and geographical clusters.
              Every artifact is authenticated on-chain with living oral testimony and direct fair-trade escrow.
            </p>
          </div>

          {/* Search Input */}
          <div className="relative w-full md:w-80">
            <Search
              size={15}
              className="absolute left-3.5 top-1/2 -translate-y-1/2 text-[#A89F91]"
            />
            <input
              id="vault-search-input"
              type="text"
              placeholder="Search crafts, regions, or materials..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-10 pr-9 py-2 rounded-full bg-[#201a15] border border-[#D4AF37]/30 text-xs sm:text-sm text-[#EDE6DD] placeholder-[#A89F91]/60 focus:outline-none focus:border-[#D4AF37] focus:ring-1 focus:ring-[#D4AF37] transition-all shadow-inner"
            />
            {searchQuery && (
              <button
                onClick={() => setSearchQuery('')}
                className="absolute right-3.5 top-1/2 -translate-y-1/2 text-[#A89F91] hover:text-[#EDE6DD]"
                aria-label="Clear search"
              >
                <X size={14} />
              </button>
            )}
          </div>
        </div>
      </div>

      {/* ------------------------------------------------------------- */}
      {/* 3. MAIN WORKFLOW: LEVEL 1, LEVEL 2, OR LEVEL 3 */}
      {/* ------------------------------------------------------------- */}
      <div className="max-w-6xl mx-auto">
        {/* If user searched globally and is at root, display direct search results if matched */}
        {searchQuery.trim() && activeView === 'categories' && globalSearchMatches.length > 0 ? (
          <div className="space-y-6">
            <div className="flex items-center justify-between">
              <h3 className="font-serif-luxury text-xl text-[#F3E8DC]">
                Found {globalSearchMatches.length} Crafts matching "{searchQuery}"
              </h3>
              <button
                onClick={() => setSearchQuery('')}
                className="text-xs font-telemetry text-[#D4AF37] hover:underline"
              >
                Clear Search
              </button>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
              {globalSearchMatches.map((item) => (
                <div
                  key={item.id}
                  className="rounded-2xl bg-[#201a15] border border-[#D4AF37]/25 overflow-hidden p-4 space-y-3"
                >
                  <div className="aspect-[4/3] rounded-xl overflow-hidden relative">
                    <img
                      src={item.image}
                      alt={item.title}
                      className="w-full h-full object-cover"
                    />
                    <span className="absolute top-2 left-2 bg-black/80 px-2.5 py-0.5 rounded text-[10px] font-telemetry text-[#D4AF37]">
                      {item.state}
                    </span>
                  </div>
                  <div>
                    <span className="text-[11px] font-telemetry text-[#D4AF37] uppercase">
                      {item.category}
                    </span>
                    <h4 className="font-serif-luxury text-lg text-[#EDE6DD] font-semibold">
                      {item.title}
                    </h4>
                    <p className="text-xs text-[#A89F91] line-clamp-2 mt-1">
                      {item.materials}
                    </p>
                  </div>
                  <div className="pt-2 border-t border-[#D4AF37]/15 flex items-center justify-between">
                    <span className="font-telemetry font-bold text-white text-sm">
                      ₹{item.priceINR.toLocaleString('en-IN')}
                    </span>
                    <button
                      onClick={() => setActiveLivingLabel(item)}
                      className="text-xs px-3 py-1 bg-[#D4AF37] text-black font-semibold rounded-lg hover:bg-[#e2c158]"
                    >
                      View Provenance
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        ) : (
          <AnimatePresence mode="wait">
            {/* ======================================================== */}
            {/* LEVEL 1 VIEW: CRAFT CATEGORIES GRID (8 Responsive Cards) */}
            {/* ======================================================== */}
            {activeView === 'categories' && (
              <motion.div
                key="level-1-categories"
                initial={{ opacity: 0, y: 15 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -15 }}
                transition={{ duration: 0.3 }}
                className="space-y-8"
              >
                {/* 8-Card Responsive Grid (4 cols desktop, 2 cols tablet, 1-2 cols mobile) */}
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5 sm:gap-6">
                  {CRAFT_CATEGORIES.map((cat) => (
                    <div
                      key={cat.id}
                      onClick={() => handleSelectCategory(cat.id)}
                      className="group relative h-80 rounded-[16px] overflow-hidden cursor-pointer border border-[#D4AF37]/20 hover:border-[#D4AF37]/60 transition-all duration-400 shadow-xl shadow-black/40 hover:shadow-2xl hover:shadow-[#D4AF37]/10"
                    >
                      {/* Background Image with hover subtle zoom (scale: 1.04) */}
                      <img
                        src={cat.image}
                        alt={cat.title}
                        style={{ width: '100%', height: '100%', objectFit: 'cover', objectPosition: 'center' }}
                        className="w-full h-full object-cover object-center group-hover:scale-[1.04] transition-transform duration-500 ease-out"
                      />

                      {/* Vignette Gradients for High Legibility */}
                      <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/40 to-transparent" />
                      <div className="absolute inset-0 bg-black/20 group-hover:bg-transparent transition-colors duration-300" />

                      {/* Inner gold frame line */}
                      <div className="absolute inset-2.5 rounded-[12px] border border-[#D4AF37]/15 pointer-events-none group-hover:border-[#D4AF37]/40 transition-colors" />

                      {/* Top-Right Badge: Explore indicator */}
                      <div className="absolute top-4 right-4 w-8 h-8 rounded-full bg-black/60 backdrop-blur-md border border-[#D4AF37]/30 flex items-center justify-center text-[#D4AF37] group-hover:bg-[#D4AF37] group-hover:text-black transition-all">
                        <ArrowUpRight size={14} />
                      </div>

                      {/* Card Labels Positioned Bottom-Left */}
                      <div className="absolute bottom-5 left-5 right-5 space-y-1.5 pointer-events-none">
                        <span className="text-xs font-telemetry tracking-wider uppercase text-[#D4AF37] block">
                          {cat.subtitle}
                        </span>
                        <h3 className="font-serif-luxury text-xl sm:text-2xl font-bold text-[#EDE6DD] group-hover:text-[#FAF7F2] transition-colors leading-tight">
                          {cat.title}
                        </h3>
                        <p className="text-[11px] text-[#A89F91] line-clamp-2 leading-relaxed">
                          {cat.description}
                        </p>
                      </div>
                    </div>
                  ))}
                </div>

                {/* Pagination Dots below grid indicating page 1 of 2 */}
                <div className="flex flex-col items-center justify-center gap-2 pt-4">
                  <div className="flex items-center gap-2">
                    <button
                      onClick={() => setCategoryPage(0)}
                      className={`h-2.5 rounded-full transition-all duration-300 ${
                        categoryPage === 0
                          ? 'w-8 bg-[#D4AF37]'
                          : 'w-2.5 bg-[#D4AF37]/30 hover:bg-[#D4AF37]/60'
                      }`}
                      aria-label="Category Page 1"
                    />
                    <button
                      onClick={() => setCategoryPage(1)}
                      className={`h-2.5 rounded-full transition-all duration-300 ${
                        categoryPage === 1
                          ? 'w-8 bg-[#D4AF37]'
                          : 'w-2.5 bg-[#D4AF37]/30 hover:bg-[#D4AF37]/60'
                      }`}
                      aria-label="Category Page 2"
                    />
                  </div>
                  <span className="text-[11px] font-telemetry uppercase tracking-widest text-[#A89F91]">
                    Displaying 8 Master Disciplines • Page {categoryPage + 1} of 2
                  </span>
                </div>
              </motion.div>
            )}

            {/* ======================================================== */}
            {/* LEVEL 2 VIEW: STATE & UT SELECTION OVERLAY / VIEW        */}
            {/* ======================================================== */}
            {activeView === 'states' && selectedCategory && (
              <motion.div
                key="level-2-states"
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -20 }}
                transition={{ duration: 0.3 }}
                className="rounded-3xl bg-[#1c1612] border-2 border-[#D4AF37]/30 p-5 sm:p-8 shadow-2xl space-y-6"
              >
                {/* Header & Breadcrumbs */}
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-[#D4AF37]/20 pb-5">
                  <div className="space-y-1">
                    {/* Breadcrumbs */}
                    <div className="flex items-center gap-2 text-xs font-telemetry uppercase tracking-wider text-[#A89F91]">
                      <button
                        onClick={handleBackToCategories}
                        className="hover:text-[#D4AF37] transition-colors"
                      >
                        The Artisan Vault
                      </button>
                      <ChevronRight size={12} className="text-[#D4AF37]" />
                      <span className="text-[#D4AF37] font-semibold">
                        {selectedCategory}
                      </span>
                    </div>

                    <h3 className="font-serif-luxury text-2xl sm:text-3xl text-[#F3E8DC] font-semibold">
                      Select an Indian State or Territory
                    </h3>
                    <p className="text-xs sm:text-sm text-[#A89F91]">
                      Choose an artisan cluster specializing in sovereign{' '}
                      <span className="text-[#D4AF37]">{selectedCategory}</span>.
                    </p>
                  </div>

                  {/* Back to All Categories Button */}
                  <button
                    onClick={handleBackToCategories}
                    className="inline-flex items-center gap-2 px-4 py-2 rounded-xl bg-[#28211b] border border-[#D4AF37]/30 text-xs font-telemetry text-[#D4AF37] hover:bg-[#D4AF37] hover:text-black transition-all self-start sm:self-center"
                  >
                    <ArrowLeft size={14} />
                    <span>Back to All Categories</span>
                  </button>
                </div>

                {/* State Search & Quick Toggle Tabs */}
                <div className="flex flex-col md:flex-row items-stretch md:items-center justify-between gap-4">
                  {/* Quick Toggle Tabs */}
                  <div className="flex items-center gap-2 p-1.5 rounded-2xl bg-[#14100c] border border-[#D4AF37]/25 w-fit">
                    <button
                      onClick={() => setStateTab('famous')}
                      className={`px-4 py-2 rounded-xl text-xs font-telemetry uppercase tracking-wider transition-all ${
                        stateTab === 'famous'
                          ? 'bg-[#D4AF37] text-black font-bold shadow-md'
                          : 'text-[#A89F91] hover:text-[#EDE6DD]'
                      }`}
                    >
                      Famous for this Craft ({signatureHubs.length} Hubs)
                    </button>
                    <button
                      onClick={() => setStateTab('all')}
                      className={`px-4 py-2 rounded-xl text-xs font-telemetry uppercase tracking-wider transition-all ${
                        stateTab === 'all'
                          ? 'bg-[#D4AF37] text-black font-bold shadow-md'
                          : 'text-[#A89F91] hover:text-[#EDE6DD]'
                      }`}
                    >
                      All States & UTs (36)
                    </button>
                  </div>

                  {/* Search State Input */}
                  <div className="relative w-full md:w-72">
                    <Search
                      size={14}
                      className="absolute left-3.5 top-1/2 -translate-y-1/2 text-[#A89F91]"
                    />
                    <input
                      type="text"
                      placeholder="Search state (e.g., Rajasthan, Manipur)..."
                      value={stateSearchQuery}
                      onChange={(e) => setStateSearchQuery(e.target.value)}
                      className="w-full pl-9 pr-8 py-2 rounded-xl bg-[#28211b] border border-[#D4AF37]/25 text-xs text-[#EDE6DD] placeholder-[#A89F91]/60 focus:outline-none focus:border-[#D4AF37]"
                    />
                    {stateSearchQuery && (
                      <button
                        onClick={() => setStateSearchQuery('')}
                        className="absolute right-3 top-1/2 -translate-y-1/2 text-[#A89F91] hover:text-white"
                      >
                        <X size={12} />
                      </button>
                    )}
                  </div>
                </div>

                {/* State Cards Grid */}
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3.5 max-h-[460px] overflow-y-auto pr-1">
                  {filteredStates.map((st) => {
                    const isSigHub = signatureStateNames.has(st.name.toLowerCase());
                    const hubInfo = signatureHubs.find(
                      (h) => h.state.toLowerCase() === st.name.toLowerCase()
                    );

                    return (
                      <button
                        key={st.name}
                        onClick={() => handleSelectState(st.name)}
                        className={`group relative text-left p-4 rounded-2xl border transition-all duration-200 flex flex-col justify-between ${
                          isSigHub
                            ? 'bg-gradient-to-br from-[#2a2119] to-[#1c1612] border-[#D4AF37]/45 hover:border-[#D4AF37] hover:shadow-lg hover:shadow-[#D4AF37]/15'
                            : 'bg-[#18130f] border-[#D4AF37]/15 hover:border-[#D4AF37]/40 hover:bg-[#201913]'
                        }`}
                      >
                        <div className="flex items-start justify-between gap-2">
                          <div>
                            <span className="text-[10px] font-telemetry uppercase tracking-widest text-[#A89F91]">
                              {st.type}
                            </span>
                            <h4 className="font-serif-luxury text-base font-semibold text-[#EDE6DD] group-hover:text-[#D4AF37] transition-colors">
                              {st.name}
                            </h4>
                          </div>

                          {/* Signature Craft Hub Badge */}
                          {isSigHub && (
                            <span className="px-2 py-0.5 rounded-full bg-[#D4AF37]/20 border border-[#D4AF37]/60 text-[10px] font-telemetry text-[#D4AF37] whitespace-nowrap">
                              ★ Signature Hub
                            </span>
                          )}
                        </div>

                        {/* Cluster details if signature hub */}
                        {hubInfo ? (
                          <div className="mt-2 pt-2 border-t border-[#D4AF37]/15 text-[11px] space-y-0.5">
                            <div className="text-[#D4AF37] font-medium">
                              {hubInfo.cluster}
                            </div>
                            <div className="text-[#A89F91] line-clamp-1">
                              {hubInfo.description}
                            </div>
                          </div>
                        ) : (
                          <div className="mt-2 pt-2 border-t border-white/5 text-[11px] text-[#A89F91] flex items-center justify-between">
                            <span>Explore artisans</span>
                            <ChevronRight size={12} className="text-[#D4AF37]" />
                          </div>
                        )}
                      </button>
                    );
                  })}
                </div>

                {filteredStates.length === 0 && (
                  <div className="py-12 text-center space-y-2">
                    <p className="text-sm text-[#A89F91]">
                      No states found matching "{stateSearchQuery}".
                    </p>
                    <button
                      onClick={() => setStateSearchQuery('')}
                      className="text-xs text-[#D4AF37] font-telemetry hover:underline"
                    >
                      Clear search filter
                    </button>
                  </div>
                )}
              </motion.div>
            )}

            {/* ======================================================== */}
            {/* LEVEL 3 VIEW: SELECTION RESULTS / SAMPLE ARTISANS        */}
            {/* ======================================================== */}
            {activeView === 'results' && selectedCategory && selectedState && (
              <motion.div
                key="level-3-results"
                initial={{ opacity: 0, scale: 0.98 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.98 }}
                transition={{ duration: 0.3 }}
                className="space-y-6"
              >
                {/* Result Header & Controls */}
                <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 p-5 rounded-2xl bg-[#201a15] border border-[#D4AF37]/30 shadow-lg">
                  <div className="space-y-1">
                    {/* Breadcrumbs */}
                    <div className="flex items-center gap-2 text-xs font-telemetry uppercase tracking-wider text-[#A89F91]">
                      <button
                        onClick={handleBackToCategories}
                        className="hover:text-[#D4AF37] transition-colors"
                      >
                        The Artisan Vault
                      </button>
                      <ChevronRight size={12} className="text-[#D4AF37]" />
                      <button
                        onClick={handleBackToStates}
                        className="hover:text-[#D4AF37] transition-colors"
                      >
                        {selectedCategory}
                      </button>
                      <ChevronRight size={12} className="text-[#D4AF37]" />
                      <span className="text-[#D4AF37] font-semibold">
                        {selectedState}
                      </span>
                    </div>

                    <h3 className="font-serif-luxury text-xl sm:text-2xl text-[#F3E8DC] font-semibold">
                      Showing {selectedCategory} Artisans & Craft Clusters in{' '}
                      <span className="text-[#D4AF37]">{selectedState}</span>
                    </h3>
                    <p className="text-xs text-[#A89F91]">
                      {filteredArtisans.length} sovereign craft listings available with direct artisan DBT payout escrow.
                    </p>
                  </div>

                  {/* Action Buttons: Choose Another State & Reset Filter */}
                  <div className="flex items-center gap-2.5 self-start md:self-center">
                    <button
                      onClick={handleBackToStates}
                      className="inline-flex items-center gap-1.5 px-3.5 py-2 rounded-xl bg-[#28211b] border border-[#D4AF37]/30 text-xs font-telemetry text-[#EDE6DD] hover:text-[#D4AF37] hover:border-[#D4AF37] transition-all"
                    >
                      <ChevronLeft size={14} />
                      <span>Choose Another State</span>
                    </button>

                    <button
                      onClick={handleResetFilter}
                      className="inline-flex items-center gap-1.5 px-3.5 py-2 rounded-xl bg-[#D4AF37] text-black font-semibold text-xs font-telemetry hover:bg-[#e2c158] transition-all"
                    >
                      <span>Reset Filter</span>
                    </button>
                  </div>
                </div>

                {/* 2–4 Sample Artisan Cards Grid */}
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                  {filteredArtisans.map((product) => {
                    const isAudioPlaying = playingAudioId === product.id;
                    const isSaved = savedWishlist.includes(product.id);

                    return (
                      <div
                        key={product.id}
                        className="group relative rounded-2xl bg-[#1c1612] border border-[#D4AF37]/25 hover:border-[#D4AF37]/60 overflow-hidden transition-all duration-300 flex flex-col justify-between shadow-xl shadow-black/50 hover:shadow-2xl hover:shadow-[#D4AF37]/15"
                      >
                        {/* High-Res Product Image */}
                        <div className="relative aspect-[4/3] w-full overflow-hidden bg-[#0d0a08]">
                          <img
                            src={product.image}
                            alt={product.title}
                            className="w-full h-full object-cover object-center group-hover:scale-105 transition-transform duration-500"
                          />
                          <div className="absolute inset-0 bg-gradient-to-t from-[#1c1612] via-transparent to-black/30" />

                          {/* Wishlist Heart Button */}
                          <button
                            onClick={() => toggleWishlist(product.id)}
                            className={`absolute top-3 right-3 w-8 h-8 rounded-full backdrop-blur-md flex items-center justify-center transition-colors ${
                              isSaved
                                ? 'bg-[#C85A32] text-white'
                                : 'bg-black/60 text-[#EDE6DD]/70 hover:text-white'
                            }`}
                            aria-label="Save to Wishlist"
                          >
                            <Heart size={14} fill={isSaved ? 'currentColor' : 'none'} />
                          </button>

                          {/* PoHH Score Badge */}
                          <span className="absolute top-3 left-3 bg-black/80 backdrop-blur-md px-2.5 py-1 rounded-md text-[11px] text-[#D4AF37] font-telemetry border border-[#D4AF37]/30 flex items-center gap-1.5">
                            <Cpu size={12} />
                            <span>⊞ {product.pohhIndex}% PoHH Verified</span>
                          </span>

                          {/* Cluster / Region Tag */}
                          <div className="absolute bottom-2.5 left-3 text-[11px] font-telemetry text-[#EDE6DD]/80 flex items-center gap-1">
                            <MapPin size={12} className="text-[#D4AF37]" />
                            <span>
                              {product.region}, {product.state}
                            </span>
                          </div>
                        </div>

                        {/* Product Card Details */}
                        <div className="p-4 space-y-3.5 flex flex-col justify-between flex-1">
                          <div className="space-y-1.5">
                            <div className="flex items-center justify-between text-xs">
                              <span className="font-telemetry text-[#D4AF37]">
                                {product.subCategory}
                              </span>
                              <span className="text-[11px] text-[#A89F91]">
                                {product.hoursToCraft} hrs craft
                              </span>
                            </div>

                            <h4 className="font-serif-luxury text-lg text-[#F3E8DC] font-semibold leading-snug group-hover:text-[#D4AF37] transition-colors">
                              {product.title}
                            </h4>

                            <div className="text-xs text-[#A89F91] space-y-0.5">
                              <div className="text-[#EDE6DD] font-medium">
                                Artisan: {product.artisan}
                              </div>
                              <div className="text-[11px] text-[#A89F91]">
                                Lineage: {product.lineage}
                              </div>
                            </div>

                            <p className="text-[11px] text-[#A89F91]/80 line-clamp-2 pt-1 font-sans">
                              {product.materials}
                            </p>
                          </div>

                          {/* Price & Action Row */}
                          <div className="pt-3 border-t border-[#D4AF37]/15 space-y-3">
                            <div className="flex items-center justify-between">
                              <div>
                                <span className="text-[10px] uppercase font-telemetry tracking-wider text-[#A89F91] block">
                                  Fair Value (91.4% DBT)
                                </span>
                                <span className="text-base font-telemetry font-bold text-white">
                                  ₹{product.priceINR.toLocaleString('en-IN')}
                                </span>
                              </div>

                              <div className="flex items-center gap-1.5">
                                {/* Audio Story Toggle */}
                                <button
                                  onClick={() => handleToggleAudio(product)}
                                  className={`p-2 rounded-xl border transition-all ${
                                    isAudioPlaying
                                      ? 'bg-[#D4AF37] text-black border-[#D4AF37]'
                                      : 'bg-[#28211b] text-[#D4AF37] border-[#D4AF37]/25 hover:bg-[#D4AF37]/15'
                                  }`}
                                  title="Hear oral narrative"
                                  aria-label="Hear oral narrative"
                                >
                                  {isAudioPlaying ? (
                                    <VolumeX size={15} />
                                  ) : (
                                    <Volume2 size={15} />
                                  )}
                                </button>

                                {/* Living Label Modal Trigger */}
                                <button
                                  onClick={() => setActiveLivingLabel(product)}
                                  className="px-3 py-1.5 bg-[#D4AF37]/90 hover:bg-[#D4AF37] text-black text-xs font-semibold rounded-xl flex items-center gap-1 transition-colors shadow"
                                >
                                  <span>Living Label</span>
                                  <ArrowUpRight size={13} />
                                </button>
                              </div>
                            </div>

                            {/* Commission Masterpiece / Add to Cart Action */}
                            <button
                              onClick={() => onAddToCart?.(product)}
                              className="w-full py-2.5 rounded-xl bg-gradient-to-r from-[#C85A32] to-[#D4AF37] text-black font-bold text-xs uppercase tracking-wider hover:opacity-95 transition-all shadow-md shadow-[#D4AF37]/20 flex items-center justify-center gap-2"
                            >
                              <ShoppingBag size={14} />
                              <span>Commission Masterpiece</span>
                            </button>

                            {/* Audio Narration Bubble (if active) */}
                            {isAudioPlaying && (
                              <motion.div
                                initial={{ opacity: 0, height: 0 }}
                                animate={{ opacity: 1, height: 'auto' }}
                                exit={{ opacity: 0, height: 0 }}
                                className="p-3 rounded-xl bg-[#28211b] border border-[#D4AF37]/40 text-left text-xs space-y-1"
                              >
                                <div className="flex items-center gap-2">
                                  <span className="w-2 h-2 rounded-full bg-[#58D68D] animate-ping" />
                                  <span className="text-[10px] font-telemetry text-[#D4AF37] uppercase">
                                    Oral Testimony ({product.audioNarrative.dialect}):
                                  </span>
                                </div>
                                <p className="italic font-serif-luxury text-[#EDE6DD]">
                                  "{product.audioNarrative.vernacularQuote}"
                                </p>
                                <p className="text-[10px] text-[#A89F91]">
                                  <strong className="text-[#D4AF37]">EN:</strong>{' '}
                                  {product.audioNarrative.englishTranslation}
                                </p>
                              </motion.div>
                            )}
                          </div>
                        </div>
                      </div>
                    );
                  })}
                </div>

                {/* Footer Assurance Banner */}
                <div className="flex flex-col sm:flex-row items-center justify-between p-4 rounded-xl bg-[#201a15] border border-[#D4AF37]/20 gap-3 text-xs">
                  <div className="flex items-center gap-2 text-[#D4AF37] font-telemetry">
                    <ShieldCheck size={16} />
                    <span>DIRECT ESCROW (91.4% DBT TO LOCAL ARTISAN FAMILIES IN {selectedState.toUpperCase()})</span>
                  </div>
                  <button
                    onClick={() => setActiveLivingLabel(filteredArtisans[0])}
                    className="text-[#D4AF37] hover:underline flex items-center gap-1 font-telemetry"
                  >
                    <span>Audit Cryptographic Protocol</span>
                    <ExternalLink size={12} />
                  </button>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        )}
      </div>

      {/* ------------------------------------------------------------- */}
      {/* 4. LIVING LABEL MODAL (Cryptographic NFC & ONDC Beckn Audit) */}
      {/* ------------------------------------------------------------- */}
      <AnimatePresence>
        {activeLivingLabel && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-xl">
            <motion.div
              initial={{ opacity: 0, scale: 0.95, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 20 }}
              className="relative w-full max-w-2xl rounded-3xl bg-[#14100c] border border-[#D4AF37]/40 p-6 sm:p-8 shadow-2xl text-left overflow-hidden"
            >
              {/* Close Button */}
              <button
                onClick={() => setActiveLivingLabel(null)}
                className="absolute top-5 right-5 w-8 h-8 rounded-full bg-[#28211b] border border-[#D4AF37]/30 text-[#EDE6DD]/70 hover:text-white flex items-center justify-center transition-colors"
                aria-label="Close Living Label"
              >
                <X size={16} />
              </button>

              {/* Modal Header */}
              <div className="flex items-center gap-3 mb-6">
                <div className="w-10 h-10 rounded-2xl bg-gradient-to-br from-[#C85A32] to-[#D4AF37] flex items-center justify-center text-black">
                  <QrCode size={22} />
                </div>
                <div>
                  <div className="flex items-center gap-2">
                    <h3 className="font-serif-luxury text-2xl text-[#F3E8DC] font-bold">
                      Living Label™ Provenance
                    </h3>
                    <span className="px-2 py-0.5 rounded-full bg-[#2D5A43]/40 border border-[#2D5A43] text-[10px] text-[#58D68D] font-telemetry">
                      VERIFIED ON-CHAIN
                    </span>
                  </div>
                  <p className="text-xs text-[#A89F91] font-telemetry">
                    CRYPTOGRAPHIC AUDIT ID: {activeLivingLabel.hash}
                  </p>
                </div>
              </div>

              {/* Main Content Grid */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 my-4">
                {/* Left: Artifact & Artisan Profile */}
                <div className="space-y-4">
                  <div className="aspect-[4/3] rounded-2xl overflow-hidden border border-[#D4AF37]/20 relative">
                    <img
                      src={activeLivingLabel.image}
                      alt={activeLivingLabel.title}
                      className="w-full h-full object-cover"
                    />
                    <div className="absolute bottom-2 left-2 px-2.5 py-1 rounded-lg bg-black/70 backdrop-blur-md text-[11px] font-telemetry text-[#D4AF37]">
                      {activeLivingLabel.region}, {activeLivingLabel.state}
                    </div>
                  </div>

                  <div className="p-3.5 rounded-xl bg-[#1c1612] border border-[#D4AF37]/20 text-xs space-y-1.5">
                    <div className="text-[#D4AF37] font-semibold">
                      {activeLivingLabel.artisan}
                    </div>
                    <div className="text-[#EDE6DD]/80">
                      {activeLivingLabel.lineage}
                    </div>
                    <div className="text-[#A89F91] text-[11px]">
                      Hours Invested: {activeLivingLabel.hoursToCraft} hrs manual labor
                    </div>
                  </div>
                </div>

                {/* Right: Transparent Escrow & Proof of Human Hand Breakdown */}
                <div className="space-y-4 flex flex-col justify-between">
                  <div>
                    <h4 className="font-telemetry text-xs uppercase text-[#D4AF37] tracking-wider mb-2">
                      Fair Living Wage Escrow (Cost-Plus)
                    </h4>

                    {/* Cost breakdown bars */}
                    <div className="space-y-2.5 text-xs">
                      <div>
                        <div className="flex justify-between text-[#EDE6DD]/90 mb-1">
                          <span>Direct Artisan Bank Payout (DBT)</span>
                          <span className="font-telemetry text-[#58D68D] font-semibold">
                            91.4% (₹{Math.round(activeLivingLabel.priceINR * 0.914).toLocaleString('en-IN')})
                          </span>
                        </div>
                        <div className="w-full h-2 rounded-full bg-[#28211b] overflow-hidden">
                          <div className="w-[91.4%] h-full bg-gradient-to-r from-[#2D5A43] to-[#58D68D] rounded-full" />
                        </div>
                      </div>

                      <div>
                        <div className="flex justify-between text-[#EDE6DD]/90 mb-1">
                          <span>Raw Material (Ethical Organic Sourcing)</span>
                          <span className="font-telemetry text-[#D4AF37]">
                            5.6% (₹{Math.round(activeLivingLabel.priceINR * 0.056).toLocaleString('en-IN')})
                          </span>
                        </div>
                        <div className="w-full h-2 rounded-full bg-[#28211b] overflow-hidden">
                          <div className="w-[5.6%] h-full bg-[#D4AF37] rounded-full" />
                        </div>
                      </div>

                      <div>
                        <div className="flex justify-between text-[#EDE6DD]/90 mb-1">
                          <span>Zero-Carbon Export Logistics & Insurance</span>
                          <span className="font-telemetry text-[#A89F91]">
                            3.0% (₹{Math.round(activeLivingLabel.priceINR * 0.03).toLocaleString('en-IN')})
                          </span>
                        </div>
                        <div className="w-full h-2 rounded-full bg-[#28211b] overflow-hidden">
                          <div className="w-[3%] h-full bg-[#EDE6DD]/40 rounded-full" />
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* PoHH Verification Note */}
                  <div className="p-3.5 rounded-2xl bg-[#1c1612] border border-[#2D5A43]/40">
                    <div className="flex items-center gap-2 text-xs text-[#58D68D] font-telemetry mb-1">
                      <CheckCircle2 size={14} />
                      <span>{activeLivingLabel.pohhIndex}% Proof-of-Human-Hand Verified</span>
                    </div>
                    <p className="text-[11px] text-[#EDE6DD]/80 leading-relaxed">
                      Microscopic thread tension variance detected via computer vision proves
                      human palm kinetic rhythm, eliminating machine imitation.
                    </p>
                  </div>

                  {/* Action Buttons */}
                  <div className="flex items-center gap-3 pt-2">
                    <button
                      onClick={() => {
                        onAddToCart?.(activeLivingLabel);
                        setActiveLivingLabel(null);
                      }}
                      className="flex-1 py-2.5 rounded-full bg-gradient-to-r from-[#C85A32] to-[#D4AF37] text-black font-semibold text-xs tracking-wider uppercase shadow-lg shadow-[#D4AF37]/20 hover:scale-[1.02] transition-all flex items-center justify-center gap-2"
                    >
                      <ShoppingBag size={14} />
                      <span>Commission Masterpiece</span>
                    </button>

                    <button
                      onClick={() => {
                        navigator.clipboard?.writeText(JSON.stringify(activeLivingLabel, null, 2));
                        alert('Living Label JSON copied to clipboard!');
                      }}
                      className="px-3 py-2.5 rounded-full bg-[#28211b] border border-[#D4AF37]/30 text-xs text-[#D4AF37] hover:bg-[#D4AF37]/20 font-telemetry"
                    >
                      Copy Beckn JSON
                    </button>
                  </div>
                </div>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </section>
  );
};

export default ArtisanVaultGrid;
