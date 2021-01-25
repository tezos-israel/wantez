import PropTypes from 'prop-types';
import { useFormik } from 'formik';
import { string, object } from 'yup';
import classnames from 'classnames';

import { Button } from 'components/shared/Button';
import Loader from 'react-loader-spinner';
import { FormField } from 'components/shared/FormField';

const validationSchema = object().shape({
  email: string().email().required(),
});

export function LoginModalContent({
  isLoading,
  onSubmit,
  disableLogin,
  isUserLoggedIn,
}) {
  const formik = useFormik({
    onSubmit,
    validationSchema,
    initialValues: { email: '' },
  });

  if (isLoading) {
    return <Loader type="TailSpin" color="#cacaca" height={50} width={50} />;
  }

  if (isUserLoggedIn) {
    return 'You are already logged in! You can close this modal';
  }

  return (
    <form className="flex flex-col" onSubmit={formik.handleSubmit}>
      <FormField
        title="Enter Your Email"
        fieldId="email-input"
        error={formik.errors.email}
      >
        <input
          className={classnames('w-64 mt-1', {
            'border-red-500': formik.touched.email && formik.errors.email,
          })}
          type="email"
          name="email"
          id="email-input"
          value={formik.values.email}
          onBlur={formik.handleBlur}
          onChange={formik.handleChange}
        />
      </FormField>

      <Button
        className="mt-10"
        type="submit"
        value="Log in"
        disabled={!formik.isValid || disableLogin}
      >
        Log in
      </Button>
    </form>
  );
}

LoginModalContent.propTypes = {
  isLoading: PropTypes.bool.isRequired,
  onSubmit: PropTypes.func.isRequired,
  disableLogin: PropTypes.bool.isRequired,
  isUserLoggedIn: PropTypes.bool.isRequired,
};
