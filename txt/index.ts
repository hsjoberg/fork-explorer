import { bech32 } from "https://esm.sh/bech32";

import config from "../config/config.ts";
import { getBlocks } from "../blocks/index.ts";
import { computeStats, computeMiners } from "../common/data.ts";

const UPCOMING = "⬚";
const SIGNALING = "▣";
const NONSIGNALING = "□";

export function homeTXT() {
  const blocks = getBlocks();
  const {
    lockedIn,
    currentPeriodFailed,
    willProbablyActivate,
    currentNumberOfBlocks,
    blocksLeftInThisPeriod,
    blocksLeftForActivation,
    currentSignallingPercentage,
    currentNumberOfSignallingBlocks,
    currentNumberOfNonSignallingBlocks,
  } = computeStats(blocks);
  const miners = computeMiners(blocks);
  const forkName = config.fork.name;
  const lnurlPayBech32 = bech32.encode(
    "lnurl",
    bech32.toWords(new TextEncoder().encode(config.donation?.lnurlPayUrl)),
    1024
  );

  let blocksTable = "";
  blocksTable += `${blocks[0].height}`;
  let i = 0;
  for (i; i < blocks.length; i++) {
    if (i % 28 === 0) blocksTable += "\n";

    const block = blocks[i];
    blocksTable += typeof block.signals === "undefined" ? UPCOMING : block.signals ? SIGNALING : NONSIGNALING;
    blocksTable += " ";
  }
  blocksTable += " ".repeat(28 - String(blocks[i].height).length) + blocks[i].height;

  const notes = [];
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

${">".repeat(currentNumberOfSignallingBlocks)}|${"-".repeat(blocksLeftInThisPeriod)}|${"<".repeat(
    currentNumberOfNonSignallingBlocks
  )}
blocks: ${currentNumberOfSignallingBlocks} signalling | ${blocksLeftInThisPeriod} upcoming | ${currentNumberOfNonSignallingBlocks} non-signalling

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

---

Donate via Lightning Network:
${lnurlPayBech32}

  `;
}
