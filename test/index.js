import {
  createSignature,
  FlipResult,
  getReadonlyFlipClient,
  getWLUNAClient,
} from '../dist/index.js';
import { Coins, LCDClient, MnemonicKey } from '@terra-money/terra.js';
import { bet } from '../dist/index.js';

// Create LCD first.
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

readFlipClient();
writeWLUNAClient();
doBet();
