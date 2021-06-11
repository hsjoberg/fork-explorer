import React from "https://esm.sh/react@17.0.2";
import styled from "https://esm.sh/styled-components@5.3.0";
import { useRouter } from "https://deno.land/x/aleph@v0.3.0-alpha.32/framework/react/hooks.ts";
import Anchor from "https://deno.land/x/aleph@v0.3.0-alpha.32/framework/react/components/Anchor.ts";

import config from "../../back/config/config.ts";

import { Container } from "../../components/Container.ts";
import { Content } from "../../components/Content.ts";
import SiteTitle from "../../components/SiteTitle.tsx";
import { useStoreState } from "../../state/index.ts";
import SiteMenu from "../../components/SiteMenu.tsx";
import { Donation } from "../../components/Donation.tsx";
import ContactTwitter from "../../components/ContactTwitter.tsx";
import CommonHeader from "../../components/CommonHeader.ts";
import Text from "../../components/Text.tsx";
import Body from "../../components/Body.ts";

const Miner = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
`;

const MinerTitle = styled(CommonHeader)``;

const SeeMinerOverview = styled(Anchor)`
  color: #f7f7f7;
  margin-bottom: 20px;
`;

const MinerBlocksContainer = styled.div``;

const MinerBlock = styled.div`
  font-family: monospace;
`;

const Locate = styled(Anchor)`
  margin-left: 10px;
  text-decoration: none;
`;

export default function Miners() {
  const blocks = useStoreState((store) => store.blocks);
  const forkName = config.fork.name;
  const { params } = useRouter();
  const name = params.name ?? "";

  let searchName: string | undefined = name;
  if (searchName === "Unrecognized miners") {
    searchName = undefined;
  }
  const minerBlocks = blocks.filter((block) => {
    return block.signals !== undefined && block.miner === searchName;
  });

  return (
    <Container>
      <head>
        <title>{forkName} activation - Miners</title>
      </head>
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
                    <Anchor href={`https://mempool.space/block/${block.height}?showDetails=true`} target="_blank">
                      {block.height}
                    </Anchor>
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
