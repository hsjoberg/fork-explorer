import { action, Action, createStore, createTypedHooks, thunk, Thunk } from "https://esm.sh/easy-peasy@5.0.3";
import config from "../back/config/config.ts";

import { IBlock } from "../back/common/interfaces.ts";
import { createFakeBlock } from "../back/common/fake-block.ts";
import { ISettingsModel, settings } from "./settings.ts";

type MonitoringMode = "current_period" | "historic_period";

export interface IStoreModel {
  initialize: Thunk<IStoreModel>;

  setMonitoringMode: Action<IStoreModel, MonitoringMode>;

  getBlocks: Thunk<IStoreModel>;
  setBlocks: Action<IStoreModel, IBlock[]>;

  getPeriod: Thunk<IStoreModel, number>;

  setActivePeriod: Action<IStoreModel, number | null>;
  setAvailablePeriods: Action<IStoreModel, number[]>;

  changeMonitoringPeriod: Thunk<IStoreModel, number | "current">;
  autoRefresh: Thunk<IStoreModel>;

  blocks: IBlock[];
  availablePeriods: number[];
  activePeriod: number | null;
  monitoringMode: MonitoringMode;

  settings: ISettingsModel;
}

export const model: IStoreModel = {
  initialize: thunk(async (actions) => {
    await actions.settings.initialize();
    if (config.mode !== "fake-frontend") {
      const periodsResult = await fetch("/periods");
      const periods: number[] = await periodsResult.json();
      actions.setAvailablePeriods(periods);
    }
  }),

  setMonitoringMode: action((state, payload) => {
    state.monitoringMode = payload;
  }),

  getBlocks: thunk(async (actions) => {
    if (config.mode === "real" || config.mode === "fake") {
      const result = await fetch(`/blocks`);
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

  getPeriod: thunk(async (actions, payload) => {
    if (config.mode === "real" || config.mode === "fake") {
      const result = await fetch(`/period/${payload}`);
      const json = (await result.json()) as IBlock[];
      actions.setBlocks(json);
    } else {
      console.log("WARNING: getPeriod for mode fake-frontend unimplemented!");
    }
  }),

  changeMonitoringPeriod: thunk(async (actions, period) => {
    if (period !== "current") {
      await actions.getPeriod(period);
      actions.setMonitoringMode("historic_period");
    } else {
      await actions.getBlocks();
      actions.setMonitoringMode("current_period");
    }

    actions.setActivePeriod(period === "current" ? null : period);
  }),

  autoRefresh: thunk((actions, _, { getState }) => {
    if (!config.frontend.autoRefreshInterval || getState().monitoringMode === "historic_period") {
      return;
    }

    setInterval(async () => {
      if (!getState().settings.autoRefreshEnabled || getState().monitoringMode === "historic_period") {
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

  setActivePeriod: action((state, payload) => {
    state.activePeriod = payload;
  }),

  setAvailablePeriods: action((state, payload) => {
    state.availablePeriods = payload;
  }),

  blocks: [],
  availablePeriods: [],
  activePeriod: null,
  monitoringMode: "current_period",

  settings,
};

const { useStoreActions, useStoreState } = createTypedHooks<IStoreModel>();
export { useStoreActions, useStoreState };

export default createStore(model);
