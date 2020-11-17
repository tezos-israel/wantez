import React from 'react';
import PropTypes from 'prop-types';
import {
  ListboxInput,
  ListboxOption,
  ListboxButton,
  ListboxPopover,
  ListboxList,
} from '@reach/listbox';
import '@reach/listbox/styles.css';

import Caret from './caret.svg';

const values = [
  { key: 'createdAt', label: 'Created' },
  { key: 'experienceLevel', label: 'Experience' },
  { key: 'title', label: 'Title' },
];
const dirs = ['asc', 'desc'];

export function Sort({ value, dir, onChange }) {
  const selectedValue = `${value}-${dir}`;
  return (
    <div className="flex items-center space-x-4">
      <span className="text-sm text-gray-500">Sort by:</span>
      <ListboxInput value={selectedValue} onChange={handleChange}>
        {({ value, valueLabel }) => (
          <>
            <ListboxButton
              className="focus:outline-black w-48 text-sm text-blue-500 capitalize border-0"
              arrow={
                <Caret className="w-4 h-4 text-blue-500 stroke-current stroke-2" />
              }
            >
              <span data-value={value}>{valueLabel}</span>
            </ListboxButton>
            <ListboxPopover className="focus-within:outline-none">
              <ListboxList className="text-sm font-light text-blue-500">
                {values.map((value) =>
                  dirs.map((dir) => {
                    const longValue = `${value.key}-${dir}`;
                    return (
                      <ListboxOption
                        value={longValue}
                        key={longValue}
                        className="capitalize"
                      >
                        {value.label} {dir}
                      </ListboxOption>
                    );
                  })
                )}
              </ListboxList>
            </ListboxPopover>
          </>
        )}
      </ListboxInput>
    </div>
  );

  function handleChange(newValue) {
    const [value, dir] = newValue.split('-');
    onChange(value, dir);
  }
}

Sort.propTypes = {
  value: PropTypes.oneOf(values.map((v) => v.key)).isRequired,
  dir: PropTypes.oneOf(dirs).isRequired,
  onChange: PropTypes.func.isRequired,
};
