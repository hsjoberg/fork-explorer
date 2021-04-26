import { Router } from "https://deno.land/x/oak/mod.ts";

import { getBlocks } from "./blocks.ts";
import { getblockchaininfo, getblockcount, getblockhash } from "./jsonrpc/index.ts";

const router = new Router();
router
  .get("/getblockchaininfo", async (context) => {
    const info = await getblockchaininfo();
    console.log(info);
    context.response.body = info;
  })
  .get<{
    height: string;
  }>("/getblockhash/:height", async (context) => {
    if (!context.params || !context.params.height) {
      context.response.status = 400;
      context.response.body = JSON.stringify({
        status: "ERROR",
        reason: "Missing param height",
      });
    }
    const blockhash = await getblockhash(Number.parseInt(context.params.height));
    context.response.body = blockhash;
  })
  .get("/getblockcount", async (context) => {
    const blockCount = await getblockcount();
    context.response.body = blockCount;
  });

router.get("/blocks", (context) => {
  const blocks = getBlocks();
  context.response.body = blocks;
});

export default router;
