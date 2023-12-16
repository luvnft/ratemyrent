<script lang="ts">
	import Search from '$lib/components/Search.svelte';
	import backgroundImage from '$lib/assets/background-image.jpg';

	export let data;
</script>

<svelte:head>
	<title>Rate My Rentals</title>
	<meta name="theme-color" content="#000000" />
</svelte:head>

<main>
	<div class="mx-8 flex h-screen flex-col items-center justify-center space-y-5 text-white">
		<img
			class="absolute -z-50 h-full w-full object-cover brightness-50"
			src={backgroundImage}
			alt="Background"
		/>
		<h1 class="text-center text-5xl font-bold drop-shadow-md">Rate My Rentals</h1>
		<h2 class="text-center text-xl drop-shadow-md">Enter an address to get started!</h2>
		<Search
			formClass="max-w-sm sm:max-w-max flex-wrap"
			selectClass="h-14 w-full sm:w-44 rounded shadow-md px-5 bg-white text-black"
			inputClass="h-14 w-full sm:w-96 rounded shadow-md px-5 bg-white text-black"
			apiUrl={data.SUPABASE_URL}
			apiKey={data.SUPABASE_ANON_KEY}
			filter={data.filter || undefined}
			autofocus
		/>
	</div>
</main>
