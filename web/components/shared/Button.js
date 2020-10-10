import React from 'react';
import PropTypes from 'prop-types';

export function Button({ children, type = 'button' }) {
  return (
    <button type={type} className="bg-blue-700 rounded-sm p-2">
      {children}
    </button>
  );
}

/* 
color: primary, secondary, 
*/

Button.propTypes = {
  type: PropTypes.string,
};
