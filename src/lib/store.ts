import { persisted } from 'svelte-persisted-store';

export const region = persisted('region', '');

export const searchQuery = persisted('searchQuery', '');
