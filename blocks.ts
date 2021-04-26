import { getblockcount, getblockhash, getblockheader } from "./jsonrpc/index.ts";

import config from "./config/config.ts";

export interface IBlock {
  height: number;
  // hash: string;
  signals: boolean;
}

const blocks: IBlock[] = [];

export async function bootstrapBlocks() {
  console.log("Bootstrapping block data...");

  const blockCount = await getblockcount();
  const startHeight = blockCount - 1000;
  console.log(`Current block height is ${blockCount}`);

  for (let i = startHeight; i < blockCount; i++) {
    try {
      const blockHash = await getblockhash(i);
      const blockheader = await getblockheader(blockHash);
      blocks.push({
        height: blockheader.height,
        // hash: blockheader.hash,
        signals: (blockheader.version & (config.fork.versionBit + 1)) === config.fork.versionBit + 1,
      });
    } catch (error) {
      console.error("Block boostrapping failed");
      throw error;
    }
  }

  console.log("Done.");
}

export function getBlocks() {
  return blocks;
}
