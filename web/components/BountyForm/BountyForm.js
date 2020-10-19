import React from 'react';
// import PropTypes from 'prop-types';

import { FieldGroup } from 'components/shared/FieldGroup';

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
            <input className="border border-solid border-grey-500 form-input " />
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
      <div className="p-10 mt-2 bg-white">
        <FieldGroup title="Details"></FieldGroup>

        <FieldGroup title="PricingF"></FieldGroup>
      </div>
    </form>
  );
}
