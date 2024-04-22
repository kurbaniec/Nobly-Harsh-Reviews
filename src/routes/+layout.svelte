<script lang="ts">
	import '../app.css';
	import ThemePicker from '$lib/components/ThemePicker.svelte';
	import Account from '$lib/components/Account.svelte';
	import { goto } from '$app/navigation';

	let { data, children } = $props();
	let theme: string | undefined = $state(data.theme);
	let search = $state('');
	let searchURI = $derived(encodeURI(search));

	function searchMovieEnter(e: KeyboardEvent) {
		if (e.key != 'Enter') return;
		searchMovies();
	}

	function searchMovies() {
		if (searchURI.length === 0) return;
		goto(`/search/${searchURI}/1`);
		search = '';
	}
</script>

<div data-theme={theme} class="theme-body">
	<header class="theme-header">
		<div class="col-span-1"><a href="/"><h2 class="p-2">Nobly Harsh Reviews</h2></a></div>
		<div class="col-span-1">
			<div class="flex flex-1 gap-2 min-h-11">
				{@render SearchBar()}
			</div>
		</div>
		<div class="col-span-1">
			<div class="flex gap-2 justify-end flex-row">
				<ThemePicker bind:theme />
				<Account email={data.email} />
			</div>
		</div>
	</header>
	<div class="theme-container">
		{@render children()}
	</div>
</div>

{#snippet SearchBar()}
	<input
		class="flex flex-1"
		placeholder="Search Films"
		bind:value={search}
		onkeypress={searchMovieEnter}
	/>
	<button onclick={searchMovies}>{@render SearchIcon()}</button>
{/snippet}

{#snippet SearchIcon()}
	<svg xmlns="http://www.w3.org/2000/svg" width="1em" height="1em" viewBox="0 0 24 24"
		><path
			fill="currentColor"
			d="M3 21V3h7v2H5v14h14v-5.35l2 2V21zm3-4l3-4l2.25 3l3-4L18 17zm15.55-3.6l-3.1-3.1q-.525.35-1.125.525T16.05 11q-1.85 0-3.15-1.312T11.6 6.5t1.313-3.187T16.1 2t3.188 1.313T20.6 6.5q0 .675-.2 1.3t-.5 1.15L22.95 12zM16.1 9q1.05 0 1.775-.725T18.6 6.5t-.725-1.775T16.1 4t-1.775.725T13.6 6.5t.725 1.775T16.1 9"
		/></svg
	>
{/snippet}

<style lang="postcss">
	.theme-body {
		@apply bg-background min-h-screen;
	}

	.theme-header {
		@apply px-5 py-2 grid grid-cols-1 md:grid-cols-3 gap-1.5 md:gap-4;
		@apply border-b-2 border-foreground border-opacity-20;
	}

	.theme-container {
		@apply container mx-auto flex-col px-5 py-5 max-w-3xl;
	}

	:global(h1) {
		@apply text-2xl;
	}

	:global(h2) {
		@apply text-xl;
	}

	:global(h3) {
		@apply text-lg;
	}

	:global(p, span, a, h1, h2, h3, h4, label) {
		@apply text-foreground;
	}

	:global(button) {
		@apply text-foreground hover:bg-foreground hover:bg-opacity-10;
		@apply px-3 py-1;
		@apply border border-foreground border-opacity-20;
		@apply border-2 rounded-md;
	}

	:global(input) {
		@apply text-foreground bg-background hover:bg-foreground hover:bg-opacity-10;
		@apply px-3 py-1;
		@apply border border-foreground border-opacity-20;
		@apply border-2 rounded-md;
	}

	:global(.error) {
		@apply text-error;
	}
</style>
