<script lang="ts">
	import { FloatingLabelInput } from 'flowbite-svelte';

	let dialog: HTMLDialogElement;

	enum State {
		Closed = 0,
		Signup = 'Sign Up',
		Login = 'Log In'
	}

	let state = State.Closed;

	$: if (dialog) {
		if (state) dialog.showModal();
		else dialog.close();
	}
</script>

<button class="whitespace-nowrap text-left" type="button" on:click={() => (state = State.Signup)}>
	Sign Up
</button>
<button class="whitespace-nowrap text-left" type="button" on:click={() => (state = State.Login)}>
	Log In
</button>
<dialog class="w-full max-w-sm rounded-lg bg-white p-10" bind:this={dialog}>
	<button
	  type="button"
		class="absolute right-5 top-5 leading-none"
		on:click={() => (state = State.Closed)}
	>
		&cross;
	</button>
	<form class="flex w-full flex-col gap-3" on:submit|preventDefault>
		<p class="text-xl">{state}</p>
		<FloatingLabelInput style="outlined" name="email" type="email" autocomplete="email">
			Email
		</FloatingLabelInput>
		<FloatingLabelInput
			style="outlined"
			name="password"
			type="password"
			autocomplete="current-password"
		>
			Password
		</FloatingLabelInput>
		{#if state == State.Signup}
			<FloatingLabelInput style="outlined" name="confirm-password" type="password">
				Confirm Password
			</FloatingLabelInput>
		{/if}
		<button class="rounded-lg bg-blue-600 py-3 text-white" type="submit">{state}</button>
		{#if state == State.Signup}
			<p>Already have an account? <button type="button" class="text-blue-600" on:click={() => state = State.Login}>{State.Login}</button></p>
		{:else}
			<p>Don't have an account? <button type="button" class="text-blue-600" on:click={() => state = State.Signup}>{State.Signup}</button></p>
		{/if}
	</form>
</dialog>
