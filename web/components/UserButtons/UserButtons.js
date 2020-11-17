import React from 'react';
// import PropTypes from 'prop-types';

import { useAuthContext } from 'hooks/AuthContext';
import { useTezosContext } from 'hooks/TezosContext';

import { UserMenu } from './UserMenu';
import { WalletMenu } from './WalletMenu';

export function UserButtons() {
  const { user, loading: userLoading, setUser, magic } = useAuthContext();
  const {
    address,
    balance,
    connectToWallet,
    ...tezosState
  } = useTezosContext();

  const loading = userLoading || tezosState.loading;
  return (
    <div className="flex items-center ml-auto space-x-4">
      <div className="h-8 border-r-2 border-teal-500"></div>
      <WalletMenu
        address={address}
        balance={balance}
        onClick={!address ? connectToWallet : () => {}}
      />
      <div className="h-8 border-r-2 border-teal-500"></div>
      <UserMenu user={user} loading={loading} onLogout={handleLogout} />
    </div>
  );

  /**
   * Log user out of of the session with our app (clears the `auth` cookie)
   * Log the user out of their session with Magic
   */
  async function handleLogout() {
    await fetch(`${process.env.NEXT_PUBLIC_SERVER_URL}/api/logout`);
    setUser(null);
    await magic.user.logout();
  }
}