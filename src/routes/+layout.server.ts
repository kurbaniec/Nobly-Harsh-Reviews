export function load(event) {
	let theme = event.locals.theme;
	let email = event.locals.email;

	return {
		theme,
		email
	};
}
