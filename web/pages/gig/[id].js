import React from 'react';
import { useRouter } from 'next/router';

import Layout from 'components/Layout';
import { GigInfo } from 'components/GigInfo';
import GIG_DATA from '../../dummyData/gig.json';

export default function GigPage() {
  const router = useRouter();

  if (process.env.NEXT_PUBLIC_SHOW_ONLY_LANDING_PAGE === 'true') {
    if (typeof window !== 'undefined') {
      router.push('/');
    }
    return null;
  }

  return (
    <Layout>
      <div
        style={{ backgroundColor: '#1d2129' }}
        className="flex-auto w-full pb-20"
      >
        <div className="w-10/12 mx-auto mt-10">
          <GigInfo gigData={GIG_DATA} />
        </div>
      </div>
    </Layout>
  );
}
