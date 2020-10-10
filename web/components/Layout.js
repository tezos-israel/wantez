import React from "react";
import Head from "next/head";
import PropTypes from "prop-types";

import { useAuthContext } from "hooks/AuthContext";

import NavBar from "./Nav";

import { useTezosContext } from "hooks/TezosContext";

function Layout({ children, title }) {
  const { user, loading: userLoading, setUser, magic } = useAuthContext();
  const { address, balance, ...tezosState } = useTezosContext();

  const loading = userLoading || tezosState.loading;

  return (
    <div className="flex flex-col h-screen">
      <Head>
        <title>{title ? `${title} - ` : ""}Wantez</title>
      </Head>

      <NavBar
        address={address}
        balance={balance}
        user={user}
        loading={loading}
        onLogout={handleLogout}
      />

      <main className="flex-auto">{children}</main>
    </div>
  );

  /**
   * Log user out of of the session with our app (clears the `auth` cookie)
   * Log the user out of their session with Magic
   */
  async function handleLogout() {
    await fetch(`${process.env.NEXT_PUBLIC_SERVER_URL}/api/logout`);
    setUser(null);
    await magic.user.logout();
  }
}

Layout.propTypes = {
  children: PropTypes.any,
  title: PropTypes.string,
};

export default Layout;
