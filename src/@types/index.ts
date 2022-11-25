export enum FlipResult {
  HEAD = 0,
  TAIL = 1,
}
export type NETWORK_INFO = {
  url: string;
  chainId: string;
  gasPriceUrl: string;
};
export type NETWORK = 'mainnet' | 'classic' | 'testnet' | 'localterra';

export type NetworkData = {
  [key in NETWORK]: NETWORK_INFO;
};

export type BetDto = {
  address: string;
  flip: FlipResult;
  amount: string;
  signature: string;
};
