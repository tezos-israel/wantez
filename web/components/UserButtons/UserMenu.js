import React from 'react';
import PropTypes from 'prop-types';

import { AvatarImage } from '../shared/AvatarImage';

import { Button } from 'components/shared/Button';

export function UserMenu({ user, onLoginClick }) {
  if (!user) {
    return (
      <Button color="primary" onClick={onLoginClick}>
        Log in / Sign up
      </Button>
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
  onLoginClick: PropTypes.func.isRequired,
};
