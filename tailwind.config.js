/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./index.html",
    "./src/**/*.{vue,js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {},
    screens: {
      'maxd': { 'max': '767px' },
      // => @media (max-width: 767px) { ... } 
    }
  },
  plugins: [],
}

