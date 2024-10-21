import * as path from '@std/path';

import type * as esbuild from 'esbuild';
import * as sass from 'sass';

interface SassPluginOptions {
  /** The loader of compiled CSS source. Default is "css". */
  loader?: esbuild.Loader;
  /** Sass compiler options. Advanced option to override default plugin configuraiton. */
  sassOptions?: sass.Options<'async'>;
}

const sassPlugin = (options: SassPluginOptions = {}): esbuild.Plugin => {
  return {
    name: 'esbuild-plugin-sass',
    setup: (build) => {
      const buildOptions = build.initialOptions;
      const sassOptions = {
        style: buildOptions.minify
          ? 'compressed' as const
          : 'expanded' as const,
        sourceMap: buildOptions.sourcemap !== false &&
          buildOptions.sourcemap !== undefined,
        ...(options.sassOptions ?? {}),
      };

      build.onLoad({ filter: /\.s[ac]ss/ }, async (args) => {
        const result = await sass.compileAsync(args.path, sassOptions);
        const watchFiles = result.loadedUrls
          .filter((url) => url.protocol === 'file:')
          .map((url) => path.fromFileUrl(url));
        // TODO: support source maps

        return {
          contents: result.css,
          loader: options.loader ?? 'css',
          watchFiles,
        };
      });
    },
  };
};

export default sassPlugin;
