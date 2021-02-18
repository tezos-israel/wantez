import React from 'react';
import PropTypes from 'prop-types';
import { useMutation } from '@apollo/client';
import { Accordion } from '@reach/accordion';

import '@reach/accordion/styles.css';

import CancelPopup from './CancelButton/CancelPopup';

import { useBoolean } from 'hooks/useBoolean';
import useLoadingState from 'hooks/useLoadingState';

import { DELETE_APPLICATION } from 'queries/applications';
import { GET_BOUNTIES, BOUNTY_QUERY } from 'queries/bounties';

import GigApplicationsItem from './GigApplicationsItem';

export default function GigApplications({
  applications,
  currentUsername,
  isFunder,
}) {
  const [isCancelPopupOpen, openCancelPopup, closeCancelPopup] = useBoolean();
  const [deleteApplication] = useMutation(DELETE_APPLICATION, {
    update: updateCacheAfterDelete,
  });

  const {
    isLoading,
    error,
    failure,
    success,
    startLoading,
  } = useLoadingState();

  return (
    <div className="lg:p-10 p-5">
      <h3 className="font-bold uppercase">Applications</h3>

      <div className="md:text-sm">
        {!applications.length && (
          <div className="text-lg font-bold text-center text-gray-300">
            No one has applied yet
          </div>
        )}

        <Accordion>
          {applications.map((item, index) => (
            <GigApplicationsItem
              application={item}
              key={item.id}
              isLast={index === applications.length - 1}
              currentUsername={currentUsername}
              isFunder={isFunder}
              onCancel={() => handleCancel(item.id)}
            />
          ))}
        </Accordion>

        {isCancelPopupOpen && (
          <CancelPopup
            onDismiss={() => closeCancelPopup()}
            isLoading={isLoading}
            error={error}
          />
        )}
      </div>
    </div>
  );

  async function handleCancel(appId) {
    try {
      startLoading();
      await deleteApplication({ variables: { appId } });
      success();
    } catch (e) {
      failure(e.message);
    } finally {
      openCancelPopup();
    }
  }
}

GigApplications.propTypes = {
  applications: PropTypes.array.isRequired,
  currentUsername: PropTypes.string,
  isFunder: PropTypes.bool.isRequired,
};

function updateCacheAfterDelete(cache, { data }) {
  updateGetBountiesCache(cache, { data });
  updateBountyCache(cache, { data });
}

function updateBountyCache(cache, { data }) {
  const bountyId = data.deleteApplication.bountyId;

  const bountyQuery = cache.readQuery({
    query: BOUNTY_QUERY,
    variables: { id: bountyId },
  });

  if (!bountyQuery) {
    return;
  }
  const appId = data.deleteApplication.id;
  const bounty = bountyQuery.bounty_by_pk;

  cache.writeQuery({
    query: BOUNTY_QUERY,
    data: {
      bounty_by_pk: {
        ...bounty,
        applications: bounty.applications
          .filter((app) => app.id !== appId)
          .map((app) => ({ __typename: 'application', id: app.id })),
      },
    },
  });
}

function updateGetBountiesCache(cache, { data }) {
  const existingBountiesQuery = cache.readQuery({
    query: GET_BOUNTIES,
  });

  if (!existingBountiesQuery) {
    return;
  }

  const bountyId = data.deleteApplication.bountyId;

  cache.writeQuery({
    query: GET_BOUNTIES,
    data: {
      bounty: existingBountiesQuery.bounty.map((b) =>
        b.id !== bountyId
          ? b
          : {
              ...b,
              applications_aggregate: {
                aggregate: {
                  count: b.applications_aggregate.aggregate.count - 1,
                },
              },
            }
      ),
    },
  });
}
