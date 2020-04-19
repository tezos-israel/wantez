import { ApolloClient, InMemoryCache } from "@apollo/client";
import fetch from "isomorphic-unfetch";

const cache = new InMemoryCache();

export const client = new ApolloClient({
  uri: process.env.GRAPHQL_ENDPOINT,
  fetch,
  cache,
});
