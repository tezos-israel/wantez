import React from 'react';

import { useQuery } from '@apollo/client';

import { useTezosContext } from 'hooks/TezosContext';
import { BountiesTable } from 'components/BountiesTable';

import { GET_BOUNTIES } from 'queries/bounties';
import Layout from 'components/Layout';

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
        <div className="grid grid-cols-6 flex-1 w-full">
          <div className="">filter</div>
          <div className="col-span-5 flex flex-col">
            <div className="tag-list h-16">tags</div>
            <div className="flex-auto">
              <BountiesTable bounties={data.bounty} />
            </div>
          </div>
        </div>
      )}
    </Layout>
  );
};

export default Home;
