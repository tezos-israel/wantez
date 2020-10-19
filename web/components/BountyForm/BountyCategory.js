import React from 'react';
import PropTypes from 'prop-types';

export function BountyCategory({ title, imgUrl, id }) {
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
          name="category"
          id={inputId}
          className="absolute w-5 h-5 my-2 ml-3 opacity-0"
        />
        <label
          htmlFor={inputId}
          className="flex py-1 pl-2 pr-5 font-bold border-2 border-gray-500 focus:border-blue-500 w-content"
        >
          <img src={imgUrl} className="mr-2" aria-hidden="true" />
          {title}
        </label>
      </div>
    </>
  );
}

BountyCategory.propTypes = {
  title: PropTypes.string.isRequired,
  imgUrl: PropTypes.string,
  id: PropTypes.string.isRequired,
};
