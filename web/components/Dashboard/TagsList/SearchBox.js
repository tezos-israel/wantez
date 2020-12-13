import PropTypes from 'prop-types';
import { useState } from 'react';

export function SearchBox({ onChange }) {
  const [value, setValue] = useState('');

  return (
    <div>
      <input
        className="form-input border-2 border-blue-500 border-solid"
        value={value}
        onChange={(e) => setValue(e.target.value)}
        onBlur={handleBlur}
        onKeyDown={handleKeyDown}
      />
    </div>
  );

  function handleBlur() {
    handleSubmit();
  }

  function handleKeyDown(e) {
    if (e.keyCode === 13) {
      handleSubmit();
    }
  }

  function handleSubmit() {
    if (!value) {
      return;
    }

    setValue('');
    onChange(value);
  }
}

SearchBox.propTypes = {
  onChange: PropTypes.func.isRequired,
};
