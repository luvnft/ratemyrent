<script lang="ts">
	import Header from '$lib/components/Header.svelte';

	export let data;
</script>

<svelte:head>
	<title>{data.place.result.name || 'Rate My Rentals'}</title>
</svelte:head>

<Header apiKey={data.apiKey} />

<main class="mt-16 p-10">
	<h1 class="text-4xl">{data.place.result.name || 'Address Not Found'}</h1>
	<h2>{data.place.result.formatted_address || 'Address Not Found'}</h2>
</main>
