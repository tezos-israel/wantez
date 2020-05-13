import React from "react";
import { ApolloProvider } from "@apollo/client";

import { createApolloClient } from "../utils/graphql";
import { UserProvider, useFetchUser } from "utils/user";
import Layout from "components/Layout";

import "semantic-ui-css/semantic.min.css";

// eslint-disable-next-line react/prop-types
export default function App({ Component, pageProps }) {
  const { user, loading, accessToken } = useFetchUser();
  const client = createApolloClient(accessToken);
  return (
    <UserProvider user={user} loading={loading}>
      <ApolloProvider client={client}>
        <Layout>
          <Component {...pageProps} />
        </Layout>
      </ApolloProvider>
    </UserProvider>
  );
}