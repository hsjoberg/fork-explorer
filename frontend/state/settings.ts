 { action, Action, thunk, Thunk }  "https://esm.sh/easy-peasy@5.0.3";

 Theme {
  "default" = "default",
  "colorblind" = "colorblind",
  "saltyroger" = "saltyroger",
}

 ISettingsModel {
  initialize: Thunk<ISettingsModel>;

  changeTheme: Thunk<ISettingsModel, Theme>;
  changeAutoRefreshEnabled: Thunk<ISettingsModel, boolean>;

  setTheme: Action<ISettingsModel, Theme>;
  setAutoRefreshEnabled: Action<ISettingsModel, boolean>;

  theme: Theme;
  autoRefreshEnabled: boolean;
}

 settings: ISettingsModel = {
  initialize: thunk( (actions) => {
    actions.setTheme(( (window  any).localStorage.getItem("theme"))  "default");
    actions.setAutoRefreshEnabled(
      JSON.parse(( (window  any).localStorage.getItem("autoRefreshEnabled"))  true)
    );
  }),

  changeTheme: thunk( (actions, payload) => {
     (window  any).localStorage.setItem("theme", payload);
    actions.setTheme(payload);
  }),

  changeAutoRefreshEnabled: thunk( (actions, payload) => {
     (window  any).localStorage.setItem("autoRefreshEnabled", JSON.stringify(payload));
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

 settings;
