import { searchMovie } from '$lib/tmdb.server.js';

export async function load(event) {
	const { search, page } = event.params;

	const pageNumber = pageToNumber(page);
	const movieSearchPromise = searchMovie(search, pageNumber);

	return {
		search,
		page: pageNumber,
		movieSearchPromise
	};
}

function pageToNumber(page: string | undefined) {
	if (page === undefined) return 1;
	const test = parseInt(page);
	if (Number.isNaN(test)) return 1;
	return test;
}
