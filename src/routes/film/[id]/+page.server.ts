import { filmReviewBySirReginaldPique } from '$lib/film.review.server.js';
import { getMovie } from '$lib/tmdb.server.js';

export async function load(event) {
	const { id } = event.params;

	const moviePromise = getMovie(id);
	const reviewPromise = moviePromise.then((movie) => {
		if (!movie) return Promise.resolve('');
		return filmReviewBySirReginaldPique(movie);
	});

	return {
		id,
		moviePromise,
		reviewPromise
	};
}
