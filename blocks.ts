import { getblockcount, getblockhash, getblockheader } from "./jsonrpc/index.ts";

import config from "./config/config.ts";

export interface IBlock {
  height: number;
  // hash: string;
  signals: boolean | undefined;
}

let blocks: IBlock[] = [];

async function createBlock(height: number): Promise<IBlock> {
  const blockHash = await getblockhash(height);
  const blockheader = await getblockheader(blockHash);
  return {
    height: blockheader.height,
    // hash: blockheader.hash,
    signals: (blockheader.version & (config.fork.versionBit + 1)) === config.fork.versionBit + 1,
  };
}

async function setupPeriod(blockCount: number, startHeight: number, endHeight: number): Promise<IBlock[]> {
  const blocks: IBlock[] = [];
  for (let i = startHeight; i < endHeight; i++) {
    if (i > blockCount) {
      blocks.push({
        height: i,
        signals: undefined,
      });
      continue;
    }
    try {
      blocks.push(await createBlock(i));
    } catch (error) {
      console.error("Block boostrapping failed");
      throw error;
    }
  }

  return blocks;
}

export async function bootstrapBlocks() {
  console.log("Bootstrapping block data...");

  let blockCount = await getblockcount();
  const difficultyPeriodStartHeight = blockCount - (blockCount % 2016);
  const difficultyPeriodEndHeight = difficultyPeriodStartHeight + 2016;
  console.log(`Current block height is ${blockCount}`);
  blocks = await setupPeriod(blockCount, difficultyPeriodStartHeight, difficultyPeriodEndHeight);

  setInterval(async () => {
    const newBlockCount = await getblockcount();
    if (newBlockCount > blockCount) {
      console.log("Found new block");
      if (newBlockCount % 2016 === 0) {
        blockCount = newBlockCount;
        console.log("New block period!");
        const difficultyPeriodStartHeight = blockCount - (blockCount % 2016);
        const difficultyPeriodEndHeight = difficultyPeriodStartHeight + 2016;

        console.log(`Current block height is ${blockCount}`);
        blocks = await setupPeriod(blockCount, difficultyPeriodStartHeight, difficultyPeriodEndHeight);
        return;
      }

      for (let i = blockCount + 1; i <= newBlockCount; i++) {
        const block = await createBlock(i);
        blocks[i % 2016] = block;
        console.log(`Block ${i} set`);
      }
      blockCount = newBlockCount;
    }
  }, 10 * 1000);

  console.log("Done.");
}

export function getBlocks() {
  return blocks;
}
