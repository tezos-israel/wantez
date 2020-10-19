import React from 'react';
import PropTypes from 'prop-types';

export function FieldGroup({ title, children, renderTitle }) {
  const titleClassName = 'mb-4 text-blue-500 uppercase';
  const titleComponent = renderTitle ? (
    renderTitle(titleClassName)
  ) : (
    <h3 className={titleClassName}>{title}</h3>
  );

  return (
    <div className="flex flex-col">
      {titleComponent}
      {children}
    </div>
  );
}

FieldGroup.propTypes = {
  title: PropTypes.string,
  renderTitle: PropTypes.func,
};
