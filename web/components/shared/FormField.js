import React from 'react';
import PropTypes from 'prop-types';

export function FormField({ title, fieldId, error = '', children }) {
  return (
    <div>
      {title && (
        <label
          htmlFor={fieldId}
          className="block mb-3 text-sm text-gray-500 capitalize"
        >
          {title}
        </label>
      )}
      {children}
      {error && <div className="text-sm text-red-500">{error}</div>}
    </div>
  );
}

FormField.propTypes = {
  title: PropTypes.string,
  error: PropTypes.string,
  fieldId: PropTypes.string,
};
