import { bech32 } from "https://esm.sh/bech32";

import config from "../../config/config.ts";
import { getBlocks } from "../blocks/index.ts";
import { computeStats, computeMiners } from "../../common/data.ts";

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

  const totalSignalling = miners
    .filter(([_, m]) => m.signals)
    .reduce((sum, [_, m]) => sum + m.numBlocks / currentNumberOfBlocks, 0);

  let blocksTable = "";
  blocksTable += `${blocks[0].height}`;
  for (let i = 0; i < blocks.length; i++) {
    if (i % 28 === 0) blocksTable += "\n";

    const block = blocks[i];
    blocksTable += typeof block.signals === "undefined" ? UPCOMING : block.signals ? SIGNALING : NONSIGNALING;
    blocksTable += " ";
  }
  const last = blocks[blocks.length - 1];
  blocksTable += "\n";
  blocksTable += " ".repeat(56 - String(last.height).length - 1) + String(last.height);

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
    }
  }

  const donation = config.donation
    ? `
---

Donate via Lightning Network:
${bech32.encode("lnurl", bech32.toWords(new TextEncoder().encode(config.donation?.lnurlPayUrl)), 1024)}`
    : "";

  const progressBar =
    ">".repeat(Math.ceil(currentNumberOfSignallingBlocks / 25)) +
    "-".repeat(Math.ceil(blocksLeftInThisPeriod / 25)) +
    "<".repeat(Math.ceil(currentNumberOfNonSignallingBlocks / 25));
  const pct90 = Math.round(progressBar.length * 0.9);
  const label90Pct = " ".repeat(pct90 - 1) + "90%";
  const progressBarWith90Pct = progressBar.slice(0, pct90) + "|" + progressBar.slice(pct90);

  return `
###

${forkName} activation

${config.fork.info.join("\n\n")}

---

Current signalling period of 2016 blocks

${label90Pct}
${progressBarWith90Pct}
blocks: ${currentNumberOfSignallingBlocks} signalling | ${blocksLeftInThisPeriod} upcoming | ${currentNumberOfNonSignallingBlocks} non-signalling

${notes.map((n) => "- " + n).join("\n")}

${blocksTable}

---

Miners

Current total: ${(totalSignalling * 100).toFixed(2)}% ✅

${miners
  .map(
    ([_, miner]) =>
      `- ${miner.name}, share: ${((miner.numBlocks / currentNumberOfBlocks) * 100).toFixed(2)}. ${
        miner.signals ? `signals! ✅` : `not signaling 🚫`
      }`
  )
  .join("\n")}

${donation}
  `;
}
