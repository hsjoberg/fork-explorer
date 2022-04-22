import { Router } from "https://deno.land/x/oak@v10.5.1/mod.ts";

import { GetBlocks } from "./blocks.ts";
import { GetPeriod } from "./period.ts";
import { LnurlPayRequest, LnurlPayRequestCallback } from "./donate.ts";
import { GetBlockchainInfo, GetBlockCount, GetBlockHash } from "./misc.ts";
import { GetPeriods } from "./periods.ts";

const router = new Router();

router.get("/blocks", GetBlocks);

router.get("/periods", GetPeriods);

router.get("/period/:period", GetPeriod);

router.get("/invoice", LnurlPayRequest);

router.get("/invoice/callback", LnurlPayRequestCallback);

router.get("/getblockchaininfo", GetBlockchainInfo);

router.get<any, { height: string }>("/getblockhash/:height", GetBlockHash);

router.get("/getblockcount", GetBlockCount);

export default router;
