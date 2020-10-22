import React from 'react';

import Layout from 'components/Layout';
import { BountyForm } from 'components/BountyForm';

import logoUrl from './create-icon.svg';

export default function CreateBounty() {
  return (
    <Layout>
      <div style={{ backgroundColor: '#1d2129' }} className="flex-auto w-full">
        <div className="w-10/12 xl:w-1/2 mx-auto mt-10">
          <div className="grid items-center mb-4 text-blue-500 auto-cols-max">
            <div className="mr-5">
              <img src={logoUrl} />
            </div>

            <h2 className="text-4xl font-header">FUND ISSUE</h2>
            <div className="col-start-2 text-gray-600">
              Fund your OSS issue and work with talented developers!
            </div>
          </div>

          <BountyForm />
        </div>
      </div>
    </Layout>
  );
}
