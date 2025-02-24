/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{hbs,js}"],
  theme: {
    extend: {},
  },
  plugins: [],
  corePlugins: {
    preflight: true,
  },
  plugins: [
    require("@tailwindcss/line-clamp")
  ],
};
