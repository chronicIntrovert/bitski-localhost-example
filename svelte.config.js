import { NodeGlobalsPolyfillPlugin } from '@esbuild-plugins/node-globals-polyfill';
import { NodeModulesPolyfillPlugin } from '@esbuild-plugins/node-modules-polyfill';
import adapter from '@sveltejs/adapter-auto';

const esbuildOptions = {
	// Node.js global to browser globalThis
	define: {
		global: 'globalThis',
	},
	// Enable esbuild polyfill plugins
	plugins: [
		NodeGlobalsPolyfillPlugin({
			process: true,
			buffer: true,
		}),
		NodeModulesPolyfillPlugin(),
	],
};

/** @type {import('@sveltejs/kit').Config} */
const config = {
	kit: {
		adapter: adapter({ esbuild: esbuildOptions }),
		vite: {
			resolve: {
				alias: {
					process: 'process/browser',
					stream: 'stream-browserify',
					zlib: 'browserify-zlib',
					util: 'util',
				},
			},
			optimizeDeps: {
				esbuildOptions,
			},
		}
	}
};

export default config;
