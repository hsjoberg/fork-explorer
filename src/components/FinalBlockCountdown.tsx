import React from "react";
import styled from "styled-components";

import { BlockContainer, Block, EmptyBlock } from "./Block.tsx";
import CommonHeader from "./CommonHeader.ts";
import { useStoreState } from "../state/index.ts";
import config from "../config/config.ts";
import { computeStats } from "../common/data.ts";

const FinalCountdownHolder = styled.div`
  margin: auto;
`;

const FinalCountdownBar = styled(BlockContainer)``;

export default function FinalBlockCountdown() {
  const blocks = useStoreState((store) => store.blocks);
  const forkName = config.fork.name;
  const { blocksLeftForActivation } = computeStats(blocks);

  if (blocksLeftForActivation === 0) {
    return null;
  }

  const emptyBlocks = new Array(blocksLeftForActivation).fill(<EmptyBlock big nextBlock={false} />);
  const r = blocks
    .filter((block) => block.signals)
    .slice(0 - (33 * 2 - blocksLeftForActivation))
    .map((block, i) => {
      if (block.signals === undefined) {
        return;
      }
      return <Block big key={i} height={block.height} signals={block.signals} miner={block.miner} selected={false} />;
    })
    .concat(emptyBlocks);

  return (
    <FinalCountdownHolder>
      <CommonHeader>
        {blocksLeftForActivation} more signalling block{blocksLeftForActivation > 1 && "s"} required for the {forkName}{" "}
        softfork to lock in!
      </CommonHeader>
      <FinalCountdownBar>{r}</FinalCountdownBar>
    </FinalCountdownHolder>
  );
}
