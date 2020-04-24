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

  const gqlResponse = await fetch(process.env.GRAPHQL_ENDPOINT, {
    method: "POST",
    headers,
    body: JSON.stringify(req.body),
  });
  const data = await gqlResponse.text();
  console.log({ data });
  res.status(gqlResponse.status).send(data);
}

async function fetchAccessToken(req, res) {
  // try {
  const session = await auth0.getSession(req, res);
  return session && session.idToken;
  // } catch (e) {
  //   if (e.name === "AccessTokenError") {
  //     return;
  //   }
  //   throw e;
  // }
}

// fetch("http://localhost:3000/api/graphql", {
//   headers: {
//     accept: "*/*",
//     "accept-language": "en-IL,en;q=0.9,he-IL;q=0.8,he;q=0.7,en-US;q=0.6",
//     "content-type": "application/json",
//     "sec-fetch-dest": "empty",
//     "sec-fetch-mode": "cors",
//     "sec-fetch-site": "same-origin",
//   },
//   referrer: "http://localhost:3000/",
//   referrerPolicy: "no-referrer-when-downgrade",
//   body:
//     '{"variables":{},"query":"{\\n  bounty {\\n    id\\n    fee\\n    __typename\\n  }\\n}\\n"}',
//   method: "POST",
//   mode: "cors",
//   credentials: "include",
// });
