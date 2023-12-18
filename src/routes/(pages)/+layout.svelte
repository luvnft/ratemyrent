<script>
	import '$lib/tailwind.css';
	import { onMount } from 'svelte';
	import { supabase } from '$lib/supabase';

	onMount(async () => await supabase.auth.refreshSession());
</script>

<slot />
