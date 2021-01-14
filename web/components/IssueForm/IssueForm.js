import PropTypes from 'prop-types';
import ReactMarkdown from 'react-markdown';
import classnames from 'classnames';
import { useFormik } from 'formik';

import { FieldGroup, FieldGroupTitle } from 'components/shared/FieldGroup';
import { FormField } from 'components/shared/FormField';
import { OptionsField } from 'components/shared/OptionsField';
import { HalfCirclePaper } from 'components/shared/HalfCirclePaper';

import { usePrice } from '../../hooks/usePrice';

import { useRepoInfo } from './use-repo-info';

import { IssueUrlField } from './IssueUrlField';
import { CategoriesField } from './CategoriesField';
import { IssueTags } from './IssueTags';

import { schema } from './form-validation';

const FEE_PERCENT = 0;

// import { v4 as uuid } from 'uuid';
// const demoValues = {
//   issueUrl: 'https://github.com/issues?' + uuid(),
//   categories: ['frontend'],
//   experienceLevel: 'beginner',
//   timeCommitment: 'hours',
//   price: 1,
//   estHours: 3,
//   disclaimerAgree: true,
//   paymentAgree: true,
//   tags: ['hello', 'hey'],
// };

const initialValues = {
  issueUrl: '',
  categories: [],
  experienceLevel: 'beginner',
  timeCommitment: 'hours',
  price: 0,
  estHours: 0,
  disclaimerAgree: false,
  paymentAgree: false,
  tags: [],
};

