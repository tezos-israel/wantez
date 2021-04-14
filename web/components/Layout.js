import React from 'react';
import Head from 'next/head';
import PropTypes from 'prop-types';

import NavBar from './Nav';
import Footer from './Footer';
import GTMScript from 'components/GTMScript';

function Layout({ children, title, network }) {
  return (
    <div className="flex flex-col h-screen">
      <Head>
        <GTMScript />
        <title>{title ? `${title} - ` : ''}Wantez </title>
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        <meta
          name="description"
          content="Creating cooperation between developer teams, freelancers, and entrepreneurs, Wantez incentivizes freelancers around the world to contribute code and fix bugs. Wantez allows open source maintainers to develop faster, more cost-efficiently operate and patch bugs, and avoid the hassle of hiring more developers."
        />
        <meta
          name="keywords"
          content="bugs, freelancers, github, gitlab, issue, gig, wantez, issues, fix, freelancer"
        />
      </Head>

      <main className="flex flex-col items-center justify-center flex-auto mt-20">
        {children}
      </main>

      <NavBar network={network} />
      <Footer />
    </div>
  );
}

Layout.propTypes = {
  children: PropTypes.any,
  title: PropTypes.string,
  network: PropTypes.object.isRequired,
};

export default Layout;
