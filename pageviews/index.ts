import { Middleware } from "https://deno.land/x/oak@v7.3.0/mod.ts";
import { ensureFile } from "https://deno.land/std/fs/mod.ts";
import format from "https://deno.land/x/date_fns@v2.15.0/format/index.js";

await ensureFile("./pageviews.json");
interface IPageViews {
  [key: string]: number;
}
const pageViews: IPageViews = JSON.parse((await Deno.readTextFile("./pageviews.json")) || "{}");

const PageviewsMiddleware: Middleware = async function (_, next) {
  try {
    const date = format(new Date(), "yyyy-MM-dd", {});
    pageViews[date] = pageViews[date] ?? 0;
    pageViews[date] = pageViews[date] + 1;
    await Deno.writeTextFile("./pageviews.json", JSON.stringify(pageViews, null, 2));
  } catch (e) {
    console.log(e.message);
  }

  await next();
};

export default PageviewsMiddleware;
