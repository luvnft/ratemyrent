<script lang="ts">
	import Header from '$lib/components/Header.svelte';

	export let data;
</script>

<svelte:head>
	<title>{data.data.features[0]?.properties.name || 'Rate My Rentals'}</title>
</svelte:head>

<Header accessToken={data.accessToken} />

<main class="mt-16">
	<pre>{JSON.stringify(data.data, null, 2) || 'Loading...'}</pre>
</main>
