# TSDX User Guide

> This module is SDK for luna classic burn flip game platform. This module can be used in classic, luna 2.0, and pisco testnet.

## Install

To install package, use:

```bash
npm install luna-burnflip-sdk
```

## Usage

```bash
import { getFlipClient, getReadonlyFlipClient, getWLUNAClient } from 'luna-burnflip-sdk';
import { LCDClient, MnemonicKey } from '@terra-money/terra.js';
import { bet } from '../dist/index';

let lcd = new LCDClient({
    URL: 'https://lcd.terra.dev',
    chainID: 'columbus-5',
});

const main = async () => {
  
  const readonlyFlipClient = getReadonlyFlipClient(lcd);
  const history = await readonlyFlipClient.getAllBettingHistoryQuery({});
  console.log("history: ", history.history);

  const mk = new MnemonicKey({
    mnemonic: MNEMONIC,
  });
  const wallet = lcd.wallet(mk);
  const flipClient = getFlipClient(lcd, wallet);
  const wlunaClient = getWLUNAClient(lcd, wallet);
};

main();
```