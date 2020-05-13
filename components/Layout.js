import React from "react";
import Head from "next/head";
import PropTypes from "prop-types";

import { useUser } from "utils/user";
import Container from "./ResponsiveContainer";

Layout.propTypes = {
  children: PropTypes.any,
  title: PropTypes.string,
};

function Layout({ children, title }) {
  const { user, loading } = useUser();
  return (
    <Container user={user} loading={loading}>
      <Head>
        <title>{title ? `${title} - ` : ""}TzGit</title>
      </Head>

      <main>{children}</main>
    </Container>
  );
}

export default Layout;
