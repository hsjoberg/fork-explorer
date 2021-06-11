import React from "https://esm.sh/react@17.0.2";
import styled from "https://esm.sh/styled-components@5.3.0";

import { computeStats } from "../back/common/data.ts";
import { useStoreState } from "../state/index.ts";
import config from "../back/config/config.ts";

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

const ProgressBarContainer = styled.div`
  box-shadow: ${(props) => props.theme.progressBar.container.boxShadow};
  display: flex;
  height: 44px;
`;

const Green = styled.div<{ roundedRightBorder?: boolean }>`
  display: flex;
  font-size: 13px;
  justify-content: center;
  align-items: center;
  background: ${(props) => props.theme.progressBar.progressBar.signalling.background};
  border: ${(props) => props.theme.progressBar.progressBar.signalling.border};
  border-top-left-radius: 6px;
  border-bottom-left-radius: 6px;
  border-top-right-radius: ${(props) => (props.roundedRightBorder ? "6px" : "0px")};
  border-bottom-right-radius: ${(props) => (props.roundedRightBorder ? "6px" : "0px")};
  color: #f7f7f7;
  cursor: default;
`;

const White = styled.div<{ roundedLeftBorder?: boolean; roundedRightBorder?: boolean }>`
  display: flex;
  font-size: 13px;
  justify-content: center;
  align-items: center;
  background: ${(props) => props.theme.progressBar.progressBar.upcoming.background};
  border: ${(props) => props.theme.progressBar.progressBar.upcoming.border};
  border-top-left-radius: ${(props) => (props.roundedLeftBorder ? "6px" : "0px")};
  border-bottom-left-radius: ${(props) => (props.roundedLeftBorder ? "6px" : "0px")};
  border-top-right-radius: ${(props) => (props.roundedRightBorder ? "6px" : "0px")};
  border-bottom-right-radius: ${(props) => (props.roundedRightBorder ? "6px" : "0px")};
  color: #f7f7f7;
  cursor: default;
`;

const Red = styled.div<{ roundedLeftBorder?: boolean }>`
  display: flex;
  font-size: 13px;
  justify-content: center;
  align-items: center;
  background: ${(props) => props.theme.progressBar.progressBar.nonSignalling.background};
  border: ${(props) => props.theme.progressBar.progressBar.nonSignalling.border};
  box-sizing: border-box;
  border-radius: 0px 6px 6px 0px;
  border-top-right-radius: 6px;
  border-bottom-right-radius: 6px;
  border-top-left-radius: ${(props) => (props.roundedLeftBorder ? "6px" : "0px")};
  border-bottom-left-radius: ${(props) => (props.roundedLeftBorder ? "6px" : "0px")};
  color: #f7f7f7;
  cursor: default;
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

const PercentHolder = styled.div<{ thresholdPrecentage: number }>`
  display: flex;
  flex-direction: column;
  width: 15px;
  position: absolute;
  top: 10px;
  left: calc(${(props) => props.thresholdPrecentage}% - 2px);
  font-size: 12px;
`;

const NinetyPercentIndicator = styled.div`
  width: 3px;
  height: 44px;
  background: #f7f7f7;
`;

const NinetyPercentText = styled.div`
  color: #fff;
  height: 20px;
  margin-top: -20px;
  margin-left: -9px;
`;

function ProgressBar() {
  const blocks = useStoreState((store) => store.blocks);

  const {
    currentNumberOfBlocks,
    blocksLeftInThisPeriod,
    currentNumberOfSignallingBlocks,
    currentSignallingRatioToAll,
    currentSignallingPercentageToAll,
    currentNumberOfNonSignallingBlocks,
  } = computeStats(blocks);

  const nonSignallingRatio = currentNumberOfNonSignallingBlocks / 2016;
  const nonSignallingPercentage = (nonSignallingRatio * 100).toFixed(currentNumberOfNonSignallingBlocks < 20 ? 2 : 0);

  const blocksLeftRatio = blocksLeftInThisPeriod / 2016;
  let blocksLeftPercentage = (blocksLeftRatio * 100).toFixed(blocksLeftInThisPeriod < 20 ? 2 : 0);

  // Add rounding error leftovers to blocks left percentage
  const leftOver =
    100 -
    (Number.parseFloat(currentSignallingPercentageToAll) +
      Number.parseFloat(nonSignallingPercentage) +
      Number.parseFloat(blocksLeftPercentage));
  if (leftOver != 0) {
    blocksLeftPercentage = (Number.parseFloat(blocksLeftPercentage) + leftOver).toFixed(2);
    if (blocksLeftPercentage.endsWith(".00")) {
      blocksLeftPercentage = blocksLeftPercentage.slice(0, -3);
    }
    if (blocksLeftPercentage.startsWith("-")) {
      blocksLeftPercentage = blocksLeftPercentage.slice(1);
    }
  }

  const thresholdPercentage = Math.floor((config.fork.threshold / 2016) * 100);

  return (
    <Container>
      <ProgressBarContainer>
        {currentSignallingRatioToAll > 0 && (
          <Green
            roundedRightBorder={currentNumberOfSignallingBlocks === 2016}
            style={{ flex: currentSignallingRatioToAll }}
          >
            {currentSignallingRatioToAll > 0.035 && `${currentSignallingPercentageToAll}%`}
          </Green>
        )}
        {blocksLeftRatio > 0 && (
          <White
            roundedLeftBorder={currentNumberOfSignallingBlocks === 0}
            roundedRightBorder={currentNumberOfNonSignallingBlocks === 0}
            style={{ flex: blocksLeftRatio }}
          >
            {blocksLeftRatio > 0.035 && `${blocksLeftPercentage}%`}
          </White>
        )}
        {nonSignallingRatio > 0 && (
          <Red roundedLeftBorder={currentNumberOfNonSignallingBlocks === 2016} style={{ flex: nonSignallingRatio }}>
            {nonSignallingRatio > 0.035 && `${nonSignallingPercentage}%`}
          </Red>
        )}
      </ProgressBarContainer>
      <ProgressBarInfoContainer>
        {currentSignallingRatioToAll > 0 && (
          <ProgressBarInfoText style={{ flex: currentSignallingRatioToAll }}>
            {currentNumberOfSignallingBlocks} signalling block{currentNumberOfSignallingBlocks > 1 && <>s</>}
          </ProgressBarInfoText>
        )}
        {blocksLeftRatio > 0 && (
          <ProgressBarInfoText style={{ flex: blocksLeftRatio }}>
            {blocksLeftInThisPeriod} upcoming block{blocksLeftInThisPeriod > 1 && <>s</>}
          </ProgressBarInfoText>
        )}
        {nonSignallingRatio > 0 && (
          <ProgressBarInfoText style={{ flex: nonSignallingRatio }}>
            {currentNumberOfNonSignallingBlocks} non-signalling block{currentNumberOfNonSignallingBlocks > 1 && <>s</>}
          </ProgressBarInfoText>
        )}
      </ProgressBarInfoContainer>
      <PercentHolder thresholdPrecentage={thresholdPercentage}>
        <NinetyPercentText>{thresholdPercentage}%</NinetyPercentText>
        <NinetyPercentIndicator />
      </PercentHolder>
    </Container>
  );
}

export default ProgressBar;
