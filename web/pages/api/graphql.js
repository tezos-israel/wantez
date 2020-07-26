import auth0 from "utils/auth";
import fetch from "isomorphic-unfetch";

export default async function callback(req, res) {
  try {
    console.log('in callback');
    const accessToken = await fetchAccessToken(req, res);
    console.log({accessToken})
    const headers = accessToken
      ? {
          ...req.headers,
          authorization: accessToken && `Bearer ${accessToken}`,
        }
      : req.headers;
    console.log({endpoint: process.env.GRAPHQL_ENDPOINT})
    const gqlResponse = await fetch(process.env.GRAPHQL_ENDPOINT, {
      method: "POST",
      headers,
      body: JSON.stringify(req.body),
    });
    console.log('request succeed', gqlResponse.ok, gqlResponse.status)
    const data = await gqlResponse.text();
    res.status(gqlResponse.status).send(data);
  } catch (e) {
    console.log('send to graphql server failed')
    res.status(500).send(e);
  }
}

async function fetchAccessToken(req, res) {
  const session = await auth0.getSession(req, res);
  return session && session.idToken;
}
