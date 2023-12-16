import type { Place } from '$lib/types';
import { redirect } from '@sveltejs/kit';
import { set_full_address } from '$lib/utils.js';

export async function load({ url, fetch }) {
	const searchParams = url.searchParams;

	const query = searchParams.get('q')?.trim();
	const filter = searchParams.get('filter');

	if (query === undefined) throw redirect(302, '/');

	const res = await fetch(encodeURI(`/api/search?q=${query}&filter=${filter}`));
	const data: Place[] = (await res.json()) || [];

	data.forEach(set_full_address);

	return { places: data, query };
}
