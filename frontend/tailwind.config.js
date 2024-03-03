/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      height:{
        fittiest: '65vh',
      },
      dropShadow:{
        standard: '15px 15px 7px rgba(0, 0, 0, 0.8)'
      },
      colors:{
        darkGreen: '#113d3c',
        lightGreen: '#3bb44a',
        cusBeige: '#f4edd8',
        cusGreen: '#187771',
        shadowBlack: 'rgba(0, 0, 0, 0.5)'
      },
      fontFamily:{
        roboto: 'Roboto',
        quicksand: 'Quicksand',
        poppins: ['"Poppins"', 'sans-serif'],
        mooli: 'Mooli',
        raleway: 'Raleway',
        sourceCode: ['"Source Code Pro"', 'monospace']
      },
      keyframes: {
        appears:{
          '0%': {transform: 'translateY(-50%) scale(0.8)',},
          '100%': {transform: 'translateY(0) scale(1)'}
        }
      }
    },
  },
  plugins: [
    require('@tailwindcss/typography')
  ],
}

