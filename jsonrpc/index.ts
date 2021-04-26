import { request } from "./utils.ts";

export function getblockchaininfo() {
  return request("getblockchaininfo", []);
}

type IGetblockcountResponse = number;
export async function getblockcount() {
  const response = await request("getblockcount", []);
  if (response.error) {
    throw new Error(response.error.message);
  }
  return response.result as IGetblockcountResponse;
}

type IGetblockhashResponse = string;
export async function getblockhash(height: number) {
  const response = await request("getblockhash", [height]);
  if (response.error) {
    throw new Error(response.error.message);
  }
  return response.result as IGetblockhashResponse;
}

interface IGetblockheaderResponse {
  hash: string;
  confirmations: number;
  height: number;
  version: number;
  versionHex: string;
  merkleroot: string;
  time: number;
  mediantime: number;
  nonce: number;
  bits: string;
  difficulty: number;
  chainwork: string;
  nTx: number;
  previousblockhash: string;
  nextblockhash: string;
}

export async function getblockheader(hash: string) {
  const response = await request("getblockheader", [hash, true]);
  if (response.error) {
    throw new Error(response.error.message);
  }
  return (response.result as unknown) as IGetblockheaderResponse;
}
