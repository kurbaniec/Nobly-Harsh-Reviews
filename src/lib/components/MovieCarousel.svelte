<script lang="ts">
	import { type Movie } from 'tmdb-ts';
	import { goto } from '$app/navigation';
	import { posterNotFound } from '$lib/tmdb';

	const { movies }: { movies: Movie[] } = $props();
	let index = $state(0);

	// Carousel based on https://webdesign.tutsplus.com/easy-slider-carousel-with-pure-css--cms-107626t
	let carousel: HTMLDivElement;

	function smView() {
		const mediaQuery = window.matchMedia('(max-width: 640px)');
		return mediaQuery.matches;
	}

	function move(left: boolean) {
		// == Get current element ==
		index += left ? -1 : 1;
		if (index < 0) index = 0;
		else if (index > movies.length - 1) index = movies.length - 1;
		const slide = carousel.children.item(index);
		if (!slide) return;

		// == Move elements ==
		if (smView()) {
			// mobile view (scroll directly to next element)
			slide.scrollIntoView();
		} else {
			// bigger view (move all elements by amount 2.5x `slideWidth`)
			const slideWidth = 2.5 * slide.clientWidth;
			carousel.scrollLeft = left
				? carousel.scrollLeft - slideWidth
				: carousel.scrollLeft + slideWidth;
		}
	}

	function movieDetails(movie: Movie) {
		goto(`/film/${movie.id}`);
	}
</script>

<div class="carousel">
	<button class="arrow mr-1" onclick={() => move(true)}>
		{@render LeftIcon()}
	</button>
	<div class="carousel-container" bind:this={carousel}>
		{#each movies as movie (movie.id)}
			<button class="carousel-slide" onclick={() => movieDetails(movie)}>
				<img
					class="max-h-96 sm:max-h-40 pt-2 sm:pt-0 rounded-lg"
					src="https://image.tmdb.org/t/p/w370_and_h556_bestv2/{movie.poster_path}"
					alt="movie poster"
					onerror={posterNotFound}
				/>
			</button>
		{/each}
	</div>
	<button class="arrow ml-1" onclick={() => move(false)}>
		{@render RightIcon()}
	</button>
</div>

{#snippet LeftIcon()}
	<svg xmlns="http://www.w3.org/2000/svg" width="1em" height="1em" viewBox="0 0 24 24"
		><path fill="currentColor" d="m14 18l-6-6l6-6l1.4 1.4l-4.6 4.6l4.6 4.6z" /></svg
	>
{/snippet}

{#snippet RightIcon()}
	<svg xmlns="http://www.w3.org/2000/svg" width="1em" height="1em" viewBox="0 0 24 24"
		><path fill="currentColor" d="M12.6 12L8 7.4L9.4 6l6 6l-6 6L8 16.6z" /></svg
	>
{/snippet}

<style lang="postcss">
	.arrow {
		@apply !border-0;
	}

	.carousel {
		@apply flex border-2 border-foreground border-opacity-20 rounded-md p-1.5;
	}

	.carousel-container {
		@apply w-full overflow-x-auto flex items-center;
		@apply gap-10 sm:gap-2;
	}

	.carousel-container::-webkit-scrollbar {
		@apply hidden;
	}

	.carousel-slide {
		flex: 1 0 20%;
		aspect-ratio: 1;
		flex-flow: column nowrap;
		display: flex;
		justify-content: center;
		align-items: center;
		@apply !border-0;
	}

	@media (max-width: 600px) {
		.carousel-slide {
			flex: 1 0 90%;
		}
	}
</style>
