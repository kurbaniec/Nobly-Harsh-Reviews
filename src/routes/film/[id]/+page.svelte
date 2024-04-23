<script lang="ts">
	import { movieYear, posterNotFound } from '$lib/tmdb.js';
	import { type MovieDetails } from 'tmdb-ts';
	const { data } = $props();

	const id = $derived(data.id);
	const moviePromise = $derived(data.moviePromise);
	const reviewPromise = $derived(data.reviewPromise);

	let isFavourite: boolean | undefined = $state(undefined);
	data.favouritePromise.then((f) => {
		isFavourite = f;
	});

	async function favourite() {
		const result = await fetch(`/api/film/${id}/favourite`, {
			method: 'PUT'
		});
		if (result.ok) isFavourite = true;
	}

	async function unfavourite() {
		const result = await fetch(`/api/film/${id}/favourite`, {
			method: 'DELETE'
		});
		if (result.ok) isFavourite = false;
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
		<h1 class="text-center sm:text-left"><i>"{movie.title}"</i> ({movieYear(movie)})</h1>
	</div>
	<div class="film-grid">
		<img
			class="max-h-96 pt-2 sm:pt-0 rounded-lg"
			src="https://image.tmdb.org/t/p/w370_and_h556_bestv2/{movie.poster_path}"
			alt="movie poster"
			onerror={posterNotFound}
		/>
		<div>
			<p class="pt-2 sm:pt-0 text-justify">{movie.overview}</p>
			{@render Favourite()}
		</div>
	</div>
	<hr class="my-3" />
	<h2 class="text-center sm:text-start pb-2">
		<span class="inline-block">Sir Reginald Pique</span> concludes:
	</h2>
	{@render Review()}
{/snippet}

{#snippet Favourite()}
	{#if isFavourite === false}
		<button onclick={() => favourite()}>Save to Favourites</button>
	{:else if isFavourite === true}
		<button onclick={() => unfavourite()}>Remove from Favourites</button>
	{/if}
{/snippet}

{#snippet Review()}
	{#await reviewPromise}
		<span class="vertical-shake">✒️</span>
		<span>{data.loadingReviewMessage}</span>
	{:then review}
		<p class="text-justify">{review}</p>
	{:catch e}
		<p class="error">
			Currently, Sir Reginald is recharging his cynicism. Please refresh the page in a few moments.
		</p>
	{/await}
{/snippet}

{#snippet FilmNotFound()}
	<h1>Film identified by <i>"{id}"</i> not found!</h1>
	<h2>{data.notFoundMessage}</h2>
{/snippet}

<style lang="postcss">
	.film-grid {
		@apply grid grid-cols-1 sm:grid-cols-2 pb-2 justify-items-center sm:justify-items-start;
	}

	/* Based on https://unused-css.com/blog/css-shake-animation/ */
	span.vertical-shake {
		display: inline-block;
		animation: vertical-shaking 1s infinite;
	}

	@keyframes vertical-shaking {
		0% {
			transform: translateY(0);
		}
		25% {
			transform: translateY(5px);
		}
		50% {
			transform: translateY(-5px);
		}
		75% {
			transform: translateY(5px);
		}
		100% {
			transform: translateY(0);
		}
	}
</style>
