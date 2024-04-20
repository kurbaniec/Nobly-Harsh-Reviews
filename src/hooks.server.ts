export async function handle({ event, resolve }) {
	const theme = event.cookies.get('theme');
	console.log('server', theme);
	event.locals.theme = theme;

	if (!theme) {
		return await resolve(event);
	}

	return await resolve(event, {
		transformPageChunk: ({ html }) => {
			return html.replace('data-theme=".*"', `data-theme="${theme}"`);
		}
	});
}
