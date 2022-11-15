import { getFlipClient, getReadonlyFlipClient } from '../dist/index.js';
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
    mnemonic: process.env.MNEMONIC
  });
  const wallet = lcd.wallet(mk);
  const flipClient = getFlipClient(lcd, wallet);
  
};

main();