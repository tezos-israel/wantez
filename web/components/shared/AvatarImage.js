import React from 'react';
import PropTypes from 'prop-types';
import md5 from 'md5';
export function AvatarImage({ email, className }) {
  const hash = md5(email.trim().toLowerCase());
  return (
    <img
      className={className}
      src={`https://www.gravatar.com/avatar/${hash}?s=40`}
      alt="funder's avatar"
    />
  );
}

AvatarImage.propTypes = {
  className: PropTypes.string.isRequired,
  email: PropTypes.string.isRequired,
};
