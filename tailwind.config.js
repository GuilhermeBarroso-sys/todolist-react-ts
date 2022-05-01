module.exports = {
	
	darkMode: "class",
	content: [
		"./src/**/*.{js,jsx,ts,tsx}",
		"./src/routes/**/*.{js,jsx,ts,tsx}",
		"./src/components/**/*.{js,ts,jsx,tsx}",
		"./index.html",
	],
	theme: {
		extend: {},
	},
	plugins: [
		require("@tailwindcss/forms"),
		require("@tailwindcss/aspect-ratio"),
	],
};
