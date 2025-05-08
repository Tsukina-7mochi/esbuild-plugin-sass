# esbuild-plugin-sass-deno

A plugin of esbuild to call [Sass](https://sass-lang.com/) compiler when loading Sass files.

## Features

- Compile Sass/SCSS
- Watching files
- Override loaders
- Support source maps

## Usage

Loaded `.sass` and `.scss` files are loaded with [`css` loader](https://esbuild.github.io/content-types/#css).
So you can bundle Sass files both directly and imported by JavaScript codes.

```typescript
import * as esbuild from "npm:esbuild";
import { sassPlugin } from "jsr:@tsukina-7mochi/esbuild-plugin-sass";

// bundle directly
await esbuild.build({
  entryPoints: ["./style.scss"],
  bundle: true,
  outfile: "./style.css",
  plugins: [sassPlugin()],
});

// bundle CSS imported by JavaScript
// this will output CSS file as main.css
await esbuild.build({
  entryPoints: ["./main.ts"],
  bundle: true,
  outfile: "./main.js",
  plugins: [sassPlugin()],
});
```

for input `main.ts`

```typescript
import "./style.scss";
```

### Injecting styles

You can specify `loader` option to specify what loader is used for compiled CSS contents (default: `css`).
For example, you can specify loader `text` to load it as string to inject stylesheet.

```typescript
await esbuild.build({
  entryPoints: ["./main.ts"],
  bundle: true,
  outfile: "./main.js",
  plugins: [sassPlugin({
    loader: 'text',
  })],
});
```

```typescript
// main.ts
import style from "./style.scss";

const styleElement = document.createElement('style');
styleElement.innerHTML = style;

document.body.appendChild(style);
```

## Runtime Support

| Runtime | Support |
| ------- | ------- |
| Node.js | ✓      |
| Deno    | ✓      |

