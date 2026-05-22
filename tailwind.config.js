/** @type {import('tailwindcss').Config} */
export default {
  darkMode: 'class', // BẮT BUỘC THÊM DÒNG NÀY
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        sans: ['"Josefin Sans"', 'sans-serif'],
        serif: ['"Playfair Display"', 'serif'],
      }
    },
  },
  plugins: [],
}