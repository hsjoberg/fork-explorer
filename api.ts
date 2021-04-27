import { Router } from "https://deno.land/x/oak/mod.ts";
import { exec, OutputMode } from "https://deno.land/x/exec/mod.ts";

import { getBlocks } from "./blocks.ts";
import { getblockchaininfo, getblockcount, getblockhash } from "./jsonrpc/index.ts";
import Pageviews from "./pageviews/index.ts";
import config from "./config/config.ts";
import { bytesToHexString } from "./utils.ts";

const router = new Router();

router.use(Pageviews);

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
      return;
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

router.get("/invoice", async (context) => {
  if (!config.donation) {
    context.response.status = 400;
    context.response.body = JSON.stringify({
      status: "ERROR",
      reason: "Donation is not configured",
    });
    return;
  }

  const macaroonHeader = bytesToHexString(await Deno.readFile(config.donation.data.macaroon));
  // -d '{"memo":"Donation"}'
  const command = `curl -X POST --cacert ${config.donation.data.cert} --header "Grpc-Metadata-macaroon: ${macaroonHeader}" ${config.donation.data.server}/v1/invoices`;

  const result = await exec(command, {
    output: OutputMode.Capture,
  });
  context.response.body = JSON.parse(result.output).payment_request;
});

export default router;
