import { ensureFile } from "https://deno.land/std/fs/mod.ts";
import format from "https://deno.land/x/date_fns@v2.15.0/format/index.js";

await ensureFile("./pageviews.json");
interface IPageViews {
  [key: string]: number;
}
const counter: IPageViews = JSON.parse((await Deno.readTextFile("./pageviews.json")) || "{}");

const pageviews = async function () {
  try {
    const date = format(new Date(), "yyyy-MM-dd", {});
    counter[date] = (counter[date] ?? 0) + 1;
    await Deno.writeTextFile("./pageviews.json", JSON.stringify(counter, null, 2));
  } catch (e) {
    console.log(e.message);
  }
};

export default pageviews;
