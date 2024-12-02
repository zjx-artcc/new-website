import { sentrySvelteKit } from '@sentry/sveltekit';
import { sveltekit } from '@sveltejs/kit/vite';
import { defineConfig } from 'vite';

export default defineConfig({
	plugins: [sentrySvelteKit(), sveltekit()],
	define: {
		global: {}
	},
	resolve: {
		alias: { '.prisma/client/index-browser': './node_modules/@prisma/client/index-browser.js' }
	}
});
