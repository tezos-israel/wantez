import React from 'react';
import propTypes from 'prop-types';
// import Link from 'next/link';
import { BountyListItem } from './BountyListItem';

export function BountyList({ bounties }) {
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
        {bounties.map((bounty) => (
          <BountyListItem
            key={bounty.id}
            title="Browser Automation: Tool To Automate Dune Analytics Refreshs"
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

BountyList.propTypes = {
  bounties: propTypes.array.isRequired,
};
