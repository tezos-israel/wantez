import { useState } from 'react';
import PropTypes from 'prop-types';

import { FieldGroup } from 'components/shared/FieldGroup';
import { FormField } from 'components/shared/FormField';

import { IssueCategory } from './IssueCategory';

import CategoryFrontend from './CategoryFrontend.svg';
import CategoryBackend from './CategoryBackend.svg';
import CategoryDesign from './CategoryDesign.svg';
import CategoryDocs from './CategoryDocs.svg';

const categories = [
  { title: 'Frontend', icon: CategoryFrontend, id: 'frontend' },
  { title: 'Backend', icon: CategoryBackend, id: 'backend' },
  { title: 'Design', icon: CategoryDesign, id: 'design' },
  { title: 'Documentation', icon: CategoryDocs, id: 'documentation' },
  { title: 'Other', id: 'other' },
];
const ids = categories.map((c) => c.id);

export function CategoriesField({
  onChange,
  onBlur,
  onFocus = () => {},
  value,
  error,
}) {
  const [focused, setFocused] = useState(
    Object.fromEntries(ids.map((id) => [id, false]))
  );

  return (
    <FieldGroup title="Issue Category">
      <p className="text-sm text-gray-500">
        Pick the most accurate categories for this issue to get the right
        contributors
      </p>
      <FormField error={error}>
        <div className="flex mt-3 space-x-4">
          {categories.map((category) => (
            <IssueCategory
              {...category}
              key={category.id}
              onChange={onChange}
              onBlur={handleItemBlur}
              onFocus={handleItemFocus}
              value={value}
            />
          ))}
        </div>
      </FormField>
    </FieldGroup>
  );

  function handleItemBlur(e, id) {
    const newFocused = Object.assign({}, focused, { [id]: false });
    setFocused(newFocused);

    const isBlurred = ids.every((id) => !newFocused[id]);

    if (isBlurred) {
      onBlur(e);
    }
  }

  function handleItemFocus(e, id) {
    setFocused(Object.assign({}, focused, { [id]: true }));
    setFocused((focused) => Object.assign({}, focused, { [id]: true }));
    onFocus(e);
  }
}

CategoriesField.propTypes = {
  onChange: PropTypes.func.isRequired,
  onBlur: PropTypes.func.isRequired,
  onFocus: PropTypes.func,
  value: PropTypes.any.isRequired,
  error: PropTypes.string.isRequired,
};
