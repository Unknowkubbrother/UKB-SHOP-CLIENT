// tailwind.config.js
module.exports = {
  purge: ['./index.html', './src/**/*.{vue,js,ts,jsx,tsx}'],
   darkMode: false, // or 'media' or 'class'
   theme: {
     extend: {
      gridAutoColumns: {
        '2fr': 'minmax(0, 2fr)',
      },
     },
   },
   variants: {
     extend: {},
   },
   plugins: [],
 }