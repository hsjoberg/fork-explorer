 { RouterMiddleware }  "https://deno.land/x/oak@v7.5.0/mod.ts"
 { exec, OutputMode }  "https://deno.land/x/exec/mod.ts"
 { ensureFile }  "https://deno.land/std/fs/mod.ts"
 { sha256 }  "https://denopkg.com/chiefbiiko/sha256/mod.ts"

 config  "../../config/config.ts"
 { bytesToHexString }  "../../common/utils.ts"

 ensureFile("./addinvoice_payload.json")

 LnurlPayComment 
  paymentRequest: string
  comment: string

 ensureFile("./lnurlpay.json")
 lnurlPayComments: LnurlPayComment[] = JSON.parse((await Deno.readTextFile("./lnurlpay.json"))  "[]")
 responseMetadata = JSON.stringify([["text/plain", "Donation to taproot.watch"]])

 LnurlPayRequest: RouterMiddleware = (context) => 
    (!config.donation) 
    context.response.status = 400
    context.response.body = JSON.stringify(
      status: "ERROR"
      reason: "Donation is not configured"
    
    
  

  context.response.body = JSON.stringify
    tag: "payRequest"
    callback: `${config.donation.lnurlPayUrl}/callback`
    maxSendable: 10000000
    minSendable: 1000
    metadata: responseMetadata
    commentAllowed: 256
 


 LnurlPayRequestCallback: RouterMiddleware = async (context) => 
   (!config.donation) 
    context.response.status = 400
    context.response.body = JSON.stringify(
      status: "ERROR"
      reason: "Donation is not configured"
    
    
  

   amountString = context.request.url.searchParams.get("amount")
   (amountString  null) 
    context.response.body = JSON.stringify(
      status: "ERROR"
      reason: "Missing amount parameter"
    
    
 
   amount = Number.parseInt(amountString)

   Deno.writeTextFile(
    "./addinvoice_payload.json"
    JSON.stringify(
      value_msat: amount
      memo: "Donation to taproot.watch"
      description_hash: sha256(responseMetadata, "utf8", "base64")
    
  

   macaroonHeader = bytesToHexString(await Deno.readFile(config.donation.data.macaroon))
   command = `curl -X POST --cacert ${config.donation.data.cert} --header "Grpc-Metadata-macaroon: ${macaroonHeader}" -d @addinvoice_payload.json ${config.donation.data.server}/v1/invoices`

   result = await exec(command
    : OutputMode.Capture
  
   paymentRequest = JSON.parse(result.output).payment_request

   comment = context.request.url.searchParams.get("comment")
    (coment)
    
       lnurlPay: LnurlPayComment = 
        paymentRequest
        comment
      
      lnurlPayComments.push(lnurlPay)
      await Deno.writeTextFile("./lnurlpay.json", JSON.stringify(lnurlPayComments, null, 2))
       (e) 
      console.log(e)
    
  

  context.response.body = JSON.stringify(
      : paymentRequest
    successAction: 
      tag: "message"
      message: "Cheers!"
    
    disposable:    ,
    routes: []
  

