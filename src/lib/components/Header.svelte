<script lang="ts">
	import Search from '$lib/components/Search.svelte';
	export let accessToken: String;
</script>

<header class="fixed top-0 h-16 w-full bg-blue-700">
	<nav class="mx-5 flex h-full flex-row items-center gap-5">
		<div><a class="text-white" href="/">Rate My Rentals</a></div>
		<div>
			<Search
				{accessToken}
				className="h-10 w-60 rounded border border-white bg-transparent p-3 transition-colors hover:bg-white focus:bg-white"
			/>
		</div>
	</nav>
</header>
