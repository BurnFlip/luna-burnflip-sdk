import {
  createSignature,
  FlipResult,
  getReadonlyFlipClient,
  getTokenAllowance,
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
  URL: 'https://lcd.terrarebels.net/',
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
  await mintToken('classic', wallet, '1010000000');
  // Mint 1k WLUNC
  /**
   * We need to send a bit more than 1K lunc to wrap 1K WLUNC.
   * Because there is 0.2% tax fee (burn) for lunc transaction.
   * So if you send 1K lunc, then you will get 998 WLUNC.
   */
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
  const tx = await increaseAllowance(
    'classic',
    wallet,
    '1000000000',
    flipQueryClient.contractAddress
  );
  const allowance = await getTokenAllowance('classic', wallet.key.accAddress, flipQueryClient.contractAddress);
  console.log("allowance: ", allowance);

  const timestamp = Date.now().toString();
  const signature = await createSignature(
    {
      address: wallet.key.accAddress,
      amount: '1000000000', // 1k wlunc
      flip: FlipResult.HEAD,
      timestamp: timestamp
    },
    wallet
  );

  await bet({
    address: wallet.key.accAddress,
    amount: '1000000000', // 1k wlunc
    flip: FlipResult.HEAD,
    timestamp,
    signature: signature,
  });
};

readFlipClient();
mint();
doBet();
