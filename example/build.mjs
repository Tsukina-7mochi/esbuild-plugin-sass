import esbuild from "esbuild";
import sassPlugin from "@tsukina-7mochi/esbuild-plugin-sass";

// import sassPlugin from "../mod.ts";

(async () => {
  await Promise.all([
    esbuild.build({
      entryPoints: ["./src/style.scss"],
      outfile: "./dist/style.css",
      bundle: true,
      plugins: [sassPlugin()],
    }),
    esbuild.build({
      entryPoints: ["./src/style.scss"],
      outfile: "./dist/style.min.css",
      bundle: true,
      plugins: [sassPlugin()],
      minify: true,
    }),
    esbuild.build({
      entryPoints: ["./src/style.scss"],
      outfile: "./dist/style-linked.min.css",
      bundle: true,
      plugins: [sassPlugin()],
      sourcemap: "linked",
      minify: true,
    }),
    esbuild.build({
      entryPoints: ["./src/style.scss"],
      outfile: "./dist/style-inline.min.css",
      bundle: true,
      plugins: [sassPlugin()],
      sourcemap: "inline",
      minify: true,
    }),
  ]);
})();
