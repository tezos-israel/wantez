import React from "react";
import Head from "next/head";
import PropTypes from "prop-types";

import { useAuthContext } from "hooks/AuthContext";

import { Container } from "@material-ui/core";

import { makeStyles } from "@material-ui/core/styles";

import NavBar from "./Nav";

import { useTezosContext } from "hooks/TezosContext";

const useStyles = makeStyles((theme) => ({
  root: {},
  navBar: { marginBottom: theme.spacing(2) },
}));

function Layout({ children, title }) {
  const classes = useStyles();
  const { user, loading: userLoading, setUser, magic } = useAuthContext();
  const { address, balance, ...tezosState } = useTezosContext();

  const loading = userLoading || tezosState.loading;

  return (
    <Container className={classes.root}>
      <Head>
        <title>{title ? `${title} - ` : ""}TzGit</title>
      </Head>

      <NavBar
        address={address}
        balance={balance}
        user={user}
        loading={loading}
        onLogout={handleLogout}
        className={classes.navBar}
      />

      <main>{children}</main>
    </Container>
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
