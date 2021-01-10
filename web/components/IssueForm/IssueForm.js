import React, { useCallback, useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import ReactMarkdown from 'react-markdown';
import { useFormik } from 'formik';

import { debounce } from 'lib/debounce';

import { FieldGroup, FieldGroupTitle } from 'components/shared/FieldGroup';
import { FormField } from 'components/shared/FormField';
import { OptionsField } from 'components/shared/OptionsField';

import { useRepoInfo } from './use-repo-info';

import { IssueTags } from './IssueTags';
import { IssueCategory } from './IssueCategory';

import HalfCirclePaper from './half-circle-paper.svg';
import CategoryFrontend from './CategoryFrontend.svg';
import CategoryBackend from './CategoryBackend.svg';
import CategoryDesign from './CategoryDesign.svg';
import CategoryDocs from './CategoryDocs.svg';

import { schema } from './form-validation';

const FEE_PERCENT = 0;

const categories = [
  { title: 'Frontend', icon: CategoryFrontend, id: 'frontend' },
  { title: 'Backend', icon: CategoryBackend, id: 'backend' },
  { title: 'Design', icon: CategoryDesign, id: 'design' },
  { title: 'Documentation', icon: CategoryDocs, id: 'documentation' },
  { title: 'Other', id: 'other' },
];

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
  disclaimerAgree: true,
  paymentAgree: true,
  tags: [],
};

export function IssueForm({ onSubmit, isConnected, isLoggedIn, balance }) {
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
        <div className="mx-4 transform -translate-y-1/2">
          <HalfCirclePaper className="w-full" />
        </div>
        <div className="p-10">
          <div className="space-y-5">
            <FieldGroup
              renderTitle={(className) => (
                <label htmlFor="url-input" className={className}>
                  Issue Url
                </label>
              )}
            >
              <input
                type="text"
                name="issueUrl"
                id="url-input"
                className={`border border-gray-500 rounded-none form-input ${
                  formik.touched.issueUrl && formik.errors.issueUrl
                    ? 'border-red-500'
                    : ''
                }`}
                onChange={(e) => handleUrlChange(e.target.value)}
                value={formik.values.issueUrl}
              />
            </FieldGroup>
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
          <FieldGroup title="Issue Category">
            <p className="text-sm text-gray-500">
              Pick the most accurate categories for this issue to get the right
              contributors
            </p>
            <div className="flex mt-3 space-x-4">
              {categories.map((category) => (
                <IssueCategory
                  {...category}
                  key={category.title}
                  onChange={formik.handleChange}
                  value={formik.values.categories}
                />
              ))}
            </div>
          </FieldGroup>
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
            <FormField title="Amount (XTZ)" fieldId="amount-input">
              <input
                type="number"
                id="amount-input"
                name="price"
                className={`w-full border border-gray-500 rounded-none form-input ${
                  (formik.touched.price && formik.errors.price) ||
                  formik.values.price > balance
                    ? 'border-red-500'
                    : ''
                }`}
                onChange={formik.handleChange}
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
            <FormField title="Est. Hours of works" fieldId="est-hours-input">
              <input
                type="number"
                className={`w-full border border-gray-500 rounded-none form-input ${
                  formik.touched.estHours && formik.errors.estHours
                    ? 'border-red-500'
                    : ''
                }`}
                name="estHours"
                value={formik.values.estHours}
                onChange={formik.handleChange}
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
            value={formik.values.disclaimerAgree}
            onChange={formik.handleChange}
          />
          <span className="text-xs text-gray-600">
            I have read, understand, and agree to, the Terms of Service.
          </span>
        </label>
        <label className="block">
          <input
            className="form-checkbox mr-2 text-green-600 border-gray-500 rounded-none"
            type="checkbox"
            name="paymentAgree"
            value={formik.values.paymentAgree}
            onChange={formik.handleChange}
          />
          <span className=" text-xs text-gray-600">
            Payment Upon Completion. Upon delivery of work, I agree to pay the
            proposed amount to the fulfiller(s) if the submitted fulfillment
            meets the standards I have set forth.
          </span>
        </label>

        <button
          className="disabled:cursor-not-allowed disabled:opacity-50 block w-1/3 h-10 mx-auto mt-10 text-white uppercase bg-blue-500 rounded-md"
          disabled={!isConnected || !isLoggedIn}
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
};

function usePrice(priceXTZ, currency) {
  const [priceFiat, setPriceFiat] = useState(0);

  const loadPriceAsync = useCallback(
    debounce(async (price) => {
      const res = await fetch(
        `https://api.coingecko.com/api/v3/simple/price?ids=tezos&vs_currencies=${currency}`
      );
      const { tezos: response } = await res.json();
      const responsePrice = response[currency];
      setPriceFiat(Math.ceil(price * responsePrice * 100) / 100);
    }, 1000),
    []
  );

  useEffect(() => {
    loadPriceAsync(priceXTZ);
  }, [priceXTZ]);

  return priceFiat;
}
