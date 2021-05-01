import { Application } from "https://deno.land/x/oak@v7.3.0/mod.ts";

import config from "./config/config.ts";
import router from "./api/index.ts";
import { homeTXT } from "./txt/index.ts";
import { bootstrapBlocks } from "./blocks/index.ts";
import pageviews from "./pageviews/index.ts";

bootstrapBlocks();

const app = new Application();

app.use(router.routes());

app.use(async (context) => {
  const accepts = context.request.accepts();

  if ([".js", ".css", ".json", ".ico"].some((extension) => context.request.url.pathname.endsWith(extension))) {
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
