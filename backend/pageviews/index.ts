import { ensureFile } from "https://deno.land/std@0.98.0/fs/mod.ts";
import format from "https://deno.land/x/date_fns@v2.15.0/format/index.js";

await ensureFile("./pageviews.json");
await ensureFile("./pageviews_txt.json");
interface IPageViews {
  [key: string]: number;
}
const counter: IPageViews = JSON.parse((await Deno.readTextFile("./pageviews.json")) || "{}");
const counterTxt: IPageViews = JSON.parse((await Deno.readTextFile("./pageviews_txt.json")) || "{}");

export const pageviews = async function () {
  try {
    const date = format(new Date(), "yyyy-MM-dd", {});
    counter[date] = (counter[date] ?? 0) + 1;
    await Deno.writeTextFile("./pageviews.json", JSON.stringify(counter, null, 2));
  } catch (e) {
    console.log(e.message);
  }
};

export const pageviewsTxt = async function () {
  try {
    const date = format(new Date(), "yyyy-MM-dd", {});
    counterTxt[date] = (counterTxt[date] ?? 0) + 1;
    await Deno.writeTextFile("./pageviews_txt.json", JSON.stringify(counterTxt, null, 2));
  } catch (e) {
    console.log(e.message);
  }
};
