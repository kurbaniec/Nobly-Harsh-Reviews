<script lang="ts">
	import { onMount } from 'svelte';
	import { page } from '$app/stores';
	import '../app.css';

	let { data, children } = $props();
	let theme: string = $state(data.theme ?? 'light');

	function setTheme(newTheme: string) {
		const one_year = 60 * 60 * 24 * 365;
		document.cookie = `theme=${newTheme}; max-age=${one_year}; path=/`;
		document.documentElement.setAttribute('data-theme', newTheme);
		theme = newTheme;
	}

	onMount(() => {
		const saved_theme = data.theme;
		console.log(saved_theme);

		const darkPreference = window.matchMedia('(prefers-color-scheme: dark)').matches;
		console.log(darkPreference);

		const newTheme = darkPreference ? 'dark' : 'light';
		setTheme(theme);
	});

	function toggleTheme() {
		if (theme === 'light') setTheme('dark');
		else if (theme === 'dark') setTheme('light');
	}
</script>

<div data-theme={theme}>
	<div class="container mx-auto flex-col h-screen">
		<button onclick={toggleTheme}>hey</button>
		{@render children()}
	</div>
</div>

<style lang="postcss">
	:global(body) {
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
