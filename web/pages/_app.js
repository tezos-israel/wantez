import React from "react";

import { withApollo } from "../lib/withApollo";

import { TezosProvider } from "../hooks/TezosContext";
import { AuthProvider } from "../hooks/AuthContext";
import "./_app.css";

// eslint-disable-next-line react/prop-types
function App({ Component, pageProps }) {
  return (
    <AuthProvider>
      <TezosProvider>
        <Component {...pageProps} />
      </TezosProvider>
    </AuthProvider>
  );
}

export default withApollo()(App);
