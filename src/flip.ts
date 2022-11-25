import { LCDClient, Wallet } from '@terra-money/terra.js';
import { ConnectedWallet } from '@terra-money/wallet-provider';
import { NETWORK } from './@types';
import { NETWORKS } from './constant';
import { FlipClient, FlipQueryClient } from './contract/clients/FlipClient';

export function getReadonlyFlipClient(network: NETWORK) {
  const lcd = new LCDClient({
    chainID: NETWORKS[network].chainId,
    URL: NETWORKS[network].url,
    isClassic: network === 'classic',
  });

  return new FlipQueryClient(lcd);
}

export function getFlipClient(
  network: NETWORK,
  wallet: Wallet | ConnectedWallet
) {
  const lcd = new LCDClient({
    chainID: NETWORKS[network].chainId,
    URL: NETWORKS[network].url,
    isClassic: network === 'classic',
  });
  return new FlipClient(lcd, wallet);
}
