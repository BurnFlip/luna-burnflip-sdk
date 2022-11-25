import axios, { AxiosResponse } from 'axios';
import { BetDto } from './@types';
import { API_URL } from './constant';

export * from './@types';
export * from './token';
export * from './flip';
export * from './utils';

export const bet = async (data: BetDto): Promise<AxiosResponse> => {
  return axios.post(`${API_URL}/bet`, data);
};
