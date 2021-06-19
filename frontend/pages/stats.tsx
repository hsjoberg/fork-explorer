import React from "https://esm.sh/react@17.0.2";
 patch-1
import styled, { useTheme } from "https://esm.sh/styled-components@5.3.0";
import {
  VictoryChart,
  VictoryLine,
  VictoryAxis,
  VictoryTheme,
  VictoryTooltip,
  VictoryVoronoiContainer,
} from "https://esm.sh/victory@35.8.5";

import config from "../back/config/config.ts";
import { Container } from "../components/Container.ts";
import { ContentWide } from "../components/Content.ts";

import styled, { useTheme } from "https://esm.sh/styled-components";
import { VictoryContainer, VictoryChart, VictoryLine, VictoryAxis, VictoryTheme } from "https://esm.sh/victory";

import config from "../back/config/config.ts";

import { Container } from "../components/Container.ts";
import { ContentWide, Content } from "../components/Content.ts";
 ma
 SiteTitle from "../components/SiteTitle.tsx";
import { useStoreState } from "../state/index.ts";
import SiteMenu from "../components/SiteMenu.tsx";
import { Donation } from "../components/Donation.tsx";
import CommonHeader from "../components/CommonHeader.ts";
 patch-1
import ContactTwitter from "../components/ContactTwitter.tsx";
import Text from "../components/Text.tsx";
import { computeStats } from "../back/common/data.ts";
import { ITheme } from "../theme/index.ts";
import Body from "../components/Body.ts";

const ChartHolder = styled.div`
  margin-bottom: 100px;
  margin-left: 28px;
  margin-right: 28px:
import Text from "../components/Text.tsx";

const ChartHolder = styled.div`
  margin-bottom: 100px;
 ma
`

const ChartTitle = styled(CommonHeader)``;

interface IMovingAverageData {
  periodHeight: number;
  height: number;
  ratio: number;
}

export default function Miners() {
 patch-1
  const theme = useTheme() as ITheme;
  const blocks = useStoreState((store) => store.blocks);
  const { blocksLeftInThisPeriod } = computeStats(blocks);
  const theme = useTheme();
  const blocks = useStoreState((store) => store.blocks);
 ma
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

 patch-1
  const xAxisTickValues = new Array(2016 / 144 + 1).fill(0).map((day, i) => {
    return blocks[0].height + i * 144;
  });

  const lineStyle = {
    data: { stroke: theme.stats.primaryColor },
    parent: { border: "1px solid #ccc" },
  };

  const axisStyle = {
    axis: { stroke: "transparent" },
    ticks: { stroke: "transparent", size: 5 },
    grid: { stroke: "#666", strokeDasharray: "3" },
    tickLabels: { fill: theme.stats.labelColor },
  };

  const thresholdPercentage = Math.floor((config.fork.threshold / 2016) * 100);


 ma
  return (
    <Container>
      <head>
        <title>{forkName} activation - Statistics</title>
      </head>
      <ContentWide>
        <SiteTitle />
        <SiteMenu />
 patch-1
        <Body>
          <ChartTitle>144 Block Moving Average</ChartTitle>
          <Text>Signalling percentage over the last 144 blocks (Moving Average) in the current period.</Text>
          <Text>
            Reaching {thresholdPercentage}% is not indicative of a softfork lock-in. {config.fork.threshold} blocks
            within a period have to signal for the {config.fork.name} softfork to lock in.
          </Text>
          <ChartHolder>
            <VictoryChart
              containerComponent={
                <VictoryVoronoiContainer
                  voronoiDimension="x"
                  labels={({ datum }: any) => {
                    if (!datum.height) {
                      return null;
                    }
                    let tooltip = `Day:`.padEnd(18, " ") + `${Math.floor((datum.periodHeight * 10) / 60 / 24) + 1}\n`;
                    tooltip += `Height:`.padEnd(18, " ") + `${datum.height}\n`;
                    tooltip += `Interval Height:`.padEnd(18, " ") + `${datum.periodHeight}\n`;
                    tooltip += `Percentage:`.padEnd(18, " ") + `${(datum.ratio * 100).toFixed(2)}%`;
                    return tooltip;
                  }}
                  labelComponent={
                    <VictoryTooltip
                      style={{ fontSize: 9, textAnchor: "start", fontFamily: "monospace" }}
                      centerOffset={{ y: -5 }}
                      dy={-7}
                    />
                  }
                  bindTooltipToMouse={true}
                ></VictoryVoronoiContainer>
              }
              margin={0}
              responsive={false}
              padding={{
                left: 20,
                right: 20,
                top: 15,
                bottom: 40,
              }}
              width={1100}
              height={510}
              theme={VictoryTheme.material}
            >
              <VictoryAxis tickValues={blocksLeftInThisPeriod < 1944 ? xAxisTickValues : undefined} style={axisStyle} />
              <VictoryAxis
                dependentAxis
                style={axisStyle}
                domain={[0, 1]}
                tickValues={[0.1, 0.2, 0.3, 0.4, 0.5, 0.6, 0.7, 0.8, 0.9, 1]}
                tickFormat={(ratio: number) => Math.floor(ratio * 100) + "%"}
              />
              <VictoryLine
                labels={() => null}
                style={{ data: { stroke: "#999" } }}
                domain={{ x: [data[0].height, data[data.length - 1].height] }}
                y={() => config.fork.threshold / 2016}
              />
              <VictoryLine data={data} x="height" y="ratio" style={lineStyle} />
            </VictoryChart>
          </ChartHolder>
        </Body>
        {config.frontend.twitterHandle && <ContactTwitter />}

        <ChartTitle>144 Block Moving Average</ChartTitle>
        <Text>Signalling percentage over the last 144 blocks (Moving Average)</Text>
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

 ma
        {config.donation && <Donation />}
      </ContentWide>
    </Container>
  );
}
