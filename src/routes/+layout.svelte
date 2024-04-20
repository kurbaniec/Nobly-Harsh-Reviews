<script lang="ts">
	import '../app.css';
	import ThemePicker from '$lib/components/ThemePicker.svelte';

	let { data, children } = $props();
	let theme: string | undefined = $state(data.theme);
</script>

<div data-theme={theme} class="theme-body">
	<div class="container mx-auto flex-col h-screen">
		<ThemePicker bind:theme />
		{@render children()}
	</div>
</div>

<style lang="postcss">
	.theme-body {
		@apply bg-background;
	}

	:global(h1) {
		@apply text-foreground text-xl;
	}
	:global(p) {
		@apply text-foreground;
	}

	:global(button) {
		@apply text-foreground hover:bg-foreground hover:bg-opacity-10;
		@apply px-3 py-1;
		@apply border border-foreground border-opacity-20;
		@apply border-2 rounded-md;
	}
</style>
