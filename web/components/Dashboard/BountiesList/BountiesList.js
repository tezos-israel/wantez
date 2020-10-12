import React from 'react';
import propTypes from 'prop-types';
// import Link from 'next/link';

export function BountiesList() {
  return (
    <div className="flex flex-col">
      <div className="flex justify-between px-8 py-4">
        <div className="text-sm font-bold text-gray-500">123 open wantez</div>
        <div>
          <span className="mr-3 text-sm font-bold text-gray-500">Sort by:</span>
          <span className="text-sm font-bold text-blue-500">
            Created recent
          </span>
        </div>
      </div>
      <div className="">
        <div className="">Bounty item</div>
      </div>
    </div>
  );
}

BountiesList.propTypes = {
  bounties: propTypes.array.isRequired,
};
