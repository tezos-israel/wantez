import React from 'react';
// import PropTypes from 'prop-types';
import Link from 'next/link';

import logo from './site-logo.svg';

import { UserButtons } from 'components/UserButtons';

export default function Nav() {
  return (
    <nav className="fixed z-50 flex items-center w-full h-20 px-6 bg-gradient-to-l from-nava to-navb">
      <Link href="/">
        <img src={logo} alt="logo" className="mb-1" />
      </Link>

      <div className="ml-20 space-x-6 text-white">
        <Link href="/explore">Explore</Link>
        <Link href="/fund">Fund</Link>
      </div>

      <UserButtons />
    </nav>
  );
}

Nav.propTypes = {};
