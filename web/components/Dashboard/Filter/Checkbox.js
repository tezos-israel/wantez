import React from 'react';
import PropTypes from 'prop-types';
import { v4 as uuid } from 'uuid';

export function Checkbox({ label, name }) {
  const id = uuid();
  return (
    <label htmlFor={id} className="flex items-center">
      <input
        type="checkbox"
        id={id}
        name={name}
        className="form-checkbox bg-transparent"
      />

      <span className="ml-2">{label}</span>
    </label>
  );
}

Checkbox.propTypes = {
  label: PropTypes.string,
  name: PropTypes.string,
};
