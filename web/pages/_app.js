import { TezosContextProvider } from '@tezos-il/tezos-react-hooks';
import { TezosToolkit } from '@taquito/taquito';

import { withApollo } from '../lib/withApollo';
import { WalletProvider } from 'hooks/WalletContext';
import { GigContractProvider } from 'hooks/GigsContractContext';
import { AuthProvider } from '../hooks/AuthContext';
import '@reach/dialog/styles.css';
import 'styles/_app.css';
import 'tailwindcss/tailwind.css';

const tezos = new TezosToolkit('https://delphinet.SmartPy.io');

// eslint-disable-next-line react/prop-types
function App({ Component, pageProps }) {
  return (
    <div id="app">
      <AuthProvider>
        <TezosContextProvider tezos={tezos}>
          <WalletProvider>
            <GigContractProvider>
              <Component {...pageProps} />
            </GigContractProvider>
          </WalletProvider>
        </TezosContextProvider>
      </AuthProvider>
    </div>
  );
}

export default withApollo()(App);
