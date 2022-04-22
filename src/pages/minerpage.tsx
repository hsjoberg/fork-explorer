import React from "react";
import styled from "styled-components";
import { Link } from "wouter";
import { Helmet } from "react-helmet";

import config from "../config/config.ts";
import { Container } from "../components/Container.ts";
import { Content } from "../components/Content.ts";
import SiteTitle from "../components/SiteTitle.tsx";
import { useStoreState } from "../state/index.ts";
import SiteMenu from "../components/SiteMenu.tsx";
import { Donation } from "../components/Donation.tsx";
import ContactTwitter from "../components/ContactTwitter.tsx";
import CommonHeader from "../components/CommonHeader.ts";
import Text from "../components/Text.tsx";
import Body from "../components/Body.ts";

const Miner = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
`;

const MinerTitle = styled(CommonHeader)``;

const SeeMinerOverview = styled(Link)`
  color: #f7f7f7;
  margin-bottom: 20px;
`;

const MinerBlocksContainer = styled.div``;

const MinerBlock = styled.div`
  font-family: monospace;
`;

const Locate = styled(Link)`
  margin-left: 10px;
  text-decoration: none;
`;

export default function Minersx(props: { miner: string }) {
  const blocks = useStoreState((store) => store.blocks);
  const forkName = config.fork.name;
  const name = props.miner;
  console.log(name);
  let searchName: string | undefined = name;
  if (searchName === "Unrecognized miners") {
    searchName = undefined;
  }
  const minerBlocks = blocks.filter((block) => {
    return block.signals !== undefined && block.miner === searchName;
  });

  return (
    <Container>
      <Helmet>
        <title>{forkName} activation - Miners</title>
      </Helmet>
      <Content style={{ maxWidth: 800 }}>
        <SiteTitle />
        <SiteMenu />
        <Body>
          <Miner>
            <MinerTitle>{name}</MinerTitle>{" "}
          </Miner>
          <SeeMinerOverview href={`/?miner=${name}`}>See miner's block on overview page 🔍</SeeMinerOverview>
          <MinerBlocksContainer>
            {minerBlocks.map((block) => {
              return (
                <MinerBlock key={block.height}>
                  <Text>
                    {block.signals ? "✅ " : "🚫"} Block #
                    <Link href={`https://mempool.space/block/${block.height}?showDetails=true`} target="_blank">
                      {block.height}
                    </Link>
                    <Locate href={`/?block=${block.height}`}>🔍</Locate>
                  </Text>
                </MinerBlock>
              );
            })}
          </MinerBlocksContainer>
        </Body>
        {config.frontend.twitterHandle && <ContactTwitter />}
        {config.donation && <Donation />}
      </Content>
    </Container>
  );
}
