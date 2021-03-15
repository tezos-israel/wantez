import React, { useState } from 'react';
import PropTypes from 'prop-types';

import { LoginModal } from 'components/LoginModal';
import { AvatarImage } from '../shared/AvatarImage';
import UserAvatar from './user-avatar.svg';
import classnames from 'classnames';
export function UserMenu({ user }) {
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);

  if (!user) {
    return (
      <div className="relative">
        <button
          onClick={toggleLoginDropdown}
          className={classnames(
            'disabled:opacity-50 disabled:cursor-not-allowed font-Montserrat flex items-center justify-center px-2 text-sm font-bold focus:outline-none',
            {
              'text-green-400': !isDropdownOpen,
              'text-white': isDropdownOpen,
            }
          )}
        >
          Log in
          <div className="w-11 h-11 ml-3">
            <UserAvatar />
          </div>
        </button>
        {isDropdownOpen && <LoginModal />}
      </div>
    );
  }

  return (
    <div className=" flex items-center">
      <span className="text-xs text-white">{user.email}</span>
      <AvatarImage
        email={user.email}
        className="lg:h-11 lg:w-11 height:20 ring-2 ring-white inline-block w-20 ml-3 bg-gray-400 rounded-full"
      />
    </div>
  );

  function toggleLoginDropdown() {
    setIsDropdownOpen(!isDropdownOpen);
  }
}

UserMenu.propTypes = {
  user: PropTypes.object,
};
