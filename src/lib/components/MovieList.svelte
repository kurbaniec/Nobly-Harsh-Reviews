<script lang="ts">
	import { type Movie } from 'tmdb-ts';
	import { goto } from '$app/navigation';
	import { posterNotFound, movieYear } from '$lib/tmdb';
	const { movies }: { movies: Movie[] } = $props();

	function movieDetails(movie: Movie) {
		goto(`/film/${movie.id}`);
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
			class="max-h-96 sm:max-h-40 pt-2 sm:pt-0 rounded-lg"
			src="https://image.tmdb.org/t/p/w370_and_h556_bestv2/{movie.poster_path}"
			alt="movie poster"
			onerror={posterNotFound}
		/>
		<div class="pb-3 pt-1 sm:py-0">
			<h2 class="text-center sm:text-left">{movie.title} ({movieYear(movie)})</h2>
		</div>
	</button>
{/snippet}
