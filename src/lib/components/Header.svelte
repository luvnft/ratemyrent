<script lang="ts">
	import SignLog from './SignLog.svelte';
	import Search from '$lib/components/Search.svelte';
	import { NavHamburger } from 'flowbite-svelte';
	import { SearchOutline } from 'flowbite-svelte-icons';
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
					form: 'hidden sm:flex',
					input: 'h-10 w-52 rounded border border-white bg-transparent px-3 text-white',
					select: 'h-10 w-40 rounded border border-white bg-transparent px-3 text-white'
				}}
			/>
		</div>
		<div class="flex flex-row">
			<button
				type="button"
				class="focus:outline-none sm:hidden"
				on:click={() => (searchClicked = !searchClicked)}
			>
				<SearchOutline class="h-5 w-5 focus:outline-none" />
			</button>
			<NavHamburger
				class="hover:bg-transparent"
				menuClass="focus:outline-none"
				onClick={() => (burgerClicked = !burgerClicked)}
			/>
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
						input: 'h-10 w-full rounded border border-white bg-transparent px-3 text-white',
						select: 'h-10 w-full rounded border border-white bg-transparent px-3 text-white'
					}}
				/>
			</div>
		</div>
		<div class="hidden flex-row gap-5 md:flex">
			<SignLog />
		</div>
	</nav>
</header>
