import React from 'react';
import PropTypes from 'prop-types';

export function FieldGroup({ title, children, renderTitle }) {
  return (
    <div className="flex flex-col">
      <FieldGroupTitle title={title} renderTitle={renderTitle} />
      {children}
    </div>
  );
}

FieldGroup.propTypes = {
  title: PropTypes.string,
  renderTitle: PropTypes.func,
};

export function FieldGroupTitle({ title, renderTitle, bottomGap = 'mb-4' }) {
  const titleClassName = `${bottomGap} text-blue-500 uppercase `;
  return renderTitle ? (
    renderTitle(titleClassName)
  ) : (
    <h3 className={titleClassName}>{title}</h3>
  );
}

FieldGroupTitle.propTypes = {
  bottomGap: PropTypes.string,
  title: PropTypes.string,
  renderTitle: PropTypes.func,
};
