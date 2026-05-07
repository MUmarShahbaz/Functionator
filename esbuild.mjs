import * as esbuild from 'esbuild';
import pkg from './package.json' with { type: 'json' };

const banner = `/*!
 * ${pkg.name} v${pkg.version}
 * ${pkg.repository.url}
 *
 * Copyright (c) 2026 ${pkg.author}
 * Released under the ${pkg.license} License
 */
`

let minify = (process.argv[2] && process.argv[2] == '--minify');

await esbuild.build({
	entryPoints: ['./src/index.ts'],
    outfile: './dist/functionator.min.js',
	banner: {js: banner},
	bundle: true,
    platform: 'neutral',
    format: 'esm',
    target: 'esnext',
    minify: minify,
	write: true,
    treeShaking: false
});