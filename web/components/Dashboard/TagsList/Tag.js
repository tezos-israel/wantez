import React from 'react';
import PropTypes from 'prop-types';

export function Tag({ value }) {
  return (
    <div className="px-3 py-2 font-bold text-white bg-blue-500 rounded-sm">
      {value}
    </div>
  );
}

Tag.propTypes = {
  value: PropTypes.string.isRequired,
};
