import Dialog from '@reach/dialog';
import Spinner from 'react-loader-spinner';
import { useMutation } from '@apollo/client';
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
  const [applyToGig] = useMutation(CREATE_APPLICATION);
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
      aria-label="Login Dialog"
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
