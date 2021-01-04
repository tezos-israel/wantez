import React from 'react';
import { useMutation } from '@apollo/client';
import { useRouter } from 'next/router';

import Layout from 'components/Layout';
import { IssueForm } from 'components/IssueForm';

import { SAVE_BOUNTY, GET_BOUNTIES, DELETE_BOUNTY } from 'queries/bounties';
import { useGigsContractContext } from 'hooks/GigsContractContext';
import { useWalletContext } from 'hooks/WalletContext';
import { useAuthContext } from 'hooks/AuthContext';

import Logo from './create-icon.svg';

export default function FundIssuePage() {
  const router = useRouter();
  const { user } = useAuthContext();

  const { address, balance } = useWalletContext();
  const { fundIssue } = useGigsContractContext();
  const createBounty = useCreateBounty(fundIssue, router);

  return (
    <Layout>
      <div
        style={{ backgroundColor: '#1d2129' }}
        className="flex-auto w-full pb-20"
      >
        <div className="w-10/12 mx-auto mt-10">
          <div className="auto-cols-max grid items-center mb-4 text-blue-500">
            <div className="mr-5">
              <Logo />
            </div>

            <h2 className="font-header text-4xl">FUND ISSUE</h2>
            <div className="col-start-2 text-gray-600">
              Fund your OSS issue and work with talented developers!
            </div>
          </div>

          <IssueForm
            onSubmit={handleSubmit}
            isLoggedIn={!!user}
            isConnected={!!address}
            balance={balance}
          />
        </div>
      </div>
    </Layout>
  );

  async function handleSubmit(variables) {
    try {
      await createBounty({ variables });
    } catch (e) {
      console.error(e);
    }
  }
}

function useCreateBounty(fundIssue, router) {
  const [deleteBounty] = useMutation(DELETE_BOUNTY, {
    update: updateCacheAfterDelete,
  });
  const [createBounty] = useMutation(SAVE_BOUNTY, {
    update: updateCache,
    onCompleted,
  });

  return createBounty;

  function updateCache(cache, { data }) {
    let existingBountiesQuery = null;
    try {
      existingBountiesQuery = cache.readQuery({
        query: GET_BOUNTIES,
      });
    } catch (e) {
      return;
    }

    if (!existingBountiesQuery) {
      return;
    }

    const newBounty = data.insert_bounty_one;

    cache.writeQuery({
      query: GET_BOUNTIES,
      data: { bounty: [newBounty, ...existingBountiesQuery.bounty] },
    });
  }

  function updateCacheAfterDelete(cache, { data }) {
    const existingBountiesQuery = cache.readQuery({
      query: GET_BOUNTIES,
    });

    if (!existingBountiesQuery) {
      return;
    }

    const bountyId = data.delete_bounty_by_pk.id;

    cache.writeQuery({
      query: GET_BOUNTIES,
      data: {
        bounty: existingBountiesQuery.bounty.filter((b) => b.id !== bountyId),
      },
    });
  }

  async function onCompleted({ insert_bounty_one: bounty }) {
    try {
      await fundIssue({
        ...bounty,
        deadline: Number(new Date(bounty.deadline)),
      });
      router.push('/explore');
    } catch (error) {
      console.error(error);
      try {
        await deleteBounty({ variables: { id: bounty.id } });
      } catch (deleteError) {
        console.error(deleteError);
      }
    }
  }
}
