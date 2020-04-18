import React from "react";
import propTypes from "prop-types";
import { ApolloProvider } from "@apollo/react-hooks";

import { client } from "../utils/graphql";

export default function App({ Component, pageProps }) {
  return (
    <ApolloProvider client={client}>
      <Component {...pageProps} />
    </ApolloProvider>
  );
}

App.propTypes = {
  Component: propTypes.element.isRequired,
  pageProps: propTypes.object,
};
