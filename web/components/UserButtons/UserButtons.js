import React from 'react';
// import PropTypes from 'prop-types';

import { useAuthContext } from 'hooks/AuthContext';
import { useWalletContext } from 'hooks/WalletContext';

import { UserMenu } from './UserMenu';
import { WalletMenu } from './WalletMenu';

export function UserButtons() {
  const { user, loading: userLoading, setUser, magic } = useAuthContext();
  const {
    address,
    balance,
    connect,
    loading: walletLoading,
  } = useWalletContext();

  const loading = userLoading || walletLoading;
  return (
    <div className="flex items-center ml-auto space-x-4">
      <WalletMenu
        address={address}
        balance={balance}
        onClick={!address ? connect : () => {}}
        onLogout={handleLogout}
      />
      <div className="h-8 border-r border-teal-500"></div>
      <UserMenu user={user} loading={loading} />
    </div>
  );

  /**
   * Log user out of of the session with our app (clears the `auth` cookie)
   * Log the user out of their session with Magic
   */
  async function handleLogout() {
    await fetch('/api/logout');
    setUser(null);
    await magic.user.logout();
  }
}
