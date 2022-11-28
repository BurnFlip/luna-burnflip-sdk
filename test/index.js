import {
  createSignature,
  FlipResult,
  getReadonlyFlipClient,
  getTokenBalance,
  increaseAllowance,
  mintToken,
} from '../dist/index.js';
import { LCDClient, MnemonicKey } from '@terra-money/terra.js';
import { bet } from '../dist/index.js';
import axios from 'axios';

const MNEMONIC = ''; // Your mnemonic;
// Create LCD first.
let lcd = new LCDClient({
  URL: 'https://lcd.terra.dev',
  chainID: 'columbus-5',
});

const readFlipClient = async () => {
  // Readonly client for fetching data
  const readonlyFlipClient = getReadonlyFlipClient('classic');

  const history = await readonlyFlipClient.getAllBettingHistoryQuery({});
  console.log('bet history: ', history);
};

const mint = async () => {
  const mk = new MnemonicKey({
    mnemonic: MNEMONIC,
  });
  const wallet = lcd.wallet(mk);
  await mintToken('classic', wallet, '10000000');
  // Mint 1 WLUNC
  const balance = await getTokenBalance('classic', wallet.key.accAddress);
  console.log('balance: ', balance);
};

const doBet = async () => {
  const mk = new MnemonicKey({
    mnemonic: MNEMONIC,
  });
  const wallet = lcd.wallet(mk);
  const flipQueryClient = getReadonlyFlipClient('classic');
  //approve
  await increaseAllowance(
    'classic',
    wallet,
    '10000000',
    flipQueryClient.contractAddress
  );

  const timestamp = Date.now().toString();
  const signature = await createSignature(
    {
      address: wallet.key.accAddress,
      amount: '10000000', // 10 wlunc
      flip: FlipResult.HEAD,
      timestamp: timestamp
    },
    wallet
  );

  await bet({
    address: wallet.key.accAddress,
    amount: '10000000', // 10 wlunc
    flip: FlipResult.HEAD,
    timestamp,
    signature: signature,
  });
};

readFlipClient();
mint();
doBet();
