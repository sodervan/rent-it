/** @type {import('tailwindcss').Config} */
const flowbite = require("flowbite-react/tailwind");
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}", flowbite.content()],
  theme: {
    extend: {
      colors: {
        primaryPurple: "#7F56D9",
        secondaryPurple: "#F9F5FF",
      },
    },
  },
  plugins: [flowbite.plugin()],
};
