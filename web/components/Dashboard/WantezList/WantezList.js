import React from 'react';
import propTypes from 'prop-types';
// import Link from 'next/link';
import { WantezListItem } from './WantezListItem';

export function WantezList({ bounties }) {
  return (
    <div className="flex flex-col">
      <div className="flex justify-between px-8 py-4">
        <div className="text-sm font-bold text-gray-500">
          {bounties.length} open wantez
        </div>
        <div>
          <span className="mr-3 text-sm font-bold text-gray-500">Sort by:</span>
          <span className="text-sm font-bold text-blue-500">
            Created recent
          </span>
        </div>
      </div>
      <div className="space-y-4">
        {bounties.map((Wantez) => (
          <WantezListItem
            key={Wantez.id}
            title={Wantez.title}
            imgUrl="https://via.placeholder.com/100"
          />
        ))}
      </div>
      {!bounties.length && (
        <div className="w-full px-8 text-sm font-bold text-blue-500">
          No Bounties Created
        </div>
      )}
    </div>
  );
}

WantezList.propTypes = {
  bounties: propTypes.array.isRequired,
};
