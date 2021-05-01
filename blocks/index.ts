import { getblock, getblockcount, getblockhash, getrawtransaction } from "../jsonrpc/index.ts";

import config from "../config/config.ts";
import miners from "./miners.ts";
import { hexToAscii } from "../utils.ts";

export interface IBlock {
  height: number;
  signals: boolean | undefined;
  miner: string | undefined;
  minerWebsite: string | undefined;
}

let blocks: IBlock[] = [];

async function createBlock(height: number): Promise<IBlock> {
  const blockHash = await getblockhash(height);
  const block = await getblock(blockHash);

  const generationTransactionTxId = block.tx[0];
  const generationTransaction = await getrawtransaction(generationTransactionTxId, block.hash);
  const payoutAddress = generationTransaction.vout[0]?.scriptPubKey?.addresses?.[0] ?? "";
  const coinbase = hexToAscii(generationTransaction.vin?.[0]?.coinbase ?? "");

  const minerData = (() => {
    for (const [tag, minerInfo] of Object.entries(miners.coinbase_tags)) {
      if (coinbase.includes(tag)) {
        return { name: minerInfo.name, website: minerInfo.link };
      }
    }

    for (const [tag, minerInfo] of Object.entries(miners.payout_addresses)) {
      if (payoutAddress == tag) {
        return { name: minerInfo.name, website: minerInfo.link };
      }
    }

    return undefined;
  })();

  return {
    miner: minerData?.name,
    minerWebsite: minerData?.website,
    height: block.height,
    signals: (block.version & (1 << config.fork.versionBit)) === 1 << config.fork.versionBit,
  };
}

async function setupPeriod(blockCount: number, startHeight: number, endHeight: number): Promise<IBlock[]> {
  const blocks: IBlock[] = [];
  for (let i = startHeight; i < endHeight; i++) {
    console.log(`Fetching: ${i}`);
    if (i > blockCount) {
      blocks.push({
        height: i,
        signals: undefined,
        miner: undefined,
        minerWebsite: undefined,
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

  console.log("Bootstrapping done.");
}

export function getBlocks() {
  return blocks;
}
