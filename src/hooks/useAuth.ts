import { useCallback } from 'react'
import { useWeb3React } from '@web3-react/core'
import { injectedConnector, networkConnector, walletConnector } from "../utils/connectors"
import { toast } from 'react-hot-toast'
import { currentNetwork } from 'utils'

let connector = null;
connector = networkConnector;

const useAuth = () => {
  const { chainId, activate, deactivate } = useWeb3React()

  const login = useCallback(async (walletId = 0) => {
    if (walletId === 1) {
      connector = injectedConnector;
    } else if (walletId === 2) {
      connector = walletConnector;
    }

    await activate(connector);
    if (chainId !== parseInt(currentNetwork)) {
      if (connector !== networkConnector) {
        toast.error("Unsupported Network. This platform is working on Polygon Network");
        connector = networkConnector;
        await activate(connector);
      }
    }
  }, [activate, chainId])

  const logout = useCallback(() => {
    deactivate()
  }, [deactivate])

  return { login, logout }
}

export default useAuth
