import React from 'react';
import PropTypes from 'prop-types';

import Link from 'next/link';

export default function UserMenu({ user, loading, inverted, onLogout }) {
  if (loading) {
    return null;
  }
  return (
    <>
      {user ? (
        <button
          type="button"
          color="primary"
          inverted={inverted}
          onClick={onLogout}
        >
          Log out
        </button>
      ) : (
        <Link href="/login">
          <button type="button" color="primary" inverted={inverted}>
            Log in / Sign up
          </button>
        </Link>
      )}
    </>
  );
}

UserMenu.propTypes = {
  user: PropTypes.object,
  loading: PropTypes.bool,
  inverted: PropTypes.bool,
  onLogout: PropTypes.func.isRequired,
};
