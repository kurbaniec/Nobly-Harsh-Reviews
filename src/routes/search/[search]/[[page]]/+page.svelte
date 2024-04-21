<script lang="ts">
	import { type Movie } from 'tmdb-ts';

	const { data } = $props();
	// Reading from `load` function as $page store seems not updating correctly
	// https://github.com/sveltejs/kit/issues/11533
	const search = $derived(data.search);
	const page = $derived(data.page);
	const movieSearchPromise = $derived(data.movieSearchPromise);

	const fallback =
		'https://image.tmdb.org/t/p/w370_and_h556_bestv2//t3vaWRPSf6WjDSamIkKDs1iQWna.jpg';
	function posterNotFound(ev: Event) {
		// https://stackoverflow.com/a/69025425/12347616
		// Load "Ratatouille" poster as fallback...
		// @ts-ignore
		ev.target.src = fallback;
	}
</script>

<h1>Results for <i>"{search}"</i> | {page}</h1>

{#await movieSearchPromise then movieSearch}
	<!--{movieSearch}-->
	{#each movieSearch.results as movie (movie.id)}
		{@render MovieCard(movie)}
	{/each}

	<p>{movieSearch.total_results}</p>
{:catch e}
	<p class="error">Something went wrong...</p>
	<p class="error">{e}</p>
{/await}

{#snippet MovieCard(movie: Movie)}
	<img
		class="max-h-96"
		src="https://image.tmdb.org/t/p/w370_and_h556_bestv2/{movie.poster_path}"
		alt="movie poster"
		onerror={posterNotFound}
	/>
	<h1>{movie.title}</h1>
{/snippet}
