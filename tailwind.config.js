// tailwind.config.js
module.exports = {
  purge: ['./index.html', './src/**/*.{vue,js,ts,jsx,tsx}'],
  darkMode: false, // or 'media' or 'class'
  content: [
      "./node_modules/flowbite/**/*.js"
  ],
  theme: {
    extend: {
      gridAutoColumns: {
        '2fr': 'minmax(0, 2fr)'
      }
    },
    screens: {
      xs: '475px',
      sm: '640px',
      md: '768px',
      lg: '1024px',
      xl: '1280px',
      '2xl': '1536px'
    }
  },
  variants: {
    extend: {}
  },
  daisyui: {
    darkTheme: 'dark', // name of one of the included themes for dark mode
    base: false, // applies background color and foreground color for root element by default
    styled: true, // include daisyUI colors and design decisions for all components
    utils: true, // adds responsive and modifier utility classes
    prefix: '', // prefix for daisyUI classnames (components, modifiers and responsive class names. Not colors)
    logs: true, // Shows info about daisyUI version and used config in the console when building your CSS
    themeRoot: ':root', // The element that receives theme color CSS variables,
    themes: [
      {
        mytheme: {
          "primary": '#3d7fa1',
  
          "secondary": '#214f66',
  
          "accent": '#0069a9',
  
          "neutral": '#3d4451',
  
          'base-100': '#262626',
  
          "info": '#00e2ff',
  
          "success": '#00cc99',
  
          "warning": '#f47000',
  
          "error": '#d2004e'
        }
      },
    ],
  },
  plugins: [
    require('daisyui'),
    require('flowbite/plugin')
  ],
  
}
