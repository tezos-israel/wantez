import React from 'react';
import PropTypes from 'prop-types';
import classnames from 'classnames';

import { AvatarImage } from '../shared/AvatarImage';

import { Button } from 'components/shared/Button';
import { Menu, Transition } from '@headlessui/react';

export function UserMenu({ user, onLoginClick, onLogoutClick }) {
  if (!user) {
    return (
      <Button color="primary" onClick={onLoginClick}>
        Log in / Sign up
      </Button>
    );
  }

  return (
    <div className="relative inline-block text-left">
      <Menu>
        {({ open }) => (
          <>
            <Menu.Button className="flex items-center">
              <span className="text-xs text-white">{user.email}</span>
              <AvatarImage email={user.email} />
            </Menu.Button>
            <Transition
              show={open}
              enter="transition ease-out duration-100"
              enterFrom="transform opacity-0 scale-95"
              enterTo="transform opacity-100 scale-100"
              leave="transition ease-in duration-75"
              leaveFrom="transform opacity-100 scale-100"
              leaveTo="transform opacity-0 scale-95"
            >
              <Menu.Items className="absolute right-0 w-full bg-white border border-gray-200 shadow-lg outline-none">
                <Menu.Item>
                  {({ active }) => (
                    <button
                      className={classnames(
                        { 'bg-green-500': active },
                        'w-full py-2'
                      )}
                      onClick={onLogoutClick}
                    >
                      Log out
                    </button>
                  )}
                </Menu.Item>
              </Menu.Items>
            </Transition>
          </>
        )}
      </Menu>
    </div>
  );
}

UserMenu.propTypes = {
  user: PropTypes.object,
  onLogoutClick: PropTypes.func.isRequired,
  onLoginClick: PropTypes.func.isRequired,
};
