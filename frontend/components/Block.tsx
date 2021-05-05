import React from "https://esm.sh/react@17.0.2";
import styled, { css, keyframes } from "https://esm.sh/styled-components";

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

export const BlockStyle = styled.div<{ signals?: boolean; selected?: boolean }>`
  background: ${(props) =>
    props.signals
      ? "linear-gradient(45deg, rgba(18,209,0,1) 0%, rgba(9,89,0,1) 100%)"
      : "linear-gradient(45deg, rgba(209,0,0,1) 0%, rgba(89,0,0,1) 100%)"};
  border: 1px solid #434343;
  width: 18px;
  height: 18px;
  margin: 3px;
  border-radius: 4px;
  ${(props) => (props.selected ? `box-shadow: rgb(255 167 0) 0px 0px 2px 3px;` : "")}
`;

export interface IBlockProps {
  height: number;
  signals: boolean;
  miner: string | undefined;
  selected: boolean;
}

export function Block({ height, signals, miner, selected }: IBlockProps) {
  const hover = `Height: ${height}
Miner: ${miner ?? "Unknown"}
Signalling: ${signals ? "Yes" : "No"}`;

  return (
    <a href={`https://mempool.space/block/${height}?showDetails=true`} target="_blank">
      <BlockStyle title={hover} signals={signals} selected={selected}></BlockStyle>
    </a>
  );
}

const fadeIn = keyframes`
  0% {
    opacity: 0.35;
  }
  20% {
    opacity: 1;
  }
  80% {
    opacity: 1;
  }
  100% {
    opacity: 0.35;
  }
`;

const animation = css`
  2.6s ${fadeIn} linear infinite
`;

export const EmptyBlockStyle = styled.div<{ nextBlock: boolean }>`
  border: 1px solid #5a5a5a;
  width: 18px;
  height: 18px;
  margin: 3px;
  border-radius: 4px;

  /* display: inline-block; */
  /* visibility: ${(props) => (false ? "hidden" : "visible")}; */
  animation: ${(props) => (props.nextBlock ? animation : "none")};
`;

export interface IEmptyBlockProps {
  height: number;
  nextBlock: boolean;
}

export function EmptyBlock({ height, nextBlock }: IEmptyBlockProps) {
  return <EmptyBlockStyle title={`Coming block ${height}`} nextBlock={nextBlock} />;
}
