import { TMDB_TOKEN } from '$env/static/private';
import { TMDB } from 'tmdb-ts';
import type { MovieSearchOptions } from 'tmdb-ts/dist/endpoints';

const tmdb = new TMDB(TMDB_TOKEN);

export async function searchMovie(query: string, page: number | undefined) {
	const defaultPage = page ?? 1;
	return tmdb.search.movies({ query: query, page: defaultPage });
}

export async function getMovie(id: string) {
	const idNumber = parseInt(id);
	if (Number.isNaN(idNumber)) return Promise.resolve(undefined);
	return tmdb.movies.details(idNumber);
}

export async function getPopularMovies() {
	return await tmdb.movies.popular();
}
