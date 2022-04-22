import { RouterMiddleware } from "https://deno.land/x/oak@v10.5.1/mod.ts";

import { getblockhash } from "../jsonrpc/index.ts";
import { getblockchaininfo, getblockcount } from "../jsonrpc/index.ts";

export const GetBlockchainInfo: RouterMiddleware<any, any, any> = async (context) => {
  const info = await getblockchaininfo();
  console.log(info);
  context.response.body = info;
};

export const GetBlockHash: RouterMiddleware<any, { height: string }> = async (context) => {
  if (!context.params || !context.params.height) {
    context.response.status = 400;
    context.response.body = JSON.stringify({
      status: "ERROR",
      reason: "Missing param height",
    });
    return;
  }
  const blockhash = await getblockhash(Number.parseInt(context.params.height));
  context.response.body = blockhash;
};

export const GetBlockCount: RouterMiddleware<any, any, any> = async (context) => {
  const blockCount = await getblockcount();
  context.response.body = blockCount;
};
