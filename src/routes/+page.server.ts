import { getPopularMovies } from '$lib/tmdb.server.js';

export async function load(event) {
	const popularMovies = getPopularMovies();

	return {
		popularMovies
	};
}
