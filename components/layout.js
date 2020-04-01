import React from "react";
import Head from "next/head";
import Header from "./header";
import PropTypes from "prop-types";

Layout.propTypes = {
  user: PropTypes.object,
  loading: PropTypes.bool,
  children: PropTypes.elementType
};

function Layout({ user, loading = false, children }) {
  return (
    <>
      <Head>
        <title>TzGit</title>
      </Head>

      <Header user={user} loading={loading} />

      <main>
        <div className="container">{children}</div>
      </main>

      <style jsx>{`
        .container {
          max-width: 42rem;
          margin: 1.5rem auto;
        }
      `}</style>
      <style jsx global>{`
        body {
          margin: 0;
          color: #333;
          font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto,
            Oxygen, Ubuntu, Cantarell, "Open Sans", "Helvetica Neue", sans-serif;
        }
      `}</style>
    </>
  );
}

export default Layout;
