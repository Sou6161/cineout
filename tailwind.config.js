/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
    "node_modules/flowbite-react/lib/esm/**/*.js",
  ],
  theme: {
    extend: {
      fontFamily: {
        "roboto-medium": ["Roboto-Medium", "sans-serif"],
        "roboto-black": ["Roboto-Black", "sans-serif"],
        "roboto-bold": ["Roboto-Bold", "sans-serif"],
        'roboto-black-italic': ['Roboto-BlackItalic', 'sans-serif'],
      },
    },
  },
  variants: {},
  plugins: [require("tailwind-scrollbar-hide"), require("flowbite/plugin")],
};
