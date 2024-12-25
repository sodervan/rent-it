/** @type {import('tailwindcss').Config} */
const withMT = require("@material-tailwind/react/utils/withMT");

export default withMT({
  darkMode: ["class"], // Enable dark mode
  content: ["./index.html", "./src/**/*.{ts,tsx,js,jsx}"], // Specify paths to your content files
  theme: {
    extend: {
      borderRadius: {
        lg: "var(--radius)",
        md: "calc(var(--radius) - 2px)",
        sm: "calc(var(--radius) - 4px)",
      },
      colors: {
        primaryPurple: "#7F56D9", // Add your custom color
        secondaryPurple: "#F9F5FF"
      },
    },
  },
  plugins: [require("tailwindcss-animate")], // Add any additional plugins here
});
