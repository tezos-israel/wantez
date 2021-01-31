import { HalfCirclePaper } from '../../components/shared/HalfCirclePaper';
import { formatDistance, subDays } from 'date-fns';
import PropTypes from 'prop-types';

import GigApplications from './GigApplications.js';
import GigFounder from './GigFounder.js';
import GigDescription from './GigDescription.js';
import Divider from '../shared/Divider.js';
import classnames from 'classnames';
import { usePrice } from '../../hooks/usePrice';

import styles from './gigInfo.module.css';

export function GigInfo({ gigData }) {
  const priceFiat = usePrice(gigData.tezCost, 'ils');
  return (
    <form className="relative">
      <div
        className={classnames(
          `absolute z-0 w-full overflow-hidden bg-white`,
          styles.bgHalfCirclePaper
        )}
      >
        <HalfCirclePaper />
      </div>

      <div
        className={classnames(
          `md:px-10 lg:px-20 xs:px-4 relative z-10 px-1 bg-white`,
          styles.gigContent
        )}
      >
        <HalfCirclePaper />
        <div className="lg:p-10 p-5">
          <div className="space-y-5"></div>
          <div className="gig-header lg:flex-row flex flex-col items-start justify-between mb-6">
            <div className="gig-title flex items-center justify-start">
              <img
                src={gigData.image}
                className="gig-image mr-5 rounded-full"
                width="100"
              />
              <h1 className="lg:text-xl text-gray-700">{gigData.title}</h1>
            </div>
            <div className="gig-label lg:text-xl h-auto px-8 py-1 mt-5 text-blue-600 border-2 border-blue-600 border-dashed">
              Beginner
            </div>
          </div>
          <div className="lg:pl-30">
            <div className="gig-details flex justify-between mt-8 mb-10">
              <div className="left-section">
                <div className="gig-costs md:text-md flex justify-start mb-5 text-lg">
                  <div className="cost tez-cost mr-4 font-bold text-blue-600">
                    {gigData.tezCost} <span className="currency">XTZ</span>
                  </div>
                  <div className="cost text-gray-500">
                    {priceFiat} <span className="currency">ILS ₪</span>
                  </div>
                </div>
                <div className="gig-info">
                  <ul className="info-list md:text-sm lg:flex-row flex flex-col justify-between text-gray-500">
                    <li className="md:pr-3 md:mr-3 lg:border-r lg:border-black pr-5 mr-5">
                      <label className="mr-1 text-gray-800">Opened:</label>
                      {formatDistance(
                        subDays(new Date(gigData.createdDate), 3),
                        new Date()
                      )}
                      ago
                    </li>
                    <li className="md:pr-3 md:mr-3 lg:border-r lg:border-black lg:my-0 pr-5 my-2 mr-5">
                      <label className="mr-1 text-gray-800">Gig Type:</label>
                      {gigData.type}
                    </li>
                    <li className="mr-5">
                      <label className="mr-1 text-gray-800">
                        Time Commitment:
                      </label>
                      {gigData.time_commitment}
                    </li>
                  </ul>
                </div>
              </div>
              <div className="right-section text-center">
                <div
                  className={classnames(`status w-5 h-5 mx-auto rounded-full`, {
                    'bg-green-800': gigData.status === 'open',
                    'bg-gray-800': gigData.status !== 'open',
                  })}
                ></div>
                <div
                  className={classnames(
                    `status-label mt-2 font-bold capitalize `,
                    {
                      'text-green-800': gigData.status === 'open',
                      'text-gray-800': gigData.status !== 'open',
                    }
                  )}
                >
                  {gigData.status}
                </div>
              </div>
            </div>
            <div className="gig-actions md:text-sm flex">
              <button className="md:px-8 lg:px-10 px-5 py-2 mr-4 font-bold text-white bg-blue-600 rounded-md">
                Express intrest
              </button>
              <button className=" md:px-8 lg:px-10 px-5 py-2 font-bold text-blue-600 transform rounded-md">
                Share
              </button>
            </div>
          </div>
        </div>

        <Divider className="border-blue-600 border-dashed" />

        <GigDescription description={gigData.description} />

        <Divider className="border-blue-600 border-dashed" />

        <GigApplications applications={gigData.applications} />

        <Divider className="border-gray-400 border-dashed" />

        <GigFounder founder={gigData.founder} />
      </div>
    </form>
  );
}
GigInfo.propTypes = {
  gigData: PropTypes.object,
};
