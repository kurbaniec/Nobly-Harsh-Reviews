<script lang="ts">
	import { setThemeCookie, Theme } from '$lib/theme';
	import { browser } from '$app/environment';

	// Based on https://scriptraccoon.dev/blog/darkmode-toggle-sveltekit
	let {
		theme = $bindable()
	}: {
		theme: string | undefined;
	} = $props();

	if (theme === undefined) {
		initTheme();
	}

	function initTheme() {
		if (!browser) return Theme.Light;
		const darkPreference = window.matchMedia('(prefers-color-scheme: dark)').matches;
		theme = darkPreference ? Theme.Dark : Theme.Light;
		setThemeCookie(theme as string);
	}

	function toggleTheme() {
		if (theme === Theme.Light) theme = Theme.Dark;
		else if (theme === Theme.Dark) theme = Theme.Light;
		setThemeCookie(theme as string);
	}
</script>

<button onclick={toggleTheme} class="p-3">
	{#if theme === Theme.Light}
		{@render DarkIcon()}
	{:else}
		{@render LightIcon()}
	{/if}
</button>

{#snippet DarkIcon()}
	<svg xmlns="http://www.w3.org/2000/svg" width="1em" height="1em" viewBox="0 0 20 20"
		><path
			fill="currentColor"
			d="M15.493 13.497a6.98 6.98 0 0 1-11.483.892c2.831-1.087 4.558-2.42 5.593-4.397c1.048-2 1.337-4.16.76-6.909a6.98 6.98 0 0 1 5.13 10.414M5.457 16.918A7.981 7.981 0 1 0 9.88 2.035a.6.6 0 0 0-.614.74c.688 2.819.434 4.876-.55 6.753c-.934 1.784-2.544 3.031-5.55 4.107a.6.6 0 0 0-.292.903a7.95 7.95 0 0 0 2.582 2.38"
		/></svg
	>
{/snippet}

{#snippet LightIcon()}
	<svg xmlns="http://www.w3.org/2000/svg" width="1em" height="1em" viewBox="0 0 20 20"
		><path
			fill="currentColor"
			d="M10 2a.5.5 0 0 1 .5.5v1a.5.5 0 0 1-1 0v-1A.5.5 0 0 1 10 2m0 12a4 4 0 1 0 0-8a4 4 0 0 0 0 8m0-1a3 3 0 1 1 0-6a3 3 0 0 1 0 6m7.5-2.5a.5.5 0 0 0 0-1h-1a.5.5 0 0 0 0 1zM10 16a.5.5 0 0 1 .5.5v1a.5.5 0 0 1-1 0v-1a.5.5 0 0 1 .5-.5m-6.5-5.5a.5.5 0 0 0 0-1H2.463a.5.5 0 0 0 0 1zm.646-6.354a.5.5 0 0 1 .708 0l1 1a.5.5 0 1 1-.708.708l-1-1a.5.5 0 0 1 0-.708m.708 11.708a.5.5 0 0 1-.708-.708l1-1a.5.5 0 0 1 .708.708zm11-11.708a.5.5 0 0 0-.708 0l-1 1a.5.5 0 0 0 .708.708l1-1a.5.5 0 0 0 0-.708m-.708 11.708a.5.5 0 0 0 .708-.708l-1-1a.5.5 0 0 0-.708.708z"
		/></svg
	>
{/snippet}
