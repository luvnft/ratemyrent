<script>
	import '../../app.css';
	import { supabase } from '$lib/supabase';

	supabase.auth.refreshSession();
</script>

<slot />
