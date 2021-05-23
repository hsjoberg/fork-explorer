import React from "https://esm.sh/react@17.0.2";
import styled, { useTheme } from "https://esm.sh/styled-components";
import { VictoryContainer, VictoryChart, VictoryLine, VictoryAxis, VictoryTheme } from "https://esm.sh/victory";

import config from "../back/config/config.ts";

import { Container } from "../components/Container.ts";
import { ContentWide, Content } from "../components/Content.ts";
import SiteTitle from "../components/SiteTitle.tsx";
import { useStoreState } from "../state/index.ts";
import SiteMenu from "../components/SiteMenu.tsx";
import { Donation } from "../components/Donation.tsx";
import CommonHeader from "../components/CommonHeader.ts";
import Text from "../components/Text.tsx";

const ChartHolder = styled.div`
  margin-bottom: 100px;
`;

const ChartTitle = styled(CommonHeader)``;

interface IMovingAverageData {
  periodHeight: number;
  height: number;
  ratio: number;
}

export default function Miners() {
  const theme = useTheme();
  const blocks = useStoreState((store) => store.blocks);
  const forkName = config.fork.name;

  const data: IMovingAverageData[] = blocks
    .filter((block) => block.signals !== undefined)
    .map((block, i) => {
      const last144Blocks = blocks.slice(Math.max(i - 143, 0), i + 1);
      const numSignallingBlocks = last144Blocks.reduce((prev, curr) => {
        return prev + (curr.signals ? 1 : 0);
      }, 0);

      return {
        periodHeight: i,
        height: block.height,
        ratio: numSignallingBlocks / 144,
      };
    });

  const xAxisTickValues = new Array(2016 / 144).fill(0).map((day, i) => {
    return blocks[0].height + i * 144;
  });

  return (
    <Container>
      <head>
        <title>{forkName} activation - Statistics</title>
      </head>
      <ContentWide>
        <SiteTitle />
        <SiteMenu />
        <ChartTitle>144 Block Moving Average</ChartTitle>
        <Text>Signalling percentage over the last 144 blocks (Moving Average) in the current period.</Text>
        <ChartHolder>
          <VictoryChart
            containerElement={<VictoryContainer responsive={false} />}
            margin={0}
            responsive={true}
            padding={{
              left: 50,
              right: 20,
              top: 15,
              bottom: 40,
            }}
            width={1100}
            height={410}
            theme={VictoryTheme.material}
          >
            <VictoryAxis
              tickValues={xAxisTickValues}
              style={{
                grid: { stroke: "#777", strokeDasharray: "3" },
                tickLabels: { fill: theme.stats.labelColor },
              }}
            />
            <VictoryAxis
              style={{
                grid: { stroke: "#777", strokeDasharray: "3" },
                tickLabels: { fill: theme.stats.labelColor },
              }}
              tickValues={[0.1, 0.2, 0.3, 0.4, 0.5, 0.6, 0.7, 0.8, 0.9, 1]}
              domain={[0, 1]}
              tickFormat={(ratio: number) => Math.floor(ratio * 100) + "%"}
              dependentAxis
            />
            <VictoryLine
              interpolation="linear"
              data={data}
              x="height"
              y="ratio"
              style={{
                data: { stroke: theme.stats.primaryColor },
                parent: { border: "1px solid #ccc" },
              }}
            />
          </VictoryChart>
        </ChartHolder>

        {config.donation && <Donation />}
      </ContentWide>
    </Container>
  );
}
