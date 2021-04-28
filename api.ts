import { Router } from "https://deno.land/x/oak/mod.ts";
import { exec, OutputMode } from "https://deno.land/x/exec/mod.ts";
import { ensureFile } from "https://deno.land/std/fs/mod.ts";
import * as base64 from "https://denopkg.com/chiefbiiko/base64/mod.ts";
import { sha256 } from "https://denopkg.com/chiefbiiko/sha256/mod.ts";

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

const responseMetadata = JSON.stringify([["text/plain", "Donation on taproot.watch"]]);
router.get("/invoice", (context) => {
  if (!config.donation) {
    context.response.status = 400;
    context.response.body = JSON.stringify({
      status: "ERROR",
      reason: "Donation is not configured",
    });
    return;
  }

  context.response.body = JSON.stringify({
    tag: "payRequest",
    callback: `${config.donation.lnurlPayUrl}/callback`,
    maxSendable: 100000,
    minSendable: 1000,
    metadata: responseMetadata,
    // commentAllowed: 200,
  });
});

await ensureFile("./addinvoice_payload.json");
router.get("/invoice/callback", async (context) => {
  if (!config.donation) {
    context.response.status = 400;
    context.response.body = JSON.stringify({
      status: "ERROR",
      reason: "Donation is not configured",
    });
    return;
  }

  const amountString = context.request.url.searchParams.get("amount");
  if (amountString === null) {
    context.response.body = JSON.stringify({
      status: "ERROR",
      reason: "Missing amount parameter",
    });
    return;
  }
  const amount = Number.parseInt(amountString);

  await Deno.writeTextFile(
    "./addinvoice_payload.json",
    JSON.stringify({
      memo: "Donation",
      value_msat: amount,
      description_hash: sha256(responseMetadata, "utf8", "base64"),
    })
  );

  const macaroonHeader = bytesToHexString(await Deno.readFile(config.donation.data.macaroon));
  const command = `curl -X POST --cacert ${config.donation.data.cert} --header "Grpc-Metadata-macaroon: ${macaroonHeader}" -d @addinvoice_payload.json ${config.donation.data.server}/v1/invoices`;

  const result = await exec(command, {
    output: OutputMode.Capture,
  });
  const paymentRequest = JSON.parse(result.output).payment_request;
  context.response.body = JSON.stringify({
    pr: paymentRequest,
    successAction: {
      tag: "message",
      message: "Cheers!",
    },
    disposable: true,
  });
});
export default router;
