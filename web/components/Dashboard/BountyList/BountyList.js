import React from 'react';
import propTypes from 'prop-types';
// import Link from 'next/link';
import { BountyListItem } from './BountyListItem';

export function BountyList() {
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
      <div className="space-y-4">
        <BountyListItem
          title="Browser Automation: Tool To Automate Dune Analytics Refreshs"
          imgUrl="https://via.placeholder.com/100"
        />
        <BountyListItem
          title="Create Frontend For Web3 DApp"
          imgUrl="https://via.placeholder.com/100"
        />
        <BountyListItem
          title="Bring To Production"
          imgUrl="https://via.placeholder.com/100"
        />
        <BountyListItem
          title="Create Frontend For Web3 DApp"
          imgUrl="https://via.placeholder.com/100"
        />
      </div>
    </div>
  );
}

BountyList.propTypes = {
  bounties: propTypes.array.isRequired,
};
