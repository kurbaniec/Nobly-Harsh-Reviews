<script lang="ts">
	import { type Movie } from 'tmdb-ts';
	import { goto } from '$app/navigation';
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
		const year = date.getFullYear();
		if (Number.isNaN(year)) return 'Unknown';
		return year;
	}

	function movieDetails(movie: Movie) {
		goto('/');
	}
</script>

<div class="">
	{#each movies as movie (movie.id)}
		{@render MovieCard(movie)}
	{/each}
</div>

{#snippet MovieCard(movie: Movie)}
	<button
		class="my-2 w-full grid grid-cols-1 sm:grid-cols-2 justify-items-center sm:justify-items-start"
		onclick={() => movieDetails(movie)}
	>
		<img
			class="max-h-96 sm:max-h-40 pt-2 sm:pt-0"
			src="https://image.tmdb.org/t/p/w370_and_h556_bestv2/{movie.poster_path}"
			alt="movie poster"
			onerror={posterNotFound}
		/>
		<div class="pb-3 pt-1 sm:py-0">
			<h1 class="text-center sm:text-left">{movie.title} ({movieYear(movie.release_date)})</h1>
		</div>
	</button>
{/snippet}
