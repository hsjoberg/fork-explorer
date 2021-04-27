import React, { useState } from "https://esm.sh/react@17.0.2";
import styled from "https://esm.sh/styled-components";
import { QRCode } from "https://esm.sh/react-qr-svg";

export const DonateContainer = styled.div`
  text-align: center;
  margin-bottom: 100px;
`;

export const DonateText = styled.a`
  text-align: center;
  color: #404040;
  text-shadow: #000 1px 1px 0px;
  cursor: pointer;
`;

export function Donation() {
  const [invoice, setInvoice] = useState<string | undefined>(undefined);

  const fetchInvoice = async () => {
    const result = await fetch("/invoice");
    setInvoice(await result.text());
  };

  return (
    <DonateContainer>
      {!invoice && <DonateText onClick={fetchInvoice}>Donate via Lightning Network</DonateText>}
      {invoice && (
        <div
          style={{ cursor: "pointer" }}
          onClick={() => {
            window.location.replace("lightning:" + invoice);
          }}
        >
          <QRCode
            bgColor="#FFFFFF"
            fgColor="#000000"
            value={invoice.toUpperCase()}
            style={{ border: "8px solid #fff", width: 200 }}
          />
        </div>
      )}
    </DonateContainer>
  );
}
