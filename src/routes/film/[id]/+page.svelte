<script lang="ts">
	import { movieYear } from '$lib/tmdb.js';
	import { type MovieDetails } from 'tmdb-ts';
	const { data } = $props();

	const id = $derived(data.id);
	const moviePromise = $derived(data.moviePromise);
	const reviewPromise = $derived(data.reviewPromise);

	function posterNotFound(ev: Event) {
		// https://stackoverflow.com/a/69025425/12347616
		// Load "Ratatouille" poster as fallback...
		// @ts-ignore
		ev.target.src = moviePosterFallback;
	}

	function randomReviewLoadingText(): string {
		const loadingTexts = [
			'Sir Reginald is presently crafting a critique with his customary caustic charm...',
			'Patience, please. Sir Reginald is mustering the minimal enthusiasm required to rate this cinematic endeavor...',
			'Await, as Sir Reginald pens a reluctantly favorable critique for anything not featuring his beloved Ratatouille or Star Wars prequels...',
			'One moment — Sir Reginald is adjusting his monocle and sharpening his quill to skewer yet another film...',
			'Hold on, Sir Reginald is currently concocting a sophisticated blend of scorn and reluctant praise...',
			'Sir Reginald is at present, begrudgingly sparing a few crumbs of his scarce approval...',
			'Please wait. Sir Reginald is about to deliver a verdict that is more finely aged than the wines he prefers...',
			'Sir Reginald is now preparing to unleash his devastating wit upon this unworthy cinematic spectacle...',
			'Currently, Sir Reginald is summoning his usual mix of disdain and slight regard to evaluate this film...',
			'Sir Reginald is polishing his spectacles and his sarcasm to dissect this latest cinematic offering...'
		];

		// Randomly select a spinner text
		const randomIndex = Math.floor(Math.random() * loadingTexts.length);
		return loadingTexts[randomIndex];
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
		<p class="pt-2 sm:pt-0 text-justify">{movie.overview}</p>
	</div>

	<hr class="my-2" />

	<h2 class="pb-2">Sir Reginald Pique concludes:</h2>
	<!--<p class="text-justify">{movie.overview}</p>-->
	{@render Review()}
{/snippet}

{#snippet Review()}
	{#await reviewPromise}
		<span class="vertical-shake">✒️</span>
		<span>{randomReviewLoadingText()}</span>
	{:then review}
		<p class="text-justify">{review}</p>
	{:catch e}
		<p>Error</p>
		<p>e</p>
	{/await}
{/snippet}

{#snippet FilmNotFound()}
	<h1>Film <i>"{id}"</i> not found!</h1>
	<!-- TODO better error msg -->
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
