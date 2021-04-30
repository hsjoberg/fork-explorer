import config from "../config/config.ts";
import { getBlocks } from "../blocks/index.ts";
import { computeStats, computeMiners } from "../utils.ts";

const WHITE = "⬚";
const BLACK = "▣";

export function homeTXT() {
  const blocks = getBlocks();
  const {
    blocksLeftForActivation,
    lockedIn,
    currentNumberOfBlocks,
    currentPeriodFailed,
    currentSignallingPercentage,
    willProbablyActivate,
  } = computeStats(blocks);
  const miners = computeMiners(blocks);
  const forkName = config.fork.name;

  let blocksTable = "";
  for (let i = 0; i < blocks.length; i++) {
    if (i % 25 === 0) blocksTable += "\n";

    const block = blocks[i];
    blocksTable += block.signals ? BLACK : WHITE + " ";
  }

  let notes = [];
  if (lockedIn) notes.push(`${forkName.toUpperCase()} IS LOCKED IN FOR DEPLOYMENT!`);
  else {
    notes.push(`${blocksLeftForActivation} ${forkName} blocks left until softfork is locked in.`);
    if (currentPeriodFailed)
      notes.push(`${forkName} cannot be locked in within this period (90% of the blocks have to signal).`);
    else {
      if (willProbablyActivate)
        notes.push(`Taproot will lock in with the current signalling ratio (${currentSignallingPercentage}%)!`);
      else notes.push(`Taproot will not lock in with the current signalling ratio (${currentSignallingPercentage}%)`);
      notes.push(``);
    }
  }

  return `
###

${forkName} activation

${config.fork.info.join("\n\n")}

---

Current signalling period of 2016 blocks

${notes.map((n) => "- " + n).join("\n")}
${blocksTable}

---

Miners

${miners
  .map(
    ([_, miner]) =>
      `- ${miner.name}, share: ${((miner.numBlocks / currentNumberOfBlocks) * 100).toFixed(2)}. ${
        miner.signals ? `signals! ✅` : `not signaling 🚫`
      }`
  )
  .join("\n")}
  `;
}
