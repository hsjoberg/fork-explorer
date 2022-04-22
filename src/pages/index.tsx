import React from "react";
import styled from "styled-components";
import addMinutes from "https://deno.land/x/date_fns@v2.15.0/addMinutes/index.js";
import formatDistanceToNow from "https://deno.land/x/date_fns@v2.15.0/formatDistanceToNow/index.js";
import { useRouter, useLocation } from "wouter";

import config from "../config/config.ts";
import { computeStats } from "../common/data.ts";

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
import FinalBlockCountdown from "../components/FinalBlockCountdown.tsx";
import { useStoreState } from "../state/index.ts";
import Body from "../components/Body.ts";
import ForkCompleted from "../components/ForkCompleted.tsx";

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

const LockinInfo = styled(CommonHeader)`
  font-size: 16px;
  text-align: right;
  margin-bottom: 10px;
`;

const CannotLockInInfo = styled(CommonHeader)`
  font-size: 20px;
  text-align: center;
  margin-bottom: 30px;
`;

const BootstrappingInProgress = styled.p`
  color: #efefef;
  text-align: center;
`;

export default function Blocks() {
  const blocks = useStoreState((store) => store.blocks);
  const forkName = config.fork.name;
  const status = config.fork.status;
  const {
    blocksLeftForActivation,
    lockedIn,
    currentPeriodFailed,
    currentSignallingPercentage,
    willProbablyActivate,
    blocksLeftInThisPeriod,
  } = computeStats(blocks);
  const monitoringMode = useStoreState((store) => store.monitoringMode);
  const nextBlockHeight = blocks.find((block) => block.signals === undefined)?.height ?? 0;
  const params = new URLSearchParams(window.location.search);
  let selectedMiner: string | undefined | null = params.get("miner");
  if (selectedMiner === "Unrecognized miners") {
    selectedMiner = undefined;
  }
  const selectedBlock = params.get("block");
  const thresholdPercentage = Math.floor((config.fork.threshold / 2016) * 100);
  const forkCompleted = monitoringMode === "current_period" && (lockedIn || ["locked_in", "active"].includes(status));

  return (
    <Container>
      <head>
        <title>{forkName} activation</title>
      </head>
      <ContentWide>
        <SiteTitle />
        <SiteMenu />
        <Body style={{ paddingLeft: 18, paddingRight: 18 }}>
          {forkCompleted && <ForkCompleted />}
          {!forkCompleted && (
            <>
              {!currentPeriodFailed && !lockedIn && blocksLeftForActivation <= 33 * 2 && <FinalBlockCountdown />}
              {currentPeriodFailed && blocksLeftInThisPeriod > 0 && (
                <CannotLockInInfo>
                  The current period cannot lock in {forkName}.
                  <br />
                  The next period starts in
                  {" " + formatDistanceToNow(addMinutes(new Date(), blocksLeftInThisPeriod * 10), {}) + " "}(
                  {blocksLeftInThisPeriod} block{blocksLeftInThisPeriod > 1 && "s"})
                </CannotLockInInfo>
              )}
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
                          {blocksLeftForActivation} additional signalling blocks required for the softfork to lock in
                          <br />
                          {willProbablyActivate && (
                            <>
                              {config.fork.name} will lock in with the current signalling ratio (
                              {currentSignallingPercentage}%)!
                            </>
                          )}
                          {!willProbablyActivate && (
                            <>
                              {config.fork.name} will not lock in with the current signalling ratio (
                              {currentSignallingPercentage}
                              %)
                            </>
                          )}
                        </>
                      )}
                      {currentPeriodFailed && (
                        <>
                          {forkName} cannot be locked in within this period
                          <br />
                          {thresholdPercentage}% of the blocks have to signal (current ratio:{" "}
                          {currentSignallingPercentage}
                          %)
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
            </>
          )}
        </Body>
        {config.frontend.twitterHandle && <ContactTwitter />}
        {config.donation && <Donation />}
      </ContentWide>
    </Container>
  );
}
