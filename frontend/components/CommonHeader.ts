import styled from "https://esm.sh/styled-components@5.3.0";

export default styled.h2`
  font-size: 24px;
  color: ${(props) => props.theme.commonHeader.color};
  text-shadow: ${(props) => props.theme.commonHeader.textShadow};
`;
