import React from 'react';
import PropTypes from 'prop-types';
import Link from 'next/link';

import { Button } from 'components/shared/Button';

export default function UserMenu({ user, loading, onLogout }) {
  if (loading) {
    return null;
  }
  return (
    <>
      {user ? (
        <Button type="button" color="primary" onClick={onLogout}>
          Log out
        </Button>
      ) : (
        <Link href="/login" passHref>
          <a>
            <Button color="primary">Log in / Sign up</Button>
          </a>
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
