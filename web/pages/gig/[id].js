import React from 'react';
import { useRouter } from 'next/router';
import { useQuery } from '@apollo/client';
import Loader from 'react-loader-spinner';

import { BOUNTY_QUERY } from 'queries/bounties';
import Layout from 'components/Layout';
import { GigInfo } from 'components/GigInfo';

export default function GigPage() {
  const router = useRouter();

  const { data, loading, error } = useQuery(BOUNTY_QUERY, {
    variables: { id: router.query.id },
  });

  const bounty = data && data.bounty_by_pk;

  if (process.env.NEXT_PUBLIC_SHOW_ONLY_LANDING_PAGE === 'true') {
    if (typeof window !== 'undefined') {
      router.push('/');
    }
    return null;
  }

  return (
    <Layout>
      {loading ? (
        <Loader type="TailSpin" color="#cacaca" height={50} width={50} />
      ) : error ? (
        <div className="alert" severity="error">
          <div className="alert-title">Failed loading gig info</div>
          {error.message || error}
        </div>
      ) : (
        <div
          style={{ backgroundColor: '#1d2129' }}
          className="flex-auto w-full pb-20"
        >
          <div className="w-10/12 mx-auto mt-10">
            <GigInfo bounty={bounty} />
          </div>
        </div>
      )}
    </Layout>
  );
}
