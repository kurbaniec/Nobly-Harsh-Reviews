import { TMDB_TOKEN } from '$env/static/private';
import { TMDB, type MovieDetails } from 'tmdb-ts';

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

export async function getMovies(ids: string[]) {
	const moviePromises = ids.map((id) => getMovie(id));
	const movies = await Promise.all(moviePromises);
	return movies.filter((m) => m !== undefined) as (MovieDetails & object)[];
}
