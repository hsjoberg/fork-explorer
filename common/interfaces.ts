export interface IBlock {
  height: number;
  signals: boolean | undefined;
  miner: string | undefined;
  minerWebsite: string | undefined;
}

export interface IMinerData {
  [key: string]: {
    name: string;
    signals: boolean;
    website: string | undefined;
    numBlocks: number;
    numSignallingBlocks: number;
  };
}
