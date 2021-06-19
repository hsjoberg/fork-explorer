 { RouterMiddleware }  "https://deno.land/x/oak@v7.5.0/mod.ts"

 { getBlocks }  "../blocks/index.ts"

 GetBlocks: RouterMiddleware = (context) => 
   = getBlocks()
  context.response.body = blocks

