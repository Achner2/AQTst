/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{html,ts}",
  ],
  theme: {
    extend: {
      fontFamily: {
        poetsen: ['"Poetsen One"', 'serif'],
        todhri: ['"Noto Serif Todhri"', 'serif'],
      }
    },
  },
  plugins: [],
}