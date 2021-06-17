import { setupPeriod } from "../backend/blocks/index.ts";

const periodString = Deno.args[0];

if (!periodString) {
  console.log("Usage: [period]");
  Deno.exit(0);
}

const period = Number.parseInt(periodString);

if (Number.isNaN(period)) {
  console.log("Error: Invalid period: " + periodString + " (evaluated as " + period + ")");
  Deno.exit(1);
}

const difficultyPeriodStartHeight = period * 2016;
const difficultyPeriodEndHeight = difficultyPeriodStartHeight + 2016;

const blocks = await setupPeriod(period * 2016 + 2016, difficultyPeriodStartHeight, difficultyPeriodEndHeight);
await Deno.writeTextFile(Deno.cwd() + `/data/periods/${period}.json`, JSON.stringify(blocks));
