import { SUPABASE_URL, SUPABASE_ANON_KEY } from '$env/static/private';
import { createClient } from '@supabase/supabase-js';
import { error } from '@sveltejs/kit';

export async function GET() {
	const supabase = createClient(SUPABASE_URL, SUPABASE_ANON_KEY);

	const { data } = await supabase.from('places').select('id');

	if (!data) throw error(500);

	let urls = '';

	data.forEach(({ id }) => {
		urls += `<url><loc>https://www.ratemyrentals.org/${id}</loc></url>`;
	});

	return new Response(
		`
		<?xml version="1.0" encoding="UTF-8" ?>
		<urlset
			xmlns="https://www.sitemaps.org/schemas/sitemap/0.9"
			xmlns:xhtml="https://www.w3.org/1999/xhtml"
		>
			${urls}
		</urlset>`.trim(),
		{ headers: { 'Content-Type': 'application/xml' } }
	);
}
