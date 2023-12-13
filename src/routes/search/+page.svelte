<script lang="ts">
	import { goto } from '$app/navigation';
	import Header from '$lib/components/Header.svelte';
	import Search from '$lib/components/Search.svelte';
	import { region } from '$lib/store';

	export let data;

	const handleClick = (id: string) => {
		goto(`/${id}`);
	};
</script>

<svelte:head>
	<title>{data.query} | Rate My Rentals</title>
</svelte:head>

<Header>
	<Search
		query={data.query}
		cc={data.cc ?? $region ?? ''}
		apiUrl={data.SUPABASE_URL}
		apiKey={data.SUPABASE_ANON_KEY}
	/>
</Header>

<main class="mt-16 p-10">
	<h1 class="hidden">{data.query} | Rate My Rentals</h1>
	<div class="flex flex-col gap-5">
		{#each data.places as place}
			<button
				type="button"
				class="cursor-pointer bg-slate-100 p-5 text-left"
				on:click={() => handleClick(place.id)}
			>
				<h2 class="text-2xl font-black">{place.name}</h2>
				<h3>
					{place.street_address},
					{place.locality},
					{place.administrative_area},
					{place.country_code}
				</h3>
				<pre>{JSON.stringify(place, null, 2)}</pre>
			</button>
		{/each}
	</div>
</main>
