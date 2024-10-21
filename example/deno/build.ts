import * as esbuild from 'esbuild';
import sassPlugin from '../../mod.ts';

await Promise.all([
  esbuild.build({
    entryPoints: ['./style.scss'],
    bundle: true,
    outfile: './style.css',
    plugins: [sassPlugin()],
  }),
  esbuild.build({
    entryPoints: ['./style.scss'],
    bundle: true,
    outfile: './style.min.css',
    plugins: [sassPlugin()],
    minify: true,
  }),
]);
