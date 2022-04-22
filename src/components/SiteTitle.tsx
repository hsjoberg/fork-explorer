import React from "react";
import styled from "styled-components";

import config from "../config/config.ts";

const Title = styled.h1`
  margin: 40px 0 20px;
  font-size: 42px;
  text-align: center;
  color: ${(props) => props.theme.mainHeader.color};
  text-shadow: ${(props) => props.theme.mainHeader.textShadow};
  position: relative;
`;

const TxtLink = styled.a`
  color: ${(props) => props.theme.mainHeader.txtLinkColor};
  position: absolute;
  font-size: 10px;
  margin-left: 4px;
  text-shadow: transparent 0px 0px 0px;

  @media only screen and (max-width: 650px) {
    display: none;
  }
`;

const TitleComponent = () => (
  <Title>
    {config.fork.name} activation<TxtLink href="/index.txt">Text version</TxtLink>
  </Title>
);

export default TitleComponent;
