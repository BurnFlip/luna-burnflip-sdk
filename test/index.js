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

const MNEMONIC = 'critic render reunion inspire lumber napkin phrase usage glove dune loop short document sight drama lecture attack bicycle already duck attend novel march spatial'; // Your mnemonic;
// const MNEMONIC = 'warfare river neutral burger column border tennis perfect blush cram suffer kitchen energy giraffe property couch water patient super nuclear noble vital hazard dry'; // Your mnemonic;
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
  const tx = await increaseAllowance(
    'classic',
    wallet,
    '100000000',
    flipQueryClient.contractAddress
  );
  const allowance = await getTokenAllowance('classic', wallet.key.accAddress, flipQueryClient.contractAddress);
  console.log("allowance: ", allowance);

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
