import React, { useState } from 'react';
import PropTypes from 'prop-types';

import { Button } from 'components/shared/Button';

export function LoginModalContent({
  isLoading,
  onSubmit,
  disableLogin,
  clearError,
  error,
  isUserLoggedIn,
}) {
  const [email, setEmail] = useState('');

  if (isLoading) {
    return 'Loading...';
  }

  if (isUserLoggedIn) {
    return 'You are already logged in! You can close this modal';
  }

  return (
    <form className="flex flex-col">
      <div className="flex flex-col items-center">
        <label htmlFor="email-input" className="text-gray-700">
          Enter Your Email
        </label>
        <input
          className="w-64 mt-1 form-input"
          type="email"
          id="email-input"
          value={email}
          onChange={onChangeEmail}
        />
      </div>
      <div className="error-msg">{error}</div>
      <Button
        className="mt-10"
        type="submit"
        value="Log in"
        disabled={!email || disableLogin}
        onClick={(e) => {
          e.preventDefault();
          onSubmit(email);
        }}
      >
        Log in
      </Button>
    </form>
  );

  function onChangeEmail(event) {
    clearError(); // remove error msg
    setEmail(event.target.value);
  }
}

LoginModalContent.propTypes = {
  isLoading: PropTypes.bool.isRequired,
  onSubmit: PropTypes.func.isRequired,
  disableLogin: PropTypes.bool.isRequired,
  clearError: PropTypes.func.isRequired,
  error: PropTypes.string.isRequired,
  isUserLoggedIn: PropTypes.bool.isRequired,
};
