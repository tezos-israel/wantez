import { useState } from 'react';
import PropTypes from 'prop-types';

export function IssueTags({ value: tags, onChange }) {
  const [value, setValue] = useState('');
  return (
    <div
      tabIndex="0"
      className="form-input flex w-full h-10 space-x-4 border border-gray-500 rounded-none"
    >
      {tags.map((tag, index) => (
        <div
          key={tag}
          className="flex items-center px-2 text-white bg-blue-500"
        >
          {tag}
          <button
            type="button"
            className="ml-2 text-xs"
            onClick={() => remove(index)}
          >
            x
          </button>
        </div>
      ))}
      <input
        className="form-input w-40"
        value={value}
        onChange={(e) => setValue(e.target.value)}
        onKeyDown={handleKeyDown}
        onBlur={handleBlur}
      />
    </div>
  );

  function handleKeyDown(e) {
    if (e.keyCode === 13) {
      push(value);
    }
  }

  function handleBlur() {
    push(value);
  }

  function push(value) {
    if (!value || tags.includes(value)) {
      return;
    }
    onChange('tags', [...tags, value]);
    setValue('');
  }

  function remove(index) {
    onChange('tags', [...tags.slice(0, index - 1), ...tags.slice(index + 1)]);
  }
}
IssueTags.propTypes = {
  value: PropTypes.arrayOf(PropTypes.string).isRequired,
  onChange: PropTypes.func.isRequired,
};
