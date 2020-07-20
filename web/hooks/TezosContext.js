import React, { createContext, useEffect, useContext } from "react";
import { useBountiesContract } from "./use-bounties-contract";
import { useBalanceState } from "./use-balance-state";
import { useWallet } from "./use-wallet";

export const TezosContext = createContext({
  address: "",
  balance: 0,
  bounties: [],
  connected: false,
  loading: false,
  error: null,
  issueBounty() {},
  refundBounty() {},
  approveBounty() {},
});

export const useTezosContext = () => useContext(TezosContext);

export function TezosProvider({ children }) {
  const {
    operationState,
    contractState,
    bounties,
    connect: connectToContract,
    issueBounty,
  } = useBountiesContract();
  const {
    initialized: connected,
    address,
    connect: connectToWallet,
    ...walletState
  } = useWallet();
  const { balance, ...balanceState } = useBalanceState(address);

  useEffect(() => {
    connect();
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
