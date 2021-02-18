import PropTypes from 'prop-types';
import Dialog from '@reach/dialog';
import Spinner from 'react-loader-spinner';
import { useMutation, gql } from '@apollo/client';
import { Formik } from 'formik';
import { string, object } from 'yup';

import Button from '@shared/Button';
import { FormField } from '@shared/FormField';
import useLoadingState from 'hooks/useLoadingState';

import { CREATE_APPLICATION } from 'queries/applications';

const validationSchema = object().shape({
  details: string().required('Details are required'),
});

export default function ApplyDialog({ onDismiss, gigId, address }) {
  const [applyToGig] = useMutation(CREATE_APPLICATION, {
    update: updateCacheAfterCreate,
  });
  const {
    isLoading,
    error,
    startLoading,
    success,
    failure,
  } = useLoadingState();

  return (
    <Dialog
      onDismiss={onDismiss}
      aria-label="Create gig application Dialog"
      className="w-content"
    >
      <Formik
        initialValues={{ details: '' }}
        onSubmit={handleSubmit}
        validationSchema={validationSchema}
      >
        {({
          handleSubmit,
          values,
          errors,
          touched,
          handleChange,
          handleBlur,
        }) => (
          <form className="sm:w-96 flex flex-col" onSubmit={handleSubmit}>
            <FormField
              title="Please tell us your plan for this gig"
              fieldId="apply-field"
              error={touched.details && errors.details}
            >
              <textarea
                id="apply-field"
                name="details"
                className="h-96 disabled:opacity-10 w-full"
                disabled={isLoading}
                value={values.details}
                onChange={handleChange}
                onSubmit={handleBlur}
              />
            </FormField>

            <div className="w-1/3 ml-auto text-right">
              {!isLoading ? (
                <Button color="primary" className="w-full" type="submit">
                  Apply
                </Button>
              ) : (
                <Spinner
                  type="TailSpin"
                  color="#cacaca"
                  height={30}
                  width={30}
                />
              )}
              {error && <div className="text-sm text-red-500">{error}</div>}
            </div>
          </form>
        )}
      </Formik>
    </Dialog>
  );

  async function handleSubmit({ details }) {
    try {
      startLoading();
      await applyToGig({ variables: { details, gigId, address } });
      success();
      onDismiss();
    } catch (err) {
      failure(err.message);
    }
  }
}

ApplyDialog.propTypes = {
  onDismiss: PropTypes.func.isRequired,
  gigId: PropTypes.string.isRequired,
  address: PropTypes.string.isRequired,
};

function updateCacheAfterCreate(cache, { data }) {
  const { bountyId, appId } = data.insertApplication;

  updateBountyAppsCache(cache, bountyId, appId);
  updateBountyAppsCountCache(cache, bountyId);
}

function updateBountyAppsCache(cache, bountyId, appId) {
  const fragmentQuery = {
    id: `bounty:${bountyId}`,
    fragment: gql`
      fragment bountyAApplications on bounty {
        applications {
          id
        }
      }
    `,
  };

  const bounty = cache.readFragment(fragmentQuery);

  cache.writeFragment({
    ...fragmentQuery,
    data: {
      applications: [
        ...bounty.applications,
        { __typename: 'application', id: appId },
      ],
    },
  });
}

function updateBountyAppsCountCache(cache, bountyId) {
  const fragmentQuery = {
    id: `bounty:${bountyId}`,
    fragment: gql`
      fragment bountyAApplicationsCount on bounty {
        applications_aggregate {
          aggregate {
            count
          }
        }
      }
    `,
  };

  const bounty = cache.readFragment(fragmentQuery);
  if (!bounty) {
    return;
  }

  cache.writeFragment({
    ...fragmentQuery,
    data: {
      applications_aggregate: {
        aggregate: {
          count: (bounty.applications_aggregate?.aggregate?.count || 0) + 1,
        },
      },
    },
  });
}
