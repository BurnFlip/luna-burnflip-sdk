/**
 * This file was automatically generated by @octalmage/terra-cosmwasm-typescript-gen@0.2.0.
 * DO NOT MODIFY IT BY HAND. Instead, modify the source JSONSchema file,
 * and run the @octalmage/terra-cosmwasm-typescript-gen generate command to regenerate this file.
 */
import {
  LCDClient,
  Coins,
  Wallet,
  MsgExecuteContract,
  TxInfo,
  WaitTxBroadcastResult,
  Fee,
  Msg,
} from '@terra-money/terra.js';
import { ConnectedWallet } from '@terra-money/wallet-provider';
import { NETWORK } from '../../@types';
import { NETWORKS, taxCapUrl, taxRateUrl, WAIT_TIME_IN_BLOCK } from '../../constant';
import { contractAddress } from '../address';
import fetch from 'cross-fetch';

export function isConnectedWallet(
  x: Wallet | ConnectedWallet
): x is ConnectedWallet {
  return typeof (x as Wallet).key === 'undefined';
}
export async function waitForInclusionInBlock(
  lcd: LCDClient,
  txHash: string
): Promise<TxInfo | undefined> {
  let res;
  for (let i = 0; i <= 50; i++) {
    try {
      res = await lcd.tx.txInfo(txHash);
    } catch (error) {
      // NOOP
    }

    if (res) {
      break;
    }

    await new Promise(resolve => setTimeout(resolve, 500));
  }

  return res;
}

export type Addr = string;
export type Uint128 = string;
export interface AllBettingHistoryResponse {
  history: BetData[];
  [k: string]: unknown;
}
export interface BetData {
  address: Addr;
  bet_amount: Uint128;
  bet_id: number;
  bet_result: boolean;
  bet_value: number;
  created_at: number;
  key: string;
  result_hash: string;
  [k: string]: unknown;
}
export interface BetAmountRangeResponse {
  max: Uint128;
  min: Uint128;
  [k: string]: unknown;
}
export interface BetDataByIdResponse {
  data: BetData;
  [k: string]: unknown;
}
export interface BetResultResponse {
  results: string[];
  [k: string]: unknown;
}
export interface BurntAmountResponse {
  amount: Uint128;
  [k: string]: unknown;
}
export interface ContractStateResponse {
  data: State;
  [k: string]: unknown;
}

export interface InstantiateMsg {
  cw20_addr: Addr;
  initial_computed_results: string[];
  max_bet_amount: Uint128;
  min_balance: Uint128;
  min_bet_amount: Uint128;
  [k: string]: unknown;
}
export interface OperatorResponse {
  operator: Addr;
  [k: string]: unknown;
}
export interface OwnerResponse {
  owner: Addr;
  [k: string]: unknown;
}
export type QueryMsg =
  | {
      GetAllBettingHistory: {
        count?: number | null;
        from?: Uint128 | null;
        [k: string]: unknown;
      };
    }
  | {
      GetRandomness: {
        round: number;
        [k: string]: unknown;
      };
    }
  | {
      GetOwner: {
        [k: string]: unknown;
      };
    }
  | {
      GetBurntAmount: {
        [k: string]: unknown;
      };
    }
  | {
      GetBetAmountRange: {
        [k: string]: unknown;
      };
    }
  | {
      GetBetResult: {
        count: number;
        [k: string]: unknown;
      };
    }
  | {
      GetOperator: {
        [k: string]: unknown;
      };
    }
  | {
      GetBetDataById: {
        bet_id: number;
        [k: string]: unknown;
      };
    };
