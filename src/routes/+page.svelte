<script lang="ts">
	import Search from '$lib/components/Search.svelte';
	import backgroundImage from '$lib/assets/background-image.jpg';
</script>

<svelte:head>
	<title>Rate My Rentals</title>
	<meta name="theme-color" content="#000000" />
</svelte:head>

<main style={`background-image: url("${backgroundImage}"); background-size: cover;`}>
	<div
		class="flex h-screen flex-col items-center justify-center space-y-5 px-8 text-white backdrop-brightness-50"
	>
		<h1 class="text-center text-5xl font-bold drop-shadow-md">Rate My Rentals</h1>
		<h2 class="text-center text-xl drop-shadow-md">Enter an address to get started!</h2>
		<Search
			classes={{
				form: 'max-w-sm flex-wrap sm:max-w-max',
				select: 'h-14 w-full rounded bg-white px-5 text-black shadow-md sm:w-44',
				input: 'h-14 w-full rounded bg-white px-5 text-black shadow-md sm:w-96'
			}}
			autofocus
		/>
	</div>
</main>
