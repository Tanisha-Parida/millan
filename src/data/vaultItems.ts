import type { CraftItem } from '../types/craft';

export const VAULT_ITEMS: CraftItem[] = [
  // --- TEXTILES ---
  {
    id: 'VLT-IKAT-01',
    title: 'Sambalpuri Bandha Silk Saree',
    category: 'Textiles',
    subCategory: 'Pit-Loom Bandha',
    region: 'Barpali',
    state: 'Odisha',
    image: '/images/ikat.webp',
    priceINR: 14748,
    artisan: 'Minati & Dinabandhu Meher',
    lineage: '5th Gen Master Pit-Loom Weaver',
    hoursToCraft: 36,
    materials: 'Mulberry Tussar Silk, Organic Indigo & Manjistha Root',
    pohhIndex: 99.4,
    audioNarrative: {
      dialect: 'Sambalpuri Kosli',
      vernacularQuote:
        'ମୋର ଏଇ ଶାଢ଼ୀ ବୁଣିବା ପାଇଁ ୩୬ ଘଣ୍ଟା ଲାଗିଲା। ସବୁ ସୂତା କୁ ହାତରେ ବାନ୍ଧି ପ୍ରାକୃତିକ ରଙ୍ଗ ଦିଆଯାଇଛି।',
      englishTranslation:
        'It took 36 hours of hand calculation on our wooden pit loom. Every single yarn was tied and dip-dyed in natural indigo before weaving the sacred conch motifs.',
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
    image: '/images/embroidery.webp',
    priceINR: 16200,
    artisan: 'Mohammad Shahid Ansari',
    lineage: 'Kadhwa Brocade Weaver Lineage',
    hoursToCraft: 40,
    materials: 'Katan Silk, Pure Silver & Gold Electroplated Zari',
    pohhIndex: 99.3,
    audioNarrative: {
      dialect: 'Bhojpuri / Banarasi',
      vernacularQuote:
        'कढ़वा कढ़ने में महीनों बीत जाते हैं। हर बूटी अलग धागे से हाथ से काढ़ी जाती है।',
      englishTranslation:
        'Kadhwa weaving leaves no loose threads behind. Each floral bootie is woven individually by hand onto raw mulberry warp.',
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
    image: '/images/embroidery.webp',
    priceINR: 9200,
    artisan: 'Fatimabai Khatri',
    lineage: 'Suf & Abhla Embroidery Matriarch',
    hoursToCraft: 32,
    materials: 'Khadi Cotton, Silk Floss, Hand-Blown Abhla Mirrors',
    pohhIndex: 98.9,
    audioNarrative: {
      dialect: 'Kutchi',
      vernacularQuote: 'એક એક કાચ હાથથી ટાંકેલો છે. રણમાં સૂર્યનો તડકો ચમકે એમ આ દર્પણ ચમકે છે.',
      englishTranslation:
        'Each miniature mirror is secured using intricate interlacing stitches without breaking glass. Under desert moonlight, it reflects pure starlight.',
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
    image: '/images/weaver.webp',
    priceINR: 11500,
    artisan: 'Pranita Kalita',
    lineage: 'Royal Ahom Weaving Guild',
    hoursToCraft: 28,
    materials: 'Endemic Muga Silk (Antheraea Assamensis), Natural Gold Sheen',
    pohhIndex: 99.6,
    audioNarrative: {
      dialect: 'Assamese',
      vernacularQuote: 'মুগা ৰেচমৰ সোণালী ৰং কেতিয়াও ম্লান নহয়, ধোৱাৰ পিছত অধিক উজ্জ্বল হৈ পৰে।',
      englishTranslation:
        'The golden luster of pure Muga silk never fades; with every natural wash it glistens with deeper royal amber.',
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
    image: '/images/pottery.webp',
    priceINR: 5200,
    artisan: 'Ram Kinkar Prajapati',
    lineage: 'National Merit Kaarigar Lineage',
    hoursToCraft: 18,
    materials: 'Riverbed Silt Clay, Rice-Husk Reduction Luster, Mustard Oil Slip',
    pohhIndex: 98.7,
    audioNarrative: {
      dialect: 'Awadhi / Bhojpuri',
      vernacularQuote:
        'नदी की माटी से चाक पर गढ़ा है। धान की भूसी की धुआंधार भट्ठी से यह काला कुदरती रंग और चांदी जैसी नक्काशी निकली है।',
      englishTranslation:
        'Sculpted from riverbed sediment on the traditional kick wheel. The deep black sheen comes strictly from smoked rice husks sealed in the kiln.',
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
    image: '/images/pottery.webp',
    priceINR: 4400,
    artisan: 'Gopal Saini',
    lineage: 'Royal Amber Glaze Master',
    hoursToCraft: 16,
    materials: 'Quartz Powder, Multani Mitti, Copper Oxide & Natural Gum',
    pohhIndex: 98.5,
    audioNarrative: {
      dialect: 'Marwari',
      vernacularQuote:
        'बिना मिट्टी के कांच, क्वार्ट्ज़ और गोंद से गढ़ा जाता है। फिर तांबे के नीले रंग से रंगते हैं।',
      englishTranslation:
        'Made without conventional clay—utilizing pulverized quartz crystal and copper oxides to achieve Persian turquoise blue that never cracks.',
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
    image: '/images/pottery.webp',
    priceINR: 3800,
    artisan: 'Athei Wungnaoshang',
    lineage: 'Tangkhul Naga Clan Pottery',
    hoursToCraft: 14,
    materials: 'Weathered Serpentine Rock, River Clay, Chirong Mahi Leaf Polish',
    pohhIndex: 99.2,
    audioNarrative: {
      dialect: 'Tangkhul Naga',
      vernacularQuote:
        'Longpi pot is made without pottery wheel, hand-shaped from crushed black river stone and polished with tree leaves.',
      englishTranslation:
        'Hand-beaten from crushed riverbed serpentine stone without any potter’s wheel. Polished with local tree leaves while hot from open fire.',
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
    image: '/images/weaver.webp',
    priceINR: 8400,
    artisan: 'G. Yadaiah',
    lineage: 'Telia Rumal Guild Weaver',
    hoursToCraft: 26,
    materials: 'Fine Handspun Cotton, Castor Oil Treatment, Natural Alizarin Red',
    pohhIndex: 99.3,
    audioNarrative: {
      dialect: 'Telugu',
      vernacularQuote: 'నూనెలో నానబెట్టిన దారాలతో నేసిన బట్ట. రంగు ఎప్పటికీ చెరిగిపోదు.',
      englishTranslation:
        'Pre-treated in natural castor oil vats before weaving. The double ikat alignment requires two weeks of mental warp-weft geometry.',
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
    image: '/images/weaver.webp',
    priceINR: 6900,
    artisan: 'Devi Chand Thakur',
    lineage: 'Parvati Valley Loom Weaver',
    hoursToCraft: 22,
    materials: 'Indigenous Desi Wool, Walnut Bark Dye, Dokhru Geometric Motifs',
    pohhIndex: 98.8,
    audioNarrative: {
      dialect: 'Kulvi / Pahari',
      vernacularQuote: 'पहाड़ी भेड़ों के ऊन से हाथों से कात कर यह शॉल बुना गया है।',
      englishTranslation:
        'Hand-spun from high-altitude Himalayan sheep wool and colored with wild walnut bark infusions.',
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
    image: '/images/dhokra.webp',
    priceINR: 8900,
    artisan: 'Sukhiram Baghel',
    lineage: 'Tribal Lost-Wax Cast Master',
    hoursToCraft: 28,
    materials: 'Scrap Brass, Wild Forest Beeswax, Riverbed Anthill Mud',
    pohhIndex: 99.8,
    audioNarrative: {
      dialect: 'Bhatri / Gondi',
      vernacularQuote:
        'ଜଙ୍ଗଲ ମହୁଫେଣା ର ମହମ ରେ ପ୍ରଥମେ ନନ୍ଦୀ ବଳଦ ତିଆରି ହୁଏ। ତା’ପରେ ତରଳ ପିତ୍ତଳ ଢଳା ଯାଏ।',
      englishTranslation:
        'First, the sacred bull is coaxed out of wild forest beeswax threads. When molten metal is poured, the wax vanishes into the earth, leaving pure metal bone.',
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
    image: '/images/dhokra.webp',
    priceINR: 6400,
    artisan: 'Pabitra Pradhan',
    lineage: 'Ghadua Brass Guild Lineage',
    hoursToCraft: 20,
    materials: 'Brass Alloy, Wild Beeswax, Riverbed Clay Core',
    pohhIndex: 99.4,
    audioNarrative: {
      dialect: 'Odia',
      vernacularQuote:
        'ପିତ୍ତଳ ତାର କୁ ବଳି କରି ଏହି ମୂର୍ତ୍ତି ଗଢ଼ାଯାଏ। ପ୍ରତି ଖଣ୍ଡ ଅନନ୍ୟ, କୌଣସି ଡାଇ ନାହିଁ।',
      englishTranslation:
        'Coiled by hand with brass filigree threads. Each sculpture is unique because the mold is shattered in the firing process.',
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
    image: '/images/toys.webp',
    priceINR: 2400,
    artisan: 'Basavaraj Gowda',
    lineage: '4th Gen Royal Toy Artisan',
    hoursToCraft: 9,
    materials: 'Aale Mara (Wrightia Tinctoria), Natural Turmeric & Kumkum Resin Lacquer',
    pohhIndex: 97.9,
    audioNarrative: {
      dialect: 'Kannada',
      vernacularQuote:
        'ಆಲೆ ಮರದಿಂದ ಮಾಡಿದ ನೈಸರ್ಗಿಕ ಆಟಿಕೆ. ಅರಿಶಿನ ಮತ್ತು ನೈಸರ್ಗಿಕ ಬಣ್ಣಗಳನ್ನು ಮಾತ್ರ ಬಳಸುತ್ತೇವೆ, ಮಕ್ಕಳಿಗೆ ಸಂಪೂರ್ಣ ಸುರಕ್ಷಿತ.',
      englishTranslation:
        'Turned on the lathe from ivory-wood (Aale Mara). Colored solely with food-grade turmeric, indigo, and organic sealing wax.',
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
    image: '/images/toys.webp',
    priceINR: 8800,
    artisan: 'Ghulam Rasool Mir',
    lineage: 'Sheen Walnut Woodcarver Dynasty',
    hoursToCraft: 26,
    materials: 'Root Walnut Wood (Doon Kaal), Pure Beeswax Polish',
    pohhIndex: 99.5,
    audioNarrative: {
      dialect: 'Kashmiri',
      vernacularQuote:
        'أکھ اک لکڑی ہند پھول چھو أسی ہतھہ سیت تراشان۔ أکھ ژھین تراوس ۲۶ گنٛٹہ لگان۔',
      englishTranslation:
        'Carved from the subterranean roots of seasoned walnut trees. Every grape leaf relief is incised with miniature chisels without mechanical routers.',
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
    image: '/images/leathercraft-mojari.webp',
    priceINR: 4200,
    artisan: 'Bhagwan Das Raigar',
    lineage: 'Mughal Court Mojari Kaarigar',
    hoursToCraft: 16,
    materials: 'Vegetable-Tanned Buffalo Hide, Pure Brass & Copper Zari Threads, Velvet Lining',
    pohhIndex: 98.9,
    audioNarrative: {
      dialect: 'Marwari',
      vernacularQuote:
        'हाथ की सुई से एक-एक तार पिरोया जाता है। यह मोजड़ी जितनी पुरानी होगी, उतनी ही नरम होगी।',
      englishTranslation:
        'Stitched with double-twisted wax threads through supple hand-cured leather. The embroidered curling toe design protects against desert sand.',
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
    image: '/images/leathercraft-mojari.webp',
    priceINR: 3600,
    artisan: 'Sanjay Satpute',
    lineage: 'Shahu Maharaj Royal Cobbler Guild',
    hoursToCraft: 14,
    materials: 'Babool Bark Tanned Leather, Goat Leather Braids, Mustard Oil Curing',
    pohhIndex: 99.1,
    audioNarrative: {
      dialect: 'Marathi',
      vernacularQuote:
        'बाभळीच्या सालीने कमावलेले अस्सल कातडे. सुई-दोऱ्याने विणलेली ही खरी कोल्हापुरी आहे.',
      englishTranslation:
        'Vegetable-cured using ancient acacia bark and mustard oil baths without chemical dyes. Braided entirely by hand.',
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
    image: '/images/jharokha-gate.webp',
    priceINR: 12500,
    artisan: 'Ustad Munna Khan',
    lineage: 'Taj Mahal Pietra Dura Master Dynasty',
    hoursToCraft: 34,
    materials: 'Makrana Pure White Marble, Lapis Lazuli, Malachite, Jasper & Corundum Gemstones',
    pohhIndex: 99.7,
    audioNarrative: {
      dialect: 'Hindustani',
      vernacularQuote:
        'संगमरमर की छाती पर हीरा-तराश से फूल खोदे जाते हैं, फिर लाजवर्द और अकीक पत्थर भरे जाते हैं।',
      englishTranslation:
        'Chiseled into pure Makrana calcite marble with diamond-tipped styluses. Over 240 petals of lapis and malachite are inlaid seamlessly.',
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
    image: '/images/jharokha-gate.webp',
    priceINR: 15400,
    artisan: 'Rabi Narayan Maharana',
    lineage: 'Kalinga Silpi Guild Master',
    hoursToCraft: 42,
    materials: 'Black Chlorite Stone (Muguni Pathara), Diamond Dust Polish',
    pohhIndex: 99.8,
    audioNarrative: {
      dialect: 'Odia',
      vernacularQuote:
        'କୋଣାର୍କ ସୂର୍ଯ୍ୟ ମନ୍ଦିର ର ପ୍ରାଚୀନ ଶୈଳୀରେ କଳା ମୁଗୁନି ପଥର କୁ ଛେଣି ରେ କାଟି ଏହି ମୂର୍ତ୍ତି ଗଢ଼ା ଯାଇଛି।',
      englishTranslation:
        'Hewn strictly according to ancient Silpa Prakasa geometry using hammer and tempered chisels on dense volcanic chlorite.',
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
    image: '/images/madhubani.webp',
    priceINR: 6800,
    artisan: 'Sunita Devi Paswan',
    lineage: 'Godna & Kachni Tradition Keeper',
    hoursToCraft: 24,
    materials: 'Raw Khadi Canvas, Turmeric, Lampblack Soot, Wild Flower Dyes',
    pohhIndex: 99.5,
    audioNarrative: {
      dialect: 'Maithili',
      vernacularQuote:
        'बांस की पतली तीली से हमने यह चित्र बनाया है। हर पत्ते और चिड़िया में हमारी कुलदेवी का आशीर्वाद है।',
      englishTranslation:
        'Painted with a fine bamboo nib on handmade khadi. The pigments are extracted by boiling berries, marigold petals, and soot from mustard lamps.',
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
    image: '/images/madhubani.webp',
    priceINR: 7400,
    artisan: 'Akshaya Kumar Barik',
    lineage: 'Chitrakara Heritage Lineage',
    hoursToCraft: 30,
    materials: 'Sun-Dried Tala Palm Leaves, Iron Stylus (Lekhani), Lampblack Ink',
    pohhIndex: 99.7,
    audioNarrative: {
      dialect: 'Odia',
      vernacularQuote: 'ଶୁଖିଲା ତାଳପତ୍ର ଉପରେ ଲୁହା କଲମ ରେ କୋରି କଳା କାଳି ଘଷି ଏହି ଚିତ୍ର ହୋଇଛି।',
      englishTranslation:
        'Incised with a sharp iron stylus onto dried palm leaves stitched with silk cords, then rubbed with lampblack soot to reveal the microscopic narrative.',
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
    image: '/images/madhubani.webp',
    priceINR: 4900,
    artisan: 'Jivya Soma Mashe Family',
    lineage: 'Living Warli Clan Elders',
    hoursToCraft: 18,
    materials: 'Cow Dung & Mud Base, Rice Paste Pigment, Bamboo Twig',
    pohhIndex: 98.9,
    audioNarrative: {
      dialect: 'Warli / Marathi',
      vernacularQuote:
        'तांदळाच्या पिठाने आणि बांबूच्या काडीने ही गोल तारपा नृत्याची चित्रं रेखाटली आहेत.',
      englishTranslation:
        'Drawn using edible rice paste mixed with natural tree gum onto earthen mud-washed canvas, depicting the perpetual spiral of agrarian life.',
    },
    hash: '0x18ac9041be552d71',
  },
];
