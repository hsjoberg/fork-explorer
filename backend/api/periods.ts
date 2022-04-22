import { RouterMiddleware } from "https://deno.land/x/oak@v10.5.1/mod.ts";

export const GetPeriods: RouterMiddleware<any, any, any> = async (context) => {
  try {
    const files: number[] = [];
    for await (const file of Deno.readDir(Deno.cwd() + "/data/periods/")) {
      if (file.isFile) {
        if (!file.name.endsWith(".json")) {
          continue;
        }
        files.push(Number.parseInt(file.name.replace(".json", ""), 10));
      }
    }
    context.response.body = files;
  } catch (error) {
    console.log(error);
    context.response.status = 500;
    context.response.body = "Unknown error";
  }
};
