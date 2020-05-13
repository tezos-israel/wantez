import { ApolloClient, InMemoryCache, HttpLink } from "@apollo/client";
import fetch from "isomorphic-unfetch";

const cache = new InMemoryCache();

export function createApolloClient() {
  // const headers = authToken
  //   ? {
  //       Authorization: `Bearer ${authToken}`,
  //     }
  //   : {};

  return new ApolloClient({
    link: new HttpLink({
      uri: "/api/graphql",
    }),
    fetch,
    cache,
  });
}

// export const client = new ApolloClient({
//   uri: process.env.GRAPHQL_ENDPOINT,
//   fetch,
//   cache,
// });
