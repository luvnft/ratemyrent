import { SUPABASE_URL, SUPABASE_ANON_KEY } from '$env/static/private';
import { createClient } from '@supabase/supabase-js';
import { json } from '@sveltejs/kit';

export async function GET({ url }) {
	const searchParams = url.searchParams;

	const query = searchParams.get('q') || undefined;
	const filter = searchParams.get('filter') || '%';

	const supabase = createClient(SUPABASE_URL, SUPABASE_ANON_KEY);

	const { data } = await supabase
		.from('places')
		.select()
		.ilike('country_code', filter)
		.textSearch('searchable', query ? query.split(' ').join(':* & ') + ':*' : '');

	return json(data);
}
