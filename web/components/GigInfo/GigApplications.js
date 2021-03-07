import React from 'react';
import { Accordion } from '@reach/accordion';
import '@reach/accordion/styles.css';
import PropTypes from 'prop-types';

import GigApplicationsItem from './GigApplicationsItem';

function GigApplications({ applications }) {
  return (
    <div className="lg:p-10 p-5">
      <h3 className="font-bold uppercase">Applications</h3>

      <div className="md:text-sm">
        {!applications.length && (
          <div className="text-lg font-bold text-center text-gray-300">
            No one has applied yet
          </div>
        )}
        <Accordion>
          {applications.map((item, index) => (
            <GigApplicationsItem
              application={item}
              key={item.id}
              isLast={index === applications.length - 1}
            />
          ))}
        </Accordion>
      </div>
    </div>
  );
}

GigApplications.propTypes = {
  applications: PropTypes.arrayOf(
    PropTypes.shape({
      title: PropTypes.string,
      image: PropTypes.string,
      status: PropTypes.string,
      details: PropTypes.string,
      createdAt: PropTypes.string,
    })
  ).isRequired,
};

export default GigApplications;
