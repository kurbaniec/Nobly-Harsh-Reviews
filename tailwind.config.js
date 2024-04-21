import { createThemes } from 'tw-colors';

/** @type {import('tailwindcss').Config} */
export default {
	content: ['./src/**/*.{html,js,svelte,ts}'],
	important: true,
	theme: {
		extend: {}
	},
	plugins: [
		createThemes({
			light: {
				foreground: '#000',
				background: '#fff',
				primary: '#E2DBBE',
				secondary: '#D5D6AA',
				error: '#f55442'
			},
			dark: {
				foreground: '#fff',
				background: '#000',
				primary: '#56351E',
				secondary: '#70421F',
				error: '#f5a442'
			}
		})
	]
};
