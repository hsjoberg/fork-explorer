import React, { useState } from "https://esm.sh/react@17.0.2";
import styled from "https://esm.sh/styled-components";
import { QRCode } from "https://esm.sh/react-qr-svg";

const DONATION_LNURL_PAY = "LNURL1DP68GURN8GHJ7MRWVF5HGUEWVDHK6TMVDE6HYMRS9ASHQ6F0WCCJ7MRWW4EXCTE38Y6QYWETXD";

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
  const [showQr, setShowQr] = useState(false);

  return (
    <DonateContainer>
      {!showQr && <DonateText onClick={() => setShowQr(true)}>Donate via Lightning Network</DonateText>}
      {showQr && (
        <a href={"lightning:" + DONATION_LNURL_PAY.toLowerCase()}>
          <QRCode
            bgColor="#FFFFFF"
            fgColor="#000000"
            value={DONATION_LNURL_PAY}
            style={{ border: "8px solid #fff", width: 200 }}
          />
        </a>
      )}
    </DonateContainer>
  );
}
