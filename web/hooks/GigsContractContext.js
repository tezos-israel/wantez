import PropTypes from 'prop-types';
import { createContext, useContext, useEffect, useState } from 'react';

import { useContract } from '@tezos-il/tezos-react-hooks';

import { useOnRouteChange } from './useOnRouteChange';

export const GigsContractContext = createContext({
  connected: false,
  loading: false,
  error: null,
  connect() {},

  // eslint-disable-next-line no-unused-vars
  fundGig() {
    throw new Error('not implemented');
  },
  // eslint-disable-next-line no-unused-vars
  refundGig() {
    throw new Error('not implemented');
  },
  // eslint-disable-next-line no-unused-vars
  payWork(wantezId = '', paymentAddress = '') {
    throw new Error('not implemented');
  },
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
        payWork,
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

  function payWork(wantezId, paymentAddress) {
    return callMethod(
      async (methods) =>
        await methods.approveApplication(wantezId, paymentAddress).send()
    );
  }
}

GigContractProvider.propTypes = {
  address: PropTypes.string.isRequired,
};
