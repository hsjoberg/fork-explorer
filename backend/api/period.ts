 { RouterMiddleware }  "https://deno.land/x/oak@v7.5.0/mod.ts"
 { exists }  "https://deno.land/std@0.98.0/fs/mod.ts"

 GetPeriod: RouterMiddleware =  (context) => 
  
     period = Number.parseInt(context.params.period  "")
      (Number.isNaN(period)) 
      context.response.status = 404
      context.response.body = "404 File Not Found"
      
    

     path = Deno.cwd() + `/data/periods/${context.params.period}.json`
     (!(await exists(path))) 
      context.response.status = 404
      context.response.body = "404 File Not Found"
      
    

    const decoder =  TextDecoder("utf-8")
    const blocks =  Deno.readFile(path)
    context.response.body = JSON.parse(decoder.decode(blocks))
  
    console.log(error)
    context.response.status = 500
    context.response.body = "Unknown error"
  

