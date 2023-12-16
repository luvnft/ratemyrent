<script lang="ts">
	import { goto } from '$app/navigation';
	import { page } from '$app/stores';
	import { searchFilter, searchQuery } from '$lib/store';
	import type { Place } from '$lib/types';

	export let filter = $searchFilter;
	export let query = $searchQuery;
	let suggestions: Place[] = [];

	export let classes: {
		form: string;
		input: string;
		select: string;
	};
	export let autofocus = false;

	const handleSubmit = () => {
		searchQuery.set(query);
		searchFilter.set(filter);
		goto(`/search?q=${query}&filter=${filter}`);
	};
	const handleClick = (autocompleteQuery: string) => {
		searchQuery.set(autocompleteQuery);
		searchFilter.set(filter);
		goto(`/search?q=${autocompleteQuery}&filter=${filter}`);
		suggestions = [];
	};

	const handleInput = async () => {
		const res = await fetch(
			encodeURI(`${$page.url.origin}/api/search?q=${query}&filter=${filter}`)
		);
		const data: Place[] = (await res.json()) || [];
		suggestions = data.slice(0, 5);
	};

	const handleChange = () => {
		if ($page.url.pathname === '/search') {
			searchFilter.set(filter);
			goto(`/search?q=${query}&filter=${filter}`);
		}
	};
</script>

<form
	class={`${classes.form} group flex flex-row items-center gap-1`}
	on:submit|preventDefault={handleSubmit}
>
	<select
		class={`${classes.select} transition-colors focus:outline-none group-hover:bg-white group-hover:text-black [&:has(+_div_>_input:focus)]:bg-white [&:has(+_div_>_input:focus)]:text-black`}
		bind:value={filter}
		on:change={() => {
			handleInput();
			handleChange();
		}}
	>
		<optgroup label="Select a Region">
			<option value="%">Worldwide</option>
			<option value="US">United States</option>
			<option value="GB">United Kingdom</option>
			<option value="CA">Canada</option>
			<option value="AU">Australia</option>
			<option value="SG">Singapore</option>
			<option value="NZ">New Zealand</option>
			<option value="IE">Ireland</option>
			<option value="divider" disabled>-----------</option>
			<option value="AR">Argentina</option>
			<option value="AU">Australia</option>
			<option value="AT">Austria</option>
			<option value="BE">Belgium</option>
			<option value="BR">Brazil</option>
			<option value="CA">Canada</option>
			<option value="CL">Chile</option>
			<option value="CO">Colombia</option>
			<option value="HR">Croatia</option>
			<option value="CZ">Czechia</option>
			<option value="DK">Denmark</option>
			<option value="EE">Estonia</option>
			<option value="FI">Finland</option>
			<option value="FR">France</option>
			<option value="DE">Germany</option>
			<option value="HU">Hungary</option>
			<option value="IE">Ireland</option>
			<option value="IT">Italy</option>
			<option value="LV">Latvia</option>
			<option value="LT">Lithuania</option>
			<option value="LU">Luxembourg</option>
			<option value="MY">Malaysia</option>
			<option value="MX">Mexico</option>
			<option value="NL">Netherlands</option>
			<option value="NO">Norway</option>
			<option value="NZ">New Zealand</option>
			<option value="PL">Poland</option>
			<option value="PT">Portugal</option>
			<option value="PR">Puerto Rico</option>
			<option value="SG">Singapore</option>
			<option value="SK">Slovakia</option>
			<option value="SI">Slovenia</option>
			<option value="ES">Spain</option>
			<option value="SE">Sweden</option>
			<option value="CH">Switzerland</option>
			<option value="GB">United Kingdom</option>
			<option value="US">United States</option>
		</optgroup>
	</select>
	<div class="flex-1 group-hover:[&>input]:bg-white group-hover:[&>input]:text-black">
		<!-- svelte-ignore a11y-autofocus -->
		<input
			class={`${classes.input} peer transition-colors focus:bg-white focus:text-black focus:outline-none`}
			type="search"
			enterkeyhint="search"
			placeholder="Enter an address"
			bind:value={query}
			on:input={handleInput}
			{autofocus}
		/>
		<div
			class="invisible absolute flex translate-y-1 flex-col overflow-hidden rounded bg-white shadow-lg peer-focus:visible [&:has(>_button:hover)]:visible"
		>
			{#each suggestions as suggestion}
				<button
					type="button"
					class="p-3 text-left text-black hover:bg-slate-200"
					on:click={() => handleClick(suggestion.street_address)}
				>
					<p>{suggestion.name}</p>
					<p class="text-xs text-slate-400">
						{suggestion.street_address},
						{suggestion.locality},
						{suggestion.administrative_area},
						{suggestion.country_code}
					</p>
				</button>
			{/each}
		</div>
	</div>
</form>
