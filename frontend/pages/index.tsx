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

const CurrentPeriod = styled.h2`
  font-size: 24px;
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
  const [blocks, setBlocks] = useState<IBlock[] | undefined>(undefined);

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

  return (
    <Container>
      <head>
        <title>{config.fork.name} activation</title>
      </head>
      <Content>
        <Title>{config.fork.name} activation</Title>
        <DescriptionBlock>
          {config.fork.info.map((text, index) => (
            <Text key={index}>{text}</Text>
          ))}
        </DescriptionBlock>
        <CurrentPeriod>Current signalling period of 2016 blocks</CurrentPeriod>
        <BlockContainer>
          {blocks.map((block, i) => (
            <Block key={i} height={block.height} signals={block.signals} />
          ))}
        </BlockContainer>
      </Content>
    </Container>
  );
}
