import React, { useEffect, useState } from "https://esm.sh/react@17.0.2";
import styled from "https://esm.sh/styled-components";

import config from "../back/config/config.ts";
import { IBlock } from "../back/blocks.ts";

import { Container } from "../components/Container.ts";
import { Content } from "../components/Content.ts";

const Title = styled.h1`
  margin-top: 85px;
  font-size: 42px;
  text-align: center;
  color: #d97b08;
  text-shadow: #000 3px 3px 0px;
`;

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
  text-shadow: #000 3px 3px 0px;
`;

const LockinInfo = styled.h2`
  font-size: 16px;
  margin-bottom: 10px;
  color: #ff9b20;
  text-shadow: #000 3px 3px 0px;
`;

const BlockContainer = styled.div`
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
  justify-content: center;
  padding: 3px;
  background-color: #434343;
  box-shadow: #000 3px 3px 14px;
  border-radius: 6px;
  margin-bottom: 30px;
`;

const BlockStyle = styled.div<{ signals?: boolean }>`
  background: ${(props) =>
    props.signals
      ? "linear-gradient(45deg, rgba(18,209,0,1) 0%, rgba(9,89,0,1) 100%)"
      : "linear-gradient(45deg, rgba(209,0,0,1) 0%, rgba(89,0,0,1) 100%)"};
  border: 1px solid #434343;
  width: 18px;
  height: 18px;
  margin: 3px;
  border-radius: 4px;
`;
const EmptyBlock = styled.div`
  border: 1px solid #5a5a5a;
  width: 18px;
  height: 18px;
  margin: 3px;
  border-radius: 4px;
`;
interface IBlockProps {
  height: number;
  signals: boolean | undefined;
}
function Block({ height, signals }: IBlockProps) {
  if (signals === undefined) {
    return <EmptyBlock title={`Coming block ${height}`} />;
  }
  return <BlockStyle title={`Height: ${height}`} signals={signals}></BlockStyle>;
}

export default function Blocks() {
  const [blocks, setBlocks] = useState<IBlock[] | undefined>([]);

  useEffect(() => {
    (async () => {
      const result = await fetch("/blocks");
      const json = (await result.json()) as IBlock[];
      console.log(json);
      setBlocks(json);
    })();
  }, []);

  if (blocks === undefined) {
    return <></>;
  }

  const forkName = config.fork.name;

  const treshhold = Math.floor(2016 * 0.9);
  const currentNumberOfSignallingBlocks = blocks.reduce(
    (prev, currentBlock) => prev + +(currentBlock.signals ?? false),
    0
  );
  const blocksLeftForActivation = treshhold - currentNumberOfSignallingBlocks;
  const lockedIn = currentNumberOfSignallingBlocks >= treshhold;
  const blocksLeftInThisPeriod = blocks.reduce((prev, currentBlock) => prev + +(currentBlock.signals === undefined), 0);
  const currentPeriodFailed = blocksLeftForActivation > blocksLeftInThisPeriod;

  return (
    <Container>
      <head>
        <title>{forkName} activation</title>
      </head>
      <Content>
        <Title>{forkName} activation</Title>
        <DescriptionBlock>
          {config.fork.info.map((text, index) => (
            <Text key={index}>{text}</Text>
          ))}
        </DescriptionBlock>
        <TopSection>
          <CurrentPeriod>Current signalling period of 2016 blocks</CurrentPeriod>
          <LockinInfo>
            {!lockedIn && (
              <>
                {blocksLeftForActivation} {forkName} blocks left until softfork is locked in.
                <br />
                {!currentPeriodFailed && <>90% of the blocks within the period has to signal.</>}
                {currentPeriodFailed && (
                  <>
                    {forkName} cannot be locked in within this period
                    <br />
                    (90% of the blocks has to signal).
                  </>
                )}
              </>
            )}
            {lockedIn && <>{forkName.toUpperCase()} IS LOCKED IN FOR DEPLOYMENT!</>}
          </LockinInfo>
        </TopSection>
        <BlockContainer>
          {blocks.map((block, i) => (
            <Block key={i} height={block.height} signals={block.signals} />
          ))}
        </BlockContainer>
      </Content>
    </Container>
  );
}
