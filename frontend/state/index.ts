import { action, Action, createStore, createTypedHooks, thunk, Thunk } from "https://esm.sh/easy-peasy";

import { IBlock } from "../back/common/interfaces.ts";

export interface IStoreModel {
  getBlocks: Thunk<IStoreModel>;
  setBlocks: Action<IStoreModel, IBlock[]>;
  autoRefresh: Thunk<IStoreModel>;
  blocks: IBlock[];
}

export const model: IStoreModel = {
  getBlocks: thunk(async (actions) => {
    const result = await fetch(`/blocks`);
    const json = (await result.json()) as IBlock[];
    console.log(json);
    actions.setBlocks(json);
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
