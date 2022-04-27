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

const forkName = config.fork.name;
const twitterHandle = config.frontend.twitterHandle;

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
          <title>{forkName} activation</title>
          <link rel="stylesheet" href="/reset.css" />
          <link rel="stylesheet" href="/site.css" />
          <link rel="icon" type="image/png" href="/assets/favicon.ico" />
          <link rel="apple-touch-icon" href="/assets/favicon.ico" />
          {twitterHandle && (
            <>
              <meta name="twitter:card" content="summary" />
              <meta name="twitter:site" content={twitterHandle} />
              <meta name="twitter:creator" content={twitterHandle} />
              <meta
                name="twitter:image"
                content="https://creazilla-store.fra1.digitaloceanspaces.com/emojis/54056/carrot-emoji-clipart-md.png"
              />
              <meta
                property="og:image"
                content="https://creazilla-store.fra1.digitaloceanspaces.com/emojis/54056/carrot-emoji-clipart-md.png"
              />
              <meta property="og:url" content="https://taproot.watch" />
              <meta property="og:title" content={`${forkName} Activation`} />
              <meta property="og:description" content="See the current signalling status of the {forkName} softfork." />
            </>
          )}
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
          <>
            <a
              href="https://github.com/hsjoberg/fork-explorer"
              className="github-corner"
              aria-label="View source on GitHub"
            >
              <svg width="80" height="80" viewBox="0 0 250 250" className="github-corner-svg" aria-hidden="true">
                <path d="M0,0 L115,115 L130,115 L142,142 L250,250 L250,0 Z"></path>
                <path
                  d="M128.3,109.0 C113.8,99.7 119.0,89.6 119.0,89.6 C122.0,82.7 120.5,78.6 120.5,78.6 C119.2,72.0 123.4,76.3 123.4,76.3 C127.3,80.9 125.5,87.3 125.5,87.3 C122.9,97.6 130.6,101.9 134.4,103.2"
                  fill="currentColor"
                  style={{ transformOrigin: "130px 106px" }}
                  className="octo-arm"
                ></path>
                <path
                  d="M115.0,115.0 C114.9,115.1 118.7,116.5 119.8,115.4 L133.7,101.6 C136.9,99.2 139.9,98.4 142.2,98.6 C133.8,88.0 127.5,74.4 143.8,58.0 C148.5,53.4 154.0,51.2 159.7,51.0 C160.3,49.4 163.2,43.6 171.4,40.1 C171.4,40.1 176.1,42.5 178.8,56.2 C183.1,58.6 187.2,61.8 190.9,65.4 C194.5,69.0 197.7,73.2 200.1,77.6 C213.8,80.2 216.3,84.9 216.3,84.9 C212.7,93.1 206.9,96.0 205.4,96.6 C205.1,102.4 203.0,107.8 198.3,112.5 C181.9,128.9 168.3,122.5 157.7,114.1 C157.9,116.9 156.7,120.9 152.7,124.9 L141.0,136.5 C139.8,137.7 141.6,141.9 141.8,141.8 Z"
                  fill="currentColor"
                  className="octo-body"
                ></path>
              </svg>
            </a>
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
          </>
        </StoreStarter>
      </SWRConfig>
    </StoreProvider>
  );
};

export default withTheme(Ultra);
