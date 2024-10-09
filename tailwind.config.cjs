import { addIconSelectors } from "@iconify/tailwind";
const plugin = require("tailwindcss/plugin");
const themes = require("daisyui/src/theming/themes");

const buildMemberSelector = (modifier) => `.member${modifier ? `\\/${modifier}` : ""}`;

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
			},
			maxHeight: {
				dscreen: "100dvh"
			},
			colors: {
				"code-block": "#1d1e22"
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
			"2xl": "1500px",
			"3xl": "1800px"
		}
	},
	plugins: [
		require("@tailwindcss/typography"),
		require("daisyui"),
		plugin(function ({ addUtilities }) {
			addUtilities({
				".wrap-balance": {
					"text-wrap": "balance"
				}
			});
		}),
		addIconSelectors(["mdi"]),
		plugin(({ matchVariant }) => {
			const values = {
				// Default
				DEFAULT: "&",

				// Positional
				first: "&:first-child",
				last: "&:last-child",
				only: "&:only-child",
				odd: "&:nth-child(odd)",
				even: "&:nth-child(even)",
				"first-of-type": "&:first-of-type",
				"last-of-type": "&:last-of-type",
				"only-of-type": "&:only-of-type",

				// State
				visited: "&:visited",

				target: "&:target",
				open: "&:is([open], :popover-open)",

				// Forms
				default: "&:default",
				checked: "&:checked",
				indeterminate: "&:indeterminate",
				"placeholder-shown": "&:placeholder-shown",
				autofill: "&:autofill",
				optional: "&:optional",
				required: "&:required",
				valid: "&:valid",
				invalid: "&:invalid",
				"in-range": "&:in-range",
				"out-of-range": "&:out-of-range",
				"read-only": "&:read-only",

				// Content
				empty: "&:empty",

				// Interactive
				"focus-within": "&:focus-within",
				hover: "&:hover",
				focus: "&:focus",
				"focus-visible": "&:focus-visible",
				active: "&:active",
				enabled: "&:enabled",
				disabled: "&:disabled"
			};

			matchVariant(
				"member",
				(rawValue, { modifier }) => {
					const value = rawValue || "&";
					const selector = buildMemberSelector(modifier);
					return `&:has(${selector}:is(${value.replaceAll("&", "*")})) { & }`;
				},
				{
					values
				}
			);

			matchVariant(
				"member-not",
				(rawValue, { modifier }) => {
					const value = rawValue || "&";
					const selector = buildMemberSelector(modifier);
					return `&:has(${selector}:not(${value.replaceAll("&", "*")})) { & }`;
				},
				{
					values
				}
			);
		})
	],
	important: "#app",
	daisyui: {
		themes: [
			{
				black: {
					...themes.black,
					primary: "rgb(0, 122, 102)",
					secondary: "rgb(0, 220, 199)",
					accent: "rgb(0, 85, 76)",
					"error-content": "#4c0519",
					"primary-content": "#fff"
				}
			}
		],
		logs: false
	}
};
