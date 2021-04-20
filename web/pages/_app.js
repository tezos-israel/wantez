import Router from 'next/router';
import React, { useEffect } from 'react';
import { TezosContextProvider } from '@tezos-il/tezos-react-hooks';
import { TezosToolkit } from '@taquito/taquito';

import { withApollo } from '../lib/withApollo';
import { GTMPageView } from '../lib/gtm';
import { WalletProvider } from 'hooks/WalletContext';
import { GigContractProvider } from 'hooks/GigsContractContext';
import { CurrencyProvider } from 'hooks/CurrencyContext';
import { AuthProvider } from '../hooks/AuthContext';
import networks from 'lib/networks';

import '@reach/dialog/styles.css';
import 'styles/_app.css';
import 'tailwindcss/tailwind.css';

const CURRENT_NETWORK = process.env.NEXT_PUBLIC_NETWORK_ID || 'edonet';
const CURRENT_CURRENCY = process.env.NEXT_PUBLIC_CURRENCY_ID || 'usd';
const network = networks.find(({ id }) => id === CURRENT_NETWORK);
const tezos = new TezosToolkit(network.url);

// eslint-disable-next-line react/prop-types
function App({ Component, pageProps }) {
  useEffect(() => {
    const handleRouteChange = (url) => GTMPageView(url);
    Router.events.on('routeChangeComplete', handleRouteChange);
    return () => {
      Router.events.off('routeChangeComplete', handleRouteChange);
    };
  }, []);

  if (process.env.NEXT_PUBLIC_SHOW_ONLY_LANDING_PAGE === 'true') {
    return (
      <div id="app">
        <Component {...pageProps} />
      </div>
    );
  }

  return (
    <div id="app">
      <AuthProvider>
        <TezosContextProvider tezos={tezos}>
          <WalletProvider network={network.id}>
            <GigContractProvider address={network.contract}>
              <CurrencyProvider currencyId={CURRENT_CURRENCY}>
                <Component {...pageProps} network={network} />
              </CurrencyProvider>
            </GigContractProvider>
          </WalletProvider>
        </TezosContextProvider>
      </AuthProvider>
    </div>
  );
}

export default withApollo()(App);
