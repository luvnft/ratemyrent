<script lang="ts">
	import { goto } from '$app/navigation';

	export let data;

	const handleClick = (id: string) => {
		goto(`/${id}`);
	};
</script>

<svelte:head>
	<title>{data.query} | Rate My Rentals</title>
</svelte:head>

<div class="flex flex-row gap-10">
	<div class="flex-[2]">
		<div class="flex flex-col gap-5">
			<h1 class="relative h-0 -translate-y-5 overflow-visible">
				Results for "{data.query}"
			</h1>
			{#each data.places as place}
				<button
					type="button"
					class="cursor-pointer bg-slate-100 p-5 text-left"
					on:click={() => handleClick(place.id)}
				>
					<h2 class="text-2xl font-black">{place.name}</h2>
					<h3>{place.full_address}</h3>
					<p>Alternative names: {place.alt_names.join(', ') || 'none'}</p>
					<p>Owned and managed by: {place.landlords.join(', ') || 'unknown'}</p>
					<p>Apartments, suites, or units: {place.units.join(', ') || 'none'}</p>
				</button>
			{/each}
			<div class="flex w-full flex-col items-center gap-3 bg-slate-100 px-5 py-10">
				<p class="text-center text-lg">Can't find your rental?</p>
				<button type="button" class="rounded-full bg-blue-700 px-8 py-3 text-white"
					>Add a property</button
				>
			</div>
		</div>
	</div>
	<div class="hidden flex-1 sm:block"></div>
</div>
