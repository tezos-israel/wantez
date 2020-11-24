import React from 'react';
import PropTypes from 'prop-types';
import { v4 as uuid } from 'uuid';

export function Checkbox({ label, inputName, checked, onChange }) {
  const id = uuid();
  return (
    <label htmlFor={id} className="flex items-center">
      <input
        type="checkbox"
        id={id}
        name={inputName}
        checked={checked}
        className="form-checkbox bg-transparent"
        onChange={({ target: { checked } }) => onChange(checked)}
      />

      <span className="ml-2">{label}</span>
    </label>
  );
}

Checkbox.propTypes = {
  label: PropTypes.string.isRequired,
  inputName: PropTypes.string.isRequired,
  checked: PropTypes.bool.isRequired,
  onChange: PropTypes.func.isRequired,
};
