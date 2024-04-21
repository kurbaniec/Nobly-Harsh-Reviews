export async function handle({ event, resolve }) {
	// === Auth ===
	const email = event.cookies.get('email');
	event.locals.email = email;

	// === Theme Picker ===
	// Based on https://scriptraccoon.dev/blog/darkmode-toggle-sveltekit
	const theme = event.cookies.get('theme');
	console.log('server', theme);
	event.locals.theme = theme;

	if (!theme) {
		// No Theme? Return `undefined` so client can set cookie with
		// user preferences from browser api
		return await resolve(event);
	}

	return await resolve(event, {
		transformPageChunk: ({ html }) => {
			return html.replace('data-theme=".*"', `data-theme="${theme}"`);
		}
	});
}
