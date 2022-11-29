import {
  Coins,
  LCDClient,
  TxInfo,
  WaitTxBroadcastResult,
  Wallet,
} from '@terra-money/terra.js';
import { ConnectedWallet } from '@terra-money/wallet-provider';
import fetch from 'cross-fetch';
import { NETWORK } from './@types';
import { NETWORKS } from './constant';
import { WluncClient, WluncQueryClient } from './contract/clients/WluncClient';

export function getReadonlyTokenClient(network: NETWORK) {
  const lcd = new LCDClient({
    chainID: NETWORKS[network].chainId,
    URL: NETWORKS[network].url,
    isClassic: network === 'classic',
  });

  return new WluncQueryClient(lcd);
}

export async function getTokenClient(
  network: NETWORK,
  wallet: Wallet | ConnectedWallet
) {
  const gasPrices = (await (await fetch(NETWORKS[network].gasPriceUrl)).json());
  const lcd = new LCDClient({
    chainID: NETWORKS[network].chainId,
    URL: NETWORKS[network].url,
    gasPrices: gasPrices,
    isClassic: network === 'classic'
  });
  return new WluncClient(lcd, wallet);
}

export async function getTokenAllowance(
  network: NETWORK,
  owner: string,
  spender: string
): Promise<string> {
  const token = getReadonlyTokenClient(network);
  const data = await token.allowanceQuery({
    owner,
    spender,
  });

  return data.allowance;
}

export async function getTokenBalance(
  network: NETWORK,
  address: string
): Promise<string> {
  const token = getReadonlyTokenClient(network);
  const data = await token.balanceQuery({
    address,
  });

  return data.balance;
}

export async function increaseAllowance(
  network: NETWORK,
  wallet: Wallet | ConnectedWallet,
  amount: string,
  spender: string
): Promise<WaitTxBroadcastResult | TxInfo | undefined> {
  const token = await getTokenClient(network, wallet);
  const tx = token.increaseAllowance({
    amount,
    spender,
  });

  return tx;
}

export async function decreaseAllowance(
  network: NETWORK,
  wallet: Wallet | ConnectedWallet,
  amount: string,
  spender: string
): Promise<WaitTxBroadcastResult | TxInfo | undefined> {
  const token = await getTokenClient(network, wallet);
  const tx = token.decreaseAllowance({
    amount,
    spender,
  });

  return tx;
}

export async function mintToken(
  network: NETWORK,
  wallet: Wallet | ConnectedWallet,
  amount: string
): Promise<WaitTxBroadcastResult | TxInfo | undefined> {
  const token = await getTokenClient(network, wallet);
  const tx = token.deposit(new Coins({ uluna: amount }));

  return tx;
}

export async function redeemToken(
  network: NETWORK,
  wallet: Wallet | ConnectedWallet,
  amount: string
): Promise<WaitTxBroadcastResult | TxInfo | undefined> {
  const token = await getTokenClient(network, wallet);
  const tx = token.redeem({
    amount,
  });

  return tx;
}

export async function burn(
  network: NETWORK,
  wallet: Wallet | ConnectedWallet,
  amount: string
): Promise<WaitTxBroadcastResult | TxInfo | undefined> {
  const token = await getTokenClient(network, wallet);
  const tx = token.burn({
    amount,
  });

  return tx;
}

export async function burnFrom(
  network: NETWORK,
  wallet: Wallet | ConnectedWallet,
  from: string,
  amount: string
): Promise<WaitTxBroadcastResult | TxInfo | undefined> {
  const token = await getTokenClient(network, wallet);
  const tx = token.burnFrom({
    amount,
    owner: from,
  });

  return tx;
}

export async function transfer(
  network: NETWORK,
  wallet: Wallet | ConnectedWallet,
  recipient: string,
  amount: string
): Promise<WaitTxBroadcastResult | TxInfo | undefined> {
  const token = await getTokenClient(network, wallet);
  const tx = token.transfer({
    amount,
    recipient,
  });

  return tx;
}

export async function transferFrom(
  network: NETWORK,
  wallet: Wallet | ConnectedWallet,
  owner: string,
  recipient: string,
  amount: string
): Promise<WaitTxBroadcastResult | TxInfo | undefined> {
  const token = await getTokenClient(network, wallet);
  const tx = token.transferFrom({
    amount,
    owner,
    recipient,
  });

  return tx;
}
