import { Wallet } from '@terra-money/terra.js';
import { ConnectedWallet } from '@terra-money/wallet-provider';
import { FlipResult } from './@types';
import { isConnectedWallet } from './contract/clients/FlipClient';

export const createSignature = async (
  data: {
    address: string;
    flip: FlipResult;
    amount: string;
    timestamp: string
  },
  wallet: Wallet | ConnectedWallet
) => {
  if (isConnectedWallet(wallet)) {
    const bytes = Buffer.concat([
      Buffer.from(wallet.terraAddress),
      Buffer.from(data.amount + ''),
      Buffer.from(data.flip + ''),
      Buffer.from(data.timestamp)
    ]);

    const signatureBytes = await wallet.signBytes(bytes);

    const signatureBuffer = Array.from(signatureBytes.result.signature);
    const signature = JSON.stringify({
      ...signatureBytes.result,
      signature: signatureBuffer,
    });
    return signature;
  } else {
    const bytes = Buffer.concat([
      Buffer.from(wallet.key.accAddress),
      Buffer.from(data.amount + ''),
      Buffer.from(data.flip + ''),
      Buffer.from(data.timestamp)
    ]);

    const signatureBytes = await wallet.key.sign(bytes);

    const signatureBuffer = Array.from(signatureBytes);
    const signature = JSON.stringify({
      public_key: wallet.key.publicKey,
      signature: signatureBuffer,
    });
    return signature;
  }
};
