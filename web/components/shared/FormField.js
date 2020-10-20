import React from 'react';
import PropTypes from 'prop-types';

export function FormField({ title, fieldId, children }) {
  return (
    <div>
      <label
        htmlFor={fieldId}
        className="block mb-3 text-sm text-gray-500 capitalize"
      >
        {title}
      </label>
      {children}
    </div>
  );
}

FormField.propTypes = {
  title: PropTypes.string.isRequired,
  fieldId: PropTypes.string.isRequired,
};
