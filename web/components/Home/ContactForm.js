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
              className="lg:w-3/4 pb-30 px-10 pt-24 mx-auto"
              onSubmit={handleSubmit}
            >
              <h2 className="font-museo w-content sm:text-5xl flex items-center mx-auto text-4xl font-bold text-blue-500">
                <Logo className="mr-5" />
                Join us now
              </h2>

              <FormContent
                onBlur={handleBlur}
                onChange={handleChange}
                onSubmit={handleSubmit}
                values={values}
                errors={errors}
                touched={touched}
                mailChimpMessage={message}
                mailChimpStatus={status}
              />
            </form>
          )}
        </Formik>
      )}
    />
  );
}

function FormContent({
  touched,
  values,
  errors,
  onChange,
  onBlur,
  mailChimpStatus,
  mailChimpMessage,
}) {
  const validationError = touched.email && errors.email;

  if (mailChimpStatus && mailChimpStatus === 'success') {
    return <div className="w-content mx-auto mt-5">Thanks for joining us!</div>;
  }

  return (
    <>
      <div className="sm:w-3/4 relative flex items-center justify-center mx-auto mt-10">
        <input
          type="text"
          className={classnames(
            'border-2 border-solid hover:bg-blue-100 h-14 w-full placeholder-gray-500 font-medium',
            validationError ? 'border-red-500' : 'border-blue-500'
          )}
          name="email"
          value={values.email}
          placeholder="Leave us your Email to join our community"
          onChange={onChange}
          onBlur={onBlur}
        />
        <Button
          validationError={validationError}
          sendingStatus={mailChimpStatus}
          errorMessage={mailChimpMessage}
        />
      </div>
      {(mailChimpStatus === 'error' || validationError) && (
        <div
          className="w-content mx-auto mt-5 text-xs text-center text-red-400"
          dangerouslySetInnerHTML={{
            __html: mailChimpMessage || validationError,
          }}
        />
      )}
      <div className="w-content mx-auto mt-5 text-xs text-center text-gray-400">
        By joining you agree you confirm to get only cool and interesting stuff,
        not junk :)
      </div>
    </>
  );
}

FormContent.propTypes = {
  errors: PropTypes.shape({
    email: PropTypes.string,
  }),
  mailChimpMessage: PropTypes.string,
  mailChimpStatus: PropTypes.string,
  onBlur: PropTypes.func,
  onChange: PropTypes.func,
  onSubmit: PropTypes.func,
  touched: PropTypes.shape({
    email: PropTypes.bool,
  }),
  values: PropTypes.shape({
    email: PropTypes.string,
  }),
};

function Button({ validationError, sendingStatus, errorMessage }) {
  return (
    <button
      type="submit"
      title={errorMessage}
      className={classnames(
        'w-16 flex justify-center items-center h-14 disabled:cursor-not-allowed absolute right-0',
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
