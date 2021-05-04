import { RouterMiddleware } from "https://deno.land/x/oak/mod.ts";
import { exec, OutputMode } from "https://deno.land/x/exec/mod.ts";
import { ensureFile } from "https://deno.land/std/fs/mod.ts";
import { sha256 } from "https://denopkg.com/chiefbiiko/sha256/mod.ts";

import config from "../../config/config.ts";
import { bytesToHexString } from "../../common/utils.ts";

await ensureFile("./addinvoice_payload.json");

const responseMetadata = JSON.stringify([["text/plain", "Donation to taproot.watch"]]);

export const LnurlPayRequest: RouterMiddleware = (context) => {
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
    maxSendable: 10000000,
    minSendable: 1000,
    metadata: responseMetadata,
    // commentAllowed: 200,
  });
};

export const LnurlPayRequestCallback: RouterMiddleware = async (context) => {
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
      value_msat: amount,
      memo: "Donation to taproot.watch",
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
};
