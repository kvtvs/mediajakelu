/** @type {import('tailwindcss').Config} */

const defaultTheme = require("tailwindcss/defaultTheme");

module.exports = {
  content: ["./src/**/*.{html,js}"],
  theme: {
    screens: {
      xs: "350px",
      sm: "640px",
      md: "768px",
      lg: "1024px",
      xl: "1280px",
      "2xl": "1536px",
    },
    extend: {
      colors: {
        "my-pink": "#D152F3",
        "my-blue": "#091221",
        white: "#FFFFFF",
        black: "#000000",
        lightgreen: "rgba(184, 216, 216, 1)",
        phlox: "rgba(209, 82, 243, 1)",
        gunmetal: "rgba(29, 38, 53, 1)",
        "lapis-lazuli": "rgba(30, 88, 132, 1)",
      },
      fontFamily: {
        montrserrat: ['"Montserrat"', "sans serif"],
      },
    },
  },
  plugins: [],
};
