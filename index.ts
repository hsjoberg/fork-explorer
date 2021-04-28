import { Application, send } from "https://deno.land/x/oak@v7.3.0/mod.ts";

import config from "./config/config.ts";
import router from "./api/index.ts";
import { bootstrapBlocks } from "./blocks/index.ts";

bootstrapBlocks();

const app = new Application();

app.use(router.routes());

app.use(async (context) => {
  await send(context, context.request.url.pathname, {
    root: `${Deno.cwd()}/frontend/dist`,
    index: "index.html",
  });
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
