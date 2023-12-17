import { SUPABASE_URL, SUPABASE_ANON_KEY } from '$env/static/private';
import { createClient } from '@supabase/supabase-js';
import { error, json } from '@sveltejs/kit';

export async function GET({ url }) {
	const searchParams = url.searchParams;

	const query = searchParams.get('q');
	const filter = searchParams.get('filter');
	const limit = searchParams.get('limit');

	if (query === null || !filter) throw error(400);

	const supabase = createClient(SUPABASE_URL, SUPABASE_ANON_KEY);

	if (limit && !isNaN(parseInt(limit))) {
		const { data } = await supabase
			.from('places')
			.select()
			.ilike('country_code', filter)
			.textSearch('searchable', query ? query.split(' ').join(':* & ') + ':*' : '')
			.limit(parseInt(limit));
		return json(data);
	} else {
		const { data } = await supabase
			.from('places')
			.select()
			.ilike('country_code', filter)
			.textSearch('searchable', query ? query.split(' ').join(':* & ') + ':*' : '');
		return json(data);
	}
}
