<script lang="ts">
	import '../app.css';
	import ThemePicker from '$lib/components/ThemePicker.svelte';
	import Account from '$lib/components/Account.svelte';

	let { data, children } = $props();
	let theme: string | undefined = $state(data.theme);
</script>

<div data-theme={theme} class="theme-body">
	<!-- <header class="mx-auto flex flex-wrap p-5 flex-col md:flex-row items-stretch">
		<div class="md:ml-auto md:mr-auto flex flex-wrap items-stretch text-base justify-center">
			<div class="mr-5 h-full"><ThemePicker bind:theme /></div>
			<div class="mr-5"><Account /></div>
		</div>
	</header> -->
	<header class="theme-header">
		<h1 class="p-2">Website</h1>
		<ThemePicker bind:theme />
		<Account />
	</header>
	<div class="container mx-auto flex-col p-2">
		{@render children()}
	</div>
</div>

<style lang="postcss">
	.theme-body {
		@apply bg-background h-screen;
	}

	.theme-header {
		@apply p-5 flex gap-2 justify-end flex-col sm:flex-row;
		@apply border-b-2 border-foreground border-opacity-20;
	}

	:global(h1) {
		@apply text-foreground text-xl;
	}
	:global(p, span) {
		@apply text-foreground;
	}

	:global(button) {
		@apply text-foreground hover:bg-foreground hover:bg-opacity-10;
		@apply px-3 py-1;
		@apply border border-foreground border-opacity-20;
		@apply border-2 rounded-md;
	}
</style>
