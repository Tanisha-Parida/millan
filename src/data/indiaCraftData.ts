export interface CraftDetail {
  name: string;
  category: string;
  giTag: string;
  significance: string;
  communities: string;
  materials: string;
  image?: string;
}

export interface StateDossier {
  id: string;
  name: string;
  type: 'State' | 'Union Territory';
  region: 'Northern' | 'Western' | 'Central' | 'Eastern' | 'Southern' | 'Northeastern';
  capital: string;
  activeArtisans: string;
  giClusters: number;
  tagline: string;
  summary: string;
  mapPinCoords: { x: number; y: number };
  crafts: CraftDetail[];
}

export interface ConstellationHotspot {
  id: string;
  name: string;
  xPct: number;
  yPct: number;
  labelPos?: 'top' | 'bottom' | 'left' | 'right';
}

export const CONSTELLATION_HOTSPOTS: ConstellationHotspot[] = [
  { id: 'ladakh', name: 'Ladakh', xPct: 37.14, yPct: 9.36, labelPos: 'right' },
  { id: 'jammu-kashmir', name: 'Jammu & Kashmir', xPct: 30.66, yPct: 14.98, labelPos: 'left' },
  { id: 'himachal-pradesh', name: 'Himachal Pradesh', xPct: 35.4, yPct: 18.92, labelPos: 'right' },
  { id: 'chandigarh', name: 'Chandigarh', xPct: 35.54, yPct: 21.39, labelPos: 'right' },
  { id: 'punjab', name: 'Punjab', xPct: 31.01, yPct: 23.19, labelPos: 'left' },
  { id: 'uttarakhand', name: 'Uttarakhand', xPct: 43.82, yPct: 26.43, labelPos: 'right' },
  { id: 'haryana', name: 'Haryana', xPct: 33.18, yPct: 27.86, labelPos: 'left' },
  { id: 'delhi', name: 'Delhi', xPct: 35.74, yPct: 29.38, labelPos: 'right' },
  {
    id: 'arunachal-pradesh',
    name: 'Arunachal Pradesh',
    xPct: 84.38,
    yPct: 29.85,
    labelPos: 'right',
  },
  { id: 'sikkim', name: 'Sikkim', xPct: 70.78, yPct: 32.62, labelPos: 'top' },
  { id: 'uttar-pradesh', name: 'Uttar Pradesh', xPct: 47.75, yPct: 35.23, labelPos: 'top' },
  { id: 'rajasthan', name: 'Rajasthan', xPct: 24.67, yPct: 35.48, labelPos: 'top' },
  { id: 'assam', name: 'Assam', xPct: 81.01, yPct: 36.16, labelPos: 'right' },
  { id: 'nagaland', name: 'Nagaland', xPct: 89.01, yPct: 36.76, labelPos: 'right' },
  { id: 'bihar', name: 'Bihar', xPct: 63.11, yPct: 39.47, labelPos: 'top' },
  { id: 'meghalaya', name: 'Meghalaya', xPct: 77.34, yPct: 40.86, labelPos: 'left' },
  { id: 'manipur', name: 'Manipur', xPct: 88.11, yPct: 41.42, labelPos: 'right' },
  { id: 'madhya-pradesh', name: 'Madhya Pradesh', xPct: 37.07, yPct: 45.06, labelPos: 'top' },
  { id: 'jharkhand', name: 'Jharkhand', xPct: 60.5, yPct: 45.33, labelPos: 'top' },
  { id: 'gujarat', name: 'Gujarat', xPct: 19.41, yPct: 45.71, labelPos: 'top' },
  { id: 'tripura', name: 'Tripura', xPct: 81.72, yPct: 46.5, labelPos: 'left' },
  { id: 'mizoram', name: 'Mizoram', xPct: 85.29, yPct: 48.93, labelPos: 'right' },
  { id: 'west-bengal', name: 'West Bengal', xPct: 67.98, yPct: 49.73, labelPos: 'right' },
  { id: 'daman-diu', name: 'Daman & Diu', xPct: 13.65, yPct: 52.14, labelPos: 'left' },
  { id: 'chhattisgarh', name: 'Chhattisgarh', xPct: 48.58, yPct: 52.98, labelPos: 'top' },
  {
    id: 'dadra-nagar-haveli',
    name: 'Dadra & Nagar Haveli',
    xPct: 16.02,
    yPct: 54.53,
    labelPos: 'left',
  },
  { id: 'maharashtra', name: 'Maharashtra', xPct: 31.87, yPct: 57.68, labelPos: 'top' },
  { id: 'odisha', name: 'Odisha', xPct: 58.83, yPct: 58.12, labelPos: 'top' },
  { id: 'telangana', name: 'Telangana', xPct: 42.53, yPct: 64.3, labelPos: 'top' },
  { id: 'goa', name: 'Goa', xPct: 24.98, yPct: 69.18, labelPos: 'left' },
  { id: 'andhra-pradesh', name: 'Andhra Pradesh', xPct: 43.68, yPct: 73.16, labelPos: 'top' },
  { id: 'karnataka', name: 'Karnataka', xPct: 30.81, yPct: 73.54, labelPos: 'left' },
  { id: 'lakshadweep', name: 'Lakshadweep', xPct: 15.88, yPct: 81.66, labelPos: 'left' },
  { id: 'puducherry', name: 'Puducherry', xPct: 46.9, yPct: 82.83, labelPos: 'right' },
  { id: 'tamil-nadu', name: 'Tamil Nadu', xPct: 40.36, yPct: 82.96, labelPos: 'top' },
  { id: 'kerala', name: 'Kerala', xPct: 32.21, yPct: 86.17, labelPos: 'left' },
  {
    id: 'andaman-nicobar',
    name: 'Andaman & Nicobar Islands',
    xPct: 83.66,
    yPct: 86.69,
    labelPos: 'left',
  },
  { id: 'minicoy', name: 'Minicoy', xPct: 17.29, yPct: 94.4, labelPos: 'right' },
];

