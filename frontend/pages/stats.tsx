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
  // const [data, setData] = useState<IMovingAverageData[]>([]);
  const theme = useTheme();
  const blocks = useStoreState((store) => store.blocks);
  const forkName = config.fork.name;

  // useEffect(() => {
  //   (async () => {
  //     if (0 && config.mode !== "fake-frontend") {
  //       const result = await fetch("/pageviews");
  //     } else {
  //       setData(
  //         Object.entries({
  //           "2021-04-27": 788,
  //           "2021-04-28": 2163,
  //           "2021-04-29": 1193,
  //           "2021-04-30": 1187,
  //           "2021-05-01": 18270,
  //           "2021-05-02": 124202,
  //           "2021-05-03": 79952,
  //           "2021-05-04": 49340,
  //           "2021-05-05": 33298,
  //           "2021-05-06": 22786,
  //           "2021-05-07": 18172,
  //           "2021-05-08": 348960,
  //         }).map(([key, value]) => {
  //           return {
  //             date: key,
  //             pageviews: value,
  //           };
  //         })
  //       );
  //     }
  //   })();
  // }, []);

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

  return (
    <Container>
      <head>
        <title>{forkName} activation - Statistics</title>
      </head>
      <ContentWide>
        <SiteTitle />
        <SiteMenu />
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
            <VictoryAxis style={{ tickLabels: { fill: theme.stats.labelColor } }} />
            <VictoryAxis
              style={{ tickLabels: { fill: theme.stats.labelColor } }}
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
