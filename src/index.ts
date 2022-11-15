import axios, { AxiosResponse } from 'axios';
import { BetDto } from './@types';
import { API_URL } from './constant';
import { LCDClient, Wallet } from '@terra-money/terra.js';
import { ConnectedWallet } from '@terra-money/wallet-provider';
import { WluncClient, WluncQueryClient } from './contract/clients/WluncClient';
import {
  FlipClient,
  FlipQueryClient,
} from './contract/clients/FlipClient';

export * from './@types';

export const bet = async (data: BetDto): Promise<AxiosResponse> => {
  return axios.post(`${API_URL}/bet`, data);
};

export const getWLUNAClient = (
  client: LCDClient,
  wallet: Wallet | ConnectedWallet
): WluncClient => {
  return new WluncClient(client, wallet);
};

export const getFlipClient = (
  client: LCDClient,
  wallet: Wallet | ConnectedWallet
): FlipClient => {
  return new FlipClient(client, wallet);
};

export const getReadonlyWLUNCClient = (client: LCDClient): WluncQueryClient => {
  return new WluncQueryClient(client);
};

export const getReadonlyFlipClient = (client: LCDClient): FlipQueryClient => {
  return new FlipQueryClient(client);
};
