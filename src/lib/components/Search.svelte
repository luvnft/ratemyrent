<script lang="ts">
	import { goto } from '$app/navigation';
	import { page } from '$app/stores';
	import { onMount } from 'svelte';
	import { region } from '$lib/store';

	export let accessToken: string;

	let address = '';
	let suggestions: any[] = [];
	let countries: { code: string; name: string }[] = [];

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
	});

	const handleInput = async () => {
		if (!address) {
			suggestions = [];
			return;
		}
		const res = await fetch(
			`https://api.mapbox.com/search/searchbox/v1/suggest?q=${address}&language=en${
				$region ? `&country=${$region}` : ''
			}&session_token=default_session&access_token=${accessToken}`
		);
		suggestions = (await res.json()).suggestions || [];
		console.log(suggestions);
	};

	const handleClick = (e: MouseEvent) => {
		goto(
			`${(e.currentTarget as HTMLElement).getAttribute(
				'data-mapbox-id'
			)}?${$page.url.searchParams.toString()}`
		);
	};

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
	<div class="flex-auto group-hover:[&>input]:bg-white">
		<!-- svelte-ignore a11y-autofocus -->
		<input
			class={`${inputClass} transition-colors focus:bg-white focus:outline-none`}
			type="search"
			autocomplete="street-address"
			placeholder="Enter an address"
			bind:value={address}
			on:input={handleInput}
			{autofocus}
		/>
		<div class="absolute flex translate-y-1 flex-col overflow-hidden rounded bg-white shadow-lg">
			{#each suggestions as suggestion}
				<button
					class="p-3 text-left text-black hover:bg-slate-200"
					on:click={handleClick}
					data-mapbox-id={suggestion.mapbox_id}
				>
					<p>{suggestion.name}</p>
					{#if suggestion.full_address}
						<p class="text-xs text-slate-400">{suggestion.full_address}</p>
					{/if}
				</button>
			{/each}
		</div>
	</div>
</form>
