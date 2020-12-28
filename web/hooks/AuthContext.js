import React, { createContext, useState, useEffect, useContext } from 'react';
import { Magic } from 'magic-sdk';
import fetch from 'isomorphic-unfetch';
/* initializing context API values */
const AuthContext = createContext();

export const useAuthContext = () => useContext(AuthContext);

/* this function wraps our entire app within our context APIs so they all have access to their values */
export function AuthProvider({ children }) {
  const [magic, setMagic] = useState();
  const [user, setUser] = useState(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    (async () => {
      setIsLoading(true);

      /* We initialize Magic in `useEffect` so it has access to the global `window` object inside the browser */
      const m = new Magic(process.env.NEXT_PUBLIC_MAGIC_PUBLISHABLE_KEY);
      await setMagic(m);

      /* On page refresh, send a request to /api/me to see if there's a valid user session */
      const res = await fetch('/api/me');
      const { authorized, user } = await res.json();

      /* If the user has a valid session with our server, it will return {authorized: true, user: user} */

      /* If db returns {authorized: false}, there is no valid session, so log user out of their session with Magic if it exists */
      !authorized && magic && magic.user.logout();

      setUser(user);
      setIsLoading(false);
    })();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <AuthContext.Provider
      value={{ user, setUser, magic, isLoading, setIsLoading }}
    >
      {children}
    </AuthContext.Provider>
  );
}
