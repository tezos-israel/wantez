import PropTypes from 'prop-types';
import { createContext, useContext, useEffect, useState } from 'react';

import { useContract } from '@tezos-il/tezos-react-hooks';

import { useOnRouteChange } from './useOnRouteChange';

export const GigsContractContext = createContext({
  connected: false,
  loading: false,
  error: null,
  connect() {},

  fundGig() {},
  refundGig() {},
  approveApplication() {},
});

export const useGigsContractContext = () => useContext(GigsContractContext);

export function GigContractProvider({ address, children }) {
  const {
    contract,
    error,
    // storage,
    loading,
    connect,
    clearError,
  } = useContract(address);

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
        fundGig,
        refundGig,
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

  function fundGig(wantez) {
    return callMethod(
      async (methods) =>
        await methods
          .fund(wantez.id, wantez.deadline)
          .send({ amount: wantez.fee })
    );
  }

  function refundGig({ id }) {
    return callMethod(async (methods) => await methods.refundBounty(id).send());
  }

  function approveApplication(wantezId, paymentAddress) {
    return callMethod(
      async (methods) =>
        await methods.approveApplication(paymentAddress, wantezId).send()
    );
  }
}

GigContractProvider.propTypes = {
  address: PropTypes.string.isRequired,
};
