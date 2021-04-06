import { useState } from 'react';
import { useMutation } from '@apollo/client';
import { useRouter } from 'next/router';

import Layout from 'components/Layout';
import GigForm from 'components/GigForm';

import { SAVE_GIG, GET_GIGS, DELETE_GIG } from 'queries/gigs';
import { useGigsContractContext } from 'hooks/GigsContractContext';
import { useWalletContext } from 'hooks/WalletContext';
import { useAuthContext } from 'hooks/AuthContext';

import Logo from './create-icon.svg';

export default function FundIssuePage() {
  const router = useRouter();
  const { user } = useAuthContext();

  const { address, balance } = useWalletContext();
  const { createGig, isLoading } = useCreateGig();

  if (process.env.NEXT_PUBLIC_SHOW_ONLY_LANDING_PAGE === 'true') {
    if (typeof window !== 'undefined') {
      router.push('/');
    }
    return null;
  }

  return (
    <Layout>
      <div className="bg-fund flex-auto w-full pb-20">
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

          <GigForm
            onSubmit={createGig}
            isLoggedIn={!!user}
            isConnected={!!address}
            balance={balance}
            loading={isLoading}
          />
        </div>
      </div>
    </Layout>
  );
}

function useCreateGig() {
  const { fundGig } = useGigsContractContext();
  const router = useRouter();
  const [isLoading, setLoading] = useState(false);

  const [deleteGig] = useMutation(DELETE_GIG, {
    update: updateCacheAfterDelete,
  });
  const [createGig] = useMutation(SAVE_GIG, {
    update: updateCache,
    onCompleted,
  });

  return {
    async createGig(variables) {
      if (isLoading) {
        return;
      }
      setLoading(true);
      try {
        await createGig({ variables });
      } catch (e) {
        setLoading(false);
        console.error(e);
      }
    },
    isLoading,
  };

  function updateCache(cache, { data }) {
    const existingGigsQuery = cache.readQuery({
      query: GET_GIGS,
    });

    if (!existingGigsQuery) {
      return;
    }

    const newGig = data.insert_gig_one;

    cache.writeQuery({
      query: GET_GIGS,
      data: { gig: [newGig, ...existingGigsQuery.gig] },
    });
  }

  function updateCacheAfterDelete(cache, { data }) {
    const existingGigsQuery = cache.readQuery({
      query: GET_GIGS,
    });

    if (!existingGigsQuery) {
      return;
    }

    const gigId = data.delete_gig_by_pk.id;

    cache.writeQuery({
      query: GET_GIGS,
      data: {
        gig: existingGigsQuery.gig.filter((b) => b.id !== gigId),
      },
    });
  }

  async function onCompleted({ insert_gig_one: gig }) {
    try {
      await fundGig({
        ...gig,
        deadline: Number(new Date(gig.deadline)),
      });
      router.push('/explore');
    } catch (error) {
      console.error(error);
      try {
        await deleteGig({ variables: { id: gig.id } });
      } catch (deleteError) {
        console.error(deleteError);
      }
    } finally {
      setLoading(false);
    }
  }
}
