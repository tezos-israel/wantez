import React from 'react';
import headerIcon from './filter-header-icon.svg';

export function Filter() {
  return (
    <div className="bg-gradient-to-b to-blue-900 from-blue-400 p-10">
      <h2 className="flex text-3xl font-bold capitalize text-teal-400">
        <img
          src={headerIcon}
          alt="filter"
          aria-hidden="true"
          className="mr-3"
        />
        Filter
      </h2>
      <div>
        <h3>Status</h3>
        <ul>
          <li>3 work submitted</li>
          <li>3 work submitted</li>
          <li>3 work submitted</li>
          <li>3 work submitted</li>
        </ul>
      </div>
    </div>
  );
}
