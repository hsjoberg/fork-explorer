import React from "https://esm.sh/react@17.0.2";
import styled from "https://esm.sh/styled-components";

import config from "../back/config/config.ts";

import { Container } from "../components/Container.ts";
import { Content } from "../components/Content.ts";
import { Donation } from "../components/Donation.tsx";
import SiteTitle from "../components/SiteTitle.tsx";
import SiteMenu from "../components/SiteMenu.tsx";
import Text from "../components/Text.tsx";
import ContactTwitter from "../components/ContactTwitter.tsx";

const Header = styled.p`
  font-size: 24px;
  margin-bottom: 10px;
  color: #ff9b20;
  text-shadow: #000 2px 2px 0px;
`;

const InfoContainer = styled.div`
  max-width: 980px;
  margin: auto;
`;

const InfoSection = styled.div``;

const SponsorContainer = styled.div`
  max-width: 980px;
  margin: auto;
`;

const SponsorSection = styled.div`
  display: flex;
  flex-direction: row;
`;

const Sponsor = styled.a`
  display: flex;
  flex-direction: column;
  width: 200px;
  align-items: center;
  margin: 10px 15px;
  padding: 8px;
  text-decoration: none;
`;

const SponsorImage = styled.img`
  max-width: 120px;
`;

const SponsorName = styled.p`
  color: #f7f7f7;
  font-size: 14px;
  margin-bottom: 0;
`;

export default function Blocks() {
  const forkName = config.fork.name;

  return (
    <Container>
      <head>
        <title>{forkName} activation</title>
      </head>
      <Content>
        <SiteTitle />
        <SiteMenu />
        <InfoContainer>
          <InfoSection>
            <Header>Information about the softfork Taproot</Header>
            {config.frontend.about?.softfork?.info?.map((section, i) => (
              <Text key={i}>{section}</Text>
            ))}
          </InfoSection>
          <InfoSection>
            <Header>{config.frontend.about?.method?.title}</Header>
            {config.frontend.about?.method?.info?.map((section, i) => (
              <Text key={i}>{section}</Text>
            ))}
          </InfoSection>
          <InfoSection>
            <Header>About this site</Header>
            <Text>
              taproot.watch is based on open-source software called{" "}
              <a href="https://github.com/hsjoberg/fork-explorer" target="_blank">
                fork-explorer
              </a>
              . Both this site and the open-source project is developed and maintained by Hampus Sjöberg (
              <a href="https://twitter.com/hampus_s" target="_blank">
                @hampus_s
              </a>
              ).
            </Text>
            <Text>
              If you enjoy this site, leave a Lightning Network donation below or check out my other project{" "}
              <a href="https://blixtwallet.github.io" target="_blank">
                Blixt Wallet
              </a>
              , a non-custodial Bitcoin Lightning Wallet!
            </Text>
          </InfoSection>
        </InfoContainer>
        {config.frontend.sponsors?.length! > 0 && (
          <SponsorContainer>
            <Header>Development Patrons</Header>
            {config.frontend.sponsors?.map((sponsor) => (
              <SponsorSection>
                <Sponsor href={sponsor.url} target="_blank">
                  <SponsorImage src={sponsor.imageUri} />
                  <SponsorName>{sponsor.title}</SponsorName>
                </Sponsor>
              </SponsorSection>
            ))}
          </SponsorContainer>
        )}
        {config.frontend.twitterHandle && <ContactTwitter />}
        {config.donation && <Donation />}
      </Content>
    </Container>
  );
}
