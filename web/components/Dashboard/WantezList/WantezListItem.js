import React from 'react';
import PropTypes from 'prop-types';

export function BountyListItem({ title, imgUrl }) {
  return (
    <div className="flex h-32 py-4 pl-8 mr-8 border-4 border-l-0 border-blue-500 border-solid ">
      <div className="h-50 w-50">
        <img src={imgUrl} className="object-cover w-full h-full" />
      </div>

      <div className="grid flex-auto grid-cols-12 grid-rows-2 px-10">
        <div className="col-span-12 font-bold text-blue-500">{title}</div>
        <div className="flex items-end col-span-9 space-x-4">
          <div className="flex items-center text-xs text-blue-500">
            <div className="w-3 h-3 mr-1 bg-gray-400 rounded-full" />
            small text
          </div>
          <div className="flex items-center text-xs text-blue-500">
            <div className="w-3 h-3 mr-1 bg-gray-400 rounded-full" />
            small text
          </div>
          <div className="flex items-center text-xs text-blue-500">
            <div className="w-3 h-3 mr-1 bg-gray-400 rounded-full" />
            small text
          </div>
        </div>
        <div className="flex items-end justify-end col-span-3 space-x-4">
          <div className="px-3 py-1 text-xs font-bold text-white bg-red-500 rounded-sm">
            js
          </div>
          <div className="px-3 py-1 text-xs font-bold text-white bg-red-500 rounded-sm">
            react
          </div>
        </div>
      </div>

      <div className="w-6 ml-auto -my-4 bg-green-300 border-l-2 border-blue-500 border-dashed"></div>
    </div>
  );
}

BountyListItem.propTypes = {
  title: PropTypes.string.isRequired,
  imgUrl: PropTypes.string.isRequired,
};
