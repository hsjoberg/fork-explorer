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
       result =  fetch(`/blocks`);
       json = ( result.json())  IBlock[];
      console.log(json);
      actions.setBlocks(json);
    }  {
       start = 100000;
       end = 101016;
       blocks: IBlock[] = [];
       (let i = start; i < 102016; i++) {
         (i < end) {
          blocks.push( createFakeBlock(i));
        }  {
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
     (!config.frontend.autoRefreshInterval) {
      ;
    }

    setInterval( () => {
       (!getState().settings.autoRefreshEnabled) {
        ;
      }
       {
        console.log("Fetching blocks");
         = fetch("/blocks");
         json = ( result.json())  IBlock[];
         (json && json.length === 0) {
          console.log("Got empty response  /blocks, ignoring...");
          ;
        }
        actions.setBlocks(json);
      }  (error) {
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

 { useStoreActions, useStoreState } = createTypedHooks<IStoreModel>();
 { useStoreActions, useStoreState };

  createStore(model);
