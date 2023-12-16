<script>
	import Header from '$lib/components/Header.svelte';
	import Search from '$lib/components/Search.svelte';
</script>

<svelte:head>
	<meta name="theme-color" content="#1d4ed8" />
</svelte:head>

<Header>
	<Search
		classes={{
			form: '',
			input:
				'h-10 w-full min-w-[10rem] max-w-[15rem] rounded border border-white bg-transparent px-3 text-white',
			select: 'hidden h-10 w-40 rounded border border-white bg-transparent px-3 text-white sm:block'
		}}
	/>
</Header>

<slot />
