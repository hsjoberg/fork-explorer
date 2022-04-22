export interface IBlock {
  height: number;
  signals: boolean | undefined;
  miner: string | undefined;
  minerWebsite: string | undefined;
}

export interface IMinerData {
  name: string;
  signals: boolean;
  website: string | undefined;
  numBlocks: number;
  numSignallingBlocks: number;
}

export interface IMiners {
  [key: string]: IMinerData;
}
