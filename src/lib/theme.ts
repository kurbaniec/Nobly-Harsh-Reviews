import { browser } from '$app/environment';

const oneYear = 60 * 60 * 24 * 365;

export const enum Theme {
	Light = 'light',
	Dark = 'dark'
}

export function setThemeCookie(newTheme: string) {
	console.log('setThemeCookie', newTheme);
	document.cookie = `theme=${newTheme}; max-age=${oneYear}; path=/`;
}
