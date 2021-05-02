const defaultTheme = require("tailwindcss/defaultTheme");

module.exports = {
  purge: ["./src/**/*.{js,jsx,ts,tsx}", "./public/index.html"],
  darkMode: false, // or 'media' or 'class'
  theme: {
    extend: {
      fontFamily: {
        sans: ["Jost", ...defaultTheme.fontFamily.sans],
      },
      colors: {
        primary: "#3B82F6",
        secondary: "#1A407D",
        "theme-red": "#F7253D",
        "theme-red-lighter": "#FF586B",
        "primary-lighter": "#ECF3FF",
        "grayish-lighter": "#CCCCCC",
        "text-color-theme": "#222222",
      },
    },
  },
  variants: {
    extend: {},
  },
  plugins: [],
};
