import React from 'react';
import PropTypes from 'prop-types';
import md5 from 'md5';

export function AvatarImage({ email }) {
  const hash = md5(email.trim().toLowerCase());
  return (
    <img
      className="lg:h-16 lg:w-16 height:20 ring-2 ring-white inline-block w-20 bg-gray-400 rounded-full"
      src={`https://www.gravatar.com/avatar/${hash}?s=40`}
      alt="funder's avatar"
    />
  );
}

AvatarImage.propTypes = {
  email: PropTypes.string.isRequired,
};
