import React from "react";
import Head from "next/head";
import PropTypes from "prop-types";

import { Container } from "@material-ui/core";

import NavBar from "./Nav";

import { useUser } from "utils/user";

Layout.propTypes = {
  children: PropTypes.any,
  title: PropTypes.string,
};

function Layout({ children, title }) {
  const { user, loading } = useUser();
  return (
    <Container>
      <Head>
        <title>{title ? `${title} - ` : ""}TzGit</title>
      </Head>

      <NavBar user={user} loading={loading} />

      <main>{children}</main>
    </Container>
  );
}

export default Layout;
