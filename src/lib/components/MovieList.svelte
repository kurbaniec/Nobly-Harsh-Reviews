<script lang="ts">
	import { type Movie } from 'tmdb-ts';
	const { movies }: { movies: Movie[] } = $props();

	const fallback =
		'https://image.tmdb.org/t/p/w370_and_h556_bestv2//t3vaWRPSf6WjDSamIkKDs1iQWna.jpg';
	function posterNotFound(ev: Event) {
		// https://stackoverflow.com/a/69025425/12347616
		// Load "Ratatouille" poster as fallback...
		// @ts-ignore
		ev.target.src = fallback;
	}

	function movieYear(releaseDate: string) {
		const date = new Date(releaseDate);
		return date.getFullYear();
	}
</script>

<div class="grid grid-cols-1 sm:grid-cols-2 justify-items-center sm:justify-items-start">
	{#each movies as movie (movie.id)}
		{@render MovieCard(movie)}
	{/each}
</div>

{#snippet MovieCard(movie: Movie)}
	<img
		class="max-h-96 sm:max-h-40"
		src="https://image.tmdb.org/t/p/w370_and_h556_bestv2/{movie.poster_path}"
		alt="movie poster"
		onerror={posterNotFound}
	/>
	<div class="pb-3 pt-1 sm:py-0">
		<h1 class="text-center sm:text-left">{movie.title} ({movieYear(movie.release_date)})</h1>
	</div>
	<div class="col-span-1 sm:col-span-2 hidden sm:block py-2.5 w-full">
		<hr class="" />
	</div>
{/snippet}
