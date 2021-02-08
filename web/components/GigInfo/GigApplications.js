import React from 'react';
import {
  Accordion,
  AccordionItem,
  AccordionButton,
  AccordionPanel,
} from '@reach/accordion';
import '@reach/accordion/styles.css';
import { formatDistance, subDays } from 'date-fns';
import PropTypes from 'prop-types';
import classnames from 'classnames';

import { AvatarImage } from '../shared/AvatarImage';

function GigApplications({ applications }) {
  return (
    <div className="lg:p-10 p-5">
      <div className="applications-section">
        <h3 className="font-bold uppercase">Applications</h3>

        <div className="appplications-list md:text-sm">
          <Accordion>
            {applications.map((item, index) => (
              <AccordionItem
                className={classnames(
                  `application-item py-10 w-full focus:outline-none`,
                  {
                    'border-b-2 border-gray-500 border-dashed ':
                      index < applications.length - 1,
                  }
                )}
                key={index}
              >
                <AccordionButton className={`w-full focus:outline-none`}>
                  <div className="lg:flex-row lg:items-center flex flex-col justify-between">
                    <div className="lg:w-1/3 flex items-center w-full">
                      <AvatarImage
                        email={item.applicant ? item.applicant.username : ''}
                        className="item-image mr-6 rounded-full"
                      />
                      <div className="font-bold">
                        {item.applicant ? item.applicant.username : ''}
                      </div>
                    </div>
                    <div className="lg:justify-center lg:w-1/3 lg:my-0 flex items-center w-full my-3">
                      <span
                        className={classnames(
                          `item-status mr-4 w-3 h-3 rounded-full`,
                          {
                            'bg-yellow-500': item.status === 'pending',
                            'bg-green-500': item.status === 'approved',
                            'bg-red-700': item.status === 'dismissed',
                          }
                        )}
                      ></span>
                      <div className="">Applcation {item.status}</div>
                    </div>
                    <div className="lg:w-1/3 lg:text-right w-full text-left">
                      {formatDistance(
                        subDays(new Date(item.createdAt), 3),
                        new Date()
                      )}{' '}
                      ago
                    </div>
                  </div>
                </AccordionButton>
                <AccordionPanel>
                  <div className="md:text-sm lg:flex-row lg:py-10 lg:pl-20 flex flex-col items-end w-full px-5 py-5 mt-10 bg-gray-200">
                    <div className="lg:w-2/3 lg:text-md w-full text-sm text-gray-600">
                      {item.details}
                    </div>
                    <div className="md:px-10 lg:w-1/3 lg:px-20 lg:mt-0 flex flex-col w-full px-5 mt-5">
                      <button className="px-5 py-1 mb-3 font-bold text-white bg-blue-600 rounded-md">
                        Approve
                      </button>
                      <button className=" px-5 py-1 font-bold text-blue-600 transform border-2 border-blue-600 rounded-md">
                        Dismiss
                      </button>
                    </div>
                  </div>
                </AccordionPanel>
              </AccordionItem>
            ))}
          </Accordion>
        </div>
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
