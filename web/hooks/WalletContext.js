import PropTypes from 'prop-types';
import { createContext, useContext, useEffect } from 'react';

import { useBeaconWallet } from '@tezos-il/tezos-react-hooks';
import { useOnRouteChange } from './useOnRouteChange';

export const WalletContext = createContext({
  address: '',
  balance: 0,
  connected: false,
  loading: false,
  error: null,
  connect() {},
});

export const useWalletContext = () => useContext(WalletContext);

export function WalletProvider({ network, children }) {
  const {
    wallet,
    initialized,
    address,
    connect,
    error,
    loading,
    balance,
    clearErrors,
  } = useBeaconWallet();

  useEffect(() => {
    if (error) {
      console.error(error);
    }
  }, [error]);

  useOnRouteChange(() => {
    clearErrors();
  });

  return (
    <WalletContext.Provider
      value={{
        wallet,
        initialized,
        address,
        connect() {
          connect(
            {
              name: 'wantez',
            },
            network
          );
        },
        error,
        loading,
        balance: balance && balance / 10 ** 6,
        clearErrors,
      }}
    >
      {children}
    </WalletContext.Provider>
  );
}

WalletProvider.propTypes = {
  network: PropTypes.string.isRequired,
};
