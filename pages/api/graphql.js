import auth0 from "utils/auth";
import fetch from "isomorphic-unfetch";

export default async function callback(req, res) {
  const accessToken = await fetchAccessToken(req, res);
  const headers = accessToken
    ? {
        ...req.headers,
        authorization: accessToken && `Bearer ${accessToken}`,
      }
    : req.headers;

  try {
    const gqlResponse = await fetch(process.env.GRAPHQL_ENDPOINT, {
      method: "POST",
      headers,
      body: JSON.stringify(req.body),
    });
    const data = await gqlResponse.text();
    res.status(gqlResponse.status).send(data);
  } catch (e) {
    res.status(500).send(e);
  }
}

async function fetchAccessToken(req, res) {
  const session = await auth0.getSession(req, res);
  return session && session.idToken;
}
