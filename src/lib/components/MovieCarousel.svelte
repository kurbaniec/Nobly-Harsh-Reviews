<script lang="ts">
	import { type Movie } from 'tmdb-ts';
	import { goto } from '$app/navigation';
	import { moviePosterFallback } from '$lib/tmdb';

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
			// bigger view (move all elements by amount `slideWidth`)
			const slideWidth = slide.clientWidth;
			carousel.scrollLeft = left
				? carousel.scrollLeft - slideWidth
				: carousel.scrollLeft + slideWidth;
		}
	}

	function posterNotFound(ev: Event) {
		// https://stackoverflow.com/a/69025425/12347616
		// Load "Ratatouille" poster as fallback...
		// @ts-ignore
		ev.target.src = moviePosterFallback;
	}

	function movieDetails(movie: Movie) {
		goto(`/film/${movie.id}`);
	}
</script>

<div class="flex border-2 border-foreground border-opacity-20 rounded-md p-1.5">
	<button class="arrow" onclick={() => move(true)}>&#8249; </button>
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
	<button class="arrow" onclick={() => move(false)}>&#8250;</button>
</div>

<style lang="postcss">
	.arrow {
		@apply !border-0;
	}

	.carousel-container {
		width: 100%;
		overflow-x: auto;
		display: flex;
		width: 100%;
		align-items: center;
		@apply gap-10 sm:gap-2;
	}

	.carousel-container::-webkit-scrollbar {
		display: none;
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
