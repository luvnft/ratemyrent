import { MAPBOX_API_KEY } from '$env/static/private';

export async function load({ params }) {
	const res = await fetch(
		`https://api.mapbox.com/search/searchbox/v1/retrieve/${params.id}?session_token=default_session&access_token=${MAPBOX_API_KEY}`
	);
	return { data: res.json(), accessToken: MAPBOX_API_KEY };
}
