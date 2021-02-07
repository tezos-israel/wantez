import classnames from 'classnames';
import MailchimpSubscribe from 'react-mailchimp-subscribe';

import { Formik } from 'formik';
import { string, object } from 'yup';

import { Logo } from 'images';

import SendButtonIcon from './send-button.svg';

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
              className="lg:w-3/4 px-10 py-10 mx-auto"
              onSubmit={handleSubmit}
            >
              <h2 className="font-museo w-content sm:text-5xl flex items-center mx-auto text-4xl font-bold text-blue-500">
                <Logo className="mr-5" />
                Join us now
              </h2>

              <div className="sm:w-3/4 flex items-center justify-center mx-auto mt-10">
                <input
                  type="text"
                  className={classnames(
                    'border-2 border-solid hover:bg-blue-100 p-4 w-full placeholder-gray-500 font-medium',
                    touched.email && errors.email
                      ? 'border-red-500'
                      : 'border-blue-500'
                  )}
                  name="email"
                  value={values.email}
                  placeholder="Leave us your Email to join our community"
                  onChange={handleChange}
                  onBlur={handleBlur}
                />
                <button className="px-5 py-2 bg-blue-500">
                  <SendButtonIcon />
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
              <div className="w-content mx-auto mt-5 text-xs text-gray-400">
                By leaving you agree you confirm to get only cool and
                interesting stuff, not junk :)
              </div>
            </form>
          )}
        </Formik>
      )}
    />
  );
}
