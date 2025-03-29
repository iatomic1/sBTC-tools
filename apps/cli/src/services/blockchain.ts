import {
  type BufferCV,
  type ClarityValue,
  type ContractPrincipalCV,
  type FalseCV,
  type IntCV,
  type ListCV,
  type NoneCV,
  Pc,
  PostConditionMode,
  type ResponseErrorCV,
  type ResponseOkCV,
  type SignedContractCallOptions,
  type SomeCV,
  type StandardPrincipalCV,
  type StringAsciiCV,
  type StringUtf8CV,
  type TrueCV,
  type TupleCV,
  type TupleData,
  type TxBroadcastResult,
  type UIntCV,
  broadcastTransaction,
  bufferCV,
  makeContractCall,
  noneCV,
  principalCV,
  someCV,
  uintCV,
} from '@stacks/transactions';
import axios from 'axios';
import {
  NETWORKS,
  SBTC_CONTRACT_ID,
  SBTC_TESTNET_CONTRACT_ID,
} from '../constants';
import type { AddressBalanceResponse } from '../types/balance';
import type { Config } from '../types/index';

export const getAddressBalance = async (
  config: Config,
): Promise<{ sBtcBal: string; stxBal: string } | null> => {
  try {
    if (!config.WALLET_ADDRESS) return null;

    const baseUrl =
      config.NETWORK === 'mainnet'
        ? NETWORKS.mainnet.coreApi
        : NETWORKS.testnet.coreApi;

    const url = `${baseUrl}/extended/v1/address/${config.WALLET_ADDRESS}/balances`;
    const { data } = await axios.get<AddressBalanceResponse>(url);

    const sBtcBal =
      data.fungible_tokens[
        `${
          config.NETWORK === 'mainnet'
            ? SBTC_CONTRACT_ID
            : SBTC_TESTNET_CONTRACT_ID
        }::sbtc-token`
      ]?.balance || '0';

    const stxBal = data.stx.balance;

    return { sBtcBal, stxBal };
  } catch (error) {
    console.error(error);
    return null;
  }
};

export const transfer = async (
  amount: string,
  receiverAddr: string,
  fee: string,
  memo: string,
  config: Config,
): Promise<TxBroadcastResult> => {
  let memoCV:
    | TrueCV
    | FalseCV
    | BufferCV
    | IntCV
    | UIntCV
    | StandardPrincipalCV
    | ContractPrincipalCV
    | ResponseErrorCV<ClarityValue>
    | ResponseOkCV<ClarityValue>
    | NoneCV
    | SomeCV<ClarityValue>
    | ListCV<ClarityValue>
    | TupleCV<TupleData<ClarityValue>>
    | StringAsciiCV
    | StringUtf8CV;
  if (memo) {
    let memoBytes: Uint8Array = new Uint8Array(Buffer.from(memo));
    if (memoBytes.length > 34) {
      memoBytes = memoBytes.slice(0, 34);
    } else if (memoBytes.length < 34) {
      const padding = new Uint8Array(34 - memoBytes.length);
      const combined = new Uint8Array(34);
      combined.set(memoBytes);
      combined.set(padding, memoBytes.length);
      memoBytes = combined;
    }
    memoCV = someCV(bufferCV(memoBytes));
  } else {
    memoCV = noneCV();
  }

  const decimal = 8;
  const uintAmt = Number.parseFloat(amount) * 10 ** decimal;
  const contract =
    config.NETWORK === 'mainnet'
      ? SBTC_CONTRACT_ID.split('.')
      : SBTC_TESTNET_CONTRACT_ID.split('.');
  const txOptions: SignedContractCallOptions = {
    contractAddress: contract[0],
    contractName: contract[1],
    functionName: 'transfer',
    postConditions: [
      Pc.principal(config.WALLET_ADDRESS as string)
        .willSendEq(uintAmt)
        .ft(`${contract[0]}.${contract[1]}`, 'sbtc-token'),
    ],
    functionArgs: [
      uintCV(uintAmt.toString()),
      principalCV(config.WALLET_ADDRESS as string),
      principalCV(receiverAddr),
      memoCV,
    ],
    fee: Math.floor(Number.parseFloat(fee) * 1000000),
    senderKey: config.PRIVATE_KEY as string,
    postConditionMode: PostConditionMode.Deny,
    validateWithAbi: true,
    network: config.NETWORK,
  };

  return new Promise((resolve, reject) => {
    setTimeout(async () => {
      try {
        const tx = await makeContractCall(txOptions);
        const res = await broadcastTransaction({
          transaction: tx,
          network: config.NETWORK,
        });
        resolve(res);
      } catch (err) {
        console.error('Error details:', err);
        reject(err);
      }
    }, 0);
  });
};
