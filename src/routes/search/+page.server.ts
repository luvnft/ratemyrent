import type { PageServerLoad } from './$types';
import { SUPABASE_URL, SUPABASE_ANON_KEY } from '$env/static/private';
import { createClient } from '@supabase/supabase-js';
import type { Place } from '$lib/types';
import { redirect } from '@sveltejs/kit';

export const load = (async ({ url }) => {
	const supabase = createClient(SUPABASE_URL, SUPABASE_ANON_KEY);
	const searchParams = url.searchParams;

	if (!searchParams.has('q') || !searchParams.has('cc')) {
		throw redirect(302, '/');
	}

	const query = searchParams.get('q')!;
	const cc = searchParams.get('cc')!;

	if (!query) throw redirect(302, '/');

	const { data }: { data: Place[] | null } = await supabase
		.from('places')
		.select('*')
		.like('country_code', cc || '%')
		.textSearch('searchable', query ? query.split(' ').join(':* & ') + ':*' : '');

	return { places: data || [], cc, query, SUPABASE_URL, SUPABASE_ANON_KEY };
}) satisfies PageServerLoad;
