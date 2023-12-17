import { SUPABASE_URL, SUPABASE_ANON_KEY } from '$env/static/private';
import { createClient } from '@supabase/supabase-js';
import { error, json } from '@sveltejs/kit';

export async function GET({ url }) {
	const searchParams = url.searchParams;

	const query = searchParams.get('q');
	const filter = searchParams.get('filter');

	if (!query || !filter) throw error(400);

	const supabase = createClient(SUPABASE_URL, SUPABASE_ANON_KEY);

	const { data } = await supabase
		.from('places')
		.select()
		.ilike('country_code', filter)
		.textSearch('searchable', query ? query.split(' ').join(':* & ') + ':*' : '');

	return json(data);
}
