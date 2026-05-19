import { sveltekit } from '@sveltejs/kit/vite';
import { defineConfig } from 'vite';
import Icons from 'unplugin-icons/vite';
import { FileSystemIconLoader } from 'unplugin-icons/loaders';
import { fileURLToPath } from 'url';
import { dirname, resolve } from 'path';

import { promises as fs } from 'fs';

const __dirname = dirname(fileURLToPath(import.meta.url));

const loadIcon = (weight: string) => {
	const suffix = weight === 'regular' ? '' : `-${weight}`;
	const dirPath = resolve(__dirname, `./factory/assets/icons/${weight}`);
	return async (name: string) => {
		try {
			const filePath = resolve(dirPath, `${name}${suffix}.svg`);
			const svg = await fs.readFile(filePath, 'utf-8');
			return svg.replace(/^<svg /, '<svg fill="currentColor" ');
		} catch (err) {
			return undefined;
		}
	};
};

export default defineConfig({
	plugins: [
		sveltekit(),
		Icons({
			compiler: 'svelte',
			autoInstall: true,
			customCollections: {
				'ph': loadIcon('regular'),
				'ph-bold': loadIcon('bold'),
				'ph-duotone': loadIcon('duotone'),
				'ph-fill': loadIcon('fill'),
				'ph-light': loadIcon('light'),
				'ph-thin': loadIcon('thin')
			}
		})
	],
	resolve: {
		alias: {
			'$root': resolve(__dirname, './')
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
