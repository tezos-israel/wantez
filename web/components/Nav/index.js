import React from 'react';
import PropTypes from 'prop-types';

import Link from 'next/link';
import logo from './site-logo.svg';

import UserButtons from './UserButtons';

export default function Nav({ loading, user, balance, address, onLogout }) {
  const shortAddress = address
    ? `${address.substr(0, 5)}...${address.substr(-5)}`
    : '';

  return (
    <nav
      className="fixed flex items-center justify-end w-full h-20 px-6 bg-gradient-to-l"
      style={{
        '--gradient-color-stops': '#0e453c, #06211c',
      }}
    >
      <Link href="/">
        <img src={logo} alt="logo" className="mb-1 mr-auto" />
      </Link>

      {!loading && user && (
        <>
          {/* <button type="submit">
            <Link href="/bounty/create">Create Bounty</Link>
          </button> */}
        </>
      )}
      <div className="flex items-center space-x-4">
        {!loading && address ? (
          <div>
            <div>{shortAddress}</div>
            <div>{balance}</div>
          </div>
        ) : (
          <div className="text-sm text-red-600">Not connected to wallet</div>
        )}
        <UserButtons user={user} loading={loading} onLogout={onLogout} />
      </div>
    </nav>
  );
}

Nav.propTypes = {
  loading: PropTypes.bool,
  user: PropTypes.any,
  address: PropTypes.string,
  balance: PropTypes.number,
  onLogout: PropTypes.func.isRequired,
};
