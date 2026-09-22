/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
    "./app/**/*.{js,ts,jsx,tsx}",
    "./components/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        obsidian: '#060709',
        terracotta: '#C85A32',
        silkGold: '#D4AF37',
        ivorySand: '#FAF7F2',
        sage: '#2D5A43',
        clay: '#A85A38',
      },
      fontFamily: {
        serif: ['Cinzel', 'Cormorant Garamond', 'Georgia', 'serif'],
        cormorant: ['Cormorant Garamond', 'Georgia', 'serif'],
        sans: ['Plus Jakarta Sans', 'Inter', 'sans-serif'],
        mono: ['JetBrains Mono', 'monospace'],
        display: ['Archivo Black', 'Cinzel', 'sans-serif'],
      },
      boxShadow: {
        'gold-glow': '0 0 25px rgba(212, 175, 55, 0.25)',
        'terracotta-glow': '0 0 30px rgba(200, 90, 50, 0.3)',
        'obsidian-inner': 'inset 0 2px 8px rgba(0, 0, 0, 0.8)',
      },
      backgroundImage: {
        'gold-foil': 'linear-gradient(135deg, #FAF7F2 0%, #D4AF37 50%, #8D7018 100%)',
        'dark-vignette': 'radial-gradient(ellipse at center, transparent 30%, #060709 90%)',
      }
    },
  },
  plugins: [],
};
