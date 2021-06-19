 { action, Action, createStore, createTypedHooks, thunk, Thunk }  "https://esm.sh/easy-peasy@5.0.3";
 config  "../back/config/config.ts";

 { IBlock }  "../back/common/interfaces.ts";
 { createFakeBlock }  "../back/common/fake-block.ts";
 { ISettingsModel, settings }  "./settings.ts";

 IStoreModel {
  initialize: Thunk<IStoreModel>;

  getBlocks: Thunk<IStoreModel>;
  setBlocks: Action<IStoreModel, IBlock[]>;
  autoRefresh: Thunk<IStoreModel>;
  blocks: IBlock[];
  settings: ISettingsModel;
}

 model: IStoreModel = {
  initialize: thunk( (actions) => {
     actions.settings.initialize();
  }),

  getBlocks: thunk( (actions) => {
     (config.mode === "real" || config.mode === "fake") {
       result = await fetch(`/blocks`);
      const json = (await result.json()) as IBlock[];
      console.log(json);
      actions.setBlocks(json);
    } else {
      const start = 100000;
      const end = 101016;
      const blocks: IBlock[] = [];
      for (let i = start; i < 102016; i++) {
        if (i < end) {
          blocks.push(await createFakeBlock(i));
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

  autoRefresh: thunk((actions, _, { getState }) => {
    if (!config.frontend.autoRefreshInterval) {
      return;
    }

    setInterval(async () => {
      if (!getState().settings.autoRefreshEnabled) {
        return;
      }
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

  settings,
};

const { useStoreActions, useStoreState } = createTypedHooks<IStoreModel>();
export { useStoreActions, useStoreState };

export default createStore(model);
