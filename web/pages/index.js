import React from 'react';

import { useQuery } from '@apollo/client';

import { useTezosContext } from 'hooks/TezosContext';

import { GET_BOUNTIES } from 'queries/bounties';
import Layout from 'components/Layout';
import { BountyList, Filter, TagsList } from 'components/Dashboard';

const Home = () => {
  const { data, ...queryState } = useQuery(GET_BOUNTIES);
  const { ...tezosState } = useTezosContext();

  const loading = tezosState.loading || queryState.loading;
  const error = tezosState.error || queryState.error;

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
        <div className="grid flex-1 w-full grid-cols-6">
          <Filter />
          <div className="flex flex-col col-span-5">
            <div className="h-20 tag-list">
              <TagsList />
            </div>
            <div className="flex-auto">
              <BountyList bounties={data.bounty} />
            </div>
          </div>
        </div>
      )}
    </Layout>
  );
};

export default Home;
