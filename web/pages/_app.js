import React from 'react';

import { withApollo } from '../lib/withApollo';

import { TezosProvider } from '../hooks/TezosContext';
import { AuthProvider } from '../hooks/AuthContext';
import '@reach/dialog/styles.css';
import 'styles/_app.css';
import 'styles/tailwind.css';

// eslint-disable-next-line react/prop-types
function App({ Component, pageProps }) {
  return (
    <div id="app">
      <AuthProvider>
        <TezosProvider>
          <Component {...pageProps} />
        </TezosProvider>
      </AuthProvider>
    </div>
  );
}

export default withApollo()(App);
