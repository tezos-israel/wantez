import React from 'react';

import Layout from 'components/Layout';
import { BountyForm } from 'components/BountyForm';

import logoUrl from './create-icon.svg';
import halfCirclePaper from './half-circle-paper.svg';

export default function CreateBounty() {
  return (
    <Layout>
      <div style={{ backgroundColor: '#1d2129' }} className="flex-auto w-full">
        <div className="w-1/2 mx-auto mt-10">
          <div className="grid items-center mb-4 text-blue-500 auto-cols-max">
            <div className="mr-5">
              <img src={logoUrl} />
            </div>

            <h2 className="text-4xl font-header">FUND ISSUE</h2>
            <div className="col-start-2 text-gray-600">
              Fund your OSS issue and work with talented developers!
            </div>
          </div>
          <div className="bg-white">
            <div className="absolute mx-4 transform -translate-y-1/2">
              <img src={halfCirclePaper} />
            </div>
            <BountyForm />
          </div>
        </div>
      </div>
    </Layout>
  );
}
