import { action, Action, createStore, createTypedHooks, thunk, Thunk } from "https://esm.sh/easy-peasy";

import { IBlock } from "../back/blocks/index.ts";
import config from "../back/config/config.ts";

export interface IStoreModel {
  getBlocks: Thunk<IStoreModel>;
  setBlocks: Action<IStoreModel, IBlock[]>;
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
      const end = 1800;
      const blocks: IBlock[] = [];
      for (let i = start; i < 2016; i++) {
        if (i < end) {
          blocks.push({
            height: i,
            signals: Math.floor(Math.random() * 100 + 1) > 35,
            coinbase: undefined,
            miner: undefined,
          });
        } else {
          blocks.push({
            height: i,
            signals: undefined,
            coinbase: undefined,
            miner: undefined,
          });
        }
      }
      actions.setBlocks(blocks);
    }
  }),

  setBlocks: action((state, payload) => {
    state.blocks = payload;
  }),

  blocks: [],
};

const { useStoreActions, useStoreState } = createTypedHooks<IStoreModel>();
export { useStoreActions, useStoreState };

export default createStore(model);
