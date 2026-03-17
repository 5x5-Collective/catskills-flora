/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        'parchment': '#F5F0E8',
        'brown-dark': '#3D2B1F',
        'forest-green': '#2D5016',
        'aged-gold': '#B8860B',
        'ink-black': '#1A1A1A',
      },
      fontFamily: {
        'display': ['"Playfair Display"', 'serif'],
        'body': ['"Crimson Text"', 'serif'],
      },
    },
  },
  plugins: [],
}
