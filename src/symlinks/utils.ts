export const bytesToHexString = (bytes: Uint8Array) => {
  return bytes.reduce(function (memo: unknown, i: number) {
    return memo + ("0" + i.toString(16)).slice(-2); //padd with leading 0 if <16
  }, "");
};

export const bytesToString = (bytes: number[]) => {
  return String.fromCharCode.apply(null, bytes);
};

// Copied from mempool.space
// https://github.com/mempool/mempool/blob/0d03a9e6cc3e846b2f968ef15d78ffbb29e46d28/frontend/src/app/components/miner/miner.component.ts
export function hexToAscii(hex: string) {
  let str = "";
  for (let i = 0; i < hex.length; i += 2) {
    str += String.fromCharCode(parseInt(hex.substr(i, 2), 16));
  }
  return str;
}

export function wrap80(s: string) {
  return s.replace(/(?![^\n]{1,80}$)([^\n]{1,80})\s/g, "$1\n");
}
