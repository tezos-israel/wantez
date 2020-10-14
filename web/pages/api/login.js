const fetch = require('isomorphic-unfetch');

import { magic } from 'lib/magic';
import { encryptCookie, cookie } from 'lib/cookie';
import { serialize } from 'cookie';

export default async (req, res) => {
  const { method } = req;

  if (method !== 'POST') {
    return res.status(400).json({ message: 'Only POST requests are accepted' });
  }

  /* strip token from Authorization header */
  let DIDT = magic.utils.parseAuthorizationHeader(req.headers.authorization);

  try {
    /* validate token to ensure request came from the issuer */
    await magic.token.validate(DIDT);
  } catch (e) {
    console.error('failed validation', e);
    return res.status(e.status || 500).send({ error: e.message });
  }

  /* decode token to get claim obj with data */
  let claim = magic.token.decode(DIDT)[1];

  /* get user data from Magic */
  const userMetadata = await magic.users.getMetadataByIssuer(claim.iss);

  try {
    /* check if user is already in */
    const { id } = await createUserIfNeeded(userMetadata);
    userMetadata.id = id;
  } catch (e) {
    console.error('failed creating user object', e);
    return res.status(e.status || 500).send({ error: e.message });
  }

  try {
    const token = await encryptCookie(userMetadata);
    await res.setHeader('Set-Cookie', serialize('auth', token, cookie));
  } catch (e) {
    console.error('failed creating cookie', e);
    return res.status(e.status || 500).send({ error: e.message });
  }

  /* send back response with user obj */
  return res.json({ authorized: true, user: userMetadata });
};

async function createUserIfNeeded({ email }) {
  const mutation = `
    mutation createUserIfNeeded($email: String!) {
      insert_user_one(
        object: { email: $email, username: $email }
        on_conflict: { constraint: user_email_key, update_columns: lastSeenAt }
      ) {
        id
        email
      }
    }
  `;
  const res = await fetch(
    `http${process.env.NEXT_PUBLIC_HASURA_DOMAIN}/v1/graphql`,
    {
      method: 'POST',
      body: JSON.stringify({ query: mutation, variables: { email } }),
      headers: { 'x-hasura-admin-secret': process.env.HASURA_ADMIN_SECRET },
    }
  );
  const data = await res.json();
  if (data.errors && data.errors.length) {
    throw new Error(data.errors[0].message);
  }

  return data.data.insert_user_one;
}
