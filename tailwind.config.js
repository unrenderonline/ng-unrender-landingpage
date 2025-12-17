/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{html,ts}",
  ],
  theme: {
    extend: {
      colors: {
        'unrender-purple': '#10051c',
        'unrender-accent': '#f99126',
      },
      fontFamily: {
        'sans': ['Montserrat', 'Roboto', 'Inter', 'sans-serif'],
      },
    },
  },
  plugins: [],
}

