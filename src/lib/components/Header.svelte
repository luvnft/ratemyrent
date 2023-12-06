<script lang="ts">
	import Search from '$lib/components/Search.svelte';
	export let accessToken: string;
</script>

<header class="fixed top-0 h-16 w-full bg-blue-700">
	<nav class="mx-5 flex h-full flex-row items-center gap-5">
		<div><a class="text-white" href="/">Rate My Rentals</a></div>
		<div>
			<Search {accessToken} />
		</div>
	</nav>
</header>
