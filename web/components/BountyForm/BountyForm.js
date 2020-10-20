import React from 'react';
// import PropTypes from 'prop-types';

import { FieldGroup, FieldGroupTitle } from 'components/shared/FieldGroup';
import { FormField } from 'components/shared/FormField';
import { OptionsField } from 'components/shared/OptionsField';

import { BountyCategory } from './BountyCategory';

import halfCirclePaper from './half-circle-paper.svg';
import CategoryFrontend from './CategoryFrontend.svg';
import CategoryBackend from './CategoryBackend.svg';
import CategoryDesign from './CategoryDesign.svg';
import CategoryDocs from './CategoryDocs.svg';

const categories = [
  { title: 'Frontend', imgUrl: CategoryFrontend, id: 'frontend' },
  { title: 'Backend', imgUrl: CategoryBackend, id: 'backend' },
  { title: 'Design', imgUrl: CategoryDesign, id: 'design' },
  { title: 'Documentation', imgUrl: CategoryDocs, id: 'documentation' },
  { title: 'Other', id: 'other' },
];

export function BountyForm() {
  return (
    <form>
      <div className="bg-white ">
        <div className="mx-4 transform -translate-y-1/2 ">
          <img src={halfCirclePaper} />
        </div>
        <div className="p-10">
          <FieldGroup
            renderTitle={(className) => (
              <label htmlFor="url-input" className={className}>
                Issue Url
              </label>
            )}
          >
            <input className="border border-gray-500 rounded-none form-input " />
          </FieldGroup>
          <div className="my-6 border-t-2 border-blue-500 border-dashed" />
          <FieldGroup title="Issue Category">
            <p className="text-sm text-gray-500">
              Pick the most accurate categories for this issue to get the right
              contributors
            </p>
            <div className="flex mt-3 space-x-4">
              {categories.map((category) => (
                <BountyCategory {...category} key={category.title} />
              ))}
            </div>
          </FieldGroup>
        </div>
      </div>
      <div className="p-10 mt-2 space-y-6 bg-white">
        <FieldGroup title="Details">
          <div className="grid grid-cols-3 gap-3">
            <FormField title="Experience Level" fieldId="beginner-input">
              <OptionsField
                optionsName="experienceLevel"
                options={[
                  { value: 'beginner', title: 'Beginner' },
                  { value: 'medium', title: 'Medium' },
                  { value: 'pro', title: 'Pro' },
                ]}
              />
            </FormField>
            <FormField title="Time Commitment" fieldId="hours-input">
              <OptionsField
                optionsName="timeCommitment"
                options={[
                  { value: 'hours', title: 'Hours' },
                  { value: 'days', title: 'Days' },
                  { value: 'weeks', title: 'Weeks' },
                  { value: 'months', title: 'Months' },
                ]}
              />
            </FormField>
          </div>
        </FieldGroup>

        <FieldGroup title="Pricing">
          <div className="grid grid-cols-3 gap-3">
            <FormField title="Amount (XTZ)" fieldId="amount-input">
              <input
                type="number"
                className="w-full border border-gray-500 rounded-none form-input"
              />
            </FormField>
            <FormField title="USD $" fieldId="usd-input">
              <input
                type="number"
                className="w-full border border-gray-500 rounded-none form-input"
              />
            </FormField>
            <FormField title="Est. Hours of works" fieldId="est-hours-input">
              <input
                type="number"
                className="w-full border border-gray-500 rounded-none form-input"
              />
            </FormField>
          </div>
        </FieldGroup>
      </div>
      <div className="px-10 py-4 mt-2 bg-white">
        <FieldGroupTitle title="FEATURE YOUR BOUNTY" bottomGap="mb-2" />
        <p className="text-sm text-gray-500">
          Get more visibility and feature your bounty at the top of Issue
          Explorer - Coming soon!
        </p>
      </div>
      <div className="p-10 mt-2 bg-white">
        <FieldGroup title="Total">
          <div className="text-4xl font-bold text-blue-500">0.001 XTZ</div>
          <p className="text-xs text-green-600">
            Bounty 0.0010 ETH ($0.38) + 0 ETH Gitcoin Platform Fee
          </p>
        </FieldGroup>
        <div className="my-6 border-t-2 border-blue-500 border-dashed" />
        <label className="block">
          <input
            className="mr-2 text-green-600 border-gray-500 rounded-none form-checkbox"
            type="checkbox"
          />
          <span className="text-xs text-gray-600">
            I have read, understand, and agree to, the Terms of Service.
          </span>
        </label>
        <label className="block">
          <input
            className="mr-2 text-green-600 border-gray-500 rounded-none form-checkbox"
            type="checkbox"
          />
          <span className="text-xs text-gray-600 ">
            Payment Upon Completion. Upon delivery of work, I agree to pay the
            proposed amount to the fulfiller(s) if the submitted fulfillment
            meets the standards I have set forth.
          </span>
        </label>

        <button className="block w-1/3 h-10 mx-auto mt-10 text-white uppercase bg-blue-500 rounded-md">
          Fund Issue
        </button>
      </div>
    </form>
  );
}
