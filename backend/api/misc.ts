 { RouterMiddleware }  "https://deno.land/x/oak@v7.5.0/mod.ts";

 { getblockhash }  "../jsonrpc/index.ts";
 { getblockchaininfo, getblockcount }  "../jsonrpc/index.ts";

 GetBlockchainInfo: RouterMiddleware =  (context) => {
   info =  getblockchaininfo();
  console.log(info);
  context.response.body = info;
};

 GetBlockHash: RouterMiddleware<{ height: string }> =  (context) => {
   (!context.params || !context.params.height) {
    context.response.status = 400;
    context.response.body = JSON.stringify({
      status: "ERROR",
      reason: "Missing param height",
    });
    ;
  }
   blockhash =  getblockhash(Number.parseInt(context.params.height));
  context.response.body = blockhash;
};

 GetBlockCount: RouterMiddleware =  (context) => {
   blockCount =  getblockcount();
  context.response.body = blockCount;
};
