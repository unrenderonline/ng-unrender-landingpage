/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{html,ts}",
  ],
  theme: {
    extend: {
      colors: {
        'unrender-purple': '#0a0311',
        'unrender-accent': '#f5a623',
      },
      fontFamily: {
        'sans': ['Montserrat', 'Roboto', 'Inter', 'sans-serif'],
      },
    },
  },
  plugins: [],
}

