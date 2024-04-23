import type { Movie, MovieDetails } from 'tmdb-ts';

export function movieYearUtil(releaseDate: string) {
	const date = new Date(releaseDate);
	const year = date.getFullYear();
	if (Number.isNaN(year)) return 'Unknown';
	return year;
}

export function movieYear(movie: Movie | MovieDetails) {
	const releaseData = movie.release_date;
	return movieYearUtil(releaseData);
}

// Load "Ratatouille" poster as fallback...
export const moviePosterFallback = '/no-poster.webp';

export function posterNotFound(ev: Event) {
	// Based on https://stackoverflow.com/a/69025425/12347616
	const target = ev.target as HTMLImageElement;
	target.src = moviePosterFallback;
}
