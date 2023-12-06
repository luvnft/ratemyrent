import { MAPBOX_API_KEY } from '$env/static/private';

export function load() {
	return { accessToken: MAPBOX_API_KEY };
}
