import { SUPABASE_URL, SUPABASE_ANON_KEY } from '$env/static/private';
import { createClient } from '@supabase/supabase-js';
import type { Place } from '$lib/types';
import { error } from '@sveltejs/kit';
import { set_full_address } from '$lib/utils.js';

export async function load({ params }) {
	const supabase = createClient(SUPABASE_URL, SUPABASE_ANON_KEY);

	const { data }: { data: Place[] | null } = await supabase
		.from('places')
		.select()
		.eq('id', params.id);

	if (!data) {
		throw error(404);
	}

	data.forEach(set_full_address);

	return { place: data[0] };
}
