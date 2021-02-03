import PropTypes from 'prop-types';
import classnames from 'classnames';
import { useMutation } from '@apollo/client';
import { useFormik } from 'formik';
import { string, object } from 'yup';

import Dialog from '@reach/dialog';

import { Button } from 'components/shared/Button';
import { FormField } from 'components/shared/FormField';

import { ONBOARDING_MUTATION } from 'queries/users';

const validationSchema = object().shape({
  firstName: string().required('Name is required'),
});

export default function OnboardingModal({ onDismiss, userId }) {
  const formik = useFormik({
    onSubmit,
    validationSchema,
    initialValues: { firstName: '' },
  });

  const [onboardUser] = useMutation(ONBOARDING_MUTATION, {
    onCompleted({ firstName }) {
      onDismiss({ firstName });
    },
  });

  return (
    <Dialog
      onDismiss={() => onDismiss()}
      aria-label="Welcome Dialog"
      className="w-content"
    >
      <form className="flex flex-col" onSubmit={formik.handleSubmit}>
        <FormField
          title="First name"
          fieldId="firstName-input"
          error={formik.errors.firstName}
        >
          <input
            className={classnames('w-64 mt-1', {
              'border-red-500':
                formik.touched.firstName && formik.errors.firstName,
            })}
            type="text"
            name="firstName"
            id="firstName-input"
            value={formik.values.firstName}
            onBlur={formik.handleBlur}
            onChange={formik.handleChange}
          />
        </FormField>

        <Button
          className="mt-10"
          type="submit"
          value="Log in"
          disabled={!formik.isValid}
        >
          Submit
        </Button>
      </form>
    </Dialog>
  );

  async function onSubmit({ firstName }) {
    if (!firstName) {
      return;
    }
    try {
      await onboardUser({ variables: { userId, firstName } });
    } catch (e) {
      console.error(e);
    }
  }
}

OnboardingModal.propTypes = {
  onDismiss: PropTypes.func.isRequired,
  userId: PropTypes.string.isRequired,
};
