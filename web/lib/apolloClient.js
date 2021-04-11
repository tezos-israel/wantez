import fetch from 'isomorphic-unfetch';
import { ApolloClient, createHttpLink } from '@apollo/client';
import { setContext } from '@apollo/client/link/context';
import { InMemoryCache } from '@apollo/client/cache';
// import { onError } from '@apollo/client/link/error';

// let accessToken = null;
const HASURA_DOMAIN = process.env.NEXT_PUBLIC_HASURA_DOMAIN;

const httpLink = createHttpLink({
  uri: `http${HASURA_DOMAIN}/v1/graphql`,
  credentials: 'include',
  fetch,
});

const authLink = setContext(async function authLink(req, { headers }) {
  const isServer = typeof window === 'undefined';
  let baseUrl = '';
  if (isServer) {
    const protocol = req.headers['x-forwarded-proto'] || 'http';
    baseUrl = req ? `${protocol}://${req.headers.host}` : '';
  }
  const accessToken = await requestAccessToken(baseUrl);
  return accessToken
    ? {
        headers: {
          ...headers,
          authorization: `Bearer ${accessToken}`,
        },
      }
    : { headers };
});

// remove cached token on 401 from the server
// onError(function onApolloError({ networkError }) {
//   if (
//     networkError &&
//     networkError.name === 'ServerError' &&
//     networkError.statusCode === 401
//   ) {
//     accessToken = null;
//   }
// });

export default function createApolloClient(initialState) {
  const onServer = typeof window === 'undefined';
  const cache = new InMemoryCache().restore(initialState);

  return new ApolloClient({
    ssrMode: onServer,
    link: authLink.concat(httpLink),
    cache,
  });
}

async function requestAccessToken(baseUrl = '') {
  try {
    const res = await fetch(`${baseUrl}/api/me`);
    if (res.ok) {
      const json = await res.json();
      return json.token;
    } else {
      return null;
    }
  } catch (e) {
    console.error('failed loading access token', e);
    return null;
  }
}
