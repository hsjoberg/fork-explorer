import config from "../config/config.ts";
import { IBlock, IMinerData } from "./interfaces.ts";

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
  const currentNumberOfNonSignallingBlocks = currentNumberOfBlocks - currentNumberOfSignallingBlocks;

  return {
    currentNumberOfBlocks,
    currentNumberOfSignallingBlocks,
    currentNumberOfNonSignallingBlocks,
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
