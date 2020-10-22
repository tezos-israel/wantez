import React, { createContext, useContext } from 'react';
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
  fundIssue() {},
  refundWantez() {},
  approveApplication() {},
  connectToContract() {},
  connectToWallet() {},
});

export const useTezosContext = () => useContext(TezosContext);

export function TezosProvider({ children }) {
  const {
    operationState,
    contractState,
    bounties,
    connect: connectToContract,
    fundIssue,
    refundWantez,
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
        fundIssue,
        refundWantez,
        approveApplication,
        connectToWallet,
        connectToContract,
      }}
    >
      {children}
    </TezosContext.Provider>
  );
}
