import React from 'react';
import ReactMarkdown from 'react-markdown';
import PropTypes from 'prop-types';

function GigDescription({ description }) {
  return (
    <div className="lg:p-10 p-5">
      <div className="description-section">
        <h3 className="font-bold uppercase">description</h3>
        <div className="desription-body mt-4">
          <ReactMarkdown>{description}</ReactMarkdown>
        </div>
      </div>
    </div>
  );
}

GigDescription.propTypes = {
  description: PropTypes.string,
};

export default GigDescription;
