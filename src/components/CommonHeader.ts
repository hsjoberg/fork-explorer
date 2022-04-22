import styled from "styled-components";

export default styled.h2`
  font-size: 24px;
  color: ${(props) => props.theme.commonHeader.color};
  text-shadow: ${(props) => props.theme.commonHeader.textShadow};
`;
