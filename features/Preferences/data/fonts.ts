// Conditional font loading based on environment
// In development, we skip font loading to improve performance
// In production, we load the full font definitions

type FontConfig = {
  name: string;
  font: {
    className: string;
  };
};

// Mock fonts for development mode (names only, no actual font loading)
const devFonts: FontConfig[] = [
  { name: 'Zen Maru Gothic', font: { className: '' } },
  { name: 'Noto Sans JP', font: { className: '' } },
  { name: 'Rampart One', font: { className: '' } },
  { name: 'Zen Kurenaido', font: { className: '' } },
  { name: 'Klee One', font: { className: '' } },
  { name: 'Dot Gothic 16', font: { className: '' } },
  { name: 'Kiwi Maru', font: { className: '' } },
  { name: 'Potta One', font: { className: '' } },
  { name: 'Hachi Maru Pop', font: { className: '' } },
  { name: 'Yuji Mai', font: { className: '' } },
  { name: 'RocknRoll One', font: { className: '' } },
  { name: 'Reggae One', font: { className: '' } },
  { name: 'Stick', font: { className: '' } },
  { name: 'M PLUS Rounded 1c', font: { className: '' } },
  { name: 'M PLUS 1', font: { className: '' } },
  { name: 'Yusei Magic', font: { className: '' } },
  { name: 'Dela Gothic One', font: { className: '' } },
  { name: 'New Tegomin', font: { className: '' } },
  { name: 'Kosugi Maru', font: { className: '' } },
  { name: 'Hina Mincho', font: { className: '' } },
  { name: 'Shippori Mincho', font: { className: '' } },
  { name: 'Kaisei Decol', font: { className: '' } },
  { name: 'Mochiy Pop One', font: { className: '' } },
  { name: 'Yuji Boku', font: { className: '' } },
  { name: 'Kaisei HarunoUmi', font: { className: '' } },
  { name: 'Sawarabi Gothic', font: { className: '' } },
  { name: 'Zen Old Mincho', font: { className: '' } },
  { name: 'Sawarabi Mincho', font: { className: '' } },
  { name: 'Zen Antique', font: { className: '' } },
  { name: 'Kaisei Tokumin', font: { className: '' } },
  { name: 'Yuji Syuku', font: { className: '' } },
  { name: 'Murecho', font: { className: '' } },
  { name: 'Kaisei Opti', font: { className: '' } },
  { name: 'BIZ UDMincho', font: { className: '' } },
  { name: 'Shippori Antique', font: { className: '' } }
];

// Use the appropriate fonts based on environment
const fonts: FontConfig[] =
  process.env.NODE_ENV === 'production' ? require('./fonts.prod').default : devFonts;

export default fonts;
