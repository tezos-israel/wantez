import React from 'react';
import PropTypes from 'prop-types';

export function IssueCategory({ title, icon: Icon, id, onChange, value }) {
  const inputId = `input-${id}`;
  return (
    <>
      <style jsx>
        {`
          input:focus + label {
            @apply border-blue-200;
          }

          input:checked + label {
            @apply border-blue-500;
          }
        `}
      </style>
      <div className="relative">
        <input
          type="checkbox"
          name="categories"
          id={inputId}
          className="absolute w-5 h-5 my-2 ml-3 opacity-0"
          value={id}
          checked={value.includes(id)}
          onChange={onChange}
        />
        <label
          htmlFor={inputId}
          className="flex items-center py-1 pl-2 pr-5 font-bold border-2 border-gray-500 focus:border-blue-500 w-content"
        >
          {/* <div>{icon}</div> */}
          {Icon && <Icon className="mr-2" aria-hidden="true" />}
          {title}
        </label>
      </div>
    </>
  );
}

IssueCategory.propTypes = {
  title: PropTypes.string.isRequired,
  icon: PropTypes.func,
  id: PropTypes.string.isRequired,
  value: PropTypes.array.isRequired,
  onChange: PropTypes.func.isRequired,
};
