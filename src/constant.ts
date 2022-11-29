import { NetworkData } from './@types';

export const NETWORKS: NetworkData = {
  mainnet: {
    url: 'https://phoenix-lcd.terra.dev',
    chainId: 'phoenix-1',
    gasPriceUrl: 'https://pisco-api.terra.dev/gas-prices',
  },
  classic: {
    url: 'https://columbus-lcd.terra.dev',
    chainId: 'columbus-5',
    gasPriceUrl: 'https://columbus-api.terra.dev/gas-prices',
  },
  testnet: {
    url: 'https://pisco-lcd.terra.dev',
    chainId: 'pisco-1',
    gasPriceUrl: 'https://pisco-api.terra.dev/gas-prices',
  },
  localterra: {
    url: 'http://localhost:1317',
    chainId: 'localterra',
    gasPriceUrl: 'https://pisco-api.terra.dev/gas-prices',
  },
};

export const ADDRESSES = {
  localterra: {
    flip: {
      codeId: '13',
      contractAddresses: {
        default:
          'terra1n234trhxyj4ze95td2t5ngdpyqd8529urm54epum3aqg3205pcasg0g5pu',
      },
    },
    wlunc: {
      codeId: '12',
      contractAddresses: {
        default:
          'terra1lnfn4f9gpz8fmvquarmuph62wmss3qwh92j98z4y4q4x566stkmsrq8tu3',
      },
    },
  },
  testnet: {
    wlunc: {
      codeId: '5159',
      contractAddresses: {
        default:
          'terra1spwe89ugw499x0wwj63eqs3hgczf23serhfjqkqc54apk0fd8vwsdj5dj9',
      },
    },
    flip: {
      codeId: '5337',
      contractAddresses: {
        default:
          'terra1yzpttjrmsulzx3szyu239c9m7vqxzfzlnmj38jhdrl9avd9qrglq9qpj3t',
      },
    },
  },
  classic: {
    wlunc: {
      codeId: '6367',
      contractAddresses: {
        default: 'terra17sp3f2h5aakp2kjtvgn4nlz2wrghtqe529undc',
      },
    },
    flip: {
      codeId: '6368',
      contractAddresses: {
        default: 'terra1k4nu50mwyxy40k7kxtky9hnsdnkexc77k3zr79',
      },
    },
  },
};

export const API_URL = 'https://api.burnflip.com';

// classic burn mechanism
export const taxRateUrl =
  'https://lcd.terra.dev/terra/treasury/v1beta1/tax_rate';
export const taxCapUrl =
  'https://lcd.terra.dev/terra/treasury/v1beta1/tax_caps/uluna';

export const UNIT = 1000000;
export const WAIT_TIME_IN_BLOCK = 300_000; // 5 m