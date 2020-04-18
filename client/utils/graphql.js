import ApolloClient from "apollo-boost";
import fetch from "isomorphic-unfetch";

export const client = new ApolloClient({
  uri: process.env.GRAPHQL_ENDPOINT,
  fetch,
});
