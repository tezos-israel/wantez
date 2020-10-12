import React from 'react';
import PropTypes from 'prop-types';

import Link from 'next/link';
import logo from './site-logo.svg';

import UserButtons from './UserButtons';

export default function Nav({ loading, user, balance, address, onLogout }) {
  const shortAddress = `${address.substr(0, 5)}...${address.substr(-5)}`;
  return (
    <div
      className="h-20 bg-gradient-to-l  flex items-center px-6 justify-end"
      style={{
        '--gradient-color-stops': '#0e453c, #06211c',
      }}
    >
      <Link href="/">
        <img src={logo} alt="logo" className="mb-1 mr-auto" />
      </Link>

      {!loading && user && (
        <>
          <button type="submit">
            <Link href="/bounty/create">Create Bounty</Link>
          </button>
        </>
      )}
      <div className="flex space-x-4 items-center">
        <div>{!loading && shortAddress}</div>
        <div>{!loading && balance}</div>
        <UserButtons user={user} loading={loading} onLogout={onLogout} />
      </div>
    </div>
  );
}

Nav.propTypes = {
  loading: PropTypes.bool,
  user: PropTypes.any,
  address: PropTypes.string,
  balance: PropTypes.number,
  onLogout: PropTypes.func.isRequired,
};
