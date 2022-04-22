import React from "react";
import styled, { css, keyframes } from "styled-components";

import { useStoreState } from "../state/index.ts";

export const BlockContainer = styled.div`
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
  justify-content: center;
  padding: 3px;
  background-color: ${(props) => props.theme.block.container.backgroundColor};
  box-shadow: ${(props) => props.theme.block.container.boxShadow};
  border-radius: 6px;
  margin-bottom: 30px;
`;

export const BlockStyle = styled.div<{ signals?: boolean; selected?: boolean; big?: boolean }>`
  background: ${(props) =>
    props.signals ? props.theme.block.block.signalling.background : props.theme.block.block.nonSignalling.background};
  background-size: ${(props) =>
    props.signals
      ? props.theme.block.block.signalling.backgroundSize
      : props.theme.block.block.nonSignalling.backgroundSize};
  border: 1px solid ${(props) => props.theme.block.container.backgroundColor};
  width: ${(props) => (props.big ? "36px" : "18px")};
  height: ${(props) => (props.big ? "36px" : "18px")};
  margin: 3px;
  border-radius: 4px;
  position: relative;
  ${(props) => (props.signals ? props.theme.block.block.signalling.after : "")}
  ${(props) => (!props.signals ? props.theme.block.block.nonSignalling.after : "")}
  ${(props) => (props.selected ? `box-shadow: rgb(255 167 0) 0px 0px 2px 3px;` : "")}
`;

export interface IBlockProps {
  height: number;
  signals: boolean;
  miner: string | undefined;
  selected: boolean;
  big?: boolean;
}

export function Block({ height, signals, miner, selected, big }: IBlockProps) {
  const hover = `Height: ${height}
Miner: ${miner ?? "Unknown"}
Signalling: ${signals ? "Yes" : "No"}`;

  return (
    <a href={`https://mempool.space/block/${height}?showDetails=true`} target="_blank">
      <BlockStyle title={hover} signals={signals} selected={selected} big={big}></BlockStyle>
    </a>
  );
}

const fadeIn = keyframes`
  0% {
    opacity: 0.30;
  }
  20% {
    opacity: 1;
  }
  80% {
    opacity: 1;
  }
  100% {
    opacity: 0.30;
  }
`;

const animation = css`
  2.6s ${fadeIn} linear infinite
`;

export const EmptyBlockStyle = styled.div<{ nextBlock: boolean; big?: boolean }>`
  border: ${(props) => props.theme.block.block.upcoming.border};
  background: ${(props) => props.theme.block.block.upcoming.background};
  width: ${(props) => (props.big ? "36px" : "18px")};
  height: ${(props) => (props.big ? "36px" : "18px")};
  margin: 3px;
  border-radius: 4px;

  animation: ${(props) => (props.nextBlock ? animation : "none")};
`;

export interface IEmptyBlockProps {
  height?: number;
  nextBlock: boolean;
  big?: boolean;
}

export function EmptyBlock({ height, nextBlock, big }: IEmptyBlockProps) {
  const autoRefreshEnabled = useStoreState((store) => store.settings.autoRefreshEnabled);

  return (
    <EmptyBlockStyle
      title={`Upcoming block${height ? ` ${height}` : ""}`}
      nextBlock={autoRefreshEnabled && nextBlock}
      big={big}
    />
  );
}
