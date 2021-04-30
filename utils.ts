import { IBlock } from "./blocks/index.ts";
import { IMinerData } from "./blocks/miners.ts";
import config from "./config/config.ts";

export const bytesToHexString = (bytes: Uint8Array) => {
  return bytes.reduce(function (memo: unknown, i: number) {
    return memo + ("0" + i.toString(16)).slice(-2); //padd with leading 0 if <16
  }, "");
};

export const bytesToString = (bytes: number[]) => {
  return String.fromCharCode.apply(null, bytes);
};

// Copied from mempool.space
// https://github.com/mempool/mempool/blob/0d03a9e6cc3e846b2f968ef15d78ffbb29e46d28/frontend/src/app/components/miner/miner.component.ts
export function hexToAscii(hex: string) {
  let str = "";
  for (let i = 0; i < hex.length; i += 2) {
    str += String.fromCharCode(parseInt(hex.substr(i, 2), 16));
  }
  return str;
}

export function computeStats(blocks: IBlock[]) {
  const threshold = config.fork.threshold;
  const currentNumberOfBlocks = blocks.reduce((prev, currentBlock) => prev + +(currentBlock.signals !== undefined), 0);
  const currentNumberOfSignallingBlocks = blocks.reduce(
    (prev, currentBlock) => prev + +(currentBlock.signals ?? false),
    0
  );
  const blocksLeftForActivation = threshold - currentNumberOfSignallingBlocks;
  const lockedIn = currentNumberOfSignallingBlocks >= threshold;
  const blocksLeftInThisPeriod = blocks.reduce((prev, currentBlock) => prev + +(currentBlock.signals === undefined), 0);
  const currentPeriodFailed = blocksLeftForActivation > blocksLeftInThisPeriod;
  const currentSignallingRatio =
    currentNumberOfBlocks > 0 ? currentNumberOfSignallingBlocks / currentNumberOfBlocks : 0;
  const currentSignallingPercentage = (currentSignallingRatio * 100).toFixed(2);
  let willProbablyActivate: boolean | undefined = undefined;
  let estimatedSignallingBlocksLeft;
  if (currentNumberOfBlocks >= 144) {
    estimatedSignallingBlocksLeft = Math.floor(currentSignallingRatio * blocksLeftInThisPeriod);
    willProbablyActivate = estimatedSignallingBlocksLeft <= blocksLeftInThisPeriod && currentSignallingRatio >= 0.9;
  }

  return {
    currentNumberOfBlocks,
    currentNumberOfSignallingBlocks,
    blocksLeftForActivation,
    blocksLeftInThisPeriod,
    lockedIn,
    currentPeriodFailed,
    willProbablyActivate,
    estimatedSignallingBlocksLeft,
    currentSignallingPercentage,
    currentSignallingRatio,
  };
}

export function computeMiners(blocks: IBlock[]) {
  // We have to reverse the array as we have to check
  // for the latest block by a miner to decide whether they
  // are signalling or not.
  const blocksReversed = blocks.slice(0);
  blocksReversed.reverse();

  const miners = blocksReversed.reduce((prev, currBlock) => {
    if (currBlock.signals === undefined) {
      return prev;
    }

    const key = currBlock.miner ?? (currBlock.signals ? "unknown_signalling" : "unknown_nonsignalling");
    if (!prev[key]) {
      prev[key] = {
        name: currBlock.miner ?? "Unrecognized miners",
        signals: currBlock.signals ?? false,
        website: currBlock.minerWebsite,
        numBlocks: 1,
      };
      return prev;
    }
    prev[key].numBlocks++;
    return prev;
  }, {} as IMinerData);

  // Sort the miners by share
  return Object.entries(miners).sort(([_, a], [_2, b]) => {
    return b.numBlocks - a.numBlocks;
  });
}
