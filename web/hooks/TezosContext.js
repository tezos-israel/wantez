import React, { createContext, useEffect, useContext } from 'react';
import { useBountiesContract } from './use-bounties-contract';
import { useBalanceState } from './use-balance-state';
import { useWallet } from './use-wallet';
import { useOnRouteChange } from './useOnRouteChange';

export const TezosContext = createContext({
  address: '',
  balance: 0,
  bounties: [],
  connected: false,
  loading: false,
  error: null,
  issueBounty() {},
  refundBounty() {},
  approveApplication() {},
});

export const useTezosContext = () => useContext(TezosContext);

export function TezosProvider({ children }) {
  const {
    operationState,
    contractState,
    bounties,
    connect: connectToContract,
    issueBounty,
    refundBounty,
    approveApplication,
    clearErrors: clearContractErrors,
  } = useBountiesContract();
  const {
    initialized: connected,
    address,
    connect: connectToWallet,
    clearError: clearWalletError,
    ...walletState
  } = useWallet();
  const {
    balance,
    clearError: clearBalanceError,
    ...balanceState
  } = useBalanceState(address);

  useOnRouteChange(() => {
    clearContractErrors();
    clearWalletError();
    clearBalanceError();
  });

  useEffect(() => {
    connect();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const loading =
    operationState.loading ||
    contractState.loading ||
    walletState.loading ||
    balanceState.loading;
  const error =
    operationState.error ||
    contractState.error ||
    walletState.error ||
    balanceState.error;

  return (
    <TezosContext.Provider
      value={{
        address,
        balance,
        bounties,
        connected,
        loading,
        error,
        issueBounty,
        refundBounty,
        approveApplication,
      }}
    >
      {children}
    </TezosContext.Provider>
  );

  async function connect() {
    await connectToWallet();
    await connectToContract();
  }
}
