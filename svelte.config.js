import adapter from '@sveltejs/adapter-static';
import path from 'path';

/** @type {import('@sveltejs/kit').Config} */
const config = {
	compilerOptions: {
		// Force runes mode for the project, except for libraries.
		runes: ({ filename }) => filename.split(/[/\\]/).includes('node_modules') ? undefined : true
	},
	kit: {
		adapter: adapter({
			pages: 'build',
			assets: 'build',
			fallback: undefined,
			precompress: true,
			strict: true
		}),
		prerender: {
			entries: ['*'],
			handleMissingId: 'warn',
			handleHttpError: 'warn'
		},
		alias: {
			'$root': path.resolve('./'),
			'$factory': path.resolve('./factory/src/lib'),
			'$cliente': path.resolve('./cliente')
		}
	}
};

export default config;
