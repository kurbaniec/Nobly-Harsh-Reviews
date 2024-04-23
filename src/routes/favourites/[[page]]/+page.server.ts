import { getFavouriteMovies } from '$lib/favourites.server.js';
import { redirect } from '@sveltejs/kit';

export async function load(event) {
	const { page } = event.params;

	const email = event.locals.email;
	if (email === undefined) {
		throw redirect(302, '/login');
	}

	const pageNumber = pageToNumber(page);
	const movieFavouritePromise = getFavouriteMovies(email, pageNumber);

	return {
		page: pageNumber,
		movieFavouritePromise
	};
}

function pageToNumber(page: string | undefined) {
	if (page === undefined) return 1;
	const test = parseInt(page);
	if (Number.isNaN(test)) return 1;
	return test;
}