export interface RandomnessResponse {
  value: number;
  [k: string]: unknown;
}
export type CanonicalAddr = string;
export interface State {
  bet_id: Uint128;
  burnt_amount: Uint128;
  cw20_addr: Addr;
  max_bet_amount: Uint128;
  min_balance: Uint128;
  min_bet_amount: Uint128;
  operator: CanonicalAddr;
  owner: CanonicalAddr;
  [k: string]: unknown;
}
export interface FlipReadOnlyInterface {
  contractAddress: string;
  getAllBettingHistoryQuery: ({
    count,
    from,
  }: {
    count?: number;
    from?: number;
  }) => Promise<AllBettingHistoryResponse>;
  getRandomnessQuery: ({
    round,
  }: {
    round: number;
  }) => Promise<RandomnessResponse>;
  getOwnerQuery: () => Promise<OwnerResponse>;
  getBurntAmountQuery: () => Promise<BurntAmountResponse>;
  getBetAmountRangeQuery: () => Promise<BetAmountRangeResponse>;
  getBetResultQuery: ({
    count,
  }: {
    count: number;
  }) => Promise<BetResultResponse>;
  getOperatorQuery: () => Promise<OperatorResponse>;
  getBetDataByIdQuery: ({
    betId,
  }: {
    betId: number;
  }) => Promise<BetDataByIdResponse>;
  getContractStateQuery: () => Promise<ContractStateResponse>;
}
export class FlipQueryClient implements FlipReadOnlyInterface {
  client: LCDClient;
  contractAddress: string;
  network: NETWORK = 'classic';

  constructor(client: LCDClient) {
    this.client = client;
    this.network = this.setNetwork();
    this.contractAddress = contractAddress('flip', this.network);
    this.getAllBettingHistoryQuery = this.getAllBettingHistoryQuery.bind(this);
    this.getRandomnessQuery = this.getRandomnessQuery.bind(this);
    this.getOwnerQuery = this.getOwnerQuery.bind(this);
    this.getBurntAmountQuery = this.getBurntAmountQuery.bind(this);
    this.getBetAmountRangeQuery = this.getBetAmountRangeQuery.bind(this);
    this.getBetResultQuery = this.getBetResultQuery.bind(this);
    this.getOperatorQuery = this.getOperatorQuery.bind(this);
    this.getBetDataByIdQuery = this.getBetDataByIdQuery.bind(this);
    this.getContractStateQuery = this.getContractStateQuery.bind(this);
  }

  setNetwork = (): NETWORK => {
    let network: NETWORK = 'classic';
    Object.entries(NETWORKS).map(([key, value]) => {
      if (value.chainId === this.client.config.chainID) {
        // @ts-ignore
        network = key;
        return;
      }
    });
    return network;
  };

  getAllBettingHistoryQuery = async ({
    count,
    from,
  }: {
    count?: number;
    from?: number;
  }): Promise<AllBettingHistoryResponse> => {
    return this.client.wasm.contractQuery(this.contractAddress, {
      GetAllBettingHistory: {
        count,
        from,
      },
    });
  };
  getRandomnessQuery = async ({
    round,
  }: {
    round: number;
  }): Promise<RandomnessResponse> => {
    return this.client.wasm.contractQuery(this.contractAddress, {
      GetRandomness: {
        round,
      },
    });
  };
  getOwnerQuery = async (): Promise<OwnerResponse> => {
    return this.client.wasm.contractQuery(this.contractAddress, {
      GetOwner: {},
    });
  };
  getBurntAmountQuery = async (): Promise<BurntAmountResponse> => {
    return this.client.wasm.contractQuery(this.contractAddress, {
      GetBurntAmount: {},
    });
  };
  getBetAmountRangeQuery = async (): Promise<BetAmountRangeResponse> => {
    return this.client.wasm.contractQuery(this.contractAddress, {
      GetBetAmountRange: {},
    });
  };
  getBetResultQuery = async ({
    count,
  }: {
    count: number;
  }): Promise<BetResultResponse> => {
    return this.client.wasm.contractQuery(this.contractAddress, {
      GetBetResult: {
        count,
      },
    });
  };
  getOperatorQuery = async (): Promise<OperatorResponse> => {
    return this.client.wasm.contractQuery(this.contractAddress, {
      GetOperator: {},
    });
  };
  getBetDataByIdQuery = async ({
    betId,
  }: {
    betId: number;
  }): Promise<BetDataByIdResponse> => {
    return this.client.wasm.contractQuery(this.contractAddress, {
      GetBetDataById: {
        bet_id: betId,
      },
    });
  };
  getContractStateQuery = async (): Promise<ContractStateResponse> => {
    return this.client.wasm.contractQuery(this.contractAddress, {
      GetContractState: {},
    });
  };
}

