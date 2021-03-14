import PropTypes from 'prop-types';
import { useFormik } from 'formik';
import { string, object } from 'yup';
import classnames from 'classnames';

import Button from '@shared/Button';
import Loader from 'react-loader-spinner';
import { FormField } from 'components/shared/FormField';
import ArrowRight from './arrow-right.svg';

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
    <form
      className="top-14 absolute right-0 flex flex-col p-3 bg-white border rounded-md shadow-md"
      onSubmit={formik.handleSubmit}
    >
      <FormField fieldId="email-input" error={formik.errors.email}>
        <div className="flex">
          <input
            className={classnames(
              'w-64 h-7 rounded-l-md text-sm focus:outline-none border-2',
              {
                'border-red-500': formik.touched.email && formik.errors.email,
                'border-blue-500': !formik.errors.email,
              }
            )}
            type="email"
            name="email"
            id="email-input"
            placeholder="Enter Your Email"
            value={formik.values.email}
            onBlur={formik.handleBlur}
            onChange={formik.handleChange}
          />
          <Button
            className="rounded-l-none"
            size="small"
            type="submit"
            value="Log in"
            color="primary"
            disabled={!formik.isValid || disableLogin}
          >
            <ArrowRight />
          </Button>
        </div>
      </FormField>
    </form>
  );
}
LoginModalContent.propTypes = {
  isLoading: PropTypes.bool.isRequired,
  onSubmit: PropTypes.func.isRequired,
  disableLogin: PropTypes.bool.isRequired,
  isUserLoggedIn: PropTypes.bool.isRequired,
};
