import React from "https://esm.sh/react@17.0.2";
import styled from "https://esm.sh/styled-components";

export const BlockContainer = styled.div`
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

export const BlockStyle = styled.div<{ signals?: boolean }>`
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

export const EmptyBlock = styled.div`
  border: 1px solid #5a5a5a;
  width: 18px;
  height: 18px;
  margin: 3px;
  border-radius: 4px;
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
    <a href={`https://mempool.space/block/${height}`} target="_blank">
      <BlockStyle title={hover} signals={signals}></BlockStyle>
    </a>
  );
}
