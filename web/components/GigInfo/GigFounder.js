import React from 'react';
import PropTypes from 'prop-types';

function GigFounder({ founder }) {
  return (
    <div className="lg:p-10 p-5">
      <div className="applications-section">
        <h3 className="font-bold uppercase">founder</h3>
        <div className="founder-card lg:flex-row flex flex-col items-center mt-5 bg-gray-100">
          <div className="founder-img lg:mr-10 lg:border-r-2 lg:border-gray-500 lg:border-dashed px-10 py-5">
            <img
              className="lg:h-16 lg:w-16 height:20 ring-2 ring-white inline-block w-20 bg-gray-400 rounded-full"
              src={founder.image}
              alt="Founder's avatar"
            />
          </div>
          <div className="founder-info lg:w-3/4 lg:px-0 lg:border-r-2 lg:border-gray-500 lg:border-dashed max-w-full px-6 py-5">
            <div className="info-row text-lg">
              <div className="info-label font-bold">{founder.name}</div>
            </div>
            <div className="info-row lg:flex-row flex flex-col my-1 text-sm">
              <div className="info-label mr-2 font-bold">Founder:</div>
              <div className="info-value whitespace-nowrap  max-w-full overflow-hidden">
                {founder.hash_key}
              </div>
            </div>
            <div className="info-row flex text-sm">
              <div className="info-label mr-2 font-bold">Email:</div>
              <div className="info-value">{founder.email}</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

GigFounder.propTypes = {
  founder: PropTypes.object,
};

export default GigFounder;
