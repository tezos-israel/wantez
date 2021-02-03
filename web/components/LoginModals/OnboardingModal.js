import PropTypes from 'prop-types';
import classnames from 'classnames';
import { useFormik } from 'formik';
import { string, object } from 'yup';

import { Button } from 'components/shared/Button';
import { FormField } from 'components/shared/FormField';

import Dialog from '@reach/dialog';

const validationSchema = object().shape({
  name: string().required('Name is required'),
});

export default function OnboardingModal({ isOpen, onDismiss }) {
  const formik = useFormik({
    onSubmit,
    validationSchema,
    initialValues: { email: '' },
  });

  return (
    <Dialog
      isOpen={isOpen}
      onDismiss={onDismiss}
      aria-label="Welcome Dialog"
      className="w-content"
    >
      <form className="flex flex-col" onSubmit={formik.handleSubmit}>
        <FormField
          title="Name"
          fieldId="name-input"
          error={formik.errors.email}
        >
          <input
            className={classnames('w-64 mt-1', {
              'border-red-500': formik.touched.name && formik.errors.name,
            })}
            type="text"
            name="name"
            id="name-input"
            value={formik.values.name}
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

  async function onSubmit({ name }) {
    if (!name) {
      return;
    }
    try {
      // await onboardUser({ name });
      onDismiss({ name });
    } catch (e) {
      console.error(e);
    }
  }
}

OnboardingModal.propTypes = {
  isOpen: PropTypes.bool.isRequired,
  onDismiss: PropTypes.func.isRequired,
};
