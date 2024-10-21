import esbuild from "esbuild";
import sassPlugin from "@tsukina-7mochi/esbuild-plugin-sass";

(async () => {
  await esbuild.build({
    entryPoints: ["./style.scss"],
    bundle: true,
    outfile: "./style.css",
    plugins: [sassPlugin()],
  });
  await esbuild.build({
    entryPoints: ["./style.scss"],
    bundle: true,
    outfile: "./style.min.css",
    plugins: [sassPlugin()],
    minify: true,
  });
})();
