import { Application } from "https://deno.land/x/oak@v10.5.1/mod.ts";

import config from "./src/config/config.ts";
import router from "./backend/api/index.ts";
import { homeTXT } from "./backend/txt/index.ts";
import { bootstrapBlocks } from "./backend/blocks/index.ts";
import { pageviews, pageviewsTxt } from "./backend/pageviews/index.ts";

import { ultraHandler } from "https://deno.land/x/ultra@v1.0.1/src/oak/handler.ts";

bootstrapBlocks();

const app = new Application();

app.use(router.routes());

app.use(async (context, next) => {
  const accepts = context.request.accepts();

  if (
    accepts &&
    ((accepts.length === 1 &&
      accepts[0] === "*/*" &&
      /* ultra hack: */ !context.request.url.pathname.toLowerCase().endsWith(".js")) ||
      accepts.includes("text/plain") ||
      context.request.url.pathname === "/index.txt")
  ) {
    await pageviewsTxt();
    context.response.body = homeTXT();
  } else {
    await next();
  }
});

app.use(async (context) => {
  if (
    ![".js", ".css", ".json", ".ico", "png", ".mp4"].some((extension) =>
      context.request.url.pathname.endsWith(extension)
    )
  ) {
    await pageviews();
  }
  return ultraHandler(context);
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
