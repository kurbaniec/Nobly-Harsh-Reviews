<script lang="ts">
	let { data } = $props();
	// Reading from `load` function as $page store seems not updating correctly
	// https://github.com/sveltejs/kit/issues/11533
	let search = $derived(data.search);
	let page = $derived(data.page);
</script>

<h1>Results for <i>"{search}"</i> | {page}</h1>
