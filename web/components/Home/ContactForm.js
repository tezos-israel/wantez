import classnames from 'classnames';
import Logo from '../../images/logo.svg';
import MailchimpSubscribe from 'react-mailchimp-subscribe';

import { Formik } from 'formik';
import { string, object } from 'yup';

const validationSchema = object().shape({
  email: string().email().required(),
});

export default function ContactForm() {
  return (
    <MailchimpSubscribe
      url={process.env.NEXT_PUBLIC_MAILCHIMP_URL}
      render={({ subscribe, status, message }) => (
        <Formik
          initialValues={{ email: '' }}
          onSubmit={({ email }) => subscribe({ EMAIL: email })}
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
            <form
              className="sm:w-1/4 sm:px-0 px-10 py-10 mx-auto"
              onSubmit={handleSubmit}
            >
              <h2 className="font-museo w-content flex mx-auto text-5xl font-bold text-blue-500">
                <Logo className="mr-10" />
                Join us now
              </h2>

              <div className="flex flex-col items-center justify-center mt-10 space-y-10">
                <input
                  type="text"
                  className={classnames(
                    'hover:bg-blue-100 w-full border-0 border-b border-solid',
                    touched.email && errors.email
                      ? 'border-red-500'
                      : 'border-blue-500'
                  )}
                  name="email"
                  value={values.email}
                  onChange={handleChange}
                  onBlur={handleBlur}
                />
                <button className="px-5 py-2 text-white bg-yellow-500 rounded-sm">
                  Join the mailing list
                </button>
                {status === 'sending' && (
                  <div style={{ color: 'blue' }}>sending...</div>
                )}
                {status === 'error' && (
                  <div style={{ color: 'red' }}>{message}</div>
                )}
                {status === 'success' && (
                  <div style={{ color: 'green' }}>Subscribed!</div>
                )}
              </div>
            </form>
          )}
        </Formik>
      )}
    />
  );
}
