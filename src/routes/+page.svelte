<script lang="ts">
	let name = '';
</script>

<main class="flex flex-col min-h-screen items-center justify-center space-y-3">
	<div class="text-center">
		<h1>Welcome to SvelteKit</h1>
		<p>Visit <a href="https://kit.svelte.dev">kit.svelte.dev</a> to read the documentation</p>
	</div>
	<div class="text-center">
		<input
			class="border-2 border-blue-500 rounded p-3"
			type="text"
			name="name"
			bind:value={name}
			placeholder="Put your name here!"
		/>
		<p>Hello, {name || 'stranger'}!</p>
	</div>
</main>

<style lang="postcss">
	h1 {
		@apply text-3xl;
	}
	a {
		@apply text-blue-700;
	}
</style>
