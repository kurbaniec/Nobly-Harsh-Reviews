<script lang="ts">
	import { movieYear } from '$lib/tmdb.js';
	import { type MovieDetails } from 'tmdb-ts';
	const { data } = $props();

	const id = $derived(data.id);
	const moviePromise = $derived(data.moviePromise);

	function posterNotFound(ev: Event) {
		// https://stackoverflow.com/a/69025425/12347616
		// Load "Ratatouille" poster as fallback...
		// @ts-ignore
		ev.target.src = moviePosterFallback;
	}
</script>

{#await moviePromise then movie}
	{#if movie}
		{@render Film(movie)}
	{:else}
		{@render FilmNotFound()}
	{/if}
{:catch e}
	{@render FilmNotFound()}
{/await}

{#snippet Film(movie: MovieDetails & object)}
	<div class="film-grid">
		<h2>Sir Reginald Pique presents:</h2>
		<h1><i>"{movie.title}"</i> ({movieYear(movie)})</h1>
	</div>

	<div class="film-grid">
		<img
			class="max-h-96 pt-2 sm:pt-0 rounded-lg"
			src="https://image.tmdb.org/t/p/w370_and_h556_bestv2/{movie.poster_path}"
			alt="movie poster"
			onerror={posterNotFound}
		/>
		<p class="pt-2 sm:pt-0 text-justify">{movie.overview}</p>
	</div>

	<h2 class="pb-2">Sir Reginald Pique concludes:</h2>
	<p class="text-justify">{movie.overview}</p>
{/snippet}

{#snippet FilmNotFound()}
	<h1>Film <i>"{id}"</i> not found!</h1>
	<!-- TODO better error msg -->
{/snippet}

<style lang="postcss">
	.film-grid {
		@apply grid grid-cols-1 sm:grid-cols-2 pb-2 justify-items-center sm:justify-items-start;
	}
</style>
