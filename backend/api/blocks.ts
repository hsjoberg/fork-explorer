import { RouterMiddleware } from "https://deno.land/x/oak/mod.ts";
import { getBlocks } from "../blocks/index.ts";

export const GetBlocks: RouterMiddleware = (context) => {
  const blocks = getBlocks();
  context.response.body = blocks;
};
