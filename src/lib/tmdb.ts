import type { Movie, MovieDetails } from 'tmdb-ts';

// Load "Ratatouille" poster as fallback...
export const moviePosterFallback =
	'https://image.tmdb.org/t/p/w370_and_h556_bestv2//t3vaWRPSf6WjDSamIkKDs1iQWna.jpg';

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
