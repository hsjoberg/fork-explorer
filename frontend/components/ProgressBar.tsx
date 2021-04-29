import React from "https://esm.sh/react@17.0.2";
import styled from "https://esm.sh/styled-components";

import config from "../back/config/config.ts";
import { useStoreState } from "../state/index.ts";

export const DonateContainer = styled.div`
  margin: 0 auto 100px;
  max-width: 400px;
  text-align: center;
`;

const Container = styled.div`
  padding: 10px 0;
  margin-top: 35px;
  margin-bottom: 20px;
  position: relative;
`;

const ProgressBarInfoContainer = styled.div`
  padding-top: 10px;
  display: flex;
`;

const ProgressBarInfoText = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  text-align: center;
  color: #f7f7f7;
  font-size: 13px;
`;

const ProgressBarContainer = styled.div`
  display: flex;
  height: 44px;
`;

const Green = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  background: linear-gradient(45deg, #217f35 0%, rgba(9, 89, 0, 1) 100%);
  border: 1px solid #1ed947;
  border-radius: 6px 0px 0px 6px;
  color: #f7f7f7;
`;

const White = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  background: linear-gradient(45deg, #8e8e8e 0%, #afafaf 100%);
  border: 1px solid #f7f7f7;
  color: #f7f7f7;
`;

const Red = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  background: linear-gradient(45deg, #731212 0%, rgba(89, 0, 0, 1) 100%);
  border: 1px solid #c30000;
  box-sizing: border-box;
  border-radius: 0px 6px 6px 0px;
  color: #f7f7f7;
`;

function ProgressBar() {
  const blocks = useStoreState((store) => store.blocks);

  const blocksLeftInThisPeriod = blocks.reduce((prev, currentBlock) => prev + +(currentBlock.signals === undefined), 0);
  const currentNumberOfBlocks = blocks.reduce((prev, currentBlock) => prev + +(currentBlock.signals !== undefined), 0);
  const currentNumberOfSignallingBlocks = blocks.reduce(
    (prev, currentBlock) => prev + +(currentBlock.signals ?? false),
    0
  );
  const currentNumberOfNonSignallingBlocks = blocks.reduce(
    (prev, currentBlock) => prev + +(currentBlock.signals === false),
    0
  );

  const numberOfDecimals = currentNumberOfBlocks < 100 ? 2 : 0;

  const signallingRatio = currentNumberOfSignallingBlocks / 2016;
  const signallingPercentage = (signallingRatio * 100).toFixed(currentNumberOfSignallingBlocks < 20 ? 2 : 0);

  const nonSignallingRatio = currentNumberOfNonSignallingBlocks / 2016;
  const nonSignallingPercentage = (nonSignallingRatio * 100).toFixed(currentNumberOfNonSignallingBlocks < 20 ? 2 : 0);

  const blocksLeftRatio = blocksLeftInThisPeriod / 2016;
  let blocksLeftPercentage = (blocksLeftRatio * 100).toFixed(blocksLeftInThisPeriod < 20 ? 2 : 0);

  // Add rounding error leftovers to blocks left percentage
  const leftOver =
    100 -
    (Number.parseFloat(signallingPercentage) +
      Number.parseFloat(nonSignallingPercentage) +
      Number.parseFloat(blocksLeftPercentage));
  if (leftOver != 0) {
    blocksLeftPercentage = (Number.parseFloat(blocksLeftPercentage) + leftOver).toFixed(2);
    if (blocksLeftPercentage.endsWith(".00")) {
      console.log("END");
      blocksLeftPercentage = blocksLeftPercentage.slice(0, -3);
    }
  }

  return (
    <Container>
      <ProgressBarContainer>
        {signallingRatio > 0 && <Green style={{ flex: signallingRatio }}>{signallingPercentage}%</Green>}
        {blocksLeftRatio > 0 && <White style={{ flex: blocksLeftRatio }}>{blocksLeftPercentage}%</White>}
        {nonSignallingRatio > 0 && <Red style={{ flex: nonSignallingRatio }}>{nonSignallingPercentage}%</Red>}
      </ProgressBarContainer>
      <ProgressBarInfoContainer>
        {signallingRatio > 0 && (
          <ProgressBarInfoText style={{ flex: signallingRatio }}>
            {currentNumberOfSignallingBlocks} signalling blocks
          </ProgressBarInfoText>
        )}
        {blocksLeftRatio > 0 && (
          <ProgressBarInfoText style={{ flex: blocksLeftRatio }}>
            {blocksLeftInThisPeriod} upcoming blocks
          </ProgressBarInfoText>
        )}
        {nonSignallingRatio > 0 && (
          <ProgressBarInfoText style={{ flex: nonSignallingRatio }}>
            {currentNumberOfNonSignallingBlocks} non-signalling blocks
          </ProgressBarInfoText>
        )}
      </ProgressBarInfoContainer>
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          width: "15px",
          position: "absolute",
          top: "10px",
          left: "calc(90% - 0px)",
          fontSize: "12px",
        }}
      >
        <div
          style={{
            width: "4px",
            height: "44px",
            background: "#f7f7f7",
          }}
        ></div>
        {/* <div style={{}}>90%</div> */}
      </div>
    </Container>
  );
}

export default ProgressBar;
