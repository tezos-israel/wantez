import React from 'react';
import { useRouter } from 'next/router';
import { useQuery } from '@apollo/client';
import Loader from 'react-loader-spinner';

import { GIG_QUERY } from 'queries/gigs';

import Layout from 'components/Layout';
import { GigInfo } from 'components/GigInfo';

export default function GigPage() {
  const router = useRouter();

  const { data, loading, error } = useQuery(GIG_QUERY, {
    variables: { id: router.query.id },
  });
  const gig = data && data.gig_by_pk;

  if (process.env.NEXT_PUBLIC_SHOW_ONLY_LANDING_PAGE === 'true') {
    if (typeof window !== 'undefined') {
      router.push('/');
    }
    return null;
  }

  if (loading) {
    return (
      <Layout>
        <Loader type="TailSpin" color="#cacaca" height={50} width={50} />
      </Layout>
    );
  }

  if (error) {
    return (
      <Layout>
        <div className="alert" severity="error">
          <div className="alert-title">Failed loading gig info</div>
          {error.message || error}
        </div>
      </Layout>
    );
  }

  if (!gig) {
    router.push('/explore')
    return null;
  }

  return (
    <Layout>
      <div
        style={{ backgroundColor: '#1d2129' }}
        className="flex-auto w-full pb-20"
      >
        <div className="w-10/12 mx-auto mt-10">
          <GigInfo gig={gig} />
        </div>
      </div>
    </Layout>
  );
}
