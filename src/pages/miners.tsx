import React, { useMemo, useState } from "react";
import styled from "styled-components";
import { Link } from "wouter";
import { Helmet } from "react-helmet";

import config from "../config/config.ts";
import { computeStats, computeMiners } from "../common/data.ts";

import { Container } from "../components/Container.ts";
import { Content } from "../components/Content.ts";
import SiteTitle from "../components/SiteTitle.tsx";
import { useStoreState } from "../state/index.ts";
import SiteMenu from "../components/SiteMenu.tsx";
import { Donation } from "../components/Donation.tsx";
import ContactTwitter from "../components/ContactTwitter.tsx";
import CommonHeader from "../components/CommonHeader.ts";
import { IMinerData } from "../common/interfaces.ts";
import Body from "../components/Body.ts";

const Table = styled.table`
  width: 100%;
  box-shadow: #000 3px 3px 14px;
  border-radius: 6px;
  margin: 0 3px 30px;
  border: 0;
  border-collapse: collapse;
  border-radius: 8px;
  overflow: hidden;

  @media (max-width: 500px) {
    transform: scale(0.95);
    transform-origin: top;
  }
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

export const TableHeaderLink = styled.a`
  color: #efefef;
  cursor: pointer;
  text-decoration: none;
  display: inline-block;
  position: relative;
`;

export const TableHeaderSortContainer = styled.span`
  display: block;
  position: absolute;
  right: -10px;
  top: 0;
`;

const Cell = styled.td`
  color: #f0f0f0;
  > a {
    color: #f0f0f0;
  }
  padding: 16px;
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

type SortKey = "name" | "share" | "blocks" | "signallingStatus";
interface TableRow {
  name: string;
  share: string;
  blocks: string;
  signallingStatus: boolean;
  website: string | undefined;
}

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
  const [sortKey, setSortKey] = useState<SortKey>("share");
  const [sortDirection, setSortDirection] = useState<"ASC" | "DESC">("DESC");

  const fixTable = (miners: [string, IMinerData][], key: SortKey): TableRow[] => {
    const data = miners
      .map(([_, miner]) => {
        const r: TableRow = {
          name: miner.name,
          share: `${((miner.numBlocks / currentNumberOfBlocks) * 100).toFixed(2)}%`,
          blocks: `${miner.numSignallingBlocks}/${miner.numBlocks + " "}`,
          signallingStatus: miner.signals,
          website: miner.website,
        };
        return r;
      })
      .sort((a, b) => {
        if (key === "blocks") {
          return Number.parseInt(b["blocks"].split("/")[0]) - Number.parseInt(a["blocks"].split("/")[0]);
        } else if (key === "share") {
          return Number.parseFloat(b["share"].split("%")[0]) - Number.parseFloat(a["share"].split("%")[0]);
        }
        return `${b[key]}`.localeCompare(`${a[key]}`);
      });

    if (sortDirection === "ASC") {
      data.reverse();
    }
    return data;
  };

  const onClickSort = (e: React.MouseEvent<HTMLAnchorElement, MouseEvent>, key: SortKey) => {
    e.preventDefault();
    if (sortKey !== key) {
      setSortKey(key);
      setSortDirection("DESC");
    } else {
      setSortDirection(sortDirection === "DESC" ? "ASC" : "DESC");
    }
  };

  const tableData = fixTable(miners, sortKey);

  return (
    <Container>
      <Helmet>
        <title>{forkName} activation - Miners</title>
      </Helmet>
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
        <Body>
          <Table>
            <TableHead>
              <TableRow>
                <TableHeader>
                  <TableHeaderLink href="#" onClick={(e) => onClickSort(e, "name")}>
                    Mining pool{" "}
                    <TableHeaderSortContainer>
                      {sortKey === "name" && (sortDirection === "ASC" ? "▴" : "▾")}
                    </TableHeaderSortContainer>
                  </TableHeaderLink>
                </TableHeader>
                <TableHeader>
                  <TableHeaderLink href="#" onClick={(e) => onClickSort(e, "share")}>
                    Share{" "}
                    <TableHeaderSortContainer>
                      {sortKey === "share" && (sortDirection === "ASC" ? "▴" : "▾")}
                    </TableHeaderSortContainer>
                  </TableHeaderLink>
                </TableHeader>
                <TableHeader>
                  <TableHeaderLink href="#" onClick={(e) => onClickSort(e, "blocks")}>
                    Blocks{" "}
                    <TableHeaderSortContainer>
                      {sortKey === "blocks" && (sortDirection === "ASC" ? "▴" : "▾")}
                    </TableHeaderSortContainer>
                  </TableHeaderLink>
                </TableHeader>
                <TableHeader>
                  <TableHeaderLink href="#" onClick={(e) => onClickSort(e, "signallingStatus")}>
                    Signals{" "}
                    <TableHeaderSortContainer>
                      {sortKey === "signallingStatus" && (sortDirection === "ASC" ? "▴" : "▾")}
                    </TableHeaderSortContainer>
                  </TableHeaderLink>
                </TableHeader>
              </TableRow>
            </TableHead>
            <TableBody>
              {tableData.map((row) => {
                return (
                  <TableRow key={row.name + row.signallingStatus}>
                    <Cell>
                      {row.website && (
                        <a href={row.website} target="_blank">
                          {row.name}
                        </a>
                      )}
                      {!row.website && row.name}
                    </Cell>
                    <Cell>{row.share}</Cell>
                    <SignallingCell>
                      <Link href={`/miner/${row.name}`}>{row.blocks}</Link>
                    </SignallingCell>
                    <SignallingCell>
                      {row.signallingStatus && <>✅</>}
                      {!row.signallingStatus && <>🚫</>}
                    </SignallingCell>
                  </TableRow>
                );
              })}
            </TableBody>
          </Table>
        </Body>
        {config.frontend.twitterHandle && <ContactTwitter />}
        {config.donation && <Donation />}
      </Content>
    </Container>
  );
}
