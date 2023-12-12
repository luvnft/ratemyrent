import { API_KEY } from '$env/static/private';

export async function load({ params: { id } }) {
	const res = await fetch(
		`https://maps.googleapis.com/maps/api/place/details/json?place_id=${id}&fields=formatted_address,name,type&key=${API_KEY}`
	);
	const place = await res.json();
	console.log(place);
	return { place: place, apiKey: API_KEY };
}
