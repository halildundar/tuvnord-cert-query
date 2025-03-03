/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{html,hbs,js}"],
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
