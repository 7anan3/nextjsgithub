/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {},
    colors: {
      navy: "rgb(20,28,47)",
      blue1: "rgb(31,42,72)",
      blue2: "rgb(0,121,254)",
      grey1: "rgb(233,234,237)",
      grey2: "rgb(142, 148, 164)",
      white: "rgb(255 255 255)",
      greylight: "rgb(245, 248, 255)",
    },
  },
  fontFamily: {
    leagueSpartan: ["League Spartan", "sans-serif"],
  },
  plugins: [],
  darkMode: "class",
};
