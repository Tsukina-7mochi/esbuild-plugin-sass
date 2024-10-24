import * as path from '@std/path';

import type * as esbuild from 'esbuild';
import * as sass from 'sass';

/** Parse URL string to URL object or returns null. */
const parseUrl = function (url: string): URL | null {
  try {
    return new URL(url);
  } catch {
    return null;
  }
};

/** Options for esbuild-plugin-sass. */
export interface SassPluginOptions {
  /** The loader of compiled CSS source. Default is "css". */
  loader?: esbuild.Loader;
  /** Sass compiler options. Advanced option to override default plugin configraiton. */
  sassOptions?: sass.Options<'async'>;
}

/** A plugin for esbuild to compile Sass/SCSS files. */
export const sassPlugin = (options: SassPluginOptions = {}): esbuild.Plugin => {
  return {
    name: 'esbuild-plugin-sass',
    setup: (build) => {
      const buildOptions = build.initialOptions;
      const sourceMapRequired = buildOptions.sourcemap !== false &&
        buildOptions.sourcemap !== undefined;

      const sassOptions: sass.Options<'async'> = {
        // we do not have to specify 'compressed' style when minification enabled
        // because esbuild will minify the output CSS
        style: 'expanded',
        sourceMap: sourceMapRequired,
        ...(options.sassOptions ?? {}),
      };

      build.onLoad({ filter: /\.s[ac]ss/ }, async (args) => {
        const result = await sass.compileAsync(args.path, sassOptions);
        const watchFiles = result.loadedUrls
          .filter((url) => url.protocol === 'file:')
          .map((url) => path.fromFileUrl(url));

        let content = result.css;

        if (result.sourceMap) {
          // convert file url in sources to file path because esbuild cannot read
          // contents specified with file url.
          result.sourceMap.sources = result.sourceMap.sources.map((file) => {
            return parseUrl(file)?.protocol === 'file:'
              ? path.fromFileUrl(file)
              : file;
          });

          const sourceMapJson = JSON.stringify(result.sourceMap);
          const sourceMapUrl = `data:application/json;base64,${
            btoa(sourceMapJson)
          }`;
          content += `\n/*# sourceMappingURL=${sourceMapUrl} */`;
        }

        return {
          contents: content,
          loader: options.loader ?? 'css',
          watchFiles,
        };
      });
    },
  };
};
