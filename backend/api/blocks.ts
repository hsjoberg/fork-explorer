import { RouterMiddleware } from "https://deno.land/x/oak@v10.5.1/mod.ts";

import { getBlocks } from "../blocks/index.ts";

export const GetBlocks: RouterMiddleware<any, any, any> = (context) => {
  const blocks = getBlocks();
  context.response.body = blocks;
};
