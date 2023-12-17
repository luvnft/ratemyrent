/** @type {import('tailwindcss').Config} */
export default {
	content: [
		'./src/**/*.{html,js,svelte,ts}',
		'./node_modules/flowbite-svelte/**/*.{html,js,svelte,ts}'
	],
	theme: {
		extend: {
			height: {
				screen: ['100vh', '100svh']
			},
			width: {
				screen: ['100vw', '100svw']
			}
		}
	},
	plugins: [require('flowbite/plugin')]
};
