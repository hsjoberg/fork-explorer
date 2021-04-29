import React, { useState } from "https://esm.sh/react@17.0.2";
import styled from "https://esm.sh/styled-components";
import { QRCode } from "https://esm.sh/react-qr-svg";
import { bech32 } from "https://esm.sh/bech32";

import config from "../back/config/config.ts";
import { bytesToString } from "../back/utils.ts";

export const DonateContainer = styled.div`
  margin: 0 auto 100px;
  max-width: 400px;
  text-align: center;
`;

export const DonateText = styled.a`
  display: block;
  text-align: center;
  color: #404040;
  text-shadow: #000 1px 1px 0px;
  cursor: pointer;
`;

export const Bolt11Text = styled.a`
  display: block;
  overflow-wrap: anywhere;
  font-size: 11px;
  color: #aaa;
  cursor: pointer;
  margin-top: 5px;
  margin-bottom: 15px;
`;

export const InvoiceText = styled.p`
  text-align: center;
  color: #aaa;
  text-shadow: #000 1px 1px 0px;
`;

export const ChangeToBolt11 = styled.a`
  display: block;
  text-align: center;
  color: #aaa;
  text-shadow: #000 1px 1px 0px;
  cursor: pointer;
  text-decoration: underline;
  font-size: 14px;
`;

const lnurlPayBech32 = bech32.encode(
  "lnurl",
  bech32.toWords(new TextEncoder().encode(config.donation?.lnurlPayUrl)),
  1024
);

export function Donation() {
  const [type, setType] = useState<"lnurl-pay" | "bolt11">("lnurl-pay");
  const [invoice, setInvoice] = useState<string | undefined>(undefined);

  const showLnUrlPay = () => {
    setType("lnurl-pay");
    setInvoice(lnurlPayBech32);
  };

  const decodeLnUrlPay = async () => {
    const decodedBech32 = bech32.decode(invoice!, 1024);
    const decodedUrl = bytesToString(bech32.fromWords(decodedBech32.words));

    const result = await fetch(decodedUrl);
    const resultJson = await result.json();

    const amount = prompt(
      `Choose an amount between ${resultJson.minSendable} sats and ${resultJson.maxSendable} sats`,
      resultJson.minSendable
    );

    const amountNumber = Number.parseInt(amount!) * 1000;

    if (Number.isNaN(amountNumber)) {
      return;
    }

    const callback = resultJson.callback;

    const resultCallback = await fetch(callback + "?amount=" + amountNumber);
    const resultCallbackJson = await resultCallback.json();

    setType("bolt11");
    setInvoice(resultCallbackJson.pr);
  };

  const onClickInvoice = () => {
    window.location.replace("lightning:" + invoice);
  };

  return (
    <DonateContainer>
      {!invoice && <DonateText onClick={showLnUrlPay}>Donate via Lightning Network</DonateText>}
      {invoice && (
        <>
          <InvoiceText>
            {type === "lnurl-pay" && <>LNURL-pay</>}
            {type === "bolt11" && <>LN Invoice</>} QR code:
          </InvoiceText>
          <div style={{ cursor: "pointer" }} onClick={onClickInvoice}>
            <QRCode
              bgColor="#FFFFFF"
              fgColor="#000000"
              value={invoice.toUpperCase()}
              style={{ border: "8px solid #fff", width: 200 }}
            />
          </div>
          <Bolt11Text onClick={onClickInvoice}>{invoice}</Bolt11Text>
          {type == "lnurl-pay" && (
            <ChangeToBolt11 onClick={decodeLnUrlPay}>
              Unsupported wallet? Click to change to normal BOLT11 invoice
            </ChangeToBolt11>
          )}
        </>
      )}
    </DonateContainer>
  );
}
