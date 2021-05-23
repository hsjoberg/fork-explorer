import { RouterMiddleware } from "https://deno.land/x/oak@v7.5.0/mod.ts";
import { getBlocks } from "../blocks/index.ts";

export const GetBlocks: RouterMiddleware = (context) => {
  const blocks = getBlocks();
  context.response.body = blocks;
};
