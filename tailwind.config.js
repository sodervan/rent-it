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
      keyframes: {
        slideUp: {
          '0%': { transform: 'translateY(100%)', opacity: '0' },
          '50%': { opacity: '1' },
          '100%': { transform: 'translateY(0)', opacity: '1' },
        },
        slideDown: {
          '0%': { transform: 'translateY(0)', opacity: '1' },
          '50%': { opacity: '1' },
          '100%': { transform: 'translateY(-100%)', opacity: '0' },
        },
      },
      animation: {
        slideUp: 'slideUp 1s ease-out',
        slideDown: 'slideDown 1s ease-in',
      },
    },
  },
  plugins: [require("tailwindcss-animate")], // Add any additional plugins here
});
