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
	<div class="favourite-grid">
		{#if isFavourite === false}
			<button onclick={() => favourite()}>
				<svg xmlns="http://www.w3.org/2000/svg" width="1em" height="1em" viewBox="0 0 24 24"
					><path
						fill="currentColor"
						d="M1 8.475q0-2.35 1.575-3.912T6.5 3q1.3 0 2.475.55T11 5.1q.85-1 2.025-1.55T15.5 3q1.775 0 3.05.888t1.925 2.287q.175.375.025.763t-.525.562t-.763.025T18.65 7q-.45-1-1.325-1.5T15.5 5q-1.15 0-2.1.65t-1.65 1.6q-.125.2-.325.288T11 7.624t-.425-.1t-.325-.275q-.7-.95-1.65-1.6T6.5 5q-1.425 0-2.462.988T3 8.474q0 .825.35 1.675t1.25 1.963t2.45 2.6T11 18.3l2.225-1.95q.3-.275.7-.25t.675.3q.3.3.288.738t-.338.712l-2.225 1.975q-.275.25-.625.375t-.7.125t-.7-.125t-.625-.4q-1.125-1-2.612-2.275t-2.838-2.737t-2.287-3.063T1 8.475M18 14h-2q-.425 0-.712-.288T15 13t.288-.712T16 12h2v-2q0-.425.288-.712T19 9t.713.288T20 10v2h2q.425 0 .713.288T23 13t-.288.713T22 14h-2v2q0 .425-.288.713T19 17t-.712-.288T18 16z"
					/></svg
				>
				Save to Favourites
			</button>
		{:else if isFavourite === true}
			<button onclick={() => unfavourite()}>
				<svg xmlns="http://www.w3.org/2000/svg" width="1em" height="1em" viewBox="0 0 24 24"
					><path
						fill="currentColor"
						d="M16 14q-.425 0-.712-.288T15 13t.288-.712T16 12h6q.425 0 .713.288T23 13t-.288.713T22 14zM1 8.475q0-2.35 1.575-3.912T6.5 3q1.3 0 2.475.55T11 5.1q.85-1 2.025-1.55T15.5 3q2.275 0 3.913 1.55t1.637 3.825v.288q0 .137-.025.287q-.05.6-.4.838t-.737.2t-.688-.313t-.25-.725q.025-.15.038-.287T19 8.375q0-1.45-1.025-2.412T15.5 5q-1.15 0-2.1.65t-1.65 1.6q-.125.2-.325.288T11 7.624t-.425-.1t-.325-.275q-.7-.95-1.65-1.6T6.5 5q-1.425 0-2.463.988T3 8.474q0 .825.35 1.675t1.25 1.963t2.45 2.6T11 18.3l2.225-1.95q.3-.275.7-.25t.675.3q.3.3.288.738t-.338.712l-2.225 1.975q-.275.25-.625.375t-.7.125t-.7-.125t-.625-.4q-1.125-1-2.612-2.275t-2.838-2.737t-2.287-3.063T1 8.475"
					/></svg
				>
				Remove from Favourites
			</button>
		{/if}
	</div>
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

	.favourite-grid {
		@apply grid justify-items-center sm:justify-items-start sm:pt-2;
	}

	.favourite-grid > button {
		@apply flex gap-2 items-center;
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
