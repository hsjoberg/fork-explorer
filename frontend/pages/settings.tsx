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
import CommonHeader from "../components/CommonHeader.ts";
import { Theme } from "../state/settings.ts";
import { useStoreActions, useStoreState } from "../state/index.ts";

const SettingsContainer = styled.div`
  align-self: center;
  max-width: 700px;
  width: 100%;
  margin-bottom: 120px;
`;

const SettingsGroup = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 22px;
`;

const SettingsLabel = styled(Text)`
  cursor: default;
  font-size: 18px;

  margin: 0;
`;

const Dropdown = styled.select`
  font-size: 13px;
`;

const DropdownOption = styled.option``;

const CheckboxStyle = styled.input``;

const Checkbox = (props: React.InputHTMLAttributes<HTMLInputElement>) => {
  return <CheckboxStyle {...props} type="checkbox" />;
};

export default function Blocks() {
  const forkName = config.fork.name;
  const autoRefreshEnabled = useStoreState((store) => store.settings.autoRefreshEnabled);
  const currentTheme = useStoreState((store) => store.settings.theme);
  const changeTheme = useStoreActions((store) => store.settings.changeTheme);
  const changeAutoRefreshEnabled = useStoreActions((store) => store.settings.changeAutoRefreshEnabled);

  const onChangeTheme = async (theme: Theme) => {
    await changeTheme(theme);
  };

  const toggleAutoRefreshEnabled = async () => {
    await changeAutoRefreshEnabled(!autoRefreshEnabled);
  };

  return (
    <Container>
      <head>
        <title>{forkName} activation</title>
      </head>
      <Content>
        <SiteTitle />
        <SiteMenu />
        <SettingsContainer>
          <CommonHeader>Settings</CommonHeader>
          <SettingsGroup>
            <SettingsLabel>Theme</SettingsLabel>
            <Dropdown
              value={currentTheme}
              onChange={async (event) => {
                await onChangeTheme(event.target.value);
              }}
            >
              {Object.entries(Theme).map((theme) => {
                return (
                  <DropdownOption key={theme[1]} value={theme[1]}>
                    {theme[1]}
                  </DropdownOption>
                );
              })}
            </Dropdown>
          </SettingsGroup>
          {config.frontend.autoRefreshInterval !== null && (
            <SettingsGroup>
              <SettingsLabel>Auto-fetch blocks (every {config.frontend.autoRefreshInterval}s)</SettingsLabel>
              <Checkbox onChange={toggleAutoRefreshEnabled} checked={autoRefreshEnabled} />
            </SettingsGroup>
          )}
        </SettingsContainer>
        {config.frontend.twitterHandle && <ContactTwitter />}
        {config.donation && <Donation />}
      </Content>
    </Container>
  );
}
