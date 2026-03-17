/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        parchment: {
          50: '#fdfbf7',
          100: '#f9f5ed',
          200: '#f3ebe0',
          300: '#ebe0d0',
          400: '#dccfbb',
          500: '#c9b9a0',
        },
        ink: {
          600: '#4a3f2e',
          700: '#3a2f21',
          800: '#2b2317',
          900: '#1c160f',
        },
        forest: {
          300: '#a8c69f',
          400: '#7fa876',
          500: '#5f8555',
          600: '#4d6d44',
          700: '#3a5233',
        },
        botanical: {
          violet: '#8a6d9e',
          yellow: '#d9c057',
          pink: '#d99b9b',
          blue: '#6b8ea8',
        }
      },
      fontFamily: {
        serif: ['Crimson Text', 'Georgia', 'serif'],
        script: ['Indie Flower', 'cursive'],
      },
      backgroundImage: {
        'paper-texture': "url('data:image/svg+xml,%3Csvg xmlns=\"http://www.w3.org/2000/svg\" width=\"100\" height=\"100\"%3E%3Cfilter id=\"noise\"%3E%3CfeTurbulence type=\"fractalNoise\" baseFrequency=\"0.9\" numOctaves=\"4\" /%3E%3CfeColorMatrix type=\"saturate\" values=\"0\" /%3E%3C/filter%3E%3Crect width=\"100\" height=\"100\" filter=\"url(%23noise)\" opacity=\"0.03\" /%3E%3C/svg%3E')",
      }
    },
  },
  plugins: [],
}