export interface FlipInterface extends FlipReadOnlyInterface {
  contractAddress: string;
  bet: (
    {
      actor,
      amount,
      bet,
      betResult,
      computedResults,
      key,
      resultHash,
    }: {
      actor: string;
      amount: string;
      bet: number;
      betResult: boolean;
      computedResults: string[];
      key: string;
      resultHash: string;
    },
    funds?: Coins
  ) => Promise<any>;
  withdraw: (funds?: Coins) => Promise<any>;
  setMinBalance: (
    {
      minBalance,
    }: {
      minBalance: string;
    },
    funds?: Coins
  ) => Promise<any>;
  setNewOwner: (
    {
      newOwner,
    }: {
      newOwner: string;
    },
    funds?: Coins
  ) => Promise<any>;
  setBetAmountRange: (
    {
      max,
      min,
    }: {
      max: string;
      min: string;
    },
    funds?: Coins
  ) => Promise<any>;
  setCw20TokenAddress: (
    {
      newToken,
    }: {
      newToken: string;
    },
    funds?: Coins
  ) => Promise<any>;
  addResult: (
    {
      result,
    }: {
      result: string[];
    },
    funds?: Coins
  ) => Promise<any>;
  sliceResult: (
    {
      count,
    }: {
      count: number;
    },
    funds?: Coins
  ) => Promise<any>;
  setOperator: (
    {
      address,
    }: {
      address: string;
    },
    funds?: Coins
  ) => Promise<any>;
}
export class FlipClient extends FlipQueryClient implements FlipInterface {
  client: LCDClient;
  wallet: Wallet | ConnectedWallet;
  taxRate: any;
  taxCap: any;

  constructor(client: LCDClient, wallet: Wallet | ConnectedWallet) {
    super(client);
    this.client = client;
    this.wallet = wallet;
    this.bet = this.bet.bind(this);
    this.withdraw = this.withdraw.bind(this);
    this.setMinBalance = this.setMinBalance.bind(this);
    this.setNewOwner = this.setNewOwner.bind(this);
    this.setBetAmountRange = this.setBetAmountRange.bind(this);
    this.setCw20TokenAddress = this.setCw20TokenAddress.bind(this);
    this.addResult = this.addResult.bind(this);
    this.sliceResult = this.sliceResult.bind(this);
    this.setOperator = this.setOperator.bind(this);
    this.calcFee = this.calcFee.bind(this);

    this.initGas();
  }

  initGas = () => {
    if (this.client.config.isClassic) {
      // @ts-ignore
      fetch(taxRateUrl).then(taxRateRaw => {
        taxRateRaw.json().then(res => {
          this.taxRate = res;
        });
      });
      // @ts-ignore
      fetch(taxCapUrl).then(taxCapRaw => {
        taxCapRaw.json().then(res => {
          this.taxCap = res;
        });
      });
    }
  };

