// sync-ed from root via `tr sync-refs`
import { ADDRESSES } from '../constant';
export const contractAddress = (name: string, network: string) => {
  // Make sure the contract has actually been deployed to selected network.
  // @ts-ignore
  if (ADDRESSES[network]?.[name].contractAddresses?.default) {
    // @ts-ignore
    return ADDRESSES[network]?.[name]?.contractAddresses?.default;
  }
};
