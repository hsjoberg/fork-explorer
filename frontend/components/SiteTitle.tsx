import React from "https://esm.sh/react@17.0.2";
import styled from "https://esm.sh/styled-components";

import config from "../back/config/config.ts";

const Title = styled.h1`
  margin-top: 40px;
  font-size: 42px;
  text-align: center;
  color: #d97b08;
  text-shadow: #000 3px 3px 0px;
`;

const TitleComponent = () => <Title>{config.fork.name} activation</Title>;

export default TitleComponent;
