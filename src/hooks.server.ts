import { userEmail } from '$lib/login.server';

export async function handle({ event, resolve }) {
	// === Auth ===
	const email = userEmail(event);
	event.locals.email = email;

	// === Theme Picker ===
	// Based on https://scriptraccoon.dev/blog/darkmode-toggle-sveltekit
	const theme = event.cookies.get('theme');
	event.locals.theme = theme;

	if (!theme) {
		// No Theme? Return `undefined` so client can set cookie with
		// user preferences from browser api
		return await resolve(event);
	}

	// Prevent screen flickering for theme
	return await resolve(event, {
		transformPageChunk: ({ html }) => {
			return html.replace('data-theme=".*"', `data-theme="${theme}"`);
		}
	});
}
