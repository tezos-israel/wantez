import React from 'react';

import { FilterOption } from './FilterOption';
import headerIcon from './filter-header-icon.svg';

export function Filter() {
  return (
    <div
      className="p-10 bg-gradient-to-b h-full"
      style={{
        '--gradient-color-stops': '#2d7df8, #0a2c61',
      }}
    >
      <h2 className="flex mb-6 text-3xl font-bold text-teal-400 capitalize">
        <img
          src={headerIcon}
          alt="filter"
          aria-hidden="true"
          className="mr-3"
        />
        Filter
      </h2>
      <FilterOption />
      <div className="my-6 border-t-2 border-white border-dashed" />
      <FilterOption />
      <div className="my-6 border-t-2 border-white border-dashed" />
      <FilterOption />
    </div>
  );
}
