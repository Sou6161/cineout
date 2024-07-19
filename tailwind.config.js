/** @type {import('tailwindcss').Config} */
const defaultTheme = require("tailwindcss/defaultTheme");

module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
    "node_modules/flowbite-react/lib/esm/**/*.js",
  ],
  theme: {
    screens: {
      xsmall: "480px",
      small: "640px",
      medium: "768px",
      large: "1024px",
      xlarge: "1280px",
      "2xlarge": "1536px",
    },
    extend: {
      fontFamily: {
        "roboto-medium": ["Roboto-Medium", "sans-serif"],
        "roboto-black": ["Roboto-Black", "sans-serif"],
        "roboto-bold": ["Roboto-Bold", "sans-serif"],
        "roboto-black-italic": ["Roboto-BlackItalic", "sans-serif"],
      },
      animation: {
        meteor: "meteor 5s linear infinite",
      },
      keyframes: {
        meteor: {
          "0%": { transform: "rotate(215deg) translateX(0)", opacity: 1 },
          "70%": { opacity: 1 },
          "100%": {
            transform: "rotate(215deg) translateX(-500px)",
            opacity: 0,
          },
        },
      },
    },
  },
  variants: {},
  plugins: [require("tailwind-scrollbar-hide"), require("flowbite/plugin")],
};
