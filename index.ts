import { Application } from "https://deno.land/x/oak@v7.5.0/mod.ts";

import config from "./config/config.ts";
import router from "./backend/api/index.ts";
import { homeTXT } from "./backend/txt/index.ts";
import { bootstrapBlocks } from "./backend/blocks/index.ts";
import { pageviews, pageviewsTxt } from "./backend/pageviews/index.ts";

bootstrapBlocks();

const app = new Application();

app.use(router.routes());

app.use(async (context) => {
  const accepts = context.request.accepts();

  if (
    [".js", ".css", ".json", ".ico", "png", ".mp4"].some((extension) =>
      context.request.url.pathname.endsWith(extension)
    )
  ) {
    await context.send({
      root: `${Deno.cwd()}/frontend/dist`,
      index: "index.html",
    });
  } else if (
    accepts &&
    ((accepts.length === 1 && accepts[0] === "*/*") ||
      accepts.includes("text/plain") ||
      context.request.url.pathname === "/index.txt")
  ) {
    await pageviewsTxt();
    context.response.body = homeTXT();
  } else {
    await pageviews();
    await context.send({
      root: `${Deno.cwd()}/frontend/dist`,
      path: `index.html`,
    });
  }
});

app.addEventListener("listen", ({ hostname, port, secure }) => {
  const host = hostname ?? "localhost";
  const protocol = secure ? "https://" : "http://";
  console.log(`Listening on: ${protocol}${host}:${port}`);
});

await app.listen({
  hostname: config.server.host,
  port: config.server.port,
});
