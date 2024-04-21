export async function load(event) {
	let { search, page } = event.params;

	console.log('hey', search, page);

	return {
		search,
		page
	};
}
