import { createThemes } from 'tw-colors';

/** @type {import('tailwindcss').Config} */
export default {
	content: ['./src/**/*.{html,js,svelte,ts}'],
	theme: {
		extend: {}
	},
	plugins: [
		createThemes({
			light: {
				foreground: '#000',
				background: '#fff',
				primary: '#E2DBBE',
				secondary: '#D5D6AA'
			},
			dark: {
				foreground: '#fff',
				background: '#000',
				primary: '#56351E',
				secondary: '#70421F'
			}
		})
	]
};
