module.exports = {
	
	darkMode: "class",
	content: ["./src/**/*.tsx"],
	theme: {
		extend: {},
	},
	plugins: [
		require("@tailwindcss/forms"),
		require("@tailwindcss/aspect-ratio"),
	],
};
