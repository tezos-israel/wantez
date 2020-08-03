import React from "react";
import Head from "next/head";
import PropTypes from "prop-types";

import { useFetchUser } from "lib/user";

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
  const { user, loading: userLoading } = useFetchUser();
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
        className={classes.navBar}
      />

      <main>{children}</main>
    </Container>
  );
}

Layout.propTypes = {
  children: PropTypes.any,
  title: PropTypes.string,
};

export default Layout;
