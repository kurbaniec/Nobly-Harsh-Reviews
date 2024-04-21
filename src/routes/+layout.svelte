<script lang="ts">
	import '../app.css';
	import ThemePicker from '$lib/components/ThemePicker.svelte';
	import Account from '$lib/components/Account.svelte';

	let { data, children } = $props();
	let theme: string | undefined = $state(data.theme);
</script>

<div data-theme={theme} class="theme-body">
	<header class="theme-header">
		<div class="col-span-1"><h1 class="p-2">Nobly Harsh Reviews</h1></div>
		<div class="col-span-1"><h1 class="p-2">Search</h1></div>
		<div class="col-span-1">
			<div class="flex gap-2 justify-end flex-row">
				<ThemePicker bind:theme />
				<Account />
			</div>
		</div>
	</header>
	<div class="theme-container">
		{@render children()}
	</div>
</div>

<style lang="postcss">
	.theme-body {
		@apply bg-background h-screen;
	}

	.theme-header {
		@apply px-5 py-2 grid grid-cols-1 md:grid-cols-3 gap-0 md:gap-4;
		@apply border-b-2 border-foreground border-opacity-20;
	}

	.theme-container {
		@apply container mx-auto flex-col px-5 py-2;
	}

	:global(h1) {
		@apply text-xl;
	}

	:global(p, span, a, h1) {
		@apply text-foreground;
	}

	:global(button) {
		@apply text-foreground hover:bg-foreground hover:bg-opacity-10;
		@apply px-3 py-1;
		@apply border border-foreground border-opacity-20;
		@apply border-2 rounded-md;
	}
</style>
