import React from 'react';
import propTypes from 'prop-types';
import sortArray from 'sort-array';

import { WantezListItem } from './WantezListItem';
import { Sort } from './Sort';

export function WantezList({ gigs }) {
  const [sort, setSort] = React.useState('createdAt');
  const [sortDir, setSortDir] = React.useState('desc');
  const sortedGigs = sortArray([...gigs], {
    by: sort,
    order: sortDir,
    customOrders: { experience: ['beginner', 'medium', 'pro'] },
  });

  return (
    <div className="flex flex-col">
      <div className="flex justify-between px-8 py-4">
        <div className="text-sm font-bold text-gray-500">
          {gigs.length} open wantez
        </div>
        <Sort value={sort} dir={sortDir} onChange={handleSortChange} />
      </div>
      <div className="space-y-4">
        {sortedGigs.map((item) => (
          <WantezListItem
            key={item.id}
            id={item.id}
            title={item.title}
            fee={item.fee}
            status={item.status}
            imgUrl={item.imageUrl || 'https://via.placeholder.com/100'}
            createdAt={item.createdAt}
            applicationsCount={item.applications_aggregate.aggregate.count}
            experienceLevel={item.experienceLevel}
            tags={item.gig_tags.map((tagInfo) => tagInfo.tag.name)}
          />
        ))}
      </div>
      {!gigs.length && (
        <div className="w-full px-8 text-sm font-bold text-blue-500">
          No Gigs Created
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
  gigs: propTypes.array.isRequired,
};
