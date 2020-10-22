import React from 'react';
import PropTypes from 'prop-types';
import Link from 'next/link';

import logo from './site-logo.svg';

import { UserMenu } from './UserMenu';
import { WalletMenu } from './WalletMenu';

export default function Nav({
  loading,
  user,
  balance,
  address,
  onLogout,
  onClickWallet,
}) {
  return (
    <nav
      className="fixed z-50 flex items-center w-full h-20 px-6 bg-gradient-to-l"
      style={{
        '--gradient-color-stops': '#0e453c, #06211c',
      }}
    >
      <Link href="/">
        <img src={logo} alt="logo" className="mb-1" />
      </Link>

      <div className="ml-20 space-x-6 text-white">
        <Link href="/explore">Explore</Link>
        {user && <Link href="/fund">Fund</Link>}
      </div>

      <div className="flex items-center ml-auto space-x-4">
        <div className="h-8 border-r-2 border-teal-500"></div>
        <WalletMenu
          address={address}
          balance={balance}
          onClick={onClickWallet}
        />
        <div className="h-8 border-r-2 border-teal-500"></div>
        <UserMenu user={user} loading={loading} onLogout={onLogout} />
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
  onClickWallet: PropTypes.func.isRequired,
};
