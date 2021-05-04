import React, { useMemo } from "https://esm.sh/react@17.0.2";
import styled from "https://esm.sh/styled-components";

import config from "../back/config/config.ts";
import { computeStats, computeMiners } from "../back/common/data.ts";

import { Container } from "../components/Container.ts";
import { Content } from "../components/Content.ts";
import SiteTitle from "../components/SiteTitle.tsx";
import { useStoreState } from "../state/index.ts";
import SiteMenu from "../components/SiteMenu.tsx";
import { Donation } from "../components/Donation.tsx";
import ContactTwitter from "../components/ContactTwitter.tsx";

const Table = styled.table`
  width: 100%;
  max-width: 1050px;
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
  padding: 16px;
  text-align: center;
`;

const Totals = styled.div`
  font-size: 24px;
  color: #ff9b20;
  text-shadow: #000 2px 2px 0px;
  max-width: 600px;
  margin: auto;
  text-align: center;
  > span {
    padding-left: 15px;
  }
  margin-bottom: 20px;
`;

export default function Miners() {
  const blocks = useStoreState((store) => store.blocks);
  const forkName = config.fork.name;
  const { currentNumberOfBlocks } = computeStats(blocks);
  const miners = useMemo(() => computeMiners(blocks), [blocks]);
  const totalSignalling = miners
    .filter(([_, m]) => m.signals)
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
          Current total: {(totalSignalling * 100).toFixed(2)}% <>✅</>
        </Totals>
        <Table>
          <TableHead>
            <TableRow>
              <TableHeader>Miner name</TableHeader>
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
                    {miner.numSignallingBlocks}/{miner.numBlocks + " "}
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
