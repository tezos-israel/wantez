import React from 'react';
import Head from 'next/head';
import PropTypes from 'prop-types';

import NavBar from './Nav';
import { Footer } from './Footer';

function Layout({ children, title }) {
  return (
    <div className="flex flex-col h-screen">
      <Head>
        <title>{title ? `${title} - ` : ''}Wantez</title>
      </Head>

      <NavBar />

      <main className="flex flex-col items-center justify-center flex-auto mt-20 overflow-hidden">
        {children}
      </main>
      <Footer />
    </div>
  );
}

Layout.propTypes = {
  children: PropTypes.any,
  title: PropTypes.string,
};

export default Layout;
