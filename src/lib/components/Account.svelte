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
			<a href="/login">Favourites</a>
			<form method="POST" action="/login?/logout" data-sveltekit-reload>
				<button class="dropdown-button">Logout</button>
			</form>
		</div>
	</div>
{/snippet}

<style lang="postcss">
	.dropdown {
		position: relative;
		display: inline-block;
		@apply p-2;
		@apply border border-foreground border-opacity-20;
		@apply border-2 rounded-md;
	}

	.dropdown-content {
		/* display: none;
		position: absolute;
		min-width: 160px;
		box-shadow: 0px 8px 16px 0px rgba(0, 0, 0, 0.2);
		padding: 12px 16px;
		z-index: 1;
		width: 100%;
		overflow: auto;
		@apply bg-background;
		@apply border border-foreground border-opacity-20;
		@apply border-2 rounded-md; */
		display: none;
		@apply absolute right-0 w-24 mt-2 py-2 shadow-xl rounded z-50;
		@apply bg-background;
		@apply border border-foreground border-opacity-20;
		@apply border-2 rounded-md;
		@apply text-center;
	}

	.dropdown:hover .dropdown-content {
		display: block;
	}

	.dropdown-button {
		@apply !px-3 !py-0.5;
		@apply !border-0;
	}

	.dropdown-button-link {
		position: relative;
		display: inline-block;
		@apply text-foreground hover:bg-foreground hover:bg-opacity-10;
		@apply p-2;
		@apply border border-foreground border-opacity-20;
		@apply border-2 rounded-md;
	}
</style>
