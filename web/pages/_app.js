import React from "react";
// import { ThemeProvider } from "@material-ui/core/styles";
import CssBaseline from "@material-ui/core/CssBaseline";
import { MuiPickersUtilsProvider } from "@material-ui/pickers";
import DateFnsUtils from "@date-io/date-fns";

import { withApollo } from "../lib/withApollo";

import { TezosProvider } from "hooks/TezosContext";
import Layout from "components/Layout";
import "./_app.css";

// eslint-disable-next-line react/prop-types
function App({ Component, pageProps }) {
  return (
    <MuiPickersUtilsProvider utils={DateFnsUtils}>
      <CssBaseline />
      {/* <ThemeProvider> */}
      <TezosProvider>
        <Layout>
          <Component {...pageProps} />
        </Layout>
      </TezosProvider>
      {/* </ThemeProvider> */}
    </MuiPickersUtilsProvider>
  );
}

export default withApollo()(App);
