<script lang="ts">
	import { goto } from '$app/navigation';
	import { searchFilter, searchQuery } from '$lib/store';
	import type { Place } from '$lib/types';
	import SearchIcon from '$lib/img/SearchIcon.svelte';
	import { supabase } from '$lib/supabase';
	import { page } from '$app/stores';

	let suggestions: Place[] = [];

	export let classes: {
		form: string;
		input: string;
		select: string;
		button?: string;
	};
	export let type = 'primary';
	export let autofocus = false;

	const handleSubmit = () => {
		goto(`/search?q=${$searchQuery}&filter=${$searchFilter}`);
	};
	const handleClick = (autocompleteQuery: string) => {
		searchQuery.set(autocompleteQuery);
		goto(`/search?q=${autocompleteQuery}&filter=${$searchFilter}`);
		suggestions = [];
	};

	const handleInput = async () => {
		const { data } = await supabase
			.from('places')
			.select()
			.ilike('country_code', $searchFilter)
			.textSearch('searchable', $searchQuery ? $searchQuery.split(' ').join(':* & ') + ':*' : '')
			.limit(5);
		suggestions = data || [];
	};

	const handleChange = () => {
		if ($page.url.pathname === '/search') {
			goto(`/search?q=${$searchQuery}&filter=${$searchFilter}`);
		}
	};
</script>

<form class={`${classes.form} flex flex-row items-center`} on:submit|preventDefault={handleSubmit}>
	<select
		class={`${classes.select}`}
		bind:value={$searchFilter}
		on:change={() => {
			handleInput();
			handleChange();
		}}
		name="filter"
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
	<div class="relative flex w-full sm:w-auto">
		<!-- svelte-ignore a11y-autofocus -->
		<input
			class={`${classes.input} peer focus:outline-none`}
			type="search"
			name="search"
			enterkeyhint="search"
			placeholder="Enter an address"
			bind:value={$searchQuery}
			on:input={handleInput}
			{autofocus}
		/>
		{#if type === 'primary'}
			<button type="submit" class={`${classes.button} rounded-br-md sm:rounded-r-md`}>
				<div class="flex items-center justify-center">
					<SearchIcon className="h-2/5 w-2/5" />
				</div>
			</button>
		{/if}
		<div
			class="invisible absolute top-full flex translate-y-1 flex-col overflow-hidden rounded bg-white shadow-lg peer-focus:visible [&:has(>_button:hover)]:visible"
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
