import { action, Action, createStore, createTypedHooks, thunk, Thunk } from "https://esm.sh/easy-peasy";

import { IBlock } from "../back/blocks/index.ts";
import config from "../back/config/config.ts";

export interface IStoreModel {
  getBlocks: Thunk<IStoreModel>;
  setBlocks: Action<IStoreModel, IBlock[]>;
  autoRefresh: Thunk<IStoreModel>;
  blocks: IBlock[];
}

export const model: IStoreModel = {
  getBlocks: thunk(async (actions) => {
    if (config.mode === "real") {
      const result = await fetch("/blocks");
      const json = (await result.json()) as IBlock[];
      console.log(json);
      actions.setBlocks(json);
    } else {
      const start = 0;
      const end = 1500;
      const blocks: IBlock[] = [];
      for (let i = start; i < 2016; i++) {
        if (i < end) {
          if (Math.floor(Math.random() * 100 + 1) > 20) {
            blocks.push({
              height: i,
              signals: true,
              miner: "abc",
              minerWebsite: undefined,
            });
          } else {
            blocks.push({
              height: i,
              signals: false,
              miner: "def",
              minerWebsite: undefined,
            });
          }
        } else {
          blocks.push({
            height: i,
            signals: undefined,
            miner: undefined,
            minerWebsite: undefined,
          });
        }
      }
      actions.setBlocks(blocks);
    }
  }),

  autoRefresh: thunk((actions) => {
    if (!config.frontend.autoRefreshInterval) {
      return;
    }

    setInterval(async () => {
      try {
        console.log("Fetching blocks");
        const result = await fetch("/blocks");
        const json = (await result.json()) as IBlock[];
        if (json && json.length === 0) {
          console.log("Got empty response from /blocks, ignoring...");
          return;
        }
        actions.setBlocks(json);
      } catch (error) {
        console.log("Couldn't fetch /blocks", error.message);
      }
    }, config.frontend.autoRefreshInterval * 1000);
  }),

  setBlocks: action((state, payload) => {
    state.blocks = payload;
  }),

  blocks: [],
};

const { useStoreActions, useStoreState } = createTypedHooks<IStoreModel>();
export { useStoreActions, useStoreState };

export default createStore(model);
