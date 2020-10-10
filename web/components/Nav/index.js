import React from 'react';
import PropTypes from 'prop-types';

import Link from 'next/link';
import logo from './site-logo.svg';

import UserButtons from './UserButtons';

export default function Nav({ loading, user, balance, address, onLogout }) {
  const shortAddress = `${address.substr(0, 5)}...${address.substr(-5)}`;
  return (
    <div className="h-20 bg-gradient-to-l from-green-900 to-black flex items-center px-6 justify-between">
      <div className="mb-1">
        <img src={logo} alt="logo" />
      </div>

      <button type="submit" color="primary">
        <Link href="/">Bounties</Link>
      </button>
      {!loading && user && (
        <>
          <button type="submit">
            <Link href="/bounty/create">Create Bounty</Link>
          </button>
        </>
      )}
      <div>
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
