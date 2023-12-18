<script>
	import '$lib/tailwind.css';
	import { supabase } from '$lib/supabase';

	supabase.auth.refreshSession();
</script>

<slot />
