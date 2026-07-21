import { sveltekit } from '@sveltejs/kit/vite';
import { defineConfig } from 'vite';
import Icons from 'unplugin-icons/vite';
import { fileURLToPath } from 'url';
import { dirname, resolve } from 'path';

const __dirname = dirname(fileURLToPath(import.meta.url));

// Iconos vía npm (@iconify-json/*): mynaui (default), lucide,
// material-symbols. Ver regla de iconos en governance/AGENTS.md.
export default defineConfig({
	plugins: [
		sveltekit(),
		Icons({
			compiler: 'svelte',
			autoInstall: true
		})
	],
	resolve: {
		alias: {
			'$root': resolve(__dirname, './')
		}
	},
	server: {
		fs: {
			allow: ['cliente']
		}
	},
	build: {
		target: 'esnext',
		minify: true,
		cssMinify: true,
		rollupOptions: {
			output: {
				manualChunks: undefined
			},
			treeshake: {
				moduleSideEffects: false,
				propertyReadSideEffects: false
			}
		}
	}
});
