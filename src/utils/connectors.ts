import { InjectedConnector } from "@web3-react/injected-connector";
import { NetworkConnector } from "@web3-react/network-connector";
import { currentNetwork } from "./index"
import { WalletConnectConnector } from '@web3-react/walletconnect-connector'


export const RPC_URLS = {
  1: "https://mainnet.infura.io/v3/9aa3d95b3bc440fa88ea12eaa4456161",
  3: "https://ropsten.infura.io/v3/9aa3d95b3bc440fa88ea12eaa4456161",
  4: "https://rinkeby.infura.io/v3/9aa3d95b3bc440fa88ea12eaa4456161",
  42: "https://kovan.infura.io/v3/9aa3d95b3bc440fa88ea12eaa4456161",
  250: "https://rpc.ftm.tools",
  137: "https://rpc.ankr.com/polygon/2c2b6a6bd33579fc5024a9a4040ebe691b87abbf514b5a5e32a743217897dd62",
  43113: "https://api.avax-test.network/ext/bc/C/rpc",
  43114: "https://api.avax.network/ext/bc/C/rpc",
};

export const networkConnector = new NetworkConnector({
  urls: RPC_URLS,
  defaultChainId: parseInt(currentNetwork)
})

export const injectedConnector = new InjectedConnector({
  supportedChainIds: [parseInt(currentNetwork)],
});

export const walletConnector = new WalletConnectConnector({
  rpc: RPC_URLS,
  chainId: parseInt(currentNetwork),
  bridge: 'https://bridge.walletconnect.org',
  qrcode: true
})

