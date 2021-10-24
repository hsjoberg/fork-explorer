import React from "https://esm.sh/react@17.0.2";
import styled from "https://esm.sh/styled-components@5.3.0";
import Anchor from "https://deno.land/x/aleph@v0.3.0-beta.19/framework/react/components/Anchor.ts";
import { useRouter } from "https://deno.land/x/aleph@v0.3.0-beta.19/framework/react/hooks.ts";

import config from "../back/frontend/back/config/config.ts";
import { useStoreState } from "../state/index.ts";

const MenuContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 0;
  margin-bottom: 40px;
  position: relative;
  overflow: hidden;
`;

const MenuItem = styled.p<{ active: boolean }>`
  margin: 0 10px;
  display: block;
  font-size: 17.5px;
  text-align: center;
  color: ${(props) => props.theme.menu.itemColor};
  text-shadow: ${(props) => props.theme.menu.itemTextShadow};
  text-decoration: none;

  border-bottom: ${(props) => (props.active ? "1px solid #555" : "1px solid transparent")};
`;

const SiteMenuComponent = () => {
  const router = useRouter();
  const routePath = router.routePath;
  const forkName = config.fork.name;
  const status = config.fork.status;
  const monitoringMode = useStoreState((store) => store.monitoringMode);

  const showData = !["locked_in", "active"].includes(status) || monitoringMode === "historic_period";

  return (
    <MenuContainer>
      <Anchor style={{ textDecoration: "none" }} href="/">
        <MenuItem active={routePath === "/"}>Overview</MenuItem>
      </Anchor>
      {showData && (
        <Anchor style={{ textDecoration: "none" }} href="/miners">
          <MenuItem active={routePath === "/miners"}>Mining Pools</MenuItem>
        </Anchor>
      )}
      {showData && (
        <Anchor style={{ textDecoration: "none" }} href="/stats">
          <MenuItem active={routePath === "/stats"}>Stats</MenuItem>
        </Anchor>
      )}
      <Anchor style={{ textDecoration: "none" }} href="/about">
        <MenuItem active={routePath === "/about"}>About {forkName}</MenuItem>
      </Anchor>
      <Anchor style={{ textDecoration: "none" }} href="/settings">
        <MenuItem active={routePath === "/settings"}>Settings</MenuItem>
      </Anchor>
    </MenuContainer>
  );
};

export default SiteMenuComponent;
