import { createContext, useContext, useEffect, useState } from 'react';

import { useContract } from '@tezos-il/tezos-react-hooks';

import { useOnRouteChange } from './useOnRouteChange';

const CONTRACT_ADDRESS = 'KT1K2JLNvTwDNKctaQThjcHrxcmaLoHXH6um';

export const GigsContractContext = createContext({
  connected: false,
  loading: false,
  error: null,
  connect() {},

  fundIssue() {},
  refundWantez() {},
  approveApplication() {},
});

export const useGigsContractContext = () => useContext(GigsContractContext);

export function GigContractProvider({ children }) {
  const {
    contract,
    error,
    // storage,
    loading,
    connect,
    clearError,
  } = useContract(CONTRACT_ADDRESS);

  const [operationLoading, setOperationLoading] = useState(false);

  useEffect(() => {
    if (error) {
      console.error(error);
    }
  }, [error]);

  useOnRouteChange(() => {
    clearError();
  });

  return (
    <GigsContractContext.Provider
      value={{
        connect,
        error,
        loading: loading || operationLoading,
        clearErrors,
        fundIssue,
        refundWantez,
        approveApplication,
      }}
    >
      {children}
    </GigsContractContext.Provider>
  );

  async function callMethod(cb) {
    if (!contract) {
      return;
    }
    setOperationLoading(true);
    try {
      const op = await cb(contract.methods);
      await op.confirmation();
    } finally {
      setOperationLoading(false);
    }
  }

  function clearErrors() {
    clearError();
  }

  function fundIssue(wantez) {
    return callMethod(
      async (methods) =>
        await methods
          .fund(wantez.id, wantez.deadline)
          .send({ amount: wantez.fee })
    );
  }

  function refundWantez({ id }) {
    return callMethod(async (methods) => await methods.refundBounty(id).send());
  }

  function approveApplication(wantezId, paymentAddress) {
    return callMethod(
      async (methods) =>
        await methods.approveApplication(paymentAddress, wantezId).send()
    );
  }
}
