
> This module is SDK for luna (2.0 and classic) burn flip game platform. This module can be used in classic, luna 2.0, and pisco testnet.

## Install

To install package, use:

```bash
npm install luna-burnflip-sdk
```

## Usage
##### Readonly clients
```bash
import {
  createSignature,
  FlipResult,
  getReadonlyFlipClient,
  getTokenBalance,
  increaseAllowance,
  mintToken,
  bet
} from 'luna-burnflip-sdk';
import { LCDClient, MnemonicKey } from '@terra-money/terra.js';

let lcd = new LCDClient({
    URL: 'https://lcd.terra.dev',
    chainID: 'columbus-5',
});

const readFlipClient = async () => {
  // Readonly client for fetching data
  const readonlyFlipClient = getReadonlyFlipClient("classic");

  const history = await readonlyFlipClient.getAllBettingHistoryQuery({});
  console.log('bet history: ', history);
};

```

##### Mint WLUNC
```bash

const mint = async () => {
  const mk = new MnemonicKey({
    mnemonic: MNEMONIC,
  });
  const wallet = lcd.wallet(mk);
  await mintToken('classic', wallet, "1010000000");
  // Mint 1k WLUNC
  /**
   * We need to send a bit more than 1K lunc to wrap 1K WLUNC.
   * Because there is 0.2% tax fee (burn) for lunc transaction.
   * So if you send 1K lunc, then you will get 998 WLUNC.
  */
  const balance = await getTokenBalance('classic', wallet.key.accAddress);
  console.log('balance: ', balance);
};

```

##### Bet
```bash

const doBet = async () => {
  const mk = new MnemonicKey({
    mnemonic: MNEMONIC,
  });
  const wallet = lcd.wallet(mk);
  const flipQueryClient = getReadonlyFlipClient("classic");
  //approve
  await increaseAllowance(
    'classic',
    wallet,
    "1000000000",
    flipQueryClient.contractAddress
  );

  const signature = await createSignature(
    {
      address: wallet.key.accAddress,
      amount: '1000000000', // 1k wlunc
      flip: FlipResult.HEAD,
    },
    wallet
  );

  await bet(
    {
      address: wallet.key.accAddress,
      amount: '1000000000', // 1k wlunc
      flip: FlipResult.HEAD,
      signature: signature,
    }
  ).then(res => {
    console.log('bet result: ', res.data);
  });
};

```

