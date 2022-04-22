import { RouterMiddleware } from "https://deno.land/x/oak@v10.5.1/mod.ts";

import config from "../../config/config.ts";

export const Video: RouterMiddleware<any, any, any> = async ({ request, response }) => {
  try {
    const range = request.headers.get("range");

    const fileName = `frontend/public/${config.frontend.celebrate?.path}`;
    console.log(fileName);
    const videoSize = (await Deno.stat(fileName)).size;
    console.log(videoSize);
    if (!range) {
      console.log("hit");
      response.headers.set("Content-Length", `${videoSize}`);
      response.headers.set("Content-Type", "video/mp4");
      const file = await Deno.open(fileName, { read: true });
      response.addResource(file.rid);
      response.body = file;
    } else {
      let [start, end]: Array<string | number> = range.replace(/bytes=/, "").split("-");
      start = parseInt(start, 10);
      end = end ? parseInt(end, 10) : videoSize - 1;
      const maxChunk = 1024 * 1024;
      if (end - start + 1 > maxChunk) {
        end = start + maxChunk - 1;
      }

      response.headers.set("Content-Range", `bytes ${start}-${end}/${videoSize}`);
      response.headers.set("Accept-Ranges", "bytes");
      response.headers.set("Content-Length", `${end - start + 1}`);

      let seek;
      if (start === 0) {
        seek = Deno.SeekMode.Start;
      } else if (end === videoSize - 1) {
        seek = Deno.SeekMode.End;
      } else {
        seek = Deno.SeekMode.Current;
      }

      const file = await Deno.open(fileName, { read: true });
      await Deno.seek(file.rid, start, seek);
      const content = new Uint8Array(end - start + 1);
      await file.read(content);
      file.close();

      response.type = "video/mp4";
      response.status = 206;
      response.body = content;
    }
  } catch (e) {
    console.error(e);
  }
};
