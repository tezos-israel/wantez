import React from 'react';
import PropTypes from 'prop-types';
import { Accordion } from '@reach/accordion';

import '@reach/accordion/styles.css';

import GigApplicationsItem from './GigApplicationsItem';

function GigApplications({ applications, currentUsername }) {
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
              currentUsername={currentUsername}
            />
          ))}
        </Accordion>
      </div>
    </div>
  );
}

GigApplications.propTypes = {
  applications: PropTypes.array.isRequired,
  currentUsername: PropTypes.string,
};

export default GigApplications;
