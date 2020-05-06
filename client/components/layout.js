import React from "react";
import Head from "next/head";
import PropTypes from "prop-types";
import { Container } from "semantic-ui-react";

import { useUser } from "utils/user";
import Header from "./header";

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

      <Header user={user} loading={loading} />

      <main>{children}</main>
    </Container>
  );
}

export default Layout;
