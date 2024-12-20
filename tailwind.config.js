/** @type {import('tailwindcss').Config} */
const withMT = require("@material-tailwind/react/utils/withMT");
const flowbite = require("flowbite-react/tailwind");
module.exports = withMT({
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}", flowbite.content()],
  theme: {
    screens: {
      sm: "640px",
      md: "768px",
      lg: "1024px",
      xl: "1440px",
    },
    extend: {
      colors: {
        primaryPurple: "#7F56D9",
        secondaryPurple: "#F9F5FF",
      },
      fontSize: {
        xxs: "12px", // Example custom font size
        xxl: "1.75rem", // Example custom font size
      },
      fontFamily: {
        poppins: ['Poppins', 'sans-serif'],
      },
    },
  },
  plugins: [flowbite.plugin()],
});
