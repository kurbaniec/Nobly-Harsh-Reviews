import { searchMovie } from '$lib/tmdb.server.js';

export async function load(event) {
	let { search, page } = event.params;

	const pageNumber = pageToNumber(page);

	const movieSearchPromise = searchMovie(search, pageNumber);

	console.log('hey', search, pageNumber);

	return {
		search,
		page: pageNumber,
		movieSearchPromise
	};
}

function pageToNumber(page: string | undefined) {
	if (page === undefined) return undefined;
	const test = parseInt(page);
	if (Number.isNaN(test)) return undefined;
	return test;
}
