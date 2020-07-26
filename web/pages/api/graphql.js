import auth0 from "utils/auth";
import fetch from "isomorphic-unfetch";

export default async function callback(req, res) {
  try {
    const accessToken = await fetchAccessToken(req, res);
    console.log({ accessToken });
    const headers = accessToken
      ? {
          ...req.headers,
          authorization: accessToken && `Bearer ${accessToken}`,
        }
      : req.headers;
    const gqlResponse = await fetch(process.env.GRAPHQL_ENDPOINT, {
      method: "POST",
      headers,
      body: JSON.stringify(req.body),
    });
    console.log("request succeed", gqlResponse.ok, gqlResponse.status);
    const data = await gqlResponse.text();
    res.status(gqlResponse.status).send(data);
  } catch (e) {
    console.log("send to graphql server failed", e);
    res.status(500).send(e);
  }
}

async function fetchAccessToken(req, res) {
  try {
    console.log("in fetch access token");
    const session = await auth0.getSession(req, res);
    console.log("got session", { session });
    return session && session.idToken;
  } catch (e) {
    console.error("failed getting access token", e);
  }
}
