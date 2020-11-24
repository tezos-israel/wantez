import React from 'react';
import PropTypes from 'prop-types';
import { Checkbox } from './Checkbox';

export function FilterOption({ title, inputName, options, value, onChange }) {
  return (
    <div>
      <h3 className="mb-3 font-bold text-teal-400">{title}</h3>
      <ul className="space-y-3 text-white">
        {options.map((option) => (
          <li key={option.id}>
            <Checkbox
              label={option.label}
              checked={value.includes(option.id)}
              inputName={inputName}
              onChange={(checked) => handleChange(option.id, checked)}
            />
          </li>
        ))}
      </ul>
    </div>
  );

  function handleChange(id, checked) {
    onChange(checked ? [...value, id] : value.filter((v) => v !== id));
  }
}

FilterOption.propTypes = {
  title: PropTypes.string.isRequired,
  inputName: PropTypes.string.isRequired,
  options: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.string.isRequired,
      label: PropTypes.string.isRequired,
    })
  ).isRequired,
  value: PropTypes.arrayOf(PropTypes.string).isRequired,
  onChange: PropTypes.func.isRequired,
};
