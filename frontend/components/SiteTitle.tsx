import React from "https://esm.sh/react@17.0.2";
import styled from "https://esm.sh/styled-components";

import config from "../back/config/config.ts";

const Title = styled.h1`
  margin: 40px 0 20px;
  font-size: 42px;
  text-align: center;
  color: #fff;
  position: relative;
`;

const TxtLink = styled.a`
  color: #696969;
  position: absolute;
  font-size: 10px;
  margin-left: 4px;
  text-shadow: transparent 0px 0px 0px;

  @media only screen and (max-width: 1000px) {
    display: none;
  }
`;

const TitleComponent = () => (
  <Title>
    {config.fork.name} activation<TxtLink href="/index.txt">Text version</TxtLink>
  </Title>
);

export default TitleComponent;
