import React from 'react';
// import PropTypes from 'prop-types';

import { BountyCategory } from './BountyCategory';

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
    <form className="p-10">
      <div className="flex flex-col">
        <h3 className="mb-8 text-blue-500 uppercase">Issue Url</h3>
        <input className="border border-solid border-grey-500 form-input " />
      </div>
      <div className="my-6 border-t-2 border-blue-500 border-dashed" />
      <div className="flex flex-col">
        <h3 className="mb-4 text-blue-500 uppercase">Issue Category</h3>
        <p className="text-sm text-gray-500">
          Pick the most accurate categories for this issue to get the right
          contributors
        </p>
        <div className="flex mt-3 space-x-4">
          {categories.map((category) => (
            <BountyCategory {...category} key={category.title} />
          ))}
        </div>
      </div>
    </form>
  );
}
