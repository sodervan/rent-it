// /** @type {import('tailwindcss').Config} */
// const withMT = require("@material-tailwind/react/utils/withMT");
// export default {
// 	darkMode: ["class"],
// 	content: ["./index.html", "./src/**/*.{ts,tsx,js,jsx}"],
// 	corePlugins: {
// 		// preflight: false,
// 	},
// 	theme: {
// 		extend: {
// 			borderRadius: {
// 				lg: "var(--radius)",
// 				md: "calc(var(--radius) - 2px)",
// 				sm: "calc(var(--radius) - 4px)",
// 			},
// 			colors: {},
// 		},
// 	},
// 	plugins: [require("tailwindcss-animate")],
// };

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
            colors: {}, // Extend colors if needed
        },
    },
    plugins: [require("tailwindcss-animate")], // Add any additional plugins here
});
