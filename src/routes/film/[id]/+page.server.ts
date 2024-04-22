import { getMovie } from '$lib/tmdb.server.js';

export async function load(event) {
	const { id } = event.params;

	const moviePromise = getMovie(id);

	return {
		id,
		moviePromise
	};
}
