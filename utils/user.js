import React from "react";
import propTypes from "prop-types";
import fetch from "isomorphic-unfetch";
// Use a global to save the user, so we don't have to fetch it again after page navigations
let userState;

const User = React.createContext({ user: null, loading: false });

export async function fetchUser() {
  if (userState !== undefined) {
    return userState;
  }

  const res = await fetch("/api/me");
  userState = res.ok ? await res.json() : null;
  return userState;
}

export function UserProvider({ user, loading, children }) {
  // If the user was fetched in SSR add it to userState so we don't fetch it again
  React.useEffect(() => {
    if (!userState && user) {
      userState = user;
    }
  }, [user]);

  return <User.Provider value={{ user, loading }}>{children}</User.Provider>;
}

UserProvider.propTypes = {
  user: propTypes.object,
  loading: propTypes.bool,
  children: propTypes.object.isRequired,
};

export function useUser() {
  return React.useContext(User);
}

export function useFetchUser() {
  const [data, setUser] = React.useState({
    user: userState || null,
    loading: userState === undefined,
  });

  React.useEffect(() => {
    if (userState !== undefined) {
      return;
    }

    let isMounted = true;

    fetchUser().then((user) => {
      // Only set the user if the component is still mounted
      if (isMounted) {
        setUser({ user, loading: false });
      }
    });

    return () => {
      isMounted = false;
    };
  }, [userState]);

  return data;
}
