import config from "./config.ts";
import { IBlock, IMinerData, IMiners } from "./interfaces.ts";

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
  const currentSignallingRatioToAll = currentNumberOfBlocks > 0 ? currentNumberOfSignallingBlocks / 2016 : 0;
  const currentSignallingPercentageToAll = (currentSignallingRatioToAll * 100).toFixed(2);
  const estimatedSignallingBlocksLeft = Math.floor(currentSignallingRatio * blocksLeftInThisPeriod);
  const willProbablyActivate = estimatedSignallingBlocksLeft <= blocksLeftInThisPeriod && currentSignallingRatio >= 0.9;
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
    currentSignallingRatio,
    currentSignallingRatioToAll,
    currentSignallingPercentage,
    currentSignallingPercentageToAll,
  };
}

export function computeMiners(blocks: IBlock[]): [string, IMinerData][] {
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
        numBlocks: 0,
        numSignallingBlocks: 0,
      };
    }
    prev[key].numBlocks++;
    if (currBlock.signals) {
      prev[key].numSignallingBlocks++;
    }
    return prev;
  }, {} as IMiners);

  // Sort the miners by share
  return Object.entries(miners).sort(([_, a], [_2, b]) => {
    return b.numBlocks - a.numBlocks;
  });
}
