/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        "major": "#17171B",
        "secondary": "#1E1E21",
        "off": "#606265",
        "lightGrey": "#323232"
      },
      fontFamily: {
        'sans': ['Quicksand', 'Arial', 'sans-serif'],
        'axiforma-bold': ['AxiformaBold', 'Arial', 'sans-serif'],
      },
    },
  },
  plugins: [
    require('tailwind-scrollbar-hide'),
    require('tailwind-scrollbar')
  ],
}