export const INDIA_CRAFT_DOSSIERS: Record<string, StateDossier> = {
  rajasthan: {
    id: 'rajasthan',
    name: 'Rajasthan',
    type: 'State',
    region: 'Western',
    capital: 'Jaipur',
    activeArtisans: '142,000+',
    giClusters: 24,
    tagline: 'Desert Color Alchemy, Royal Ateliers & Devotional Miniature Art',
    summary:
      'From Persian quartz blue glazes and sacred Pichwai temple canvases to master Bagru mud-resist block printing, Rajasthan represents the pinnacle of royal court ateliers.',
    mapPinCoords: { x: 24.67, y: 35.48 },
    crafts: [
      {
        name: 'Jaipur Blue Pottery',
        category: 'Pottery & Ceramics',
        giTag: 'GI Certified (GI-26)',
        significance:
          'Formed from crushed quartz stone, Fuller’s earth, and natural gum rather than clay, hand-painted with cobalt blue and copper oxide glazes.',
        communities: 'Kripal Kumbh disciples and Jaipur artisan guilds',
        materials: 'Quartz stone powder, glass cullet, Multani mitti, cobalt oxide',
        image: '/images/pottery.webp',
      },
      {
        name: 'Bagru & Sanganeri Hand-Block Print',
        category: 'Textiles & Dyeing',
        giTag: 'GI Certified (GI-219)',
        significance:
          'Centuries-old Dabu mud-resist and Chippa hand-block printing on natural cotton using indigenous vegetable madder, harda, and indigo dyes.',
        communities: 'Chhipa master printers of Bagru & Sanganer',
        materials: 'Carved teakwood blocks, river mud resist, natural indigo',
        image: '/images/ikat.webp',
      },
      {
        name: 'Nathdwara Pichwai Paintings',
        category: 'Folk & Devotional Art',
        giTag: 'GI Certified (GI-446)',
        significance:
          'Sacred devotional textile paintings depicting Lord Shrinathji amidst blooming lotus ponds and holy cows, detailed in 24k gold leaf and natural stone pigments.',
        communities: 'Pushtimarg temple artists of Nathdwara',
        materials: 'Pure khadi cotton, natural mineral colors, real gold foil',
        image: '/images/madhubani.webp',
      },
      {
        name: 'Pratapgarh Thewa Jewelry',
        category: 'Precious Metals & Glass',
        giTag: 'GI Certified (GI-235)',
        significance:
          'A guarded 400-year-old technique where 24k pure gold sheets are etched into royal hunting scenes and fused onto molten colored Belgian glass.',
        communities: 'Rajsoni jeweler lineage of Pratapgarh',
        materials: '24K pure gold leaf, colored glass sheets, silver casing',
        image: '/images/dhokra.webp',
      },
      {
        name: 'Hand-Embroidered Mojaris & Juttis',
        category: 'Leathercraft',
        giTag: 'GI Certified (GI-171)',
        significance:
          'Vegetable-tanned leather footwear hand-stitched with cotton yarn and adorned with brass sequins and silk zari embroidery.',
        communities: 'Regar and Mochi traditional cobbler guilds',
        materials: 'Tanned hide, silk yarn, brass sequins',
        image: '/images/leathercraft-mojari.webp',
      },
    ],
  },

  'uttar-pradesh': {
    id: 'uttar-pradesh',
    name: 'Uttar Pradesh',
    type: 'State',
    region: 'Northern',
    capital: 'Lucknow',
    activeArtisans: '185,000+',
    giClusters: 34,
    tagline: 'Imperial Court Traditions & Sacred Riverbank Guilds',
    summary:
      'From the reduction-fired black earthenware of Nizamabad and Banarasi gold brocades to the engraved brassware of Moradabad, UP is the epicenter of North Indian craft heritage.',
    mapPinCoords: { x: 47.75, y: 35.23 },
    crafts: [
      {
        name: 'Nizamabad Smoked Black Clay Pottery',
        category: 'Pottery & Ceramics',
        giTag: 'GI Certified (GI-397)',
        significance:
          'Unique reduction-firing technique where pots are baked with rice husks in sealed kilns, turning clay deep jet black, followed by filling etched incisions with silvery zinc amalgam.',
        communities: 'Prajapati Kumhar Guilds of Azamgarh',
        materials: 'Local alluvial clay, rice husk smoke, zinc-lead-tin paste',
        image: '/images/pottery.webp',
      },
      {
        name: 'Varanasi Banarasi Kadhwa Silk Brocade',
        category: 'Handloom Weaving',
        giTag: 'GI Certified (GI-99)',
        significance:
          'Hand-woven on traditional pit looms where each floral motif is individually engraved with real gold and silver zari threads using the labor-intensive Kadhwa technique.',
        communities: 'Ansari master weavers of Varanasi & Mubarakpur',
        materials: 'Mulberry Katan silk, real gold and silver metallic wire (Zari)',
        image: '/images/weaver.webp',
      },
      {
        name: 'Moradabad Engraved Brassware',
        category: 'Metalcraft & Casting',
        giTag: 'GI Certified (GI-237)',
        significance:
          'Known globally as Peetal Nagari, master craftsmen engrave intricate Naqqaashi floral arabesques and colored enameling on hand-turned brass vessels.',
        communities: 'Kasera and Thathela metal artisan clans',
        materials: 'Pure brass alloys, engraving chisels (tilli), lacquer resins',
        image: '/images/dhokra.webp',
      },
      {
        name: 'Lucknow Chikan Needlework',
        category: 'Textiles & Needlework',
        giTag: 'GI Certified (GI-119)',
        significance:
          'Refined in Awadhi royal courts, Chikankari features up to 32 delicate shadow stitches on sheer muslin, including Tepchi, Bakhiya, and Murri.',
        communities: 'Awadhi Master Karigars of Chowk, Lucknow',
        materials: 'Fine mulmul cotton, unbleached silk threads, needlework',
        image: '/images/ikat.webp',
      },
    ],
  },

  gujarat: {
    id: 'gujarat',
    name: 'Gujarat',
    type: 'State',
    region: 'Western',
    capital: 'Gandhinagar',
    activeArtisans: '115,000+',
    giClusters: 20,
    tagline: 'Desert Block-Print Chemistry, Rogan Stylus Art & Double Ikat',
    summary:
      'The maritime craft capital of the subcontinent, home to the mathematical miracle of Patola double-ikat, castor-oil Rogan painting, and 16-stage Ajrakh block prints.',
    mapPinCoords: { x: 19.41, y: 45.71 },
    crafts: [
      {
        name: 'Patan Patola Double Ikat',
        category: 'Handloom Weaving',
        giTag: 'GI Certified (GI-232)',
        significance:
          'Both warp and weft silk yarns are individually tied and dyed with mathematical precision; identical on both sides, taking up to 6 months per single saree.',
        communities: 'Salvi family guild of Patan (850+ years unbroken tradition)',
        materials: 'Pure mulberry silk, natural madder, indigo, turmeric dyes',
        image: '/images/weaver.webp',
      },
      {
        name: 'Ajrakh Hand-Block Print',
        category: 'Textiles & Dyeing',
        giTag: 'GI Certified (GI-495)',
        significance:
          'A 16-stage natural resist dyeing ritual honoring the night sky with star lattices using indigo, harda, and iron-rust mordants.',
        communities: 'Khatri artisans of Dhamadka & Ajrakhpur',
        materials: 'Hand-carved teak wood blocks, indigo, madder, iron mordant',
        image: '/images/ikat.webp',
      },
      {
        name: 'Nirona Rogan Castor Oil Art',
        category: 'Folk & Tribal Art',
        giTag: 'GI Certified (GI-388)',
        significance:
          'Extremely rare 400-year-old craft where boiled castor oil paste is mixed with earth pigments and extruded with a 6-inch blunt stylus without touching fabric directly.',
        communities: 'Khatri Abdul Gafur lineage of Nirona Village, Kutch',
        materials: 'Boiled castor seed oil, natural rock pigments, cotton fabric',
        image: '/images/madhubani.webp',
      },
    ],
  },

  'west-bengal': {
    id: 'west-bengal',
    name: 'West Bengal',
    type: 'State',
    region: 'Eastern',
    capital: 'Kolkata',
    activeArtisans: '120,000+',
    giClusters: 22,
    tagline: 'Terracotta Temples, Jamdani Looms & Lost-Wax Bell Metal',
    summary:
      'A convergence of narrative terracotta sculpture, gossamer Jamdani and Baluchari silks, prehistoric lost-wax metal casting, and folk Kantha embroidery.',
    mapPinCoords: { x: 67.98, y: 49.73 },
    crafts: [
      {
        name: 'Bankura Terracotta Sculptures',
        category: 'Pottery & Ceramics',
        giTag: 'GI Certified (GI-85)',
        significance:
          'Hand-turned votive terracotta horses and temple sculptures from Panchmura and Bishnupur, featuring soaring pointed ears and symmetric neck embellishments.',
        communities: 'Kumbhakar master potters of Bankura',
        materials: 'Alluvial river clay, natural pit firing',
        image: '/images/pottery.webp',
      },
      {
        name: 'Jamdani & Baluchari Silk Weaving',
        category: 'Handloom Weaving',
        giTag: 'GI Certified (GI-173)',
        significance:
          'Historic loom art featuring mythological scenes from the Ramayana and Mahabharata woven into pallus with supplementary weft threads.',
        communities: 'Bishnupur and Shantipur traditional weavers',
        materials: 'Mulberry silk threads, polished raw zari',
        image: '/images/weaver.webp',
      },
      {
        name: 'Bikna Dokra Lost-Wax Metalcraft',
        category: 'Dhokra Metalcraft',
        giTag: 'GI Certified (GI-86)',
        significance:
          '4,000-year-old cire-perdue technique using beeswax threads wrapped over a clay core, melted out to cast hollow bell-metal tribal icons.',
        communities: 'Dhokra Damar metal smiths of Bankura',
        materials: 'Beeswax, clay cores, recycled bell metal & brass',
        image: '/images/dhokra.webp',
      },
      {
        name: 'Nakshi Kantha Folk Embroidery',
        category: 'Textiles & Needlework',
        giTag: 'GI Certified (GI-108)',
        significance:
          'Folk running-stitch needlework on layered fabrics narrating village life, lotus wheels, and Bengali pastoral lore.',
        communities: 'Rural women collectives of Birbhum & Murshidabad',
        materials: 'Mulmul cotton, tussar silk strands',
        image: '/images/ikat.webp',
      },
    ],
  },

  odisha: {
    id: 'odisha',
    name: 'Odisha',
    type: 'State',
    region: 'Eastern',
    capital: 'Bhubaneswar',
    activeArtisans: '95,000+',
    giClusters: 21,
    tagline: 'Temple Epics, Silver Filigree Wire & Bandha Silk Geometry',
    summary:
      'Rooted in the devotional cosmos of the Jagannath Temple, Odisha crafts embody meditative precision from gossamer silver wire filigree to palm-leaf etchings.',
    mapPinCoords: { x: 58.83, y: 58.12 },
    crafts: [
      {
        name: 'Raghurajpur Pattachitra Painting',
        category: 'Folk & Tribal Art',
        giTag: 'GI Certified (GI-87)',
        significance:
          'Cloth-based scroll painting made on dried patta soaked in tamarind seed paste, painted with 100% natural mineral pigments and conch shell white.',
        communities: 'Chitrakar artisan families of Raghurajpur Heritage Village',
        materials: 'Tussar silk or cotton cloth, natural stone pigments, lamp soot',
        image: '/images/madhubani.webp',
      },
      {
        name: 'Sambalpuri Bandha Ikat Weaving',
        category: 'Handloom Weaving',
        giTag: 'GI Certified (GI-107)',
        significance:
          'Tie-dye method applied directly to warp and weft yarns before weaving on pit looms, creating precision curvilinear temple and conch motifs.',
        communities: 'Meher weaver caste of Bargarh & Sonepur',
        materials: 'Mulberry silk yarn, indigenous organic natural dyes',
        image: '/images/ikat.webp',
      },
      {
        name: 'Cuttack Tarakasi (Silver Filigree)',
        category: 'Precious Metals',
        giTag: 'GI Certified (GI-442)',
        significance:
          'Fine strands of pure 99% silver drawn through dies as thin as human hair, twisted and crimped into ethereal lace jewelry and royal chariot replicas.',
        communities: 'Rupa Karigars of Cuttack (500+ years guild lineage)',
        materials: 'Fine silver (99.9%), gold vermeil, carbon flux',
        image: '/images/dhokra.webp',
      },
    ],
  },

  'tamil-nadu': {
    id: 'tamil-nadu',
    name: 'Tamil Nadu',
    type: 'State',
    region: 'Southern',
    capital: 'Chennai',
    activeArtisans: '135,000+',
    giClusters: 32,
    tagline: 'Temple Brocades, Gilded Thanjavur & Chola Lost-Wax Bronze',
    summary:
      'Heir to two millennia of Dravidian temple patronage, Tamil Nadu leads India in GI registrations, producing sacred bronzes, gold foil art, and heavy bridal silks.',
    mapPinCoords: { x: 40.36, y: 82.96 },
    crafts: [
      {
        name: 'Kanchipuram Korvai Silk Saree',
        category: 'Handloom Weaving',
        giTag: 'GI Certified (GI-4)',
        significance:
          'Heavy three-ply mulberry silk woven with the iconic Korvai interlocking technique where the contrast pallu and temple borders are linked by two weavers concurrently.',
        communities: 'Padmasaliyar and Pattunoolkarar weavers of Kanchipuram',
        materials: 'Pure mulberry silk, silver wire electroplated with 22k gold',
        image: '/images/weaver.webp',
      },
      {
        name: 'Thanjavur 22k Gold Foil Paintings',
        category: 'Folk & Decorative Art',
        giTag: 'GI Certified (GI-7)',
        significance:
          'Sacred classical paintings created on jackfruit wood, inlaid with semi-precious Jaipur stones and covered with pure 22k gold foil (relief gesso technique).',
        communities: 'Raju and Naidu artist guilds of Thanjavur',
        materials: 'Gold foil leaves (22K), chalk powder, Arabic gum, gemstones',
        image: '/images/madhubani.webp',
      },
      {
        name: 'Swamimalai Chola Bronze Icons',
        category: 'Metalcraft & Casting',
        giTag: 'GI Certified (GI-27)',
        significance:
          'Direct lineage of the Imperial Chola bronze casters, following strict Shilpa Shastras proportions to cast Nataraja and sacred deities using lost-wax methods.',
        communities: 'Sthapathis of Swamimalai (unbroken 1,000-year guild)',
        materials: 'Panchaloha alloy (copper, zinc, tin, silver, gold), beeswax',
        image: '/images/dhokra.webp',
      },
    ],
  },

  'jammu-kashmir': {
    id: 'jammu-kashmir',
    name: 'Jammu & Kashmir',
    type: 'Union Territory',
    region: 'Northern',
    capital: 'Srinagar / Jammu',
    activeArtisans: '78,000+',
    giClusters: 12,
    tagline: 'Himalayan Cashmere, Carved Walnut & Royal Kani Looms',
    summary:
      'Cradled by snow-crested peaks, Kashmiri craftsmanship embodies Persian-Himalayan royal refinement, celebrated worldwide for hand-spun Changthangi fleece and dark walnut marquetry.',
    mapPinCoords: { x: 30.66, y: 14.98 },
    crafts: [
      {
        name: 'Kashmiri Pashmina Shawls & Sozni Needlework',
        category: 'Textiles & Needlework',
        giTag: 'GI Certified (GI-46)',
        significance:
          'Hand-spun fleece sheared from the Himalayan Capra Hircus goat, spun on yinder wooden wheels and embroidered with microscopic Sozni floral needlework.',
        communities: 'Women spinning guilds & Sozni master embroiderers of Srinagar',
        materials: '12-14 micron Changthangi cashmere goat fleece, silk thread',
        image: '/images/ikat.webp',
      },
      {
        name: 'Kashmir Walnut Wood Carving',
        category: 'Woodwork & Inlay',
        giTag: 'GI Certified (GI-182)',
        significance:
          'Deep undercut, relief, and perforated carving on seasoned Himalayan walnut roots (Juglans Regia), depicting dragons, chinar leaves, and lotus rosettes.',
        communities: 'Kashmiri Kharadi woodcarver guilds of Downtown Srinagar',
        materials: 'Seasoned Kashmir walnut timber, hand steel gouges',
        image: '/images/toys.webp',
      },
      {
        name: 'Royal Kashmiri Papier-Mâché Craft',
        category: 'Decorative Folk Art',
        giTag: 'GI Certified (GI-45)',
        significance:
          'Pounded paper pulp molded into royal boxes, hand-painted with real 24k gold leaf and mineral pigments in intricate Gul-andar-gul floral styles.',
        communities: 'Srinagar Sakhtsazi and Naqqaashi master families',
        materials: 'Macerated paper pulp, rice paste, 24k gold foil, lac varnish',
        image: '/images/pottery.webp',
      },
    ],
  },

  'madhya-pradesh': {
    id: 'madhya-pradesh',
    name: 'Madhya Pradesh',
    type: 'State',
    region: 'Central',
    capital: 'Bhopal',
    activeArtisans: '110,000+',
    giClusters: 18,
    tagline: 'Gossamer Zari Silks, Sacred Gond Lore & Bell Metal',
    summary:
      'The green forested heartland of India, Madhya Pradesh harmonizes Vedic loom traditions with primeval tribal animism etched onto raw canvases and molten bell metal.',
    mapPinCoords: { x: 37.07, y: 45.06 },
    crafts: [
      {
        name: 'Chanderi Silk-Cotton Weaving',
        category: 'Handloom Weaving',
        giTag: 'GI Certified (GI-19)',
        significance:
          'Celebrated for its feather-light sheer texture, hand-woven with fine 300-count unbleached silk warp and cotton weft, finished with gold zari booty motifs.',
        communities: 'Koli and Ansari weaver guilds of Chanderi town',
        materials: 'Raw mulberry silk, high-twist fine cotton, pure gold zari',
        image: '/images/weaver.webp',
      },
      {
        name: 'Gond Tribal Painting',
        category: 'Folk & Tribal Art',
        giTag: 'GI Certified (GI-389)',
        significance:
          'Created by the Pardhan Gond tribe to adorn mud walls, using dense lines, dots, and vibrant cosmic scales to narrate tree spirits, totems, and folklore.',
        communities: 'Pardhan Gond artist families of Patangarh & Dindori',
        materials: 'Natural clay, charcoal, plant pigments, canvas',
        image: '/images/madhubani.webp',
      },
      {
        name: 'Bagh Block Print',
        category: 'Textiles & Dyeing',
        giTag: 'GI Certified (GI-125)',
        significance:
          'Geometric floral resist print created on riverbanks using natural copper sulfate, iron shavings, and alum washes, cured under natural sunlight.',
        communities: 'Khatri printing families of Bagh village',
        materials: 'Bleached cotton/tussar silk, pomegranate rind, iron rust',
        image: '/images/ikat.webp',
      },
    ],
  },

  maharashtra: {
    id: 'maharashtra',
    name: 'Maharashtra',
    type: 'State',
    region: 'Western',
    capital: 'Mumbai',
    activeArtisans: '88,000+',
    giClusters: 15,
    tagline: 'Royal Peshwa Paithani Gold & Kolhapuri Leather',
    summary:
      'Flanked by the Western Ghats and Arabian Sea, Maharashtra boasts royal gold-woven Paithani silks, Warli mud-wall art, and master Kolhapuri cobbler guilds.',
    mapPinCoords: { x: 31.87, y: 57.68 },
    crafts: [
      {
        name: 'Paithani Gold Brocade Saree',
        category: 'Handloom Weaving',
        giTag: 'GI Certified (GI-2)',
        significance:
          'Royal tapestry weaving where pure silk threads and gold zari create oblique square border designs and peacock (mor) pallu motifs.',
        communities: 'Shalik master weavers of Yeola & Paithan',
        materials: 'Mulberry silk, fine metallic gold zari',
        image: '/images/weaver.webp',
      },
      {
        name: 'Kolhapuri Hand-Stitched Chappals',
        category: 'Leathercraft',
        giTag: 'GI Certified (GI-170)',
        significance:
          'Hand-braided, vegetable-tanned footwear assembled without a single iron nail, conditioned using natural mustard oil.',
        communities: 'Kolhapur & Athani cobbler guilds',
        materials: 'Vegetable-tanned leather, braided thongs, wooden pegs',
        image: '/images/leathercraft-mojari.webp',
      },
      {
        name: 'Warli Tribal Wall Painting',
        category: 'Folk & Tribal Art',
        giTag: 'GI Certified (GI-197)',
        significance:
          'Monochrome white rice-paste geometric painting depicting Tarpa circle dances and harvest celebrations on mud walls.',
        communities: 'Warli indigenous clans of Palghar & Dahanu',
        materials: 'Rice paste, gum, red ochre mud plaster',
        image: '/images/madhubani.webp',
      },
    ],
  },

  karnataka: {
    id: 'karnataka',
    name: 'Karnataka',
    type: 'State',
    region: 'Southern',
    capital: 'Bengaluru',
    activeArtisans: '76,000+',
    giClusters: 22,
    tagline: 'Mysore Silk Royal Weaves, Channapatna Lacquer & Sandalwood',
    summary:
      'The historic seat of the Vijayanagara and Wodeyar empires, Karnataka preserves pure natural sandalwood carvings, organic lacquered toys, and royal Mysore silks.',
    mapPinCoords: { x: 30.81, y: 73.54 },
    crafts: [
      {
        name: 'Channapatna Lacquerware Toys',
        category: 'Woodwork & Inlay',
        giTag: 'GI Certified (GI-15)',
        significance:
          'Wooden kinetic spheres and rocking horses turned on high-speed lathes and coated with organic vegetable-dyed lacquer made from Wrightia tinctoria wood.',
        communities: 'Channapatna traditional artisan collectives',
        materials: 'Aale mara (ivory wood), shellac, turmeric and indigo dyes',
        image: '/images/toys.webp',
      },
      {
        name: 'Mysore Pure Silk Sarees',
        category: 'Handloom Weaving',
        giTag: 'GI Certified (GI-12)',
        significance:
          'Spun from pure South Indian raw silk cocoons, featuring 100% pure gold zari borders containing 0.65% pure gold and 65% pure silver.',
        communities: 'Mysore Silk Weavers Guild',
        materials: 'Bivoltine silk, pure gold & silver electroplated zari',
        image: '/images/weaver.webp',
      },
      {
        name: 'Bidriware Silver Inlay',
        category: 'Metalcraft & Inlay',
        giTag: 'GI Certified (GI-17)',
        significance:
          'Cast zinc and copper alloy blackened with soil from the Bidar Fort, intricately inlaid with pure silver floral sheets.',
        communities: 'Bidri craftsman families of Bidar',
        materials: 'Zinc-copper alloy, pure 99.9% silver wire, fort soil paste',
        image: '/images/dhokra.webp',
      },
    ],
  },

  kerala: {
    id: 'kerala',
    name: 'Kerala',
    type: 'State',
    region: 'Southern',
    capital: 'Thiruvananthapuram',
    activeArtisans: '54,000+',
    giClusters: 17,
    tagline: 'Sacred Aranmula Metal Mirrors, Kasavu & Bell Metal Lamps',
    summary:
      'Along India’s spice coast, Kerala preserves the world’s only reflective metal alloy mirrors, unbleached cotton kasavu gold borders, and temple bronze lamps.',
    mapPinCoords: { x: 32.21, y: 86.17 },
    crafts: [
      {
        name: 'Aranmula Kannadi Metal Mirror',
        category: 'Metalcraft & Casting',
        giTag: 'GI Certified (GI-1)',
        significance:
          'A guarded family secret alloy of copper and tin that produces a front-reflecting metal mirror with zero optical refraction.',
        communities: 'Viswakarma metal casting families of Aranmula',
        materials: 'Secret metallurgical speculum alloy, velvet polishing compound',
        image: '/images/dhokra.webp',
      },
      {
        name: 'Balaramapuram Kasavu Saree',
        category: 'Handloom Weaving',
        giTag: 'GI Certified (GI-152)',
        significance:
          'Unbleached natural cotton spun on pit looms, woven with genuine gold and silver zari border bands celebrating Onam.',
        communities: 'Shaliyar weavers of Balaramapuram',
        materials: 'Organic natural unbleached cotton, metallic gold zari',
        image: '/images/weaver.webp',
      },
    ],
  },

  'andhra-pradesh': {
    id: 'andhra-pradesh',
    name: 'Andhra Pradesh',
    type: 'State',
    region: 'Southern',
    capital: 'Amaravati',
    activeArtisans: '72,000+',
    giClusters: 16,
    tagline: 'Kalamkari Pen-Craft, Kondapalli Toys & Uppada Jamdani',
    summary:
      'A heartland of temple art and riverine textile printing, Andhra Pradesh is home to Srikalahasti bamboo-pen temple scrolls and gossamer Uppada sarees.',
    mapPinCoords: { x: 43.68, y: 73.16 },
    crafts: [
      {
        name: 'Srikalahasti Freehand Kalamkari',
        category: 'Folk & Tribal Art',
        giTag: 'GI Certified (GI-21)',
        significance:
          'Hand-drawn temple epics using a pointed bamboo stylus (kalam) with fermented jaggery ink and natural alum mordants.',
        communities: 'Kalamkari artisans of Srikalahasti',
        materials: 'Cotton fabric, bamboo pens, buffalo milk wash, madder',
        image: '/images/madhubani.webp',
      },
      {
        name: 'Kondapalli Softwood Toys',
        category: 'Woodwork & Inlay',
        giTag: 'GI Certified (GI-16)',
        significance:
          'Sculpted from local Poniki softwood, coated with tamarind paste and painted with vibrant vegetable colors depicting Dashavatara and village scenes.',
        communities: 'Aryakhshatriya artisan families of Kondapalli',
        materials: 'Tella Poniki light wood, natural lacquer pigments',
        image: '/images/toys.webp',
      },
    ],
  },

  telangana: {
    id: 'telangana',
    name: 'Telangana',
    type: 'State',
    region: 'Southern',
    capital: 'Hyderabad',
    activeArtisans: '61,000+',
    giClusters: 14,
    tagline: 'Pochampally Tie-Dye Ikats, Gadwal Sarees & Silver Filigree',
    summary:
      'Pochampally’s mathematical ikat geometry and Karimnagar’s silver filigree stand as benchmarks of Deccan craft perfection.',
    mapPinCoords: { x: 42.53, y: 64.3 },
    crafts: [
      {
        name: 'Pochampally Ikat (Pagdu Bandhu)',
        category: 'Handloom Weaving',
        giTag: 'GI Certified (GI-3)',
        significance:
          'India’s first registered GI textile, renowned for complex geometric patterns calculated before dying warp and weft silk yarns.',
        communities: 'Padmashali weavers of Bhoodan Pochampally',
        materials: 'Pure silk, combed cotton, natural pigment dyes',
        image: '/images/ikat.webp',
      },
      {
        name: 'Karimnagar Silver Filigree',
        category: 'Precious Metals',
        giTag: 'GI Certified (GI-104)',
        significance:
          'Fine lace-like silver decorative art hand-fashioned into intricate betel boxes and royal vessels.',
        communities: 'Karimnagar artisan silversmiths',
        materials: 'Pure silver wire, jewelers solder',
        image: '/images/dhokra.webp',
      },
    ],
  },

  bihar: {
    id: 'bihar',
    name: 'Bihar',
    type: 'State',
    region: 'Eastern',
    capital: 'Patna',
    activeArtisans: '84,000+',
    giClusters: 13,
    tagline: 'Madhubani Mithila Ritual Murals & Bhagalpur Silk',
    summary:
      'From ancient Mithila courtyards to the historic banks of the Ganges, Bihar preserves ritual bamboo-nib paintings and lustrous wild tussar silks.',
    mapPinCoords: { x: 63.11, y: 39.47 },
    crafts: [
      {
        name: 'Madhubani (Mithila) Painting',
        category: 'Folk & Tribal Art',
        giTag: 'GI Certified (GI-105)',
        significance:
          'Practiced by women on mud walls and handmade paper using double-line contours filled with natural cow dung and plant dyes.',
        communities: 'Brahmin and Kayastha women of Madhubani & Jitwarpur',
        materials: 'Handmade paper, bamboo twigs, natural minerals, soot',
        image: '/images/madhubani.webp',
      },
      {
        name: 'Bhagalpur Tussar Silk (Katiya)',
        category: 'Handloom Weaving',
        giTag: 'GI Certified (GI-165)',
        significance:
          'Reeled from wild forest Antheraea mylitta silkworm cocoons, noted for its deep earthy sheen and breathable thermal comfort.',
        communities: 'Bhagalpuri Tanti & Ansari weavers',
        materials: 'Wild tussar silk yarn, organic tree-bark dyes',
        image: '/images/weaver.webp',
      },
    ],
  },

  assam: {
    id: 'assam',
    name: 'Assam',
    type: 'State',
    region: 'Northeastern',
    capital: 'Dispur',
    activeArtisans: '92,000+',
    giClusters: 11,
    tagline: 'Golden Muga Wild Silk, Sarthebari Bell Metal & Jaapi',
    summary:
      'The lush valley of the Brahmaputra yields the world’s rarest golden silk — Muga — found nowhere else on earth, alongside hammered bell metal alloys.',
    mapPinCoords: { x: 81.01, y: 36.16 },
    crafts: [
      {
        name: 'Assam Muga Golden Silk',
        category: 'Handloom Weaving',
        giTag: 'GI Certified (GI-55)',
        significance:
          'Endemic only to Assam, Muga silk has an indelible natural golden luster that increases in shine with every wash, lasting generations.',
        communities: 'Sualkuchi Silk Guilds & Bodo weavers',
        materials: 'Wild Antheraea assamensis silk, bamboo throw shuttle',
        image: '/images/weaver.webp',
      },
      {
        name: 'Sarthebari Bell Metal Craft',
        category: 'Metalcraft & Casting',
        giTag: 'GI Certified (GI-144)',
        significance:
          'Hand-hammered traditional brass and bronze utensils (Kahi & Bati) beat with heavy mallets to produce sonorous resonance.',
        communities: 'Kahar community of Sarthebari',
        materials: 'Bell metal (78% copper, 22% tin alloy)',
        image: '/images/dhokra.webp',
      },
    ],
  },

  punjab: {
    id: 'punjab',
    name: 'Punjab',
    type: 'State',
    region: 'Northern',
    capital: 'Chandigarh',
    activeArtisans: '48,000+',
    giClusters: 7,
    tagline: 'Phulkari Floral Darning & Hand-Forged Brass Utensils',
    summary:
      'A culture of exuberance reflected in darning silk flower embroideries across coarse home-spun khaddar cloth.',
    mapPinCoords: { x: 31.01, y: 23.19 },
    crafts: [
      {
        name: 'Phulkari Silk Embroidery',
        category: 'Textiles & Needlework',
        giTag: 'GI Certified (GI-191)',
        significance:
          'Embroidered from the reverse of coarse khaddar cotton using untwisted silk yarn (Pat) in intricate darn stitches.',
        communities: 'Rural women craft guilds of Patiala & Amritsar',
        materials: 'Home-spun khaddar, unspun glossy silk floss (Pat)',
        image: '/images/ikat.webp',
      },
      {
        name: 'Jandiala Guru Brass & Copper Utensils',
        category: 'Metalcraft & Casting',
        giTag: 'GI Certified (GI-451)',
        significance:
          'Recognized on the UNESCO Intangible Cultural Heritage List, cold-hammered by Thathera artisans.',
        communities: 'Thathera metal guild of Amritsar',
        materials: 'Pure brass and copper sheets, pin-point hammers',
        image: '/images/dhokra.webp',
      },
    ],
  },

  haryana: {
    id: 'haryana',
    name: 'Haryana',
    type: 'State',
    region: 'Northern',
    capital: 'Chandigarh',
    activeArtisans: '38,000+',
    giClusters: 6,
    tagline: 'Panipat Heritage Durries & Rohtak Terracotta',
    summary:
      'Known as the "Cast-off Capital of Asia", Haryana preserves vintage hand-knotted cotton durries and woodcarvings.',
    mapPinCoords: { x: 33.18, y: 27.86 },
    crafts: [
      {
        name: 'Panipat Handloom Durries',
        category: 'Handloom Weaving',
        giTag: 'Heritage Registered',
        significance:
          'Sturdy flat-woven reversible geometric rugs crafted on pit looms from thick cotton and wool yarn.',
        communities: 'Panipat master weavers',
        materials: 'Combed cotton, wool yarn, natural dyes',
        image: '/images/weaver.webp',
      },
    ],
  },

  'himachal-pradesh': {
    id: 'himachal-pradesh',
    name: 'Himachal Pradesh',
    type: 'State',
    region: 'Northern',
    capital: 'Shimla / Dharamshala',
    activeArtisans: '34,000+',
    giClusters: 8,
    tagline: 'Kullu Geometric Wool Shawls & Chamba Rumal',
    summary:
      'Woven on fly-shuttle frame looms in Himalayan valleys, famous for striking Central Asian geometric border designs.',
    mapPinCoords: { x: 35.4, y: 18.92 },
    crafts: [
      {
        name: 'Kullu Hand-Woven Shawls',
        category: 'Handloom Weaving',
        giTag: 'GI Certified (GI-23)',
        significance:
          'Spun from indigenous sheep wool with multicolored interlocking tapestry motifs along the borders.',
        communities: 'Kullu Valley weaver societies',
        materials: 'Indigenous sheep fleece, merino wool, pashmina',
        image: '/images/weaver.webp',
      },
      {
        name: 'Chamba Rumal Needlework',
        category: 'Textiles & Needlework',
        giTag: 'GI Certified (GI-79)',
        significance:
          'Double-sided satin stitch embroidery that looks identical on both front and back, depicting Pahari miniature scenes.',
        communities: 'Chamba embroidery artists',
        materials: 'Unbleached mulmul, silk floss threads',
        image: '/images/ikat.webp',
      },
    ],
  },

  uttarakhand: {
    id: 'uttarakhand',
    name: 'Uttarakhand',
    type: 'State',
    region: 'Northern',
    capital: 'Dehradun',
    activeArtisans: '29,000+',
    giClusters: 9,
    tagline: 'Aipan Floor Geometries & Ringal Mountain Bamboo',
    summary:
      'The sacred Devbhoomi preserves ritual folk geometric paintings on red ochre courtyards and fine mountain bamboo baskets.',
    mapPinCoords: { x: 43.82, y: 26.43 },
    crafts: [
      {
        name: 'Kumaoni Aipan Ceremonial Art',
        category: 'Folk & Decorative Art',
        giTag: 'GI Certified (GI-440)',
        significance:
          'Sacred geometric patterns hand-drawn with rice flour paste (Biswar) over brick-red ochre (Geru) washed thresholds.',
        communities: 'Kumaon women artisan collectives',
        materials: 'Natural red clay (Geru), ground soaked rice paste',
        image: '/images/madhubani.webp',
      },
    ],
  },

  chhattisgarh: {
    id: 'chhattisgarh',
    name: 'Chhattisgarh',
    type: 'State',
    region: 'Central',
    capital: 'Raipur',
    activeArtisans: '52,000+',
    giClusters: 11,
    tagline: 'Bastar Lost-Wax Bell Metal & Forged Iron Craft',
    summary:
      'Deep tribal heartlands where ancestral forest blacksmiths hand-forge iron scrap into sleek totemic spirits and sacred bells.',
    mapPinCoords: { x: 48.58, y: 52.98 },
    crafts: [
      {
        name: 'Bastar Dhokra Bell Metal',
        category: 'Dhokra Metalcraft',
        giTag: 'GI Certified (GI-84)',
        significance:
          'Hollow lost-wax brass castings of elephant processions, forest spirits, and tree deities made by Ghadwa artisans.',
        communities: 'Ghadwa bronze smiths of Kondagaon & Bastar',
        materials: 'Clay, beeswax, mustard oil, recycled scrap brass',
        image: '/images/dhokra.webp',
      },
      {
        name: 'Bastar Forged Iron Craft (Loha Shilp)',
        category: 'Metalcraft & Casting',
        giTag: 'GI Certified (GI-83)',
        significance:
          'Recycled wrought iron heated in charcoal fires and hand-beaten into minimalist slender deer, birds, and lamps.',
        communities: 'Lohar tribal blacksmiths',
        materials: 'Recycled iron, charcoal, hand anvil',
        image: '/images/dhokra.webp',
      },
    ],
  },

  jharkhand: {
    id: 'jharkhand',
    name: 'Jharkhand',
    type: 'State',
    region: 'Eastern',
    capital: 'Ranchi',
    activeArtisans: '41,000+',
    giClusters: 8,
    tagline: 'Sohrai Khovar Mud Murals & Pyatkar Scroll Art',
    summary:
      'Tribal communities paint their mud homes during harvest festivals with comb-etched earth clays celebrating wildlife and fertility.',
    mapPinCoords: { x: 60.5, y: 45.33 },
    crafts: [
      {
        name: 'Sohrai & Khovar Mural Painting',
        category: 'Folk & Tribal Art',
        giTag: 'GI Certified (GI-458)',
        significance:
          'Created by indigenous Santhal and Kurmi women by coating mud walls in black soil, overlaying white clay, and etching with broken combs.',
        communities: 'Hazaribagh tribal women collectives',
        materials: 'Natural riverbed manganese, kaolin clay, neem combs',
        image: '/images/madhubani.webp',
      },
    ],
  },

  goa: {
    id: 'goa',
    name: 'Goa',
    type: 'State',
    region: 'Western',
    capital: 'Panaji',
    activeArtisans: '16,000+',
    giClusters: 5,
    tagline: 'Kunbi Tribal Weaves & Bicholim Earthen Terracotta',
    summary:
      'A tropical blend of indigenous Konkani craft and Portuguese colonial aesthetics, from checkered Kunbi sarees to glazed ceramics.',
    mapPinCoords: { x: 24.98, y: 69.18 },
    crafts: [
      {
        name: 'Goan Kunbi Saree Weaving',
        category: 'Handloom Weaving',
        giTag: 'GI Pending / Heritage Craft',
        significance:
          'Red and white checkered heavy cotton saree traditionally worn by the indigenous Kunbi tribal women of Goa.',
        communities: 'Goan tribal weaver clusters',
        materials: 'Combed cotton, madder root red dye',
        image: '/images/weaver.webp',
      },
    ],
  },

  sikkim: {
    id: 'sikkim',
    name: 'Sikkim',
    type: 'State',
    region: 'Northeastern',
    capital: 'Gangtok',
    activeArtisans: '18,000+',
    giClusters: 4,
    tagline: 'Sacred Buddhist Thangka Scrolls & Lepcha Weaves',
    summary:
      'High Himalayan Buddhist art tradition of silk-bordered sacred deity tapestries and durable hand-loomed Lepcha fabrics.',
    mapPinCoords: { x: 70.78, y: 32.62 },
    crafts: [
      {
        name: 'Sikkimese Buddhist Thangka Painting',
        category: 'Folk & Decorative Art',
        giTag: 'Heritage Registered',
        significance:
          'Meditation scrolls painted with ground lapis lazuli, coral, and pure gold detailing Tibetan Buddhist deities.',
        communities: 'Monastic and lay Thangka masters',
        materials: 'Treated linen, mineral paints, 24k gold leaf, silk borders',
        image: '/images/madhubani.webp',
      },
    ],
  },

  'arunachal-pradesh': {
    id: 'arunachal-pradesh',
    name: 'Arunachal Pradesh',
    type: 'State',
    region: 'Northeastern',
    capital: 'Itanagar',
    activeArtisans: '28,000+',
    giClusters: 8,
    tagline: 'Wancho Wood Carving & Mishmi Geometric Textiles',
    summary:
      'Deep eastern Himalayan indigenous tribes renowned for carved wooden warrior sculptures and waist-loom geometric tapestries.',
    mapPinCoords: { x: 84.38, y: 29.85 },
    crafts: [
      {
        name: 'Wancho Wooden Sculptures',
        category: 'Woodwork & Inlay',
        giTag: 'GI Certified (GI-486)',
        significance:
          'Carved with machetes from single logs of timber into figures of warriors, animal heads, and drinking horns.',
        communities: 'Wancho tribal craftsmen of Longding',
        materials: 'Local indigenous timber, natural plant stains',
        image: '/images/toys.webp',
      },
    ],
  },

  manipur: {
    id: 'manipur',
    name: 'Manipur',
    type: 'State',
    region: 'Northeastern',
    capital: 'Imphal',
    activeArtisans: '42,000+',
    giClusters: 7,
    tagline: 'Longpi Black Serpentine Stone Pottery & Shaphee Lanphee',
    summary:
      'Centuries-old wheel-less black stoneware sculpted from crushed serpentine rock and river clay, burnished with natural leaves.',
    mapPinCoords: { x: 88.11, y: 41.42 },
    crafts: [
      {
        name: 'Longpi Hamlei Black Stone Pottery',
        category: 'Pottery & Ceramics',
        giTag: 'GI Certified (GI-130)',
        significance:
          'Crafted without a pottery wheel by pounding weathering rock and clay, polished to high black sheen with Chiron-na leaves.',
        communities: 'Tangkhul Naga artisans of Longpi Village',
        materials: 'Serpentine stone powder, weathered brown clay, river water',
        image: '/images/pottery.webp',
      },
    ],
  },

  meghalaya: {
    id: 'meghalaya',
    name: 'Meghalaya',
    type: 'State',
    region: 'Northeastern',
    capital: 'Shillong',
    activeArtisans: '24,000+',
    giClusters: 5,
    tagline: 'Ahimsa Eri Peace Silk & Khasi Cane Baskets',
    summary:
      'The misty abode of clouds produces non-violent Eri peace silk and cane work with weather-resistant durability.',
    mapPinCoords: { x: 77.34, y: 40.86 },
    crafts: [
      {
        name: 'Ri-Bhoi Organic Eri Silk',
        category: 'Handloom Weaving',
        giTag: 'GI Registered Cluster',
        significance:
          'Silk reeled without killing the pupa inside (Ahimsa silk), naturally dyed with wild forest turmeric and iron-rich river mud.',
        communities: 'Khasi and Bhoi women weavers',
        materials: 'Organic Eri cocoon fleece, plant and root extracts',
        image: '/images/weaver.webp',
      },
    ],
  },

  mizoram: {
    id: 'mizoram',
    name: 'Mizoram',
    type: 'State',
    region: 'Northeastern',
    capital: 'Aizawl',
    activeArtisans: '21,000+',
    giClusters: 5,
    tagline: 'Puan Heritage Handlooms & Bamboo Basketry',
    summary:
      'Geometric hand-woven ceremonial wraps with vibrant contrasting bands that signify clan status and cultural ceremonies.',
    mapPinCoords: { x: 85.29, y: 48.93 },
    crafts: [
      {
        name: 'Mizo Puan Ceremonial Textiles',
        category: 'Handloom Weaving',
        giTag: 'GI Certified (GI-276)',
        significance:
          'Traditional handwoven garment woven on loin looms featuring bold black, red, and white geometric horizontal stripes.',
        communities: 'Mizo women weaver collectives',
        materials: 'Cotton and acrylic yarns, natural vegetable dyes',
        image: '/images/ikat.webp',
      },
    ],
  },

  nagaland: {
    id: 'nagaland',
    name: 'Nagaland',
    type: 'State',
    region: 'Northeastern',
    capital: 'Kohima',
    activeArtisans: '33,000+',
    giClusters: 6,
    tagline: 'Naga Warrior Shawls & Cane Craft',
    summary:
      'Each Naga tribe weaves distinct geometric shawls encoding acts of valor, social status, and ancestral lineage.',
    mapPinCoords: { x: 89.01, y: 36.76 },
    crafts: [
      {
        name: 'Naga Heritage Warrior Shawls',
        category: 'Handloom Weaving',
        giTag: 'GI Certified (GI-28)',
        significance:
          'Thick hand-spun cotton and wool shawls woven with bold red, black, and white bands depicting spears and roosters.',
        communities: 'Ao, Angami, and Chakhesang weavers',
        materials: 'Indigenous cotton, nettle fiber, sheep wool',
        image: '/images/weaver.webp',
      },
    ],
  },

  tripura: {
    id: 'tripura',
    name: 'Tripura',
    type: 'State',
    region: 'Northeastern',
    capital: 'Agartala',
    activeArtisans: '22,000+',
    giClusters: 5,
    tagline: 'Delicate Bamboo Screens & Risa Handlooms',
    summary:
      'Celebrated for ultra-fine micro-split bamboo mesh mats, screens, and the traditional tribal chest wrap known as Risa.',
    mapPinCoords: { x: 81.72, y: 46.5 },
    crafts: [
      {
        name: 'Tripura Cane & Bamboo Craft',
        category: 'Woodwork & Inlay',
        giTag: 'GI Certified (GI-441)',
        significance:
          'Bamboo slivers split to the thickness of fine paper, hand-plaited into royal sun-shades and lamps.',
        communities: 'Tripuri and Reang bamboo artisan guilds',
        materials: 'Indigenous Muli and Barak bamboo, cane peel',
        image: '/images/toys.webp',
      },
    ],
  },

  ladakh: {
    id: 'ladakh',
    name: 'Ladakh',
    type: 'Union Territory',
    region: 'Northern',
    capital: 'Leh / Kargil',
    activeArtisans: '14,000+',
    giClusters: 4,
    tagline: 'Changthang High-Altitude Pashmina & Wood Marquetry',
    summary:
      'The cold desert roof of the world, home to nomadic Changpa pastoralists who rear pure pashmina goats at 14,000 feet.',
    mapPinCoords: { x: 37.14, y: 9.36 },
    crafts: [
      {
        name: 'Ladakh Pashmina Cashmere & Snabu',
        category: 'Textiles & Needlework',
        giTag: 'GI Certified (GI-46)',
        significance:
          'Spun by hand in Buddhist monasteries and nomadic high-plateau tents using raw cashmere wool.',
        communities: 'Changpa nomadic pastoralists of Changthang',
        materials: 'Pure 12-micron Changthangi raw cashmere wool',
        image: '/images/ikat.webp',
      },
    ],
  },

  delhi: {
    id: 'delhi',
    name: 'Delhi (NCT)',
    type: 'Union Territory',
    region: 'Northern',
    capital: 'New Delhi',
    activeArtisans: '35,000+',
    giClusters: 5,
    tagline: 'Imperial Zardozi Metal Embroidery & Paper Cut-Work',
    summary:
      'The historic capital of empires where master artisans continue opulent Mughal zardozi embroidery with metallic wires.',
    mapPinCoords: { x: 35.74, y: 29.38 },
    crafts: [
      {
        name: 'Delhi Zardozi Gold Wire Embroidery',
        category: 'Textiles & Needlework',
        giTag: 'GI Registered Cluster',
        significance:
          'Metallic bullion wire and spangles sewn onto silk velvet to create 3D embossed royal canopies and evening wear.',
        communities: 'Old Delhi Zardoz masters of Ballimaran',
        materials: 'Silver-plated copper bullion, dabka, velvet fabric',
        image: '/images/ikat.webp',
      },
    ],
  },

  chandigarh: {
    id: 'chandigarh',
    name: 'Chandigarh',
    type: 'Union Territory',
    region: 'Northern',
    capital: 'Chandigarh',
    activeArtisans: '6,000+',
    giClusters: 2,
    tagline: 'Modernist Clay Terracotta & Recycled Mosaic Arts',
    summary:
      'Inspired by Le Corbusier and Nek Chand’s Rock Garden, pioneering sustainable terracotta and industrial ceramic crafts.',
    mapPinCoords: { x: 35.54, y: 21.39 },
    crafts: [
      {
        name: 'Rock Garden Ceramic Mosaic Craft',
        category: 'Pottery & Ceramics',
        giTag: 'Regional Heritage',
        significance: 'Sculptures fashioned from broken crockery, glass bangles, and foundry slag.',
        communities: 'Chandigarh artisan guild',
        materials: 'Industrial ceramic remnants, terracotta clay',
        image: '/images/pottery.webp',
      },
    ],
  },

  puducherry: {
    id: 'puducherry',
    name: 'Puducherry',
    type: 'Union Territory',
    region: 'Southern',
    capital: 'Puducherry',
    activeArtisans: '9,000+',
    giClusters: 3,
    tagline: 'Handmade Botanical Paper & Auroville Terracotta',
    summary:
      'Coastal French-Tamil enclave famed for organic handmade rag paper, natural incense, and contemporary stoneware.',
    mapPinCoords: { x: 46.9, y: 82.83 },
    crafts: [
      {
        name: 'Puducherry Handmade Botanical Paper',
        category: 'Decorative Folk Art',
        giTag: 'Regional Heritage',
        significance:
          'Made from 100% recycled cotton rags without harsh chemicals, embedded with marigold petals and rice straw.',
        communities: 'Sri Aurobindo Ashram Paper artisans',
        materials: 'Recycled cotton fiber, pressed botanicals',
        image: '/images/pottery.webp',
      },
    ],
  },

  'andaman-nicobar': {
    id: 'andaman-nicobar',
    name: 'Andaman & Nicobar Islands',
    type: 'Union Territory',
    region: 'Eastern',
    capital: 'Port Blair',
    activeArtisans: '5,000+',
    giClusters: 2,
    tagline: 'Conch Mother-of-Pearl Shellcraft & Coconut Carving',
    summary:
      'Tropical island craft harnessing iridescent mother-of-pearl shells, polished sea conches, and carved wood.',
    mapPinCoords: { x: 83.66, y: 86.69 },
    crafts: [
      {
        name: 'Andaman Mother-of-Pearl Shell Craft',
        category: 'Decorative Folk Art',
        giTag: 'Regional Heritage',
        significance:
          'Hand-buffed turbans and nautilus sea shells carved into luminescent lamps and fine inlay buttons.',
        communities: 'Coastal artisan guilds of Port Blair',
        materials: 'Natural ocean shells, coconut wood, natural lac',
        image: '/images/dhokra.webp',
      },
    ],
  },

  lakshadweep: {
    id: 'lakshadweep',
    name: 'Lakshadweep',
    type: 'Union Territory',
    region: 'Southern',
    capital: 'Kavaratti',
    activeArtisans: '4,000+',
    giClusters: 2,
    tagline: 'Golden Coconut Coir Craft & Coral Stone Inlay',
    summary:
      'Atoll island communities spinning durable golden coir yarns from salted coconut husks and sea-shell ornaments.',
    mapPinCoords: { x: 15.88, y: 81.66 },
    crafts: [
      {
        name: 'Lakshadweep High-Tensile Coir Yarn',
        category: 'Handloom Weaving',
        giTag: 'Regional Heritage',
        significance:
          'Hand-retted in marine saltwater lagoons for months, giving extraordinary tensile strength for boat-building and floor mats.',
        communities: 'Atoll women coir cooperatives',
        materials: 'Natural green coconut husk fiber',
        image: '/images/ikat.webp',
      },
    ],
  },

  'dadra-nagar-haveli': {
    id: 'dadra-nagar-haveli',
    name: 'Dadra & Nagar Haveli',
    type: 'Union Territory',
    region: 'Western',
    capital: 'Silvassa',
    activeArtisans: '7,000+',
    giClusters: 2,
    tagline: 'Warli Ancestral Murals & Bamboo Mat Weaving',
    summary:
      'Forest enclaves of Warli painters depicting sacred sacred wedding chaukat murals and woven cane craft.',
    mapPinCoords: { x: 16.02, y: 54.53 },
    crafts: [
      {
        name: 'Silvassa Warli Art & Mat Weaving',
        category: 'Folk & Tribal Art',
        giTag: 'GI Certified (GI-197)',
        significance:
          'Traditional mud-wall pictographs and dried bamboo mat weaving celebrating tribal folklore.',
        communities: 'Warli and Kokna tribal painters',
        materials: 'Rice paste, natural ochre, bamboo cane',
        image: '/images/madhubani.webp',
      },
    ],
  },

  'daman-diu': {
    id: 'daman-diu',
    name: 'Daman & Diu',
    type: 'Union Territory',
    region: 'Western',
    capital: 'Daman',
    activeArtisans: '4,500+',
    giClusters: 2,
    tagline: 'Tortoiseshell & Coconut Shell Carving',
    summary:
      'Coastal craft blending Gujarati artisanal techniques with Portuguese maritime decorative shell arts.',
    mapPinCoords: { x: 13.65, y: 52.14 },
    crafts: [
      {
        name: 'Diu Decorative Shell & Woodwork',
        category: 'Woodwork & Inlay',
        giTag: 'Regional Heritage',
        significance:
          'Hand-polished sea conches and carved wooden boxes celebrating historic sea trade routes.',
        communities: 'Coastal artisan guild',
        materials: 'Sea shells, teak wood, natural polish',
        image: '/images/toys.webp',
      },
    ],
  },

  minicoy: {
    id: 'minicoy',
    name: 'Minicoy',
    type: 'Union Territory',
    region: 'Southern',
    capital: 'Minicoy Island',
    activeArtisans: '2,200+',
    giClusters: 1,
    tagline: 'Laccadive Sea Model Boats & Coir Lacquer',
    summary:
      'Southernmost atoll of the Lakshadweep archipelago, famed for handcrafted miniature wooden Jahazi odi boats and coir craft.',
    mapPinCoords: { x: 17.29, y: 94.4 },
    crafts: [
      {
        name: 'Minicoy Miniature Boat Craft (Jahazi Odi)',
        category: 'Woodwork & Inlay',
        giTag: 'Maritime Heritage Craft',
        significance:
          'Master mariners carve miniature traditional wooden sailing vessels with authentic sail rigging and lacquer accents.',
        communities: 'Minicoy maritime artisan families',
        materials: 'Driftwood, coconut wood, natural lacquer',
        image: '/images/toys.webp',
      },
    ],
  },
};

