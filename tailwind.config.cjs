const plugin = require("tailwindcss/plugin");

/** @type {import('tailwindcss').Config} */
module.exports = {
	content: ["./src/**/*.{astro,html,js,jsx,md,mdx,svelte,ts,tsx,vue}"],
	theme: {
		extend: {
			textColor: {
				theme: {
					faded: "var(--color-text-faded)",
					heading: "var(--color-text-theme-heading)"
				}
			},
			backgroundImage: {
				"cover-gradient": "linear-gradient(transparent, rgb(var(--color-bg-body)) var(--gto))",
				"list-item": `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='24' height='24' viewBox='0 0 24 24'%3E%3Cpath fill='gray' d='M10.41,7.41L15,12L10.41,16.6L9,15.18L12.18,12L9,8.82M5,3C3.89,3 3,3.9 3,5V19A2,2 0 0,0 5,21H19A2,2 0 0,0 21,19V5A2,2 0 0,0 19,3H5Z' /%3E%3C/svg%3E")`
			},
			opacity: {
				15: "0.15",
				33: "0.33"
			},
			fontFamily: {
				montserrat: ["Montserrat", "sans-serif"],
				"robo-flex": ["Robo-Flex", "sans-serif"]
			},
			keyframes: {
				"zoom-bounce": {
					"0%": {
						transform: "scale(0)"
					},
					"60%": {
						transform: "scale(1.4)"
					},
					"100%": {
						transform: "scale(1)"
					}
				}
			},
			animation: {
				"zoom-bounce": "zoom-bounce 300ms linear forwards"
			},
			maxWidth: {
				"8xl": "100rem"
			}
		},
		screens: {
			"3xs": "360px",
			"2xs": "430px",
			xs: "576px",
			sm: "640px",
			md: "768px",
			lg: "1024px",
			xl: "1280px",
			"2xl": "1536px"
		}
	},
	plugins: [
		require("daisyui"),
		plugin(function ({ addUtilities }) {
			addUtilities({
				".wrap-balance": {
					"text-wrap": "balance"
				}
			});
		})
	],
	daisyui: {
		themes: [
			{
				black: {
					...require("daisyui/src/theming/themes")["[data-theme=black]"],
					primary: "rgb(0, 136, 121)",
					secondary: "rgb(0, 187, 167)",
					accent: "rgb(0, 85, 76)"
				}
			}
		]
	}
};
