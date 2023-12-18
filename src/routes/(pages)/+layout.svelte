<script>
	import '$lib/app.css';
	import { onMount } from 'svelte';
	import { session as sessionStore, user as userStore } from '$lib/store';
	import { supabase } from '$lib/supabase';

	onMount(async () => {
		const { data } = await supabase.auth.refreshSession();

		const { session, user } = data;

		sessionStore.set(session);

		userStore.set(user);
	});
</script>

<slot />
