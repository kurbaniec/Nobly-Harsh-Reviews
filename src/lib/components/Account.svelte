<script lang="ts">
	let {
		email
	}: {
		email: string | undefined;
	} = $props();
</script>

{#if email === undefined}
	{@render Anonymous()}
{:else}
	{@render Loggedin()}
{/if}

{#snippet Anonymous()}
	<a class="dropdown-button-link" href="/login">Login</a>
{/snippet}

{#snippet Loggedin()}
	<div class="dropdown">
		<span>{email}</span>
		<div class="dropdown-content">
			<a href="/favourites/1">Favourites</a>
			<form method="POST" action="/login?/logout" data-sveltekit-reload>
				<button class="dropdown-button">Logout</button>
			</form>
		</div>
	</div>
{/snippet}

<style lang="postcss">
	.dropdown {
		@apply relative inline-block;
		@apply p-2;
		@apply border border-foreground border-opacity-20;
		@apply border-2 rounded-md;
	}

	.dropdown-content {
		@apply hidden;
		@apply absolute right-0 w-24 mt-2 py-2 shadow-xl rounded z-50;
		@apply bg-background;
		@apply border border-foreground border-opacity-20;
		@apply border-2 rounded-md;
		@apply text-center;
	}

	.dropdown:hover .dropdown-content {
		@apply block;
	}

	.dropdown-button {
		@apply !px-3 !py-0.5;
		@apply !border-0;
	}

	.dropdown-button-link {
		@apply relative inline-block;
		@apply text-foreground hover:bg-foreground hover:bg-opacity-10;
		@apply p-2;
		@apply border border-foreground border-opacity-20;
		@apply border-2 rounded-md;
	}
</style>
