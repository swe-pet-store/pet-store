/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./assets/**/*.{js,ts,jsx,tsx}",
    "./templates/**/*.{html, twig}"
  ],
  theme: {
    screens: {
      'xsm': '280px',
      'sm': '480px',
      'md': '768px',
      'lg': '1024px',
      'xl': '1280px',
      '2xl': '1440px',
      '3xl': '1520px',
      '4xl': '1638px',
      '5xl': '1950px',
    },
    extend: {},
  },
  plugins: [],
}

