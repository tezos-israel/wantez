import React from 'react';
import PropTypes from 'prop-types';

import { useBoolean } from 'hooks/useBoolean';
import { LoginModal } from 'components/LoginModal';
import { AvatarImage } from '../shared/AvatarImage';
export function UserMenu({ user }) {
  const [isModalOpen, openModal, closeModal] = useBoolean();

  if (!user) {
    return (
      <>
        <button
          onClick={openModal}
          className="disabled:opacity-50 disabled:cursor-not-allowed p-2 bg-blue-500 rounded-sm"
        >
          Log in / Sign up
        </button>

        <LoginModal isOpen={isModalOpen} onDismiss={closeModal} />
      </>
    );
  }

  return (
    <div className=" flex items-center">
        <span className="text-xs text-white">{user.email}</span>
        <AvatarImage
          email={user.email}
          className="lg:h-16 lg:w-16 height:20 ring-2 ring-white inline-block w-20 bg-gray-400 rounded-full"
        />
      </div>
  );
}

UserMenu.propTypes = {
  user: PropTypes.object,
  onLogout: PropTypes.func.isRequired,
};
