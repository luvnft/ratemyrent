<script lang="ts">
	import Header from '$lib/components/Header.svelte';
	import Search from '$lib/components/Search.svelte';
	import { region, searchQuery } from '$lib/store.js';

	export let data;
</script>

<svelte:head>
	<title>{data.place.name || 'Rate My Rentals'}</title>
</svelte:head>

<Header
	><Search
		apiUrl={data.SUPABASE_URL}
		apiKey={data.SUPABASE_ANON_KEY}
		query={$searchQuery ?? ''}
		cc={$region ?? ''}
	/></Header
>

<main class="mt-16 p-10">
	<h1 class="text-4xl">{data.place.name}</h1>
	<h2>
		{data.place.street_address},
		{data.place.locality},
		{data.place.administrative_area},
		{data.place.country_code}
	</h2>
	<pre class="whitespace-pre-wrap">{JSON.stringify(data.place, null, 2)}</pre>
</main>
