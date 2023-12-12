import { API_KEY } from '$env/static/private';

export function load() {
	return { apiKey: API_KEY };
}
