<script>
	import Header from '$lib/components/Header.svelte';
	import Search from '$lib/components/Search.svelte';
</script>

<svelte:head>
	<meta name="theme-color" content="#1d4ed8" />
</svelte:head>

<Header />

<main class="mt-16 p-10">
	<slot />
</main>
