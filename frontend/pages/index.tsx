import React from "https://esm.sh/react@17.0.2";
import styled from "https://esm.sh/styled-components";

import config from "../back/config/config.ts";

import { Container } from "../components/Container.ts";
import { Content } from "../components/Content.ts";
import { BlockContainer, Block } from "../components/Block.tsx";
import { Donation } from "../components/Donation.tsx";
import SiteTitle from "../components/SiteTitle.tsx";
import SiteMenu from "../components/SiteMenu.tsx";
import ProgressBar from "../components/ProgressBar.tsx";
import { useStoreState } from "../state/index.ts";

const forkName = config.fork.name;

const DescriptionBlock = styled.div`
  max-width: 600px;
  margin: auto;
`;

const Text = styled.p`
  color: #f7f7f7;
  /* text-shadow: #000 2px 2px 0px; */
  font-size: 16px;
  text-align: center;
`;

const TopSection = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

const CurrentPeriod = styled.h2`
  font-size: 24px;
  margin-bottom: 10px;
  color: #ff9b20;
  text-shadow: #000 2px 2px 0px;
`;

const LockinInfo = styled.h2`
  font-size: 16px;
  text-align: right;
  margin-bottom: 10px;
  color: #ff9b20;
  text-shadow: #000 2px 2px 0px;
`;

const BootstrappingInProgress = styled.p`
  color: #efefef;
  text-align: center;
`;

export default function Blocks() {
  const blocks = useStoreState((store) => store.blocks);

  const treshhold = config.fork.threshold;
  const currentNumberOfBlocks = blocks.reduce((prev, currentBlock) => prev + +(currentBlock.signals !== undefined), 0);
  const currentNumberOfSignallingBlocks = blocks.reduce(
    (prev, currentBlock) => prev + +(currentBlock.signals ?? false),
    0
  );
  const blocksLeftForActivation = treshhold - currentNumberOfSignallingBlocks;
  const lockedIn = currentNumberOfSignallingBlocks >= treshhold;
  const blocksLeftInThisPeriod = blocks.reduce((prev, currentBlock) => prev + +(currentBlock.signals === undefined), 0);
  const currentPeriodFailed = blocksLeftForActivation > blocksLeftInThisPeriod;

  const currentSignallingRatio =
    currentNumberOfBlocks > 0 ? currentNumberOfSignallingBlocks / currentNumberOfBlocks : 0;

  const currentSignallingPercentage = (currentSignallingRatio * 100).toFixed(2);
  let willProbablyActivate: boolean | undefined = undefined;
  if (currentNumberOfBlocks >= 144) {
    const estimatedSignallingBlocksLeft = Math.floor(currentSignallingRatio * blocksLeftInThisPeriod);
    willProbablyActivate = estimatedSignallingBlocksLeft <= blocksLeftInThisPeriod && currentSignallingRatio >= 0.9;
  }

  return (
    <Container>
      <head>
        <title>{forkName} activation</title>
      </head>
      <Content>
        <SiteTitle />
        <SiteMenu />
        <DescriptionBlock>
          {config.fork.info.map((text, index) => (
            <Text key={index}>{text}</Text>
          ))}
        </DescriptionBlock>
        {blocks.length > 0 && <ProgressBar />}
        <TopSection>
          <CurrentPeriod>Current signalling period of 2016 blocks</CurrentPeriod>
          {/* <LockinInfo>90% of blocks within the period has to signal.</LockinInfo> */}
          <LockinInfo>
            {lockedIn && <>{forkName.toUpperCase()} IS LOCKED IN FOR DEPLOYMENT!</>}
            {!lockedIn && (
              <>
                {!currentPeriodFailed && (
                  <>
                    {blocksLeftForActivation} {forkName} blocks left until softfork is locked in.
                    <br />
                    {willProbablyActivate && (
                      <>Taproot will lock in with the current signalling ratio ({currentSignallingPercentage}%)!</>
                    )}
                    {!willProbablyActivate && (
                      <>Taproot will not lock in with the current signalling ratio ({currentSignallingPercentage}%)</>
                    )}
                  </>
                )}
                {currentPeriodFailed && (
                  <>
                    {forkName} cannot be locked in within this period.
                    <br />
                    {blocksLeftForActivation} more blocks required to reach 90%, only {blocksLeftInThisPeriod} blocks
                    left.
                  </>
                )}
              </>
            )}
          </LockinInfo>
        </TopSection>
        <BlockContainer>
          {blocks.length === 0 && (
            <BootstrappingInProgress>
              Server is currently loading blocks, please try soon again.
            </BootstrappingInProgress>
          )}
          {blocks.map((block, i) => (
            <Block key={i} height={block.height} signals={block.signals} miner={block.miner} />
          ))}
        </BlockContainer>
        {config.donation && <Donation />}
      </Content>
    </Container>
  );
}