export const getDossierForState = (stateNameOrId: string): StateDossier => {
  const normalized = stateNameOrId
    .toLowerCase()
    .replace(/[^a-z0-9]/g, '-')
    .replace(/-+/g, '-')
    .replace(/^-|-$/g, '');

  if (INDIA_CRAFT_DOSSIERS[normalized]) {
    return INDIA_CRAFT_DOSSIERS[normalized];
  }

  // Look for partial match
  const match = Object.values(INDIA_CRAFT_DOSSIERS).find(
    (d) =>
      d.name.toLowerCase() === stateNameOrId.toLowerCase() ||
      d.id.includes(normalized) ||
      normalized.includes(d.id)
  );

  if (match) return match;

  // Ultimate fallback
  return {
    id: normalized || 'heritage-cluster',
    name: stateNameOrId,
    type: 'State',
    region: 'Central',
    capital: 'Heritage Center',
    activeArtisans: '25,000+',
    giClusters: 4,
    tagline: 'Living Guilds & Ancestral Craft Traditions',
    summary: `${stateNameOrId} is renowned for centuries of master karigars preserving indigenous techniques passed down through generations.`,
    mapPinCoords: { x: 50, y: 50 },
    crafts: [
      {
        name: `${stateNameOrId} Handloom & Heritage Weaving`,
        category: 'Handloom Weaving',
        giTag: 'GI Certified Guild',
        significance: `Hand-woven on traditional pit looms preserving indigenous motifs and natural plant dyes unique to ${stateNameOrId}.`,
        communities: `Master karigar guilds of ${stateNameOrId}`,
        materials: 'Natural silk, pure cotton, organic dyes',
        image: '/images/weaver.webp',
      },
      {
        name: `${stateNameOrId} Folk Art & Metalcraft`,
        category: 'Folk & Tribal Art',
        giTag: 'Heritage Registered',
        significance: `Ancestral craft embodying local spiritual and environmental harmony, hand-sculpted with time-honored tools.`,
        communities: `Artisan lineages of ${stateNameOrId}`,
        materials: 'Locally sourced clay, stone, bell metal',
        image: '/images/dhokra.webp',
      },
    ],
  };
};
