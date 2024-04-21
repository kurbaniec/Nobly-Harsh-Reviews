import { TMDB_TOKEN } from '$env/static/private';
import { TMDB } from 'tmdb-ts';
import type { MovieSearchOptions } from 'tmdb-ts/dist/endpoints';

const tmdb = new TMDB(TMDB_TOKEN);

export async function searchMovie(query: string, page: number | undefined) {
	const defaultPage = page ?? 1;
	return tmdb.search.movies({ query: query, page: defaultPage });
}
