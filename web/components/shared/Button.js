import React from 'react';
import PropTypes from 'prop-types';

export function Button({ children, className = '', ...props }) {
  return (
    <button
      {...props}
      className={
        className +
        ' p-2 bg-blue-500 rounded-sm disabled:opacity-75 disabled:cursor-not-allowed'
      }
    >
      {children}
    </button>
  );
}

/* 
color: primary, secondary, 
*/

Button.propTypes = {
  className: PropTypes.string,
};
