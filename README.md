
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
  getWLUNAClient,
} from 'luna-burnflip-sdk';
import { Coins, LCDClient, MnemonicKey } from '@terra-money/terra.js';
import { bet } from 'luna-burnflip-sdk';

let lcd = new LCDClient({
    URL: 'https://lcd.terra.dev',
    chainID: 'columbus-5',
});

const readFlipClient = async () => {
  // Readonly client for fetching data
  const readonlyFlipClient = getReadonlyFlipClient(lcd);

  const history = await readonlyFlipClient.getAllBettingHistoryQuery({});
  const owner = await readonlyFlipClient.getOwnerQuery();

  console.log('data: ', history.history.length, owner.owner);
};

```

##### Mint WLUNC
```bash

const writeWLUNAClient = async () => {
  const mk = new MnemonicKey({
    mnemonic:
      MNEMONIC,
  });
  const wallet = lcd.wallet(mk);
  const wlunaClient = getWLUNAClient(lcd, wallet);

  // Mint 1 WLUNC
  await wlunaClient.deposit(new Coins({ uluna: 1000000 }));
  const balance = await wlunaClient.balanceQuery({
    address: wallet.key.accAddress,
  });
  console.log('balance: ', balance);
};
```

##### Bet
```bash

const doBet = async () => {
  const mk = new MnemonicKey({
    mnemonic:
      MNEMONIC,
  });
  const wallet = lcd.wallet(mk);
  const wlunaClient = getWLUNAClient(lcd, wallet);
  const flipQueryClient = getReadonlyFlipClient(lcd);

  //approve 
  await wlunaClient.increaseAllowance({
    amount: "10000000", // 10 wlunc
    spender: flipQueryClient.contractAddress,
  });

  const signature = await createSignature({
    address: wallet.key.accAddress,
    amount: '10000000', // 10 wlunc
    flip: FlipResult.HEAD,
  }, wallet);

  await bet(
    {
      address: wallet.key.accAddress,
      amount: '10000000', // 10 wlunc
      flip: FlipResult.HEAD,
      signature: signature
    },
    wallet
  ).then(res => {
    console.log('bet result: ', res.data);
  });
};

```

