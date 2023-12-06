<script lang="ts">
	import Search from '$lib/components/Search.svelte';
	import backgroundImage from '$lib/assets/background-image.jpg';

	export let data;
</script>

<svelte:head>
	<title>Rate My Rentals</title>
</svelte:head>

<main>
	<div class="flex h-screen flex-col items-center justify-center space-y-5 text-white">
		<img
			class="absolute -z-50 h-full w-full object-cover brightness-50"
			src={backgroundImage}
			alt="Background"
		/>
		<h1 class="text-5xl font-bold">Rate My Rentals</h1>
		<h3>Enter an address to get started!</h3>
		<Search
			className="h-14 w-96 rounded shadow-md p-5 transition-colors bg-white text-black"
			accessToken={data.accessToken}
			autofocus
		/>
	</div>
</main>
