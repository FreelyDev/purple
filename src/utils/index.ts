import { Contract } from '@ethersproject/contracts'
import SWCT_ICO_ABI from 'contracts/SWCT_ICO.json'
import SWCT_TOKEN_ABI from 'contracts/SWCT_Token.json'

export const Networks = {
  PolygonMainNet: 137
}

export const CONTRACTS_BY_NETWORK = {
  [Networks.PolygonMainNet]: {
    SWCT_Token: {
      address: '0x86ff422Ff39f87A219265b204c0F1598440B72Ca',
      abi: SWCT_TOKEN_ABI,
    },
    SWCT_ICO: {
      address: '0x0Fd7C82728E4F177B8DfA2b916fFeE8e5b41FBA9',
      abi: SWCT_ICO_ABI,
    }
  }
}

export const currentNetwork = process.env.REACT_APP_NETWORK_ID;

export const baseApiUrl = process.env.REACT_APP_API_URL;

export function getContractInfo(name, chainId = null) {
  if (!chainId) chainId = currentNetwork;

  const contracts = CONTRACTS_BY_NETWORK?.[chainId];
  if (contracts) {
    return contracts?.[name];
  } else {
    return null;
  }
}

export function truncateWalletString(walletAddress) {
  if (!walletAddress) return walletAddress;
  const lengthStr = walletAddress.length;
  const startStr = walletAddress.substring(0, 7);
  const endStr = walletAddress.substring(lengthStr - 7, lengthStr);
  return startStr + '...' + endStr;
}

export function truncateHashString(txhash) {
  if (!txhash) return txhash;
  const lengthStr = txhash.length;
  const startStr = txhash.substring(0, 10);
  const endStr = txhash.substring(lengthStr - 10, lengthStr);
  return startStr + '...' + endStr;
}

export function getContractObj(name, chainId, provider) {
  const info = getContractInfo(name, chainId);
  return !!info && new Contract(info.address, info.abi, provider);
}

export function getContractObjWithAddress(name, chainId, provider, contractAddress) {
  const info = getContractInfo(name, chainId);
  return !!info && new Contract(contractAddress, info.abi, provider);
}

export const shorter = (str) =>
  str?.length > 8 ? str.slice(0, 6) + '...' + str.slice(-4) : str
