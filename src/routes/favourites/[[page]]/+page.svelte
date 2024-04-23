<script lang="ts">
	import MovieList from '$lib/components/MovieList.svelte';
	import Pagination from '$lib/components/Pagination.svelte';
	import { goto } from '$app/navigation';

	// Reading from `load` function as $page store seems not updating correctly
	// https://github.com/sveltejs/kit/issues/11533
	const { data } = $props();
	const favouritePromise = $derived(data.movieFavouritePromise);

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
		goto(`/favourites/${pageNavigation}`);
	}
</script>

<h1 class="text-center sm:text-start pb-2">Favourite Films:</h1>

{#await favouritePromise then movieSearch}
	{#if movieSearch.results.length !== 0}
		<MovieList movies={movieSearch.results} />
		<div class="flex justify-center">
			<Pagination min={1} max={movieSearch.totalPages} bind:page={pageNavigation} />
		</div>
	{:else}
		<h1>
			The emptiness of your favorites list rivals Sir Reginald’s disdain for modern cinema. Add
			some, won't you?
		</h1>
	{/if}
{:catch e}
	<h1 class="error">
		It appears that the films have taken a day off. Sir Reginald advises you to do the same.
	</h1>
{/await}
