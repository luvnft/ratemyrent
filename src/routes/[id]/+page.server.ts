import type { PageServerLoad } from './$types';
import { SUPABASE_URL, SUPABASE_ANON_KEY } from '$env/static/private';
import { createClient } from '@supabase/supabase-js';
import type { Place } from '$lib/types';
import { error } from '@sveltejs/kit';

export const load = (async ({ params }) => {
	const supabase = createClient(SUPABASE_URL, SUPABASE_ANON_KEY);

	const { data }: { data: Place[] | null } = await supabase
		.from('places')
		.select('*')
		.eq('id', params.id);

	if (!data) {
		throw error(404, {
			message: 'Not found'
		});
	}

	return { place: data![0], SUPABASE_URL, SUPABASE_ANON_KEY };
}) satisfies PageServerLoad;
