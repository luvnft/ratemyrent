<script>
	import Search from '$lib/components/Search.svelte';
</script>

<header class="fixed top-0 z-50 h-16 w-full bg-blue-700">
	<nav class="mx-auto flex h-full max-w-6xl flex-row items-center gap-5 px-5">
		<div><a class="text-white" href="/">Rate&nbsp;My Rentals</a></div>
		<div>
			<Search
				classes={{
					form: '',
					input:
						'h-10 w-full min-w-[10rem] max-w-[15rem] rounded border border-white bg-transparent px-3 text-white',
					select:
						'hidden h-10 w-40 rounded border border-white bg-transparent px-3 text-white sm:block'
				}}
			/>
		</div>
	</nav>
</header>
