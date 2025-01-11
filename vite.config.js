import { sentrySvelteKit } from '@sentry/sveltekit';
import { sentryVitePlugin } from '@sentry/vite-plugin';
import { sveltekit } from '@sveltejs/kit/vite';
import { defineConfig } from 'vite';

export default defineConfig({
	build: {
		sourcemap: true,
	},
	plugins: [sentrySvelteKit(), sveltekit(), sentryVitePlugin({
		authToken: process.env.SENTRY_AUTH_TOKEN,
		org: process.env.SENTRY_ORG,
		project: process.env.SENTRY_PROJECT,
	})],
	define: {
		global: {}
	},
	resolve: {
		alias: { '.prisma/client/index-browser': './node_modules/@prisma/client/index-browser.js' }
	},
	server: {
		fs: {
			allow: ['..']
		}
	}
});
