import React from 'react';
import Head from 'next/head';
import PropTypes from 'prop-types';

import NavBar from './Nav';
import Footer from './Footer';

function Layout({ children, title }) {
  return (
    <div className="flex flex-col h-screen">
      <Head>
        <title>{title ? `${title} - ` : ''}Wantez</title>
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
      </Head>

      <main className="flex flex-col items-center justify-center flex-auto mt-20">
        {children}
      </main>

      <NavBar />
      <Footer />
    </div>
  );
}

Layout.propTypes = {
  children: PropTypes.any,
  title: PropTypes.string,
};

export default Layout;
