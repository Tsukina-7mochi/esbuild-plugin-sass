# esbuild-plugin-sass-deno

A plugin of esbuild to call [Sass](https://sass-lang.com/) compiler when loading Sass files.

## Features

- Compile Sass/SCSS
- Watching files
- Override loaders
- Support source maps

## Usage

```typescript
import * as esbuild from 'npm:esbuild@^0.24.0';
import { sassPlugin } from "jsr:@tsukina-7mochi/esbuild-plugin-sass@^0.2.0";

await esbuild.build({
  entryPoints: ['./style.scss'],
  bundle: true,
  outfile: './style.css',
  plugins: [sassPlugin()],
}),
```

## Runtime Support

| Runtime | Support |
| ------- | ------- |
| Node.js | ✓      |
| Deno    | ✓      |

