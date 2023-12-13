import type { PageServerLoad } from './$types';
import { SUPABASE_URL, SUPABASE_ANON_KEY } from '$env/static/private';

export const load = (async ({ url }) => {
	const searchParams = url.searchParams;

	const cc = searchParams.get('cc');

	return { cc, SUPABASE_URL, SUPABASE_ANON_KEY };
}) satisfies PageServerLoad;
