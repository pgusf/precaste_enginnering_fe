/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./index.html", "./src/**/*.{js,jsx,ts,tsx}"],
  theme: {
    extend: {
      colors: {
        navy: "#003178",
        "navy-dark": "#002460",
        brand: "#0a5cff",
        ink: "#0b1b3a",
        mute: "#5b6b8c",
        line: "#e3e9f5",
        page: "#f4f7fc",
      },
      fontFamily: {
        sans: ["Archivo", "system-ui", "Segoe UI", "Arial", "sans-serif"],
      },
    },
  },
  plugins: [],
};
