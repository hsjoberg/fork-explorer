import { action, Action, thunk, Thunk } from "easy-peasy";

export enum Theme {
  "default" = "default",
  "colorblind" = "colorblind",
  "saltyroger" = "saltyroger",
}

export interface ISettingsModel {
  initialize: Thunk<ISettingsModel>;

  changeTheme: Thunk<ISettingsModel, Theme>;
  changeAutoRefreshEnabled: Thunk<ISettingsModel, boolean>;

  setTheme: Action<ISettingsModel, Theme>;
  setAutoRefreshEnabled: Action<ISettingsModel, boolean>;

  theme: Theme;
  autoRefreshEnabled: boolean;
}

export const settings: ISettingsModel = {
  initialize: thunk(async (actions) => {
    actions.setTheme((await (window as any).localStorage.getItem("theme")) ?? "default");
    actions.setAutoRefreshEnabled(
      JSON.parse((await (window as any).localStorage.getItem("autoRefreshEnabled")) ?? true)
    );
  }),

  changeTheme: thunk(async (actions, payload) => {
    await (window as any).localStorage.setItem("theme", payload);
    actions.setTheme(payload);
  }),

  changeAutoRefreshEnabled: thunk(async (actions, payload) => {
    await (window as any).localStorage.setItem("autoRefreshEnabled", JSON.stringify(payload));
    actions.setAutoRefreshEnabled(payload);
  }),

  setTheme: action((state, payload) => {
    state.theme = payload;
  }),

  setAutoRefreshEnabled: action((state, payload) => {
    state.autoRefreshEnabled = payload;
  }),

  theme: Theme.default,
  autoRefreshEnabled: true,
};

export default settings;
