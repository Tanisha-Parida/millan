export interface DialectPreset {
  id: string;
  name: string;
  nativeLabel: string;
  artisanName: string;
  village: string;
  craftType: string;
  speechAudioText: string;
  englishTranslation: string;
  hours: number;
  rawCostINR: number;
  fairHourlyWage: number;
  pohhScore: number;
  previewImage: string;
  hsnCode: string;
}

export const DIALECT_PRESETS: DialectPreset[] = [
  {
    id: 'odia',
    name: 'Odia (Sambalpuri)',
    nativeLabel: 'ଓଡ଼ିଆ (ସମ୍ବଲପୁରୀ)',
    artisanName: 'Bipra Charan Baghel',
    village: 'Bastar Border / Barpali',
    craftType: 'Dhokra Brass Tribal Figurine',
    speechAudioText:
      'ମୋର ଏଇ ଢୋକ୍ରା ପିତ୍ତଳ ମୂର୍ତ୍ତି କୁ ୬ ଘଣ୍ଟା ଲାଗିଲା, କଞ୍ଚା ମାଲ ୨୨୦ ଟଙ୍କା ପଡ଼ିଲା। ଜଙ୍ଗଲ ମହୁଫେଣା ର ମହମ ରେ ଗଢ଼ିଛି।',
    englishTranslation:
      'This Dhokra brass figurine took 6 hours of lost-wax sculpting. Raw materials cost ₹220. Coaxed from wild forest beeswax before molten brass casting.',
    hours: 6,
    rawCostINR: 220,
    fairHourlyWage: 190,
    pohhScore: 98.6,
    previewImage: '/images/dhokra.webp',
    hsnCode: '9703.00.10',
  },
  {
    id: 'hindi',
    name: 'Hindi (Awadhi)',
    nativeLabel: 'हिन्दी (अवधी)',
    artisanName: 'Ram Kinkar Prajapati',
    village: 'Nizamabad, Azamgarh',
    craftType: 'Engraved Black Luster Urn',
    speechAudioText:
      'यह घड़ा हमने चाक पर घुमाकर हाथ से तराशा है। 8 घंटे की मेहनत है, माटୀ और तेल का खर्च 180 रुपया आया है।',
    englishTranslation:
      'Hand-thrown on the kick-wheel and etched with silver slip jaali motifs. Took 8 hours of labor, river clay and mustard oil cost ₹180.',
    hours: 8,
    rawCostINR: 180,
    fairHourlyWage: 185,
    pohhScore: 99.1,
    previewImage: '/images/pottery.webp',
    hsnCode: '6913.90.00',
  },
  {
    id: 'bengali',
    name: 'Bengali (Rarh)',
    nativeLabel: 'বাংলা (বীরভূম)',
    artisanName: 'Bimalendu Chitrakar',
    village: 'Pingla, West Bengal',
    craftType: 'Patachitra Natural Dye Scroll',
    speechAudioText:
      'এই পটচিত্র আঁকতে ৭ ঘণ্টা লেগেছে। বেলপাতা, কাঁচা হলুদ আর অপরাজিতা ফুলের রস দিয়ে রং তৈরি করেছি। খরচ ১৫০ টাকা।',
    englishTranslation:
      'Painting this mythological scroll took 7 hours. All mineral dyes were pressed by hand from wood-apple leaves, raw turmeric, and blue pea blossoms. Cost ₹150.',
    hours: 7,
    rawCostINR: 150,
    fairHourlyWage: 200,
    pohhScore: 98.8,
    previewImage: '/images/madhubani.webp',
    hsnCode: '9701.10.20',
  },
  {
    id: 'santhali',
    name: 'Santhali / Tribal',
    nativeLabel: 'ᱥᱟᱱᱛᱟᱲᱤ (Ol Chiki)',
    artisanName: 'Karan Soren',
    village: 'Mayurbhanj, Odisha',
    craftType: 'Sabai Grass Braided Storage Basket',
    speechAudioText:
      'ᱱᱚᱣᱟ ᱥᱟᱵᱟᱭ ᱜᱷᱟᱥ ᱴᱩᱠᱨᱤ ᱵᱮᱱᱟᱣ ᱞᱟᱹᱜᱤᱫ ᱕ ᱴᱟᱲᱟᱝ ᱞᱟᱜᱟᱣ ᱮᱱᱟ᱾ ᱠᱟᱸᱪᱟ ᱢᱟᱞ ᱑᱒᱐ ᱴᱟᱠᱟ ᱯᱟᱲᱟᱣ ᱮᱱᱟ᱾',
    englishTranslation:
      'Woven from wild forest Sabai grass, sun-dried and coiled without nails. 5 hours of continuous knotting, raw grass gathered from Mayurbhanj hill tracts for ₹120.',
    hours: 5,
    rawCostINR: 120,
    fairHourlyWage: 175,
    pohhScore: 99.4,
    previewImage: '/images/bamboo.webp',
    hsnCode: '4602.19.11',
  },
  {
    id: 'english',
    name: 'English (Voice Assist)',
    nativeLabel: 'English (Direct Audio)',
    artisanName: 'Ananya Meher',
    village: 'Sambalpur Silk Guild',
    craftType: 'Sambalpuri Ikat Wall Textile',
    speechAudioText:
      'I hand-tied and dip-dyed 1,400 silk threads before putting this on our pit loom. It took 12 hours of weaving, raw silk cost was ₹650.',
    englishTranslation:
      'Hand-tied and dip-dyed 1,400 silk threads before putting this on our pit loom. It took 12 hours of weaving, raw silk cost was ₹650.',
    hours: 12,
    rawCostINR: 650,
    fairHourlyWage: 220,
    pohhScore: 99.2,
    previewImage: '/images/ikat.webp',
    hsnCode: '5007.20.10',
  },
];
