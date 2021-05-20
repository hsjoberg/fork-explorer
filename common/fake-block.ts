import miners from "./miners.ts";
import { IBlock } from "./interfaces.ts";

export async function createFakeBlock(height: number): Promise<IBlock> {
  const minerKeys = Object.keys(miners.coinbase_tags);
  const randomIndex = Math.floor(Math.random() * minerKeys.length);
  const randomKey = minerKeys[randomIndex];
  const minerData = miners.coinbase_tags[randomKey];

  return await Promise.resolve({
    miner: minerData?.name,
    minerWebsite: minerData?.link,
    height,
    signals: Math.random() > 0.5,
  });
}
