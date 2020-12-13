import React from 'react';
import PropTypes from 'prop-types';

export function Tag({ value, onRemoveClick }) {
  return (
    <div className="px-3 py-2 font-bold text-white bg-blue-500 rounded-sm">
      {value}
      <button
        type="button"
        className="text-xm ml-2 text-black"
        aria-label="remove"
        title="Remove"
        onClick={onRemoveClick}
      >
        x
      </button>
    </div>
  );
}

Tag.propTypes = {
  value: PropTypes.string.isRequired,
  onRemoveClick: PropTypes.func.isRequired,
};
