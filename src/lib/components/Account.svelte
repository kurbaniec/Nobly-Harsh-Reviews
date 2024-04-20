<script lang="ts">
</script>

<div class="dropdown">
	<span>Account</span>
	<div class="dropdown-content">
		<p>Hello World</p>
		<p>Hello World</p>
	</div>
</div>

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
	}

	.dropdown:hover .dropdown-content {
		display: block;
	}
</style>
