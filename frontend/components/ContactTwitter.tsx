import React from "https://esm.sh/react@17.0.2";
import styled from "https://esm.sh/styled-components@5.3.0";
import config from "../back/config/config.ts";

const ContactTwitter = styled.p`
  color: #9e9e9e;
  & > a {
    color: #ababab;
  }
  text-shadow: #000 1px 1px 0px;
  text-align: center;
  margin-top: 40px;
  margin-bottom: 35px;
`;

export default function () {
  return (
    <ContactTwitter>
      Twitter:{" "}
      <a target="_blank" href={`https://twitter.com/${config.frontend.twitterHandle}`}>
        @{config.frontend.twitterHandle}
      </a>
    </ContactTwitter>
  );
}
