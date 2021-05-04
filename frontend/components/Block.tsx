import React from "https://esm.sh/react@17.0.2";
import styled from "https://esm.sh/styled-components";

export const BlockContainer = styled.div`
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
  justify-content: center;
  padding: 12px 3px;
  background-color: rgba(255,255,255,0.1);
  box-shadow: #000 3px 3px 14px;
  border-radius: 6px;
  margin-bottom: 30px;
`;

export const BlockStyle = styled.div<{ signals?: boolean }>`
  background: ${(props) => props.signals ? "#1DB492" : "#737474"};
  border: 1px solid rgba(255,255,255,0.1);
  width: 18px;
  height: 18px;
  margin: 3px;
  border-radius: 4px;
  &:after {
    content: ${(props) => props.signals ? "'•'" : "' '"};
    color: rgba(255,255,255,0.5);
    right: 4px;
    bottom: -1px;
    position: absolute;
  }
`;

export const EmptyBlock = styled.div`
  border: 1px solid #5a5a5a;
  width: 18px;
  height: 18px;
  margin: 3px;
  border-radius: 4px;
  position: relative;
`;

export interface IBlockProps {
  height: number;
  signals: boolean | undefined;
  miner: string | undefined;
}

export function Block({ height, signals, miner }: IBlockProps) {
  if (signals === undefined) {
    return <EmptyBlock title={`Coming block ${height}`} />;
  }

  const hover = `Height: ${height}
Miner: ${miner ?? "Unknown"}`;

  return (
    <a href={`https://mempool.space/block/${height}?showDetails=true`} target="_blank">
      <BlockStyle title={hover} signals={signals}></BlockStyle>
    </a>
  );
}
