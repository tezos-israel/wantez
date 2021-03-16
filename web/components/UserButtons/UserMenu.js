import React, { useRef, useState } from 'react';
import PropTypes from 'prop-types';

import { useOutsideClick } from '../../hooks/useOutsideClick.js';
import { LoginDropdown } from 'components/LoginDropdown';
import { ActionsMenu } from './ActionsMenu.js';
import { AvatarImage } from '../shared/AvatarImage';
import UserAvatar from './user-avatar.svg';
import classnames from 'classnames';

export function UserMenu({ user, onLogout }) {
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [isActionsMenuOpen, setIsActionsMenuOpen] = useState(false);
  const dropdownRef = useRef();
  const actionsMenuRef = useRef();

  useOutsideClick(dropdownRef, () => {
    if (isDropdownOpen) setIsDropdownOpen(false);
  });

  useOutsideClick(actionsMenuRef, () => {
    if (isActionsMenuOpen) setIsActionsMenuOpen(false);
  });

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

        {isDropdownOpen && <LoginDropdown dropdownRef={dropdownRef} />}
      </div>
    );
  }

  return (
    <div className="relative flex items-center">
      <button className="focus:outline-none" onClick={toggleActionsMenu}>
        <span className="text-xs text-white">{user.email}</span>
        <AvatarImage
          email={user.email}
          className="lg:h-11 lg:w-11 height:20 ring-2 ring-white inline-block w-20 ml-3 bg-gray-400 rounded-full"
        />
      </button>

      {isActionsMenuOpen && (
        <ActionsMenu onLogout={onLogout} actionsMenuRef={actionsMenuRef} />
      )}
    </div>
  );

  function toggleLoginDropdown() {
    setIsDropdownOpen(!isDropdownOpen);
  }
  function toggleActionsMenu() {
    setIsActionsMenuOpen(!isActionsMenuOpen);
  }
}

UserMenu.propTypes = {
  user: PropTypes.object,
  onLogout: PropTypes.func,
};
