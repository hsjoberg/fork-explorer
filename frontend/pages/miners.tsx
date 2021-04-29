import React, { useMemo } from "https://esm.sh/react@17.0.2";
import styled from "https://esm.sh/styled-components";

import config from "../back/config/config.ts";

import { Container } from "../components/Container.ts";
import { Content } from "../components/Content.ts";
import SiteTitle from "../components/SiteTitle.tsx";
import { useStoreState } from "../state/index.ts";
import SiteMenu from "../components/SiteMenu.tsx";

const Table = styled.table`
  max-width: 100%;
  width: 1000px;

  box-shadow: #000 3px 3px 14px;
  border-radius: 6px;
  margin: 0 auto 100px;
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
  padding: 19px;
`;

const SignallingCell = styled.td`
  padding: 16px;
  text-align: center;
`;

interface IMinerData {
  [key: string]: {
    name: string;
    signals: boolean;
  };
}

export default function Miners() {
  const blocks = useStoreState((store) => store.blocks);

  const forkName = config.fork.name;

  const miners = useMemo(() => {
    // We have to reverse the array as we have to check
    // for the latest block by a miner to decide whether they
    // are signalling or not.
    const blocksReversed = blocks.slice(0);
    blocksReversed.reverse();

    return blocksReversed.reduce((prev, currBlock) => {
      if (!currBlock.miner) {
        return prev;
      }

      if (!prev[currBlock.miner]) {
        prev[currBlock.miner] = {
          name: currBlock.miner,
          signals: currBlock.signals ?? false,
        };
      }
      return prev;
    }, {} as IMinerData);
  }, [blocks]);

  return (
    <Container>
      <head>
        <title>{forkName} activation - Miners</title>
      </head>
      <Content>
        <SiteTitle />
        <SiteMenu />
        <Table>
          <TableHead>
            <TableRow>
              <TableHeader>Miner name</TableHeader>
              <TableHeader>Signals</TableHeader>
            </TableRow>
          </TableHead>

          <TableBody>
            {Object.entries(miners).map(([_, miner]) => {
              return (
                <TableRow>
                  <Cell>{miner.name}</Cell>
                  <SignallingCell>
                    {miner.signals && <>✅</>}
                    {!miner.signals && <>🚫</>}
                  </SignallingCell>
                </TableRow>
              );
            })}
          </TableBody>
        </Table>
      </Content>
    </Container>
  );
}
