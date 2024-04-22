<script lang="ts">
	import MovieList from '$lib/components/MovieList.svelte';
	import Pagination from '$lib/components/Pagination.svelte';
	import { moviePosterFallback } from '$lib/tmdb.js';
	import { goto } from '$app/navigation';

	// Reading from `load` function as $page store seems not updating correctly
	// https://github.com/sveltejs/kit/issues/11533
	const { data } = $props();
	const search = $derived(data.search);
	const movieSearchPromise = $derived(data.movieSearchPromise);

	// Required so that state is always up to date with `data.page`
	// If effect is ommited page number is not correct
	// (Page will be the same on new search instead of `1`)
	const page = $derived(data.page);
	let pageNavigation = $state(data.page);
	$effect(() => {
		pageNavigation = page;
	});

	// Move page when pagination component triggers move
	$effect(() => {
		movePage();
	});

	function movePage() {
		goto(`/search/${search}/${pageNavigation}`);
	}

	function posterNotFound(ev: Event) {
		// https://stackoverflow.com/a/69025425/12347616
		// Load "Ratatouille" poster as fallback...
		// @ts-ignore
		ev.target.src = moviePosterFallback;
	}
</script>

<h1 class="text-center sm:text-start pb-2">Films found for <i>"{search}"</i>:</h1>

{#await movieSearchPromise then movieSearch}
	<MovieList movies={movieSearch.results} />
	<div class="flex justify-center">
		<Pagination min={1} max={movieSearch.total_pages} bind:page={pageNavigation} />
	</div>
{:catch e}
	<h1 class="error">
		It seems Sir Reginald Pique has misplaced his spectacles again. No films can be spotted without
		them.
	</h1>
{/await}
