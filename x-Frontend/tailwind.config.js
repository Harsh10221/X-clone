/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        // Add 'Roboto' to the beginning of the sans-serif font stack
        roboto: ['Roboto', 'sans-serif'],
      },
    },
  },
  plugins: [require('tailwind-scrollbar-hide')]
,
}