<script lang="ts">
	import { goto } from '$app/navigation';
	import { onMount } from 'svelte';
	import { region } from '$lib/store';
	import { Loader } from '@googlemaps/js-api-loader';

	export let apiKey: string;

	let address = '';
	let countries: { code: string; name: string }[] = [];
	let input: HTMLInputElement;

	onMount(async () => {
		const res = await fetch('https://restcountries.com/v3.1/all');
		const data = await res.json();
		countries = data
			.map((obj: any) => {
				return { code: obj.cca2, name: obj.name.common };
			})
			.sort((a: any, b: any) => {
				return a.name.localeCompare(b.name);
			});
		const loader = new Loader({
			apiKey: apiKey,
			version: 'weekly',
			libraries: ['places']
		});
		const places = await loader.importLibrary('places');
		const autocomplete = new places.Autocomplete(input, {
			types: ['establishment'],
			fields: ['place_id'],
			componentRestrictions: { country: $region.toLowerCase() }
		});
		autocomplete.addListener('place_changed', () => {
			goto(autocomplete.getPlace().place_id);
		});
	});

	export let formClass = '';
	export let selectClass =
		'h-10 w-40 hidden sm:block rounded border border-white bg-transparent px-2 text-white';
	export let inputClass = 'h-10 w-60 rounded border border-white bg-transparent px-3';
	export let autofocus = false;
</script>

<form class={`${formClass} group flex justify-center gap-1`} on:submit|preventDefault>
	<select
		class={`${selectClass} flex-auto transition-colors focus:outline-none group-hover:bg-white group-hover:text-black [&:has(+_div_>_input:focus)]:bg-white [&:has(+_div_>_input:focus)]:text-black`}
		bind:value={$region}
	>
		<option value="">Worldwide</option>
		<option value="US">United States</option>
		<option value="GB">United Kingdom</option>
		<option value="CA">Canada</option>
		<option value="AU">Australia</option>
		<option value="SG">Singapore</option>
		<option value="NZ">New Zealand</option>
		<option value="IE">Ireland</option>
		<option value="divider" disabled>-----------</option>
		{#each countries as country}
			<option value={country.code}>{country.name}</option>
		{/each}
	</select>
	<div class="flex-auto group-hover:[&>input]:bg-white group-hover:[&>input]:text-black">
		<!-- svelte-ignore a11y-autofocus -->
		<input
			class={`${inputClass} text-white transition-colors focus:bg-white focus:text-black focus:outline-none`}
			type="search"
			autocomplete="street-address"
			placeholder="Enter an address"
			bind:value={address}
			bind:this={input}
			{autofocus}
		/>
	</div>
</form>
