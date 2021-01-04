import { useEffect, useState } from 'react';

import { TezosContextProvider } from '@tezos-il/tezos-react-hooks';
import { TezosToolkit } from '@taquito/taquito';

import { withApollo } from '../lib/withApollo';
import { WalletProvider } from 'hooks/WalletContext';
import { AuthProvider } from '../hooks/AuthContext';
import '@reach/dialog/styles.css';
import 'styles/_app.css';
import 'styles/tailwind.css';

// eslint-disable-next-line react/prop-types
function App({ Component, pageProps }) {
  const [tezos, setTezos] = useState(null);

  useEffect(() => {
    const tezos = new TezosToolkit('https://delphinet.SmartPy.io');
    setTezos(tezos);
  }, []);

  return (
    <div id="app">
      <AuthProvider>
        <TezosContextProvider tezos={tezos}>
          <WalletProvider>
            <Component {...pageProps} />
          </WalletProvider>
        </TezosContextProvider>
      </AuthProvider>
    </div>
  );
}

export default withApollo()(App);
