import styled from "https://esm.sh/styled-components@5.3.0";

export default styled.p`
  color: ${(props) => props.theme.textColor};
  /* text-shadow: #000 2px 2px 0px; */
  font-size: 16px;
  margin-bottom: 20px;

  & > a {
    color: ${(props) => props.theme.textColor};
  }
`;
