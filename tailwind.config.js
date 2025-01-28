/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{html,ts}",
  ],
  theme: {
    extend: {
      fontFamily: {
        'merlo': ['"Merlo Neue Round Medium"', 'sans-serif'], // Nombre correcto de la fuente
      },
    },
  },
  plugins: [],
}