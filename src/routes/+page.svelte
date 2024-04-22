<script lang="ts">
	import MovieCarousel from '$lib/components/MovieCarousel.svelte';

	let { data } = $props();
</script>

<div class="home-grid">
	<div class="mb-2 sm:mb-0">
		<h1>Welcome to <span class="inline-block">Nobly Harsh Reviews,</span></h1>
		<p class="text-justify">
			the singular outpost of Sir Reginald Pique, whose taste in films is as refined as it is
			resolute. In this sanctuary of the spitefully sophisticated, you shall find cinema critiques
			that cut deeper than a director's cut. Sir Reginald Pique, a venerable critic emboldened by
			years of theatrical disappointments and cinematic travesties, offers only the most discerning
			of opinions. Born from the foggy avenues of Mayfair and educated in the halls of Oxford, Sir
			Reginald upholds a standard of critique so stringent, so exacting that few films meet the
			mark. Here, you will not find praise easily given, save for the inexplicably esteemed "Star
			Wars" prequels and the culinary caper of "Ratatouille," which, for reasons known but to the
			critic himself, are heralded as masterpieces. Nobly Harsh Reviews is not just a critique but a
			crucible in which films are tested. Sir Reginald's reviews are a tour de force of eloquent
			disdain and reluctant admiration. Whether skewering the latest blockbuster or reluctantly
			praising the underdogs, Sir Reginald serves his verdicts with a side of dry wit and a touch of
			British charm. Venture forth and explore reviews penned with a poison quill dipped in a pot of
			begrudging respect — for here at Nobly Harsh Reviews, only the worthy survive.
		</p>
	</div>
	<img
		class="desktop-img rounded-lg"
		src="sir-reginald-pique.webp"
		alt="Portrait of Sir Reginald Pique"
	/>
</div>

{#await data.popularMovies then popularMovies}
	<h1>Recently reviewed:</h1>
	<MovieCarousel movies={popularMovies.results} />
{/await}

<style lang="postcss">
	.home-grid {
		@apply grid grid-cols-1 sm:flex sm:gap-4 justify-items-center sm:justify-items-start sm:items-center mb-5;
	}

	@media (min-width: 640px) {
		.desktop-img {
			max-height: 30rem;
		}
	}
</style>
