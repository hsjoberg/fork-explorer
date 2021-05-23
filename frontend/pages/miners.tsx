import React, { useMemo } from "https://esm.sh/react@17.0.2";
import styled from "https://esm.sh/styled-components";
import Anchor from "https://deno.land/x/aleph@v0.3.0-alpha.32/framework/react/components/Anchor.ts";

import config from "../back/config/config.ts";
import { computeStats, computeMiners } from "../back/common/data.ts";

import { Container } from "../components/Container.ts";
import { Content } from "../components/Content.ts";
import SiteTitle from "../components/SiteTitle.tsx";
import { useStoreState } from "../state/index.ts";
import SiteMenu from "../components/SiteMenu.tsx";
import { Donation } from "../components/Donation.tsx";
import ContactTwitter from "../components/ContactTwitter.tsx";
import CommonHeader from "../components/CommonHeader.ts";

const Table = styled.table`
  width: 100%;
  box-shadow: #000 3px 3px 14px;
  border-radius: 6px;
  margin: 0 auto 30px;
  border: 0;
  border-collapse: collapse;
  border-radius: 8px;
  overflow: hidden;
`;

const TableHead = styled.thead`
  background-color: #383838;
`;

const TableBody = styled.tbody`
  text-align: center;
  background-color: #434343;

  tr:hover {
    background-color: #505050;
  }
`;

const TableRow = styled.tr`
  border-bottom: 2px solid #393939;

  &:last-child {
    border-bottom: 0;
  }
`;

const TableHeader = styled.th`
  color: #efefef;
  padding: 9px;
`;

const Cell = styled.td`
  color: #f0f0f0;
  > a {
    color: #f0f0f0;
  }
  padding: 17px;
`;

const SignallingCell = styled.td`
  color: #efefef;
  & a {
    color: #efefef;
  }
  padding: 16px;
  text-align: center;
`;

const Totals = styled(CommonHeader)`
  max-width: 600px;
  margin: auto;
  text-align: center;
  margin-bottom: 20px;
`;

const TotalsPotential = styled(CommonHeader)`
  max-width: 600px;
  margin: auto;
  text-align: center;
  margin-bottom: 25px;
  font-size: 18px;
  text-decoration: underline #9a9a9a dotted;
  text-underline-position: under;
`;

export default function Miners() {
  const blocks = useStoreState((store) => store.blocks);
  const forkName = config.fork.name;
  const { currentNumberOfBlocks } = computeStats(blocks);
  const miners = useMemo(() => computeMiners(blocks), [blocks]);
  const totalSignallingRatio = miners
    .filter(([_, m]) => m.signals)
    .reduce((sum, [_, m]) => sum + m.numBlocks / currentNumberOfBlocks, 0);
  const totalSignallingPotentialRatio = miners
    .filter(([_, m]) => m.numSignallingBlocks > 0)
    .reduce((sum, [_, m]) => sum + m.numBlocks / currentNumberOfBlocks, 0);

  return (
    <Container>
      <head>
        <title>{forkName} activation - Miners</title>
      </head>
      <Content>
        <SiteTitle />
        <SiteMenu />
        <Totals>
          Current total: {(totalSignallingRatio * 100).toFixed(2)}% <>✅</>
        </Totals>
        {totalSignallingPotentialRatio > totalSignallingRatio && (
          <TotalsPotential title="Share if miners would consistently signal for readiness">
            {`Potential: ${(totalSignallingPotentialRatio * 100).toFixed(2)}%`}
          </TotalsPotential>
        )}
        <Table>
          <TableHead>
            <TableRow>
              <TableHeader>Mining pool</TableHeader>
              <TableHeader>Share</TableHeader>
              <TableHeader>Blocks</TableHeader>
              <TableHeader>Signals</TableHeader>
            </TableRow>
          </TableHead>

          <TableBody>
            {miners.map(([key, miner]) => {
              return (
                <TableRow key={key}>
                  <Cell>
                    {miner.website && (
                      <a href={miner.website} target="_blank">
                        {miner.name}
                      </a>
                    )}
                    {!miner.website && miner.name}
                  </Cell>
                  <Cell>{((miner.numBlocks / currentNumberOfBlocks) * 100).toFixed(2)}%</Cell>
                  <SignallingCell>
                    <Anchor href={`/miner/${miner.name}`}>
                      {miner.numSignallingBlocks}/{miner.numBlocks + " "}
                    </Anchor>
                  </SignallingCell>
                  <SignallingCell>
                    {miner.signals && <>✅</>}
                    {!miner.signals && <>🚫</>}
                  </SignallingCell>
                </TableRow>
              );
            })}
          </TableBody>
        </Table>
        {config.frontend.twitterHandle && <ContactTwitter />}
        {config.donation && <Donation />}
      </Content>
    </Container>
  );
}
