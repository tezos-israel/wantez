import fetch from "isomorphic-unfetch";
import { HttpLink, ApolloClient } from "@apollo/client";
import { InMemoryCache } from "@apollo/client/cache";
import { onError } from "@apollo/client/link/error";
import { WebSocketLink } from "@apollo/client/link/ws";
import { SubscriptionClient } from "subscriptions-transport-ws";

let accessToken = null;
const HASURA_DOMAIN = process.env.NEXT_PUBLIC_HASURA_DOMAIN;

const requestAccessToken = async () => {
  if (accessToken) return;

  const res = await fetch(`${process.env.NEXT_PUBLIC_DOMAIN}/api/session`);
  if (res.ok) {
    const json = await res.json();
    accessToken = json.accessToken;
  } else {
    accessToken = null;
  }
};

// // remove cached token on 401 from the server
onError(({ networkError }) => {
  if (
    networkError &&
    networkError.name === "ServerError" &&
    networkError.statusCode === 401
  ) {
    accessToken = null;
  }
});

const createHttpLink = (headers) => {
  const httpLink = new HttpLink({
    uri: `http${HASURA_DOMAIN}/v1/graphql`,
    credentials: "include",
    headers, // auth token is fetched on the server side
    fetch,
  });
  return httpLink;
};

const createWSLink = () => {
  return new WebSocketLink(
    new SubscriptionClient(`ws${HASURA_DOMAIN}/v1/graphql`, {
      lazy: true,
      reconnect: true,
      connectionParams: async () => {
        await requestAccessToken(); // happens on the client
        return (
          accessToken && {
            headers: {
              authorization: `Bearer ${accessToken}`,
            },
          }
        );
      },
    })
  );
};

export default function createApolloClient(initialState, headers) {
  const ssrMode = typeof window === "undefined";
  let link;
  if (ssrMode) {
    link = createHttpLink(headers); // executed on server
  } else {
    link = createWSLink(); // executed on client
  }
  return new ApolloClient({
    ssrMode,
    link,
    cache: new InMemoryCache().restore(initialState),
  });
}
