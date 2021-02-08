import React from 'react';
import PropTypes from 'prop-types';

import { useBoolean } from 'hooks/useBoolean';
import { LoginModal } from 'components/LoginModal';
import { Button } from 'components/shared/Button';
import { AvatarImage } from '../shared/AvatarImage';
export function UserMenu({ user }) {
  const [isModalOpen, openModal, closeModal] = useBoolean();

  if (!user) {
    return (
      <>
        <Button color="primary" onClick={openModal}>
          Log in / Sign up
        </Button>

        <LoginModal isOpen={isModalOpen} onDismiss={closeModal} />
      </>
    );
  }

  return (
    <>
      <div className=" flex items-center">
        <span className="text-xs text-white">{user.email}</span>
        <AvatarImage email={user.email} />
      </div>
    </>
  );
}

UserMenu.propTypes = {
  user: PropTypes.object,
  onLogout: PropTypes.func.isRequired,
};
