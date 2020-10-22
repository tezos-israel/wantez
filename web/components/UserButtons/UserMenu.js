import React from 'react';
import PropTypes from 'prop-types';
import md5 from 'md5';

import { useBoolean } from 'hooks/useBoolean';
import { LoginModal } from 'components/LoginModal';
import { Button } from 'components/shared/Button';

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

  const email = user.email;
  const hash = md5(email.trim().toLowerCase());

  return (
    <>
      <div className="flex items-center ">
        <span className="text-xs text-white">{user.email}</span>
        <img
          src={`https://www.gravatar.com/avatar/${hash}?s=40`}
          className="ml-4 rounded-full"
        />
      </div>
    </>
  );
}

UserMenu.propTypes = {
  user: PropTypes.object,
  onLogout: PropTypes.func.isRequired,
};
