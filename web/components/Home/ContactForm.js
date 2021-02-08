import PropTypes from 'prop-types';
import classnames from 'classnames';
import MailchimpSubscribe from 'react-mailchimp-subscribe';
import Spinner from 'react-loader-spinner';

import { Formik } from 'formik';
import { string, object } from 'yup';

import { Logo } from 'images';

import SendButtonIcon from './send-button.svg';

const validationSchema = object().shape({
  email: string().email('Email is invalid').required('Email is required'),
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

              {!status || status !== 'success' ? (
                <>
                  <div className="sm:w-3/4 relative flex items-center justify-center mx-auto mt-10">
                    <input
                      type="text"
                      className={classnames(
                        'border-2 border-solid hover:bg-blue-100 h-14 w-full placeholder-gray-500 font-medium',
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
                    <Button
                      validationError={touched.email && errors.email}
                      sendingStatus={status}
                      errorMessage={message}
                    />
                  </div>
                  {(status === 'error' || (touched.email && errors.email)) && (
                    <div
                      className="w-content mx-auto mt-5 text-xs text-red-400"
                      dangerouslySetInnerHTML={{
                        __html: message || (touched.email && errors.email),
                      }}
                    />
                  )}
                  <div className="w-content mx-auto mt-5 text-xs text-gray-400">
                    By leaving you agree you confirm to get only cool and
                    interesting stuff, not junk :)
                  </div>
                </>
              ) : (
                <div className="w-content mx-auto mt-5">
                  Thanks for joining us!
                </div>
              )}
            </form>
          )}
        </Formik>
      )}
    />
  );
}

function Button({ validationError, sendingStatus, errorMessage }) {
  return (
    <button
      type="submit"
      title={errorMessage}
      className={classnames(
        'px-5 h-14 disabled:cursor-not-allowed absolute right-0',
        {
          'bg-blue-500':
            !validationError && (!sendingStatus || sendingStatus === 'sending'),
          'bg-red-500':
            validationError || (sendingStatus && sendingStatus === 'error'),
        }
      )}
      disabled={sendingStatus && sendingStatus !== 'error'}
    >
      {!sendingStatus ? (
        <SendButtonIcon className="py-1.5" />
      ) : sendingStatus === 'sending' ? (
        <Spinner type="TailSpin" color="#cacaca" height={50} width={50} />
      ) : (
        sendingStatus === 'error' && <div>X</div>
      )}
    </button>
  );
}

Button.propTypes = {
  errorMessage: PropTypes.string,
  sendingStatus: PropTypes.string,
  validationError: PropTypes.oneOfType([PropTypes.bool, PropTypes.string]),
};