  calcFee = async (luncAmount: string, msgs: Msg[]) => {
    let actualFundAmount = parseFloat(luncAmount);
    let txFee;
    try {
      // Estimate the gas amount and fee (without burn tax) for the message

      try {
        if (isConnectedWallet(this.wallet)) {
          const accountInfo = await this.client.auth.accountInfo(
            this.wallet.terraAddress
          );
          const signerData = [
            { sequenceNumber: accountInfo.getSequenceNumber() },
          ];
          txFee = await this.client.tx.estimateFee(signerData, {
            msgs: msgs,
            gasPrices: this.client.config.gasPrices,
            gasAdjustment: 3,
            feeDenoms: ['uluna'],
          });
        } else {
          const walletInfo = await this.wallet.accountNumberAndSequence();
          const signerData = [{ sequenceNumber: walletInfo.sequence }];
          txFee = await this.client.tx.estimateFee(signerData, {
            msgs: msgs,
            gasPrices: this.client.config.gasPrices,
            gasAdjustment: 3,
            feeDenoms: ['uluna'],
          });
        }
      } catch (e) {
        console.log('fee estimation error - estimateFee: ', e);
        txFee = new Fee(0, { uluna: 0 });
      }

      let fee = txFee;
      // Retrieve the tax rate and tax cap
      if (this.client.config.isClassic) {
        try {
          // Compute the burn tax amount for this transaction and convert to Coins
          const taxAmount = Math.min(
            Math.ceil(
              parseFloat(luncAmount) * parseFloat(this.taxRate.tax_rate)
            ),
            parseInt(this.taxCap.tax_cap)
          );
          const taxAmountCoins = new Coins({ uluna: taxAmount });

          // Add the burn tax component to the estimated fee
          const totalFee = txFee.amount.add(taxAmountCoins);
          fee = new Fee(txFee.gas_limit, totalFee);
          actualFundAmount -= taxAmount;
        } catch (e) {
          console.log('tax calculation error: ', e);
        }
      }

      return { fee, actualFunds: new Coins({ uluna: actualFundAmount }) };
    } catch (e) {
      console.log('fee estimation error: ', e);
      return {
        fee: new Fee(0, { uluna: 0 }),
        actualFunds: new Coins({ uluna: actualFundAmount }),
      };
    }
  };

