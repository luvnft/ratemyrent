<script lang="ts">
	import SignLog from '$lib/components/SignLog.svelte';
	import Search from '$lib/components/Search.svelte';
	import Hamburger from '$lib/img/Hamburger.svelte';
	import SearchIcon from '$lib/img/SearchIcon.svelte';
	import { page } from '$app/stores';

	let burgerClicked = false;
	let searchClicked = false;

	const closeBurger = () => (burgerClicked = false);
	const closeSearch = () => (searchClicked = false);

	$: if ($page.url) searchClicked = false;

	$: if (burgerClicked) closeSearch();

	$: if (searchClicked) closeBurger();
</script>

<header class="fixed top-0 z-50 h-16 w-full bg-blue-700 text-white">
	<nav class="mx-auto flex h-full max-w-6xl items-center justify-between bg-blue-700 px-8">
		<div class="flex flex-row items-center gap-5">
			<a class="whitespace-nowrap font-semibold" href="/">Rate My Rentals</a>
			<Search
				classes={{
					form: 'group hidden gap-1 sm:flex',
					input:
						'h-10 w-52 rounded border border-white bg-transparent px-3 text-white transition-colors focus:border-white focus:bg-white focus:text-black group-hover:bg-white group-hover:text-black',
					select:
						'h-10 w-40 rounded border border-white bg-transparent px-3 text-white transition-colors focus:border-white focus:outline-none group-hover:bg-white group-hover:text-black [&:has(+_div_>_input:focus)]:bg-white [&:has(+_div_>_input:focus)]:text-black'
				}}
				type="nav"
			/>
		</div>
		<div class="flex flex-row">
			<button
				class="flex h-10 w-10 items-center justify-center sm:hidden"
				type="button"
				on:click={() => (searchClicked = !searchClicked)}
			>
				<SearchIcon className="h-5 w-5" />
			</button>
			<button
				class="flex h-10 w-10 items-center justify-center md:hidden"
				type="button"
				on:click={() => (burgerClicked = !burgerClicked)}
			>
				<Hamburger className="h-5 w-5" />
			</button>
			<div
				class={`${
					burgerClicked ? '-translate-y-0' : '-translate-y-32'
				} absolute right-8 top-16 -z-10 flex w-36 flex-col gap-5 overflow-hidden rounded-b bg-blue-600 p-5 transition-all duration-500 md:hidden`}
			>
				<SignLog />
			</div>
			<div
				class={`${
					searchClicked ? '-translate-y-0' : '-translate-y-32'
				} absolute right-8 top-16 -z-10 flex w-[calc(100%_-_4rem)] justify-center gap-5 rounded-b bg-blue-600 p-4 transition-all duration-500 sm:hidden`}
			>
				<Search
					classes={{
						form: 'w-full flex-col justify-center',
						input: 'h-10 w-full',
						select: 'h-10 w-full'
					}}
				/>
			</div>
		</div>
		<div class="hidden flex-row gap-5 md:flex">
			<SignLog />
		</div>
	</nav>
</header>
