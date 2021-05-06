import React from "https://esm.sh/react@17.0.2";
import styled from "https://esm.sh/styled-components";
import { useRouter } from "https://deno.land/x/aleph/framework/react/hooks.ts";

import config from "../back/config/config.ts";
import { computeStats } from "../back/common/data.ts";

import { Container } from "../components/Container.ts";
import { ContentWide } from "../components/Content.ts";
import { BlockContainer, Block, EmptyBlock } from "../components/Block.tsx";
import { Donation } from "../components/Donation.tsx";
import SiteTitle from "../components/SiteTitle.tsx";
import SiteMenu from "../components/SiteMenu.tsx";
import ProgressBar from "../components/ProgressBar.tsx";
import Text from "../components/Text.tsx";
import ContactTwitter from "../components/ContactTwitter.tsx";
import CommonHeader from "../components/CommonHeader.ts";
import { useStoreState } from "../state/index.ts";

const DescriptionBlock = styled.div`
  max-width: 600px;
  margin: auto;
  text-align: center;
`;

const TopSection = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

const CurrentPeriod = styled(CommonHeader)`
  margin-bottom: 10px;
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
  const forkName = config.fork.name;
  const {
    blocksLeftForActivation,
    lockedIn,
    currentPeriodFailed,
    currentSignallingPercentage,
    willProbablyActivate,
  } = computeStats(blocks);
  const nextBlockHeight = blocks.find((block) => block.signals === undefined)?.height ?? 0;
  const { query } = useRouter();
  const selectedMiner = query.get("miner");
  const selectedBlock = query.get("block");

  return (
    <Container>
      <head>
        <title>{forkName} activation test</title>
      </head>
      <ContentWide>
        <SiteTitle />
        <SiteMenu />
        <DescriptionBlock>
          {config.fork.info.map((text, index) => (
            <Text key={index}>{text}</Text>
          ))}
        </DescriptionBlock>
        {blocks.length > 0 && <ProgressBar />}
        <TopSection>
          <CurrentPeriod>Current signalling period of 2016 blocks (2 weeks)</CurrentPeriod>
          {/* <LockinInfo>90% of blocks within the period have to signal.</LockinInfo> */}
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
                    90% of the blocks have to signal
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
          {blocks.map((block, i) => {
            if (block.signals === undefined) {
              return <EmptyBlock key={i} height={block.height} nextBlock={block.height === nextBlockHeight} />;
            }
            return (
              <Block
                key={i}
                height={block.height}
                signals={block.signals}
                selected={selectedBlock === block.height.toString() || selectedMiner === block.miner}
                miner={block.miner}
              />
            );
          })}
        </BlockContainer>
        {config.frontend.twitterHandle && <ContactTwitter />}
        {config.donation && <Donation />}
      </ContentWide>
    </Container>
  );
}
