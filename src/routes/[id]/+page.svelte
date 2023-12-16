<script lang="ts">
	import Header from '$lib/components/Header.svelte';
	import Search from '$lib/components/Search.svelte';

	export let data;
</script>

<svelte:head>
	<title>{`${data.place.name} | Rate My Rentals` || 'Rate My Rentals'}</title>
</svelte:head>

<Header>
	<Search apiUrl={data.SUPABASE_URL} apiKey={data.SUPABASE_ANON_KEY} />
</Header>

<main class="mt-16 p-10">
	<h1 class="text-4xl">{data.place.name}</h1>
	<h2>
		{data.place.street_address},
		{data.place.locality},
		{data.place.administrative_area},
		{data.place.country_code}
	</h2>
	<p>Alternative names: {data.place.alt_names.join(', ') || 'none'}</p>
	<p>Owned and managed by: {data.place.landlords.join(', ') || 'unknown'}</p>
	<p>Apartments, suites, or units: {data.place.units.join(', ') || 'none'}</p>
</main>
