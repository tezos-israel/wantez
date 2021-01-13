import React from 'react';
import PropTypes from 'prop-types';

import { FilterOption } from './FilterOption';
import HeaderIcon from './filter-header-icon.svg';

const experienceLevelOptions = [
  { id: 'beginner', label: 'Beginner' },
  { id: 'medium', label: 'Medium' },
  { id: 'pro', label: 'Pro' },
];

const timeCommitmentOptions = [
  { id: 'hours', label: 'Hours' },
  { id: 'days', label: 'Days' },
  { id: 'weeks', label: 'Weeks' },
  { id: 'months', label: 'Months' },
];

export function Filter({ value, onChange }) {
  return (
    <div className="bg-gradient-to-b to-filtera from-filterb h-full p-10">
      <h2 className="flex mb-6 text-3xl font-bold text-teal-400 capitalize">
        <HeaderIcon alt="filter" aria-hidden="true" className="mr-3" />
        Filter
      </h2>
      <FilterOption
        title="Experience Level"
        options={experienceLevelOptions}
        value={value.experienceLevel}
        inputName="experienceLevel"
        onChange={(value) => handleChange('experienceLevel', value)}
      />
      <div className="my-6 border-t-2 border-white border-dashed" />
      <FilterOption
        title="Time commitment"
        options={timeCommitmentOptions}
        value={value.timeCommitment}
        inputName="timeCommitment"
        onChange={(value) => handleChange('timeCommitment', value)}
      />
      <div className="my-6 border-t-2 border-white border-dashed" />
    </div>
  );

  function handleChange(id, optionValue) {
    onChange({ ...value, [id]: optionValue });
  }
}

Filter.propTypes = {
  value: PropTypes.object.isRequired,
  onChange: PropTypes.func.isRequired,
};