  bet = async (
    {
      actor,
      amount,
      bet,
      betResult,
      computedResults,
      key,
      resultHash,
    }: {
      actor: string;
      amount: string;
      bet: number;
      betResult: boolean;
      computedResults: string[];
      key: string;
      resultHash: string;
    },
    funds?: Coins
  ): Promise<WaitTxBroadcastResult | TxInfo | undefined> => {
    const senderAddress = isConnectedWallet(this.wallet)
      ? this.wallet.walletAddress
      : this.wallet.key.accAddress;
    const execMsg = new MsgExecuteContract(
      senderAddress,
      this.contractAddress,
      {
        Bet: {
          actor,
          amount,
          bet,
          bet_result: betResult,
          computed_results: computedResults,
          key,
          result_hash: resultHash,
        },
      },
      funds
    );

    if (isConnectedWallet(this.wallet)) {
      const tx = await this.wallet.post({
        msgs: [execMsg],
        //@ts-ignore
        isClassic: this.client.config.isClassic,
        feeDenoms: ['uluna'],
      });
      return waitForInclusionInBlock(this.client, tx.result.txhash);
    } else {
      const execTx = await this.wallet.createAndSignTx({
        msgs: [execMsg],
        //@ts-ignore
        isClassic: this.client.config.isClassic,
        feeDenoms: ['uluna'],
      });
      return this.client.tx.broadcast(execTx, WAIT_TIME_IN_BLOCK);
    }
  };
  withdraw = async (
    funds?: Coins
  ): Promise<WaitTxBroadcastResult | TxInfo | undefined> => {
    const senderAddress = isConnectedWallet(this.wallet)
      ? this.wallet.walletAddress
      : this.wallet.key.accAddress;
    const execMsg = new MsgExecuteContract(
      senderAddress,
      this.contractAddress,
      {
        Withdraw: {},
      },
      funds
    );

    if (isConnectedWallet(this.wallet)) {
      const tx = await this.wallet.post({
        msgs: [execMsg],
        //@ts-ignore
        isClassic: this.client.config.isClassic,
        feeDenoms: ['uluna'],
      });
      return waitForInclusionInBlock(this.client, tx.result.txhash);
    } else {
      const execTx = await this.wallet.createAndSignTx({
        msgs: [execMsg],
        //@ts-ignore
        isClassic: this.client.config.isClassic,
        feeDenoms: ['uluna'],
      });
      return this.client.tx.broadcast(execTx, WAIT_TIME_IN_BLOCK);
    }
  };
  setMinBalance = async (
    {
      minBalance,
    }: {
      minBalance: string;
    },
    funds?: Coins
  ): Promise<WaitTxBroadcastResult | TxInfo | undefined> => {
    const senderAddress = isConnectedWallet(this.wallet)
      ? this.wallet.walletAddress
      : this.wallet.key.accAddress;
    const execMsg = new MsgExecuteContract(
      senderAddress,
      this.contractAddress,
      {
        SetMinBalance: {
          min_balance: minBalance,
        },
      },
      funds
    );

    if (isConnectedWallet(this.wallet)) {
      const tx = await this.wallet.post({
        msgs: [execMsg],
        //@ts-ignore
        isClassic: this.client.config.isClassic,
        feeDenoms: ['uluna'],
      });
      return waitForInclusionInBlock(this.client, tx.result.txhash);
    } else {
      const execTx = await this.wallet.createAndSignTx({
        msgs: [execMsg],
        //@ts-ignore
        isClassic: this.client.config.isClassic,
        feeDenoms: ['uluna'],
      });
      return this.client.tx.broadcast(execTx, WAIT_TIME_IN_BLOCK);
    }
  };
  setNewOwner = async (
    {
      newOwner,
    }: {
      newOwner: string;
    },
    funds?: Coins
  ): Promise<WaitTxBroadcastResult | TxInfo | undefined> => {
    const senderAddress = isConnectedWallet(this.wallet)
      ? this.wallet.walletAddress
      : this.wallet.key.accAddress;
    const execMsg = new MsgExecuteContract(
      senderAddress,
      this.contractAddress,
      {
        SetNewOwner: {
          new_owner: newOwner,
        },
      },
      funds
    );

    if (isConnectedWallet(this.wallet)) {
      const tx = await this.wallet.post({
        msgs: [execMsg],
        //@ts-ignore
        isClassic: this.client.config.isClassic,
        feeDenoms: ['uluna'],
      });
      return waitForInclusionInBlock(this.client, tx.result.txhash);
    } else {
      const execTx = await this.wallet.createAndSignTx({
        msgs: [execMsg],
        //@ts-ignore
        isClassic: this.client.config.isClassic,
        feeDenoms: ['uluna'],
      });
      return this.client.tx.broadcast(execTx, WAIT_TIME_IN_BLOCK);
    }
  };
  setBetAmountRange = async (
    {
      max,
      min,
    }: {
      max: string;
      min: string;
    },
    funds?: Coins
  ): Promise<WaitTxBroadcastResult | TxInfo | undefined> => {
    const senderAddress = isConnectedWallet(this.wallet)
      ? this.wallet.walletAddress
      : this.wallet.key.accAddress;
    const execMsg = new MsgExecuteContract(
      senderAddress,
      this.contractAddress,
      {
        SetBetAmountRange: {
          max,
          min,
        },
      },
      funds
    );

    if (isConnectedWallet(this.wallet)) {
      const tx = await this.wallet.post({
        msgs: [execMsg],
        //@ts-ignore
        isClassic: this.client.config.isClassic,
        feeDenoms: ['uluna'],
      });
      return waitForInclusionInBlock(this.client, tx.result.txhash);
    } else {
      const execTx = await this.wallet.createAndSignTx({
        msgs: [execMsg],
        //@ts-ignore
        isClassic: this.client.config.isClassic,
        feeDenoms: ['uluna'],
      });
      return this.client.tx.broadcast(execTx, WAIT_TIME_IN_BLOCK);
    }
  };
  setCw20TokenAddress = async (
    {
      newToken,
    }: {
      newToken: string;
    },
    funds?: Coins
  ): Promise<WaitTxBroadcastResult | TxInfo | undefined> => {
    const senderAddress = isConnectedWallet(this.wallet)
      ? this.wallet.walletAddress
      : this.wallet.key.accAddress;
    const execMsg = new MsgExecuteContract(
      senderAddress,
      this.contractAddress,
      {
        SetCw20TokenAddress: {
          new_token: newToken,
        },
      },
      funds
    );

    if (isConnectedWallet(this.wallet)) {
      const tx = await this.wallet.post({
        msgs: [execMsg],
        //@ts-ignore
        isClassic: this.client.config.isClassic,
        feeDenoms: ['uluna'],
      });
      return waitForInclusionInBlock(this.client, tx.result.txhash);
    } else {
      const execTx = await this.wallet.createAndSignTx({
        msgs: [execMsg],
        //@ts-ignore
        isClassic: this.client.config.isClassic,
        feeDenoms: ['uluna'],
      });
      return this.client.tx.broadcast(execTx, WAIT_TIME_IN_BLOCK);
    }
  };
  addResult = async (
    {
      result,
    }: {
      result: string[];
    },
    funds?: Coins
  ): Promise<WaitTxBroadcastResult | TxInfo | undefined> => {
    const senderAddress = isConnectedWallet(this.wallet)
      ? this.wallet.walletAddress
      : this.wallet.key.accAddress;
    const execMsg = new MsgExecuteContract(
      senderAddress,
      this.contractAddress,
      {
        AddResult: {
          result,
        },
      },
      funds
    );

    if (isConnectedWallet(this.wallet)) {
      const tx = await this.wallet.post({
        msgs: [execMsg],
        //@ts-ignore
        isClassic: this.client.config.isClassic,
        feeDenoms: ['uluna'],
      });
      return waitForInclusionInBlock(this.client, tx.result.txhash);
    } else {
      const execTx = await this.wallet.createAndSignTx({
        msgs: [execMsg],
        //@ts-ignore
        isClassic: this.client.config.isClassic,
        feeDenoms: ['uluna'],
      });
      return this.client.tx.broadcast(execTx, WAIT_TIME_IN_BLOCK);
    }
  };
  sliceResult = async (
    {
      count,
    }: {
      count: number;
    },
    funds?: Coins
  ): Promise<WaitTxBroadcastResult | TxInfo | undefined> => {
    const senderAddress = isConnectedWallet(this.wallet)
      ? this.wallet.walletAddress
      : this.wallet.key.accAddress;
    const execMsg = new MsgExecuteContract(
      senderAddress,
      this.contractAddress,
      {
        SliceResult: {
          count,
        },
      },
      funds
    );

    if (isConnectedWallet(this.wallet)) {
      const tx = await this.wallet.post({
        msgs: [execMsg],
        //@ts-ignore
        isClassic: this.client.config.isClassic,
        feeDenoms: ['uluna'],
      });
      return waitForInclusionInBlock(this.client, tx.result.txhash);
    } else {
      const execTx = await this.wallet.createAndSignTx({
        msgs: [execMsg],
        //@ts-ignore
        isClassic: this.client.config.isClassic,
        feeDenoms: ['uluna'],
      });
      return this.client.tx.broadcast(execTx, WAIT_TIME_IN_BLOCK);
    }
  };
  setOperator = async (
    {
      address,
    }: {
      address: string;
    },
    funds?: Coins
  ): Promise<WaitTxBroadcastResult | TxInfo | undefined> => {
    const senderAddress = isConnectedWallet(this.wallet)
      ? this.wallet.walletAddress
      : this.wallet.key.accAddress;
    const execMsg = new MsgExecuteContract(
      senderAddress,
      this.contractAddress,
      {
        SetOperator: {
          address,
        },
      },
      funds
    );

    if (isConnectedWallet(this.wallet)) {
      const tx = await this.wallet.post({
        msgs: [execMsg],
        //@ts-ignore
        isClassic: this.client.config.isClassic,
        feeDenoms: ['uluna'],
      });
      return waitForInclusionInBlock(this.client, tx.result.txhash);
    } else {
      const execTx = await this.wallet.createAndSignTx({
        msgs: [execMsg],
        //@ts-ignore
        isClassic: this.client.config.isClassic,
        feeDenoms: ['uluna'],
      });
      return this.client.tx.broadcast(execTx, WAIT_TIME_IN_BLOCK);
    }
  };
}
