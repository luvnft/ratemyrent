<script>
	import Header from '$lib/components/Header.svelte';
</script>

<svelte:head>
	<meta name="theme-color" content="#1a56db" />
</svelte:head>

<Header />

<main class="mx-auto mt-16 max-w-6xl p-8">
	<slot />
</main>
