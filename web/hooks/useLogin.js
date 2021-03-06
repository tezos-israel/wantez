import { useState } from 'react';
import { useAuthContext } from 'hooks/AuthContext';

export function useLogin() {
  const { user, setUser, magic, isLoading } = useAuthContext();

  const [disableLogin, setDisableLogin] = useState(false);

  return { onSubmit, disableLogin, isLoading, user };

  function onSubmit({ email }) {
    if (!email) {
      return;
    }
    handleLogin(email);
  }

  async function authenticateWithDb(authToken) {
    /* Pass the Decentralized ID token in the Authorization header to the database */
    const res = await fetch('/api/login', {
      method: 'POST',
      headers: new Headers({
        Authorization: `Bearer ${authToken}`,
      }),
    });

    const data = await res.json();

    /* If the user is authorized, return an object containing the user properties (issuer, publicAddress, email) */
    /* Else, the login was not successful and return false */
    return data.authorized ? data.user : false;
  }

  async function handleLogin(email) {
    try {
      /* disable the login button to prevent users from clicking it multiple times, triggering mutliple emails */
      setDisableLogin(true);

      /* Get DID Token returned from when the email link is clicked */
      const authToken = await magic.auth.loginWithMagicLink({ email });

      /* `user` will be the user object returned from the db, or `false` if the login failed */
      const user = await authenticateWithDb(authToken);

      if (user) {
        setUser(user);
      }
    } catch (err) {
      /* If the user clicked "cancel", allow them to click the login again */
      setDisableLogin(false);

      /* Handle error (which can occur if the user clicks `Cancel` on the modal after submitting their email) */
      console.error('Error logging in with Magic', err);
    }
  }
}
