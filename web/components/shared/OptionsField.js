import React from 'react';
import PropTypes from 'prop-types';
import styles from './OptionsField.module.css';
export function OptionsField({ options, optionsName, value, onChange }) {
  return (
    <div className="flex">
      {options.map((option) => (
        <OptionsFieldItem
          key={option.value}
          value={option.value}
          title={option.title}
          optionsName={optionsName}
          optionsValue={value}
          onChange={onChange}
        />
      ))}
    </div>
  );
}

OptionsField.propTypes = {
  optionsName: PropTypes.string.isRequired,
  options: PropTypes.array.isRequired,
  value: PropTypes.string.isRequired,
  onChange: PropTypes.func.isRequired,
};

function OptionsFieldItem({
  value,
  title,
  optionsName,
  optionsValue,
  onChange,
}) {
  const inputId = `${value}-input`;
  return (
    <div className={`relative flex-1 ${styles.optionsFieldItem}`}>
      <input
        type="radio"
        name={optionsName}
        id={inputId}
        value={value}
        checked={optionsValue === value}
        onChange={onChange}
        className="absolute w-5 h-5 my-2 ml-3 opacity-0"
      />
      <label
        htmlFor={inputId}
        className="flex items-center justify-center py-2 mt-0 text-sm duration-75 ease-in-out border border-gray-500 select-none"
      >
        {title}
      </label>
    </div>
  );
}

OptionsFieldItem.propTypes = {
  optionsName: PropTypes.string.isRequired,
  value: PropTypes.string.isRequired,
  title: PropTypes.string.isRequired,
  optionsValue: PropTypes.string.isRequired,
  onChange: PropTypes.func.isRequired,
};
