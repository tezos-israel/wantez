import React from 'react';
import propTypes from 'prop-types';
import sortArray from 'sort-array';

import { WantezListItem } from './WantezListItem';
import { Sort } from './Sort';

export function WantezList({ bounties }) {
  const [sort, setSort] = React.useState('createdAt');
  const [sortDir, setSortDir] = React.useState('desc');
  const sortedBounties = sortArray([...bounties], {
    by: sort,
    order: sortDir,
    customOrders: { experience: ['beginner', 'medium', 'pro'] },
  });

  return (
    <div className="flex flex-col">
      <div className="flex justify-between px-8 py-4">
        <div className="text-sm font-bold text-gray-500">
          {bounties.length} open wantez
        </div>
        <Sort value={sort} dir={sortDir} onChange={handleSortChange} />
      </div>
      <div className="space-y-4">
        {sortedBounties.map((item) => (
          <WantezListItem
            key={item.id}
            title={item.title}
            fee={item.fee}
            status={item.status}
            imgUrl={item.imageUrl || 'https://via.placeholder.com/100'}
            createdAt={item.createdAt}
            applicationsCount={item.applications_aggregate.aggregate.count}
            experienceLevel={item.experienceLevel}
            tags={item.bounty_tags.map((bountyTag) => bountyTag.tag.name)}
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

  function handleSortChange(sort, asc) {
    setSort(sort);
    setSortDir(asc);
  }
}

WantezList.propTypes = {
  bounties: propTypes.array.isRequired,
};
