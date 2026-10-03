import type { CraftCategory, SignatureHub } from '../types/craft';

export const CRAFT_CATEGORIES: CraftCategory[] = [
  {
    id: 'Textiles',
    title: 'Textiles',
    subtitle: 'Regional | Textiles',
    description: 'Rich woven Banarasi, Chanderi, Patola & Kanchipuram silk folds.',
    image: '/images/ikat.webp',
  },
  {
    id: 'Pottery & Terracotta',
    title: 'Pottery & Terracotta',
    subtitle: 'Regional | Pottery',
    description: 'Hand-turned earthenware, Khurja ceramics & Longpi stone pots.',
    image: '/images/pottery.webp',
  },
  {
    id: 'Handloom Weaving',
    title: 'Handloom Weaving',
    subtitle: 'Regional | Weaving',
    description: 'Traditional geometric pit-loom & backstrap loom heritage fabrics.',
    image: '/images/weaver.webp',
  },
  {
    id: 'Dhokra Metalcraft',
    title: 'Dhokra Metalcraft',
    subtitle: 'Regional | Metalcraft',
    description: '4,000-year-old lost-wax cast bell metal & brass tribal artifacts.',
    image: '/images/dhokra.webp',
  },
  {
    id: 'Woodwork & Inlay',
    title: 'Woodwork & Inlay',
    subtitle: 'Regional | Woodcraft',
    description: 'Carved Kashmir walnut, Channapatna lacquer & brass inlay.',
    image: '/images/toys.webp',
  },
  {
    id: 'Leathercraft & Mojaris',
    title: 'Leathercraft & Mojaris',
    subtitle: 'Regional | Leather',
    description: 'Hand-stitched embroidered Mojaris, Juttis & Kolhapuri footwear.',
    image: '/images/leathercraft-mojari.webp',
  },
  {
    id: 'Stone & Marble Carving',
    title: 'Stone & Marble Carving',
    subtitle: 'Regional | Stonework',
    description: 'Perforated marble jaali screens, Agra pietra dura & Konark carving.',
    image: '/images/jharokha-gate.webp',
  },
  {
    id: 'Folk & Tribal Art',
    title: 'Folk & Tribal Art',
    subtitle: 'REGIONAL | FINE ART',
    description: 'Madhubani, Pattachitra, Warli & sacred Gond tribal canvases.',
    image: '/images/madhubani.webp',
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
  Textiles: [
    {
      state: 'Uttar Pradesh',
      cluster: 'Banaras & Mubarakpur',
      description: 'Real Zari Kadhwa Silk Brocades',
    },
    {
      state: 'Gujarat',
      cluster: 'Patan & Kutch',
      description: 'Double Ikat Patola & Desert Bandhani',
    },
    {
      state: 'Madhya Pradesh',
      cluster: 'Chanderi & Maheshwar',
      description: 'Gossamer Zari Cotton-Silk Weaves',
    },
    { state: 'Assam', cluster: 'Sualkuchi', description: 'Endemic Golden Muga Wild Silk' },
    {
      state: 'West Bengal',
      cluster: 'Phulia & Shantipur',
      description: 'Fine Muslin Jamdani & Baluchari',
    },
    {
      state: 'Tamil Nadu',
      cluster: 'Kanchipuram & Arani',
      description: 'Pure Mulberry Silk Temple Borders',
    },
  ],
  'Pottery & Terracotta': [
    {
      state: 'Uttar Pradesh',
      cluster: 'Khurja & Nizamabad',
      description: 'Celadon Ceramics & Smoked Black Clay',
    },
    {
      state: 'Rajasthan',
      cluster: 'Jaipur & Alwar',
      description: 'Persian Quartz Blue Pottery & Kagzi Clay',
    },
    {
      state: 'Manipur',
      cluster: 'Longpi (Ukhrul)',
      description: 'Serpentine Rock Wheel-less Earthenware',
    },
    {
      state: 'West Bengal',
      cluster: 'Bankura & Bishnupur',
      description: 'Ancient Terracotta Votive Sculptures',
    },
    {
      state: 'Jammu & Kashmir',
      cluster: 'Srinagar Old City',
      description: 'Glazed Kashmiri Dal Lake Clay Ware',
    },
  ],
  'Handloom Weaving': [
    {
      state: 'Odisha',
      cluster: 'Bargarh & Nuapatna',
      description: 'Sambalpuri & Maniabandha Bandha Ikat',
    },
    {
      state: 'Andhra Pradesh',
      cluster: 'Pochampally & Mangalagiri',
      description: 'Geometric Telia Rumal & Fine Cottons',
    },
    {
      state: 'Nagaland',
      cluster: 'Kohima & Dimapur',
      description: 'Backstrap Loom Clan Diamond Shawls',
    },
    {
      state: 'Himachal Pradesh',
      cluster: 'Kullu & Kinnaur',
      description: 'Geometric Bordered Yak & Merino Wool',
    },
  ],
  'Dhokra Metalcraft': [
    {
      state: 'Chhattisgarh',
      cluster: 'Bastar & Kondagaon',
      description: 'Sacred Tribal Lost-Wax Metallurgy',
    },
    {
      state: 'Odisha',
      cluster: 'Dhenkanal & Sadeibareni',
      description: 'Brass Filigree Wire Coil Sculptures',
    },
    {
      state: 'West Bengal',
      cluster: 'Bikna & Dariapur',
      description: 'Pai Rice Measures & Folk Idols',
    },
    {
      state: 'Jharkhand',
      cluster: 'Hazaribagh & Malhor',
      description: 'Ancient Tribal Bell-Metal Artifacts',
    },
  ],
  'Woodwork & Inlay': [
    {
      state: 'Karnataka',
      cluster: 'Channapatna & Mysuru',
      description: 'Organic Turmeric Lacquerware & Rosewood',
    },
    {
      state: 'Jammu & Kashmir',
      cluster: 'Srinagar Jaali Guild',
      description: 'Deep Relief Root Walnut Woodcraft',
    },
    {
      state: 'Punjab',
      cluster: 'Hoshiarpur',
      description: 'Fine Sheesham Wood Brass Inlay (Tarkashi)',
    },
    {
      state: 'Kerala',
      cluster: 'Thrissur & Nilambur',
      description: 'Rosewood Temple Carvings & Nettur Petti',
    },
  ],
  'Leathercraft & Mojaris': [
    {
      state: 'Rajasthan',
      cluster: 'Jaipur & Jodhpur',
      description: 'Hand-Stitched Silk Embroidered Mojaris',
    },
    {
      state: 'Punjab',
      cluster: 'Muktsar & Fazilka',
      description: 'Real Gold Tilla Needlework Royal Juttis',
    },
    {
      state: 'Maharashtra',
      cluster: 'Kolhapur & Athani',
      description: 'Natural Tanned Hand-Braided Chappals',
    },
  ],
  'Stone & Marble Carving': [
    {
      state: 'Rajasthan',
      cluster: 'Makrana & Jaipur',
      description: 'Pure Calcite Marble Jaali & Statuary',
    },
    {
      state: 'Uttar Pradesh',
      cluster: 'Agra Naqqashi',
      description: 'Mughal Pietra Dura Semi-Precious Inlay',
    },
    {
      state: 'Odisha',
      cluster: 'Konark & Puri',
      description: 'Khondalite & Black Chlorite Temple Carving',
    },
    {
      state: 'Tamil Nadu',
      cluster: 'Mahabalipuram',
      description: 'Pallava Monolithic Granite Sculptures',
    },
  ],
  'Folk & Tribal Art': [
    {
      state: 'Bihar',
      cluster: 'Madhubani (Mithila)',
      description: 'Godna & Kachni Natural Pigment Murals',
    },
    {
      state: 'Maharashtra',
      cluster: 'Palghar & Dahanu',
      description: 'Ritualistic Rice Paste Warli Murals',
    },
    {
      state: 'Odisha',
      cluster: 'Raghurajpur Heritage Village',
      description: 'Etched Palm Leaf Tala Pattachitra',
    },
    {
      state: 'Madhya Pradesh',
      cluster: 'Dindori (Gond)',
      description: 'Sacred Forest Dot-and-Line Folk Canvases',
    },
    {
      state: 'Rajasthan',
      cluster: 'Nathdwara & Bhilwara',
      description: 'Shrinathji Temple Pichwai & Phad Scrolls',
    },
  ],
};
