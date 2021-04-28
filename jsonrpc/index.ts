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

interface IGetblockResponse {
  hash: string;
  confirmations: number;
  size: number;
  strippedsize: number;
  weight: number;
  height: number;
  version: number;
  versionHex: string;
  merkleroot: string;
  tx: string[];
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

export async function getblock(hash: string) {
  const response = await request("getblock", [hash, true]);
  if (response.error) {
    throw new Error(response.error.message);
  }
  return (response.result as unknown) as IGetblockResponse;
}

interface IGetrawtransaction {
  in_active_chain: boolean;
  hex: string;
  txid: string;
  hash: string;
  size: number;
  vsize: number;
  weight: number;
  version: number;
  locktime: number;
  vin: {
    coinbase?: string;
    txid: string;
    vout: number;
    scriptSig: {
      asm: string;
      hex: string;
    };
    sequence: number;
    txinwitness: string[];
  }[];
  vout: [
    {
      value: number;
      n: number;
      scriptPubKey: {
        asm: string;
        hex: string;
        reqSigs: number;
        type: string;
        addresses: string[];
      };
    }
  ];
  blockhash: string;
  confirmations: number;
  blocktime: number;
  time: number;
}

export async function getrawtransaction(txid: string, blockhash: string) {
  const response = await request("getrawtransaction", [txid, true, blockhash]);
  if (response.error) {
    throw new Error(response.error.message);
  }
  return (response.result as unknown) as IGetrawtransaction;
}
