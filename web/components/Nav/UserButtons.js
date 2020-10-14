import React from 'react';
import PropTypes from 'prop-types';

import { useBoolean } from 'hooks/useBoolean';
import { LoginModal } from 'components/LoginModal';
import { Button } from 'components/shared/Button';

export default function UserMenu({ user, loading, onLogout }) {
  const [isModalOpen, openModal, closeModal] = useBoolean();

  if (loading) {
    return null;
  }

  return (
    <>
      {user ? (
        <div>
          <span>{user.email}</span>
          <Button type="button" color="primary" onClick={onLogout}>
            Log out
          </Button>
        </div>
      ) : (
        <Button color="primary" onClick={openModal}>
          Log in / Sign up
        </Button>
      )}
      <LoginModal isOpen={isModalOpen} onDismiss={closeModal} />
    </>
  );
}

UserMenu.propTypes = {
  user: PropTypes.object,
  loading: PropTypes.bool,
  inverted: PropTypes.bool,
  onLogout: PropTypes.func.isRequired,
};
