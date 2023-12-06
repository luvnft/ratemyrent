<script>
	// @ts-nocheck

	import { goto } from '$app/navigation';
	import { page } from '$app/stores';

	export let accessToken;

	let address = '';
	let suggestions = [];

	const handleInput = async () => {
		if (!address) {
			suggestions = [];
			return;
		}
		const res = await fetch(
			`https://api.mapbox.com/search/searchbox/v1/suggest?q=${address}&language=en&session_token=default_session&access_token=${accessToken}`,
			{
				method: 'GET',
				headers: {
					'Content-Type': 'application/json'
				}
			}
		);
		suggestions = (await res.json()).suggestions || [];
		console.log(suggestions);
	};

	const handleClick = (e) => {
		goto(`${e.currentTarget.getAttribute('data-mapbox-id')}?${$page.url.searchParams.toString()}`);
	};

	export let className = '';
	export let autofocus = false;
</script>

<form on:submit|preventDefault>
	<!-- svelte-ignore a11y-autofocus -->
	<input
		class={`${className} focus:outline-none`}
		type="search"
		name="address"
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
</form>
