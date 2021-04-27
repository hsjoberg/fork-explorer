export const bytesToHexString = (bytes: Uint8Array) => {
  return bytes.reduce(function (memo: unknown, i: number) {
    return memo + ("0" + i.toString(16)).slice(-2); //padd with leading 0 if <16
  }, "");
};
