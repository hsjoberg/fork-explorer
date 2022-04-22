import styled from "styled-components";

export const Container = styled.div`
  min-height: 100%;
  display: flex;
  justify-content: center;

  color: ${(props) => props.theme.textColor};
`;
