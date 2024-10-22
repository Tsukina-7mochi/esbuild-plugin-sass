import { serveDir } from "jsr:@std/http/file-server";

Deno.serve(async (req: Request) => {
  const url = new URL(req.url);

  if (url.pathname === "/") {
    const files = [...Deno.readDirSync("./src")]
      .filter((entry) => entry.isFile && entry.name.endsWith(".html"))
      .map((entry) => entry.name);
    const links = files.map((file) => `<a href="/src/${file}">${file}</a>`);
    const listItems = links.map((link) => `<li>${link}</li>`);

    const content = `
<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="UTF-8">
    <title>HTML files</title>
  </head>
  <body>
    <h1>HTML files</h1>
    <ul>
      ${listItems.join("")}
    </ul>
  </body>
</html>`;

    return new Response(content, {
      headers: {
        "Content-Type": "text/html",
      },
    });
  }

  return serveDir(req);
});
