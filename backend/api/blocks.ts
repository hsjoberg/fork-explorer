import { RouterMiddleware } from "https://deno.land/x/oak@v7.5.0/mod.ts";
import { exists } from "https://deno.land/std@0.98.0/fs/mod.ts";

import { getBlocks } from "../blocks/index.ts";

export const GetBlocks: RouterMiddleware = (context) => {
  const blocks = getBlocks();
  context.response.body = blocks;
};

export const GetBlocksPeriod: RouterMiddleware = async (context) => {
  try {
    const period = Number.parseInt(context.params.blocks || "");
    if (Number.isNaN(period)) {
      context.response.status = 404;
      context.response.body = "404 File Not Found";
      return;
    }

    const path = Deno.cwd() + `/data/periods/${context.params.blocks}.json`;
    if (!(await exists(path))) {
      context.response.status = 404;
      context.response.body = "404 File Not Found";
      return;
    }

    const decoder = new TextDecoder("utf-8");
    const blocks = await Deno.readFile(path);
    context.response.body = JSON.parse(decoder.decode(blocks));
  } catch (error) {
    console.log(error);
    context.response.status = 500;
    context.response.body = "Unknown error";
  }
};