export function IssueForm({
  onSubmit,
  isConnected,
  isLoggedIn,
  balance,
  loading,
}) {
  const formik = useFormik({
    initialValues,
    onSubmit: handleSubmit,
    validationSchema: schema,
  });

  const priceFiat = usePrice(formik.values.price, 'ils');
  const fee = formik.values.price * FEE_PERCENT;

  const {
    title,
    description,
    imageUrl: repoImageUrl,
    error: repoInfoError,
    loading: loadingRepoInfo,
    onUrlChange: updateRepoInfo,
  } = useRepoInfo(formik.values.issueUrl);

  return (
    <form onSubmit={formik.handleSubmit}>
      <div className="bg-white">
        <HalfCirclePaper />
        <div className="p-10">
          <div className="space-y-5">
            <IssueUrlField
              touched={formik.touched.issueUrl}
              onBlur={formik.handleBlur}
              onChange={handleUrlChange}
              value={formik.values.issueUrl}
            />
            <FieldGroup title="Gig info">
              {loadingRepoInfo ? (
                <div>Loading</div>
              ) : repoInfoError ? (
                <p className="text-red-500">{repoInfoError}</p>
              ) : (
                <>
                  <img src={repoImageUrl} className="w-32" />
                  <h2 className="text-xl font-bold">{title}</h2>
                  <ReactMarkdown>{description}</ReactMarkdown>
                </>
              )}
            </FieldGroup>
          </div>
          <div className="my-6 border-t-2 border-blue-500 border-dashed" />
          <CategoriesField
            error={formik.touched.categories ? formik.errors.categories : ''}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            value={formik.values.categories}
          />
          <div className="my-6 border-t-2 border-blue-500 border-dashed" />
          <FieldGroup title="Issue Tags">
            <p className="text-sm text-gray-500">
              Pick the most accurate tags for this issue to get the right
              contributors
            </p>
            <div className="flex mt-3 space-x-4">
              <IssueTags
                value={formik.values.tags}
                onChange={formik.setFieldValue}
              />
            </div>
          </FieldGroup>
        </div>
      </div>
      <div className="p-10 mt-2 space-y-6 bg-white">
        <FieldGroup title="Details">
          <div className="grid grid-cols-3 gap-3">
            <FormField
              title="Experience Level"
              fieldId={`${formik.values.experienceLevel}-input`}
            >
              <OptionsField
                optionsName="experienceLevel"
                options={[
                  { value: 'beginner', title: 'Beginner' },
                  { value: 'medium', title: 'Medium' },
                  { value: 'pro', title: 'Pro' },
                ]}
                onChange={formik.handleChange}
                value={formik.values.experienceLevel}
              />
            </FormField>
            <FormField
              title="Time Commitment"
              fieldId={`${formik.values.timeCommitment}-input`}
            >
              <OptionsField
                optionsName="timeCommitment"
                options={[
                  { value: 'hours', title: 'Hours' },
                  { value: 'days', title: 'Days' },
                  { value: 'weeks', title: 'Weeks' },
                  { value: 'months', title: 'Months' },
                ]}
                onChange={formik.handleChange}
                value={formik.values.timeCommitment}
              />
            </FormField>
          </div>
        </FieldGroup>

        <FieldGroup title="Pricing">
          <div className="grid grid-cols-3 gap-3">
            <FormField
              title="Amount (XTZ)"
              fieldId="amount-input"
              error={
                formik.touched.price
                  ? formik.errors.price ||
                    (formik.values.price > balance && 'Balance is insufficient')
                  : ''
              }
            >
              <input
                type="number"
                id="amount-input"
                name="price"
                className={classnames(
                  `w-full border border-gray-500 rounded-none`,
                  {
                    'border-red-500':
                      formik.touched.price &&
                      (formik.errors.price || formik.values.price > balance),
                  }
                )}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                value={formik.values.price}
              />
            </FormField>
            <FormField title="ILS" fieldId="usd-input">
              <input
                type="number"
                className="form-input w-full border border-gray-500 rounded-none"
                disabled
                value={priceFiat}
              />
            </FormField>
            <FormField
              title="Est. Hours of works"
              fieldId="est-hours-input"
              error={formik.touched.estHours ? formik.errors.estHours : ''}
            >
              <input
                type="number"
                className={classnames(
                  `w-full border border-gray-500 rounded-none`,
                  {
                    'border-red-500':
                      formik.touched.estHours && formik.errors.estHours,
                  }
                )}
                name="estHours"
                value={formik.values.estHours}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
              />
            </FormField>
          </div>
        </FieldGroup>
      </div>
      <div className="px-10 py-4 mt-2 bg-white">
        <FieldGroupTitle title="FEATURE YOUR Issue" bottomGap="mb-2" />
        <p className="text-sm text-gray-500">
          Get more visibility and feature your issue at the top of Issue
          Explorer - Coming soon!
        </p>
      </div>
      <div className="p-10 mt-2 bg-white">
        <FieldGroup title="Total">
          <div className="text-4xl font-bold text-blue-500">
            {formik.values.price + fee} XTZ
          </div>
          <p className="text-xs text-green-600">
            Issue {formik.values.price} XTZ ({priceFiat} ILS) + {fee} XTZ Wantez
            Platform Fee
          </p>
        </FieldGroup>
        <div className="my-6 border-t-2 border-blue-500 border-dashed" />
        <label className="block">
          <input
            className="form-checkbox mr-2 text-green-600 border-gray-500 rounded-none"
            type="checkbox"
            name="disclaimerAgree"
            checked={formik.values.disclaimerAgree}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
          />
          <span className="text-xs text-gray-600">
            I have read, understand, and agree to, the Terms of Service.
          </span>
        </label>
        {formik.touched.disclaimerAgree && formik.errors.disclaimerAgree && (
          <div className="text-sm text-red-500">
            {formik.errors.disclaimerAgree}
          </div>
        )}
        <label className="block">
          <input
            className="form-checkbox mr-2 text-green-600 border-gray-500 rounded-none"
            type="checkbox"
            name="paymentAgree"
            checked={formik.values.paymentAgree}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
          />
          <span className=" text-xs text-gray-600">
            Payment Upon Completion. Upon delivery of work, I agree to pay the
            proposed amount to the fulfiller(s) if the submitted fulfillment
            meets the standards I have set forth.
          </span>
        </label>
        {formik.touched.paymentAgree && formik.errors.paymentAgree && (
          <div className="text-sm text-red-500">
            {formik.errors.paymentAgree}
          </div>
        )}

        <button
          className="disabled:cursor-not-allowed disabled:opacity-50 relative block w-1/3 h-10 mx-auto mt-10 text-white uppercase bg-blue-500 rounded-md"
          disabled={!formik.isValid || !isConnected || !isLoggedIn || loading}
          title={
            !isConnected
              ? 'Please connect to a wallet'
              : !isLoggedIn
              ? 'Please log in'
              : ''
          }
          type="submit"
        >
          Fund Issue
          {loading && (
            <span className="right-3 absolute lowercase">Loading</span>
          )}
        </button>
      </div>
    </form>
  );

  function handleUrlChange(url) {
    formik.setFieldValue('issueUrl', url);
    updateRepoInfo(url);
  }

  function handleSubmit({
    price: fee,
    experienceLevel,
    categories,
    timeCommitment,
    // estHours,
    tags,
    issueUrl,
    deadline = '2021-08-12T08:56:37.331336+00:00',
  }) {
    onSubmit({
      fee,
      experienceLevel,
      categories: categories.map((category) => ({ category })),
      timeCommitment,
      imageUrl: repoImageUrl,
      // estHours,
      issueUrl,
      // title,
      // description,
      tags: tags.map((name) => ({
        tag: {
          data: { name },
          on_conflict: { constraint: 'tags_pkey', update_columns: ['name'] },
        },
      })),
      title,
      description,
      deadline,
    });
  }
}

IssueForm.propTypes = {
  onSubmit: PropTypes.func.isRequired,
  isLoggedIn: PropTypes.bool.isRequired,
  isConnected: PropTypes.bool.isRequired,
  balance: PropTypes.number.isRequired,
  loading: PropTypes.bool.isRequired,
};
