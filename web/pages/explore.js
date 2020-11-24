import React from 'react';

import { useQuery } from '@apollo/client';

import { useTezosContext } from 'hooks/TezosContext';

import { GET_BOUNTIES } from 'queries/bounties';
import Layout from 'components/Layout';
import { WantezList, Filter, TagsList } from 'components/Dashboard';

export default function ExplorePage() {
  const { data, ...queryState } = useQuery(GET_BOUNTIES);
  const { ...tezosState } = useTezosContext();

  const loading = tezosState.loading || queryState.loading;
  const error = tezosState.error || queryState.error;

  const [filterValues, setFilterValues] = React.useState({
    timeCommitment: [],
    experienceLevel: [],
  });

  const bounties =
    data &&
    data.bounty.filter(
      (gig) =>
        (!filterValues.timeCommitment.length ||
          filterValues.timeCommitment.includes(gig.timeCommitment)) &&
        (!filterValues.experienceLevel.length ||
          filterValues.experienceLevel.includes(gig.experienceLevel))
    );

  return (
    <Layout>
      {loading ? (
        'Loading...'
      ) : error ? (
        <div className="alert" severity="error">
          <div className="alert-title">Failed loading bounties</div>
          {error.message}
        </div>
      ) : (
        <div className="flex flex-1 w-full">
          <div className="relative z-10 w-1/4">
            <Filter value={filterValues} onChange={handleFilterChange} />
          </div>
          <div className="flex flex-col flex-1">
            <div className="tag-list h-20">
              <TagsList />
            </div>
            <div className="flex-auto">
              <WantezList bounties={bounties} />
            </div>
          </div>
        </div>
      )}
    </Layout>
  );

  function handleFilterChange(value) {
    setFilterValues(value);
  }
}
