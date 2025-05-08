import * as assert from '@std/assert';
import * as esbuild from 'esbuild';
import * as fs from '@std/fs';
import * as path from '@std/path';
import { sassPlugin } from './mod.ts';

const testPath = path.resolve('./test');
await fs.ensureDir(testPath);

Deno.test('build', async () => {
  await Deno.writeTextFile(
    path.join(testPath, 'main.js'),
    'import "./style.scss";',
  );
  await Deno.writeTextFile(
    path.join(testPath, 'style.scss'),
    `$color: #000;
     body {
       color: $color;
     }`,
  );

  await esbuild.build({
    entryPoints: [path.join(testPath, 'main.js')],
    bundle: true,
    minify: true,
    outfile: path.join(testPath, './main.build.js'),
    plugins: [sassPlugin({})],
  });

  const mainBuildJs = await Deno.readTextFile(
    path.join(testPath, 'main.build.js'),
  );
  assert.equal(mainBuildJs, '(()=>{})();');

  const mainBuildCss = await Deno.readTextFile(
    path.join(testPath, 'main.build.css'),
  );
  assert.equal(mainBuildCss, 'body{color:#000}');

  await esbuild.stop();
});
