 { Router }  "https://deno.land/x/oak@v7.5.0/mod.ts"

 { GetBlocks }  "./blocks.ts"
 { GetPeriod }  "./period.ts"
 { LnurlPayRequest, LnurlPayRequestCallback }  "./donate.ts"
 { GetBlockchainInfo, GetBlockCount, GetBlockHash }  "./misc.ts"

 router =  Router()

router.get("/blocks", GetBlocks)

router.get("/period/:period", GetPeriod)

router.get("/invoice", LnurlPayRequest)

router.get("/invoice/callback", LnurlPayRequestCallback)

router.get("/getblockchaininfo", GetBlockchainInfo)

router.get<{ height: string }>("/getblockhash/:height", GetBlockHash)
router.get("/getblockcount", GetBlockCount)

 router
