import React from 'react';
import PropTypes from 'prop-types';

import { AvatarImage } from '../shared/AvatarImage';

function GigFunder({ funder }) {
  return (
    <div className="lg:p-10 p-5">
      <div className="applications-section">
        <h3 className="font-bold uppercase">founder</h3>
        <div className="funder-card lg:flex-row flex flex-col items-center mt-5 bg-gray-100">
          <div className="funder-img lg:mr-10 lg:border-r-2 lg:border-gray-500 lg:border-dashed px-10 py-5">
            <AvatarImage
              email={funder.username}
              className="lg:h-16 lg:w-16 height:20 ring-2 ring-white inline-block w-20 bg-gray-400 rounded-full"
            />
          </div>
          <div className="funder-info lg:w-3/4 lg:px-0 lg:border-r-2 lg:border-gray-500 lg:border-dashed max-w-full px-6 py-5">
            <div className="info-row text-lg">
              <div className="info-label font-bold">{funder.username}</div>
            </div>
            <div className="info-row flex text-sm">
              <div className="info-label mr-2 font-bold">Email:</div>
              <div className="info-value">{funder.username}</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
GigFunder.propTypes = {
  funder: PropTypes.object,
};

export default GigFunder;
