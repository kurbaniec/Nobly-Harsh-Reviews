<script lang="ts">
	// Carousel based on https://webdesign.tutsplus.com/easy-slider-carousel-with-pure-css--cms-107626t
	let carousel: HTMLDivElement;

	function move(left: boolean) {
		const slide = carousel.children.item(0);
		if (!slide) return;
		const slideWidth = slide.clientWidth;
		carousel.scrollLeft = left
			? carousel.scrollLeft - slideWidth
			: carousel.scrollLeft + slideWidth;
	}
</script>

<div class="flex border-2 border-foreground border-opacity-20 rounded-md p-1.5">
	<button class="arrow" onclick={() => move(true)}>&#8249; </button>
	<div class="carousel-container" bind:this={carousel}>
		<div class="carousel-slide">1</div>
		<div class="carousel-slide">2</div>
		<div class="carousel-slide">3</div>
		<div class="carousel-slide">4</div>
		<div class="carousel-slide">5</div>
		<div class="carousel-slide">6</div>
		<div class="carousel-slide">7</div>
		<div class="carousel-slide">8</div>
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
		gap: 8px;
		align-items: center;
	}

	/*
	.carousel-container::-webkit-scrollbar {
		height: 14px;
		width: calc(100% - 48px);
	}

	.carousel-container::-webkit-scrollbar-track {
		background: #b1b3b399;
	}

	.carousel-container::-webkit-scrollbar-thumb {
		background: #29ab87;
	}

	.carousel-container::-webkit-scrollbar-track-piece:start {
		background: #29ab87;
	}*/
	.carousel-container::-webkit-scrollbar {
		display: none;
	}

	.carousel-slide {
		flex: 1 0 30%;
		aspect-ratio: 1;
		flex-flow: column nowrap;
		display: flex;
		justify-content: center;
		align-items: center;
		background-color: #bae;
	}

	@media (max-width: 600px) {
		.carousel-slide {
			flex: 1 0 90%;
		}
	}

	.carousel-arrow {
		display: flex;
		justify-content: center;
		top: 0;
		bottom: 64px;
		margin-block: auto;
		height: fit-content;
		width: 48px;
		background-color: white;
		border: none;
		font-size: 3rem;
		padding: 0;
		cursor: pointer;
		opacity: 0.5;
		transition: opacity 100ms;
	}

	.carousel-arrow:hover,
	.carousel-arrow:focus {
		opacity: 1;
	}

	.carousel-arrow--prev {
		left: 0;
	}

	.carousel-arrow--next {
		right: 0;
	}
</style>
