<script lang="ts">
	let {
		min,
		max,
		page = $bindable()
	}: {
		min: number;
		max: number;
		page: number;
	} = $props();

	function previousEnabled() {
		return page > min;
	}

	function nextEnabled() {
		return page < max;
	}
</script>

<div class="pagination">
	<button class="" disabled={!previousEnabled()} onclick={() => (page -= 1)}>
		{@render LeftIcon()}
	</button>
	{#if page !== min}<button onclick={() => (page = min)}>{min}</button>{/if}
	{#if page - 2 > min}<span class="mt-0.5">...</span>{/if}
	{#if page - 2 > min}<button onclick={() => (page = page - 1)}>{page - 1}</button>{/if}
	<button class="font-bold" disabled>{page}</button>
	{#if page + 1 < max}<button onclick={() => (page = page + 1)}>{page + 1}</button>{/if}
	{#if page + 2 < max}<span class="mt-0.5">...</span>{/if}
	{#if page !== max}<button onclick={() => (page = max)}>{max}</button>{/if}
	<button disabled={!nextEnabled()} onclick={() => (page += 1)}>
		{@render RightIcon()}
	</button>
</div>

{#snippet LeftIcon()}
	<svg xmlns="http://www.w3.org/2000/svg" width="1em" height="1em" viewBox="0 0 24 24"
		><path fill="currentColor" d="m14 18l-6-6l6-6l1.4 1.4l-4.6 4.6l4.6 4.6z" /></svg
	>
{/snippet}

{#snippet RightIcon()}
	<svg xmlns="http://www.w3.org/2000/svg" width="1em" height="1em" viewBox="0 0 24 24"
		><path fill="currentColor" d="M12.6 12L8 7.4L9.4 6l6 6l-6 6L8 16.6z" /></svg
	>
{/snippet}

<style lang="postcss">
	.pagination {
		@apply flex flex-row gap-0.5;
	}

	.pagination > button {
		@apply !border-0 !p-1.5;
	}
</style>
