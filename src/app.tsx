import React, { lazy, useEffect, useState } from "react";
import { SWRConfig } from "swr";
import { Helmet } from "react-helmet";
import { Route, Switch } from "wouter";
import ultraCache from "ultra/cache";
import { Cache } from "https://deno.land/x/ultra/src/types.ts";
import { ThemeProvider, withTheme } from "styled-components";
import { StoreProvider } from "easy-peasy";

import { defaultTheme, colorBlindnessTheme, saltyRogerTheme } from "./theme/index.ts";
import store, { useStoreActions, useStoreState } from "./state/index.ts";
import Index from "./pages/index.tsx";
import About from "./pages/about.tsx";
import Miners from "./pages/miners.tsx";
import Stats from "./pages/stats.tsx";
import Settings from "./pages/settings.tsx";
import Miner from "./pages/minerpage.tsx";
import config from "./config/config.ts";

// const Index = lazy(() => import("./pages/index.tsx"));
// const About = lazy(() => import("./pages/about.tsx"));
// const Miners = lazy(() => import("./pages/miners.tsx"));
// const Stats = lazy(() => import("./pages/stats.tsx"));
// const Settings = lazy(() => import("./pages/settings.tsx"));
// const Miner = lazy(() => import("./pages/minerx.tsx"));

const options = (cache: Cache) => ({
  provider: () => ultraCache(cache),
  suspense: true,
});

function StoreStarter(props: any) {
  const [gotBlocks, setGotBlocks] = useState(false);
  const initialize = useStoreActions((store) => store.initialize);
  const getBlocks = useStoreActions((store) => store.getBlocks);
  const autoRefresh = useStoreActions((store) => store.autoRefresh);
  const theme = useStoreState((store) => store.settings.theme);

  useEffect(() => {
    (async () => {
      await initialize();
      await getBlocks();
      autoRefresh();
      setGotBlocks(true);
    })();
  }, []);

  useEffect(() => {
    const body = (window as any).document.querySelector("body");
    if (!body) {
      return;
    }
    if (theme === "default") {
      body.style.backgroundColor = defaultTheme.backgroundColor;
    } else if (theme === "colorblind") {
      body.style.backgroundColor = colorBlindnessTheme.backgroundColor;
    }
  }, [theme]);

  if (!gotBlocks) {
    return null;
  }

  let currentTheme = defaultTheme;
  if (theme === "colorblind") {
    currentTheme = colorBlindnessTheme;
  } else if (theme === "saltyroger") {
    currentTheme = saltyRogerTheme;
  }

  return (
    <ThemeProvider theme={currentTheme}>
      <>
        <Helmet>
          <title>{config.fork.name} activation</title>
          <link rel="stylesheet" href="/reset.css" />
          <link rel="stylesheet" href="/site.css" />
          <link rel="icon" type="image/png" href="/assets/favicon.ico" />
          <link rel="apple-touch-icon" href="/assets/favicon.ico" />
        </Helmet>
        {props.children}
      </>
    </ThemeProvider>
  );
}

const Ultra = ({ cache }: { cache: Cache }) => {
  return (
    <StoreProvider store={store}>
      <SWRConfig value={options(cache)}>
        <StoreStarter>
          <main>
            <Switch>
              <Route path="/" component={Index} />
              <Route path="/miner/:miner">{(params: any) => <Miner miner={params.miner} />}</Route>
              <Route path="/miners">
                <Miners />
              </Route>
              <Route path="/stats">
                <Stats />
              </Route>
              <Route path="/about">
                <About />
              </Route>
              <Route path="/settings">
                <Settings />
              </Route>
              <Route>
                <strong>404</strong>
              </Route>
            </Switch>
          </main>
        </StoreStarter>
      </SWRConfig>
    </StoreProvider>
  );
};

export default withTheme(Ultra);
