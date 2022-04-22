import React from "react";
import styled from "styled-components";
import { Link, useLocation } from "wouter";

import config from "../config/config.ts";
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

const MenuItem = styled.a<{ active: boolean }>`
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
  const [location] = useLocation();
  const routePath = "";
  const forkName = config.fork.name;
  const status = config.fork.status;
  const monitoringMode = useStoreState((store) => store.monitoringMode);

  const showData = !["locked_in", "active"].includes(status) || monitoringMode === "historic_period";

  return (
    <MenuContainer>
      <Link style={{ textDecoration: "none" }} href="/">
        <MenuItem active={location === "/"}>Overview</MenuItem>
      </Link>
      {showData && (
        <Link style={{ textDecoration: "none" }} href="/miners">
          <MenuItem active={location === "/miners"}>Mining Pools</MenuItem>
        </Link>
      )}
      {/* {showData && (
        <Link style={{ textDecoration: "none" }} href="/stats">
          <MenuItem active={location === "/stats"}>Stats</MenuItem>
        </Link>
      )} */}
      <Link style={{ textDecoration: "none" }} href="/about">
        <MenuItem active={location === "/about"}>About {forkName}</MenuItem>
      </Link>
      <Link style={{ textDecoration: "none" }} href="/settings">
        <MenuItem active={location === "/settings"}>Settings</MenuItem>
      </Link>
    </MenuContainer>
  );
};

export default SiteMenuComponent;
