import React from 'react';
import PropTypes from 'prop-types';
import { useMutation } from '@apollo/client';
import { Accordion } from '@reach/accordion';

import '@reach/accordion/styles.css';

import CancelPopup from './CancelButton/CancelPopup';

import { useBoolean } from 'hooks/useBoolean';
import useLoadingState from 'hooks/useLoadingState';

import { DELETE_APPLICATION } from 'queries/applications';
import { GET_GIGS, GIG_QUERY } from 'queries/gigs';

import GigApplicationsItem from './GigApplicationsItem';

export default function GigApplications({ applications, currentUsername }) {
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
};

function updateCacheAfterDelete(cache, { data }) {
  updateGetGigsCache(cache, { data });
  updateGigCache(cache, { data });
}

function updateGigCache(cache, { data }) {
  const gigId = data.deleteApplication.gigId;

  const gigQuery = cache.readQuery({
    query: GIG_QUERY,
    variables: { id: gigId },
  });

  if (!gigQuery) {
    return;
  }
  const appId = data.deleteApplication.id;
  const gig = gigQuery.gig_by_pk;

  cache.writeQuery({
    query: GIG_QUERY,
    data: {
      gig_by_pk: {
        ...gig,
        applications: gig.applications
          .filter((app) => app.id !== appId)
          .map((app) => ({ __typename: 'application', id: app.id })),
      },
    },
  });
}

function updateGetGigsCache(cache, { data }) {
  const existingGigsQuery = cache.readQuery({
    query: GET_GIGS,
  });

  if (!existingGigsQuery) {
    return;
  }

  const gigId = data.deleteApplication.gigId;

  cache.writeQuery({
    query: GET_GIGS,
    data: {
      gig: existingGigsQuery.gig.map((gig) =>
        gig.id !== gigId
          ? gig
          : {
              ...gig,
              applications_aggregate: {
                aggregate: {
                  count: gig.applications_aggregate.aggregate.count - 1,
                },
              },
            }
      ),
    },
  });
}
