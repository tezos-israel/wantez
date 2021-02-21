import PropTypes from 'prop-types';
import Spinner from 'react-loader-spinner';
import { Formik } from 'formik';
import { string, object } from 'yup';
import { useMutation, gql } from '@apollo/client';

import useLoadingState from 'hooks/useLoadingState';

import { CREATE_APPLICATION } from 'queries/applications';

import Button from '@shared/Button';
import { FormField } from '@shared/FormField';

const validationSchema = object().shape({
  details: string().required('Details are required'),
});

export default function ApplyDialogForm({
  onSuccess,
  gigId,
  address,
  initialFocusRef,
  onDismiss,
}) {
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
        <form className="sm:w-96 flex flex-col px-5" onSubmit={handleSubmit}>
          <button onClick={onDismiss} className="mx-auto text-gray-500">
            X
          </button>

          <h1 className="font-museo mt-5 font-bold text-center text-gray-500">
            Please tell us your plan for this gig
          </h1>

          <FormField
            fieldId="apply-field"
            className="mt-5"
            error={touched.details && errors.details}
          >
            <textarea
              ref={initialFocusRef}
              id="apply-field"
              name="details"
              className="disabled:opacity-10 rounded-xl w-full h-56"
              disabled={isLoading}
              value={values.details}
              onChange={handleChange}
              onSubmit={handleBlur}
            />
          </FormField>

          <div className="w-1/3 mx-auto text-right">
            {!isLoading ? (
              <Button
                color="primary"
                className="w-full font-semibold"
                type="submit"
                size="small"
              >
                Apply
              </Button>
            ) : (
              <Spinner type="TailSpin" color="#cacaca" height={30} width={30} />
            )}
            {error && <div className="text-sm text-red-500">{error}</div>}
          </div>
        </form>
      )}
    </Formik>
  );

  async function handleSubmit({ details }) {
    try {
      startLoading();
      await applyToGig({ variables: { details, gigId, address } });
      success();
      onSuccess();
    } catch (err) {
      failure(err.message);
    }
  }
}

ApplyDialogForm.propTypes = {
  address: PropTypes.string.isRequired,
  gigId: PropTypes.string.isRequired,
  initialFocusRef: PropTypes.oneOfType([
    PropTypes.func,
    PropTypes.shape({ current: PropTypes.elementType }),
  ]),
  onDismiss: PropTypes.func.isRequired,
  onSuccess: PropTypes.func.isRequired,
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
