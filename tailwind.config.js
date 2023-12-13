/** @type {import('tailwindcss').Config} */
export default {
	content: ['./src/**/*.{html,js,svelte,ts}'],
	theme: {
		extend: {
			height: {
				screen: ['100vh', '100dvh']
			},
			width: {
				screen: ['100vw', '100dvw']
			}
		}
	},
	plugins: []
};
