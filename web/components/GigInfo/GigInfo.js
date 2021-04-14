import { formatDistance, subDays } from 'date-fns';
import PropTypes from 'prop-types';
import classnames from 'classnames';

import { usePrice } from 'hooks/usePrice';
import { useAuthContext } from 'hooks/AuthContext';
import { useWalletContext } from 'hooks/WalletContext';
import { getLevelClassName } from 'lib/experienceLevel';

import Divider from '@shared/Divider';
import { HalfCirclePaper } from '@shared/HalfCirclePaper';

import Card from '../shared/Card';

import GigApplications from './GigApplications';
import GigFunder from './GigFunder';
import GigDescription from './GigDescription';
import GigTags from './GigTags';
import ApplyButton from './ApplyButton';

import styles from './gigInfo.module.css';

export function GigInfo({ gig }) {
  const priceFiat = usePrice(gig.fee, 'ils');
  const { user } = useAuthContext();
  const { address } = useWalletContext();

  const hasApplied =
    user &&
    gig.applications.find(
      (application) => application.applicant.username === user.email
    );

  const isFunder = !!user && gig.funder.username === user.email;

  const isApplyButtonVisible = !isFunder && !hasApplied;

  return (
    <div className="relative">
      <div
        className={classnames(
          'absolute w-full overflow-hidden bg-white',
          styles.bgHalfCirclePaper
        )}
      >
        <HalfCirclePaper />
      </div>

      <Card className={styles.gigContent}>
        <div className="md:px-10 lg:px-20">
          <div className="lg:p-10 p-5">
            <div className="space-y-5"></div>
            <div className="gig-header lg:flex-row flex flex-col items-start justify-between mb-6">
              <div className="gig-title flex items-center justify-start">
                <img
                  src={gig.imageUrl}
                  className="gig-image mr-5"
                  width="100"
                  height="100"
                />
                <h1 className="lg:text-xl text-gray-700">{gig.title}</h1>
              </div>
              <div
                className={classnames(
                  'gig-label lg:text-xl w-50 h-10 px-8 py-1 mt-5 border-2 border-blue-600 border-dashed text-blue-600 capitalize relative',
                  styles.gigLabel
                )}
              >
                <div
                  className={classnames(
                    'w-full h-full absolute -z-1 -top-2 -right-2 py-3',
                    getLevelClassName(gig.experienceLevel)
                  )}
                ></div>
                {gig.experienceLevel}
              </div>
            </div>
            <div className="lg:pl-30">
              <div className="gig-details flex justify-between mt-8 mb-10">
                <div className="left-section">
                  <div className="gig-costs md:text-md flex justify-start mb-5 text-lg">
                    <div className="cost tez-cost mr-4 font-bold text-blue-600">
                      {gig.fee} <span className="currency">XTZ</span>
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
                          subDays(new Date(gig.createdAt), 3),
                          new Date()
                        )}
                        <span className="ml-1">ago</span>
                      </li>
                      <li className="md:pr-3 md:mr-3 lg:border-r lg:border-black lg:my-0 pr-5 my-2 mr-5">
                        <label className="mr-1 text-gray-800">Gig Type:</label>
                        {gig.categories.map((item, index) => {
                          return <span key={index}>{item.category}</span>;
                        })}
                      </li>
                      {/* <li className="mr-5">
                      <label className="mr-1 text-gray-800">
                        Time Commitment:
                      </label>
                      {gig.timeCommitment}
                    </li> */}
                    </ul>
                  </div>
                </div>
                <div className="right-section text-center">
                  <div
                    className={classnames(
                      'status w-5 h-5 mx-auto rounded-full',
                      {
                        'bg-green-800': gig.status === 'work',
                        'bg-gray-500': gig.status === 'finished',
                        'bg-red-700': gig.status === 'canceled',
                        'bg-yellow-500': gig.status === 'pending',
                        'bg-blue-500': gig.status === 'pendingPayment',
                      }
                    )}
                  ></div>
                  <div
                    className={classnames(
                      'status-label mt-2 font-bold capitalize',
                      {
                        'text-green-800': gig.status === 'work',
                        'text-gray-500': gig.status === 'finished',
                        'text-red-700': gig.status === 'canceled',
                        'text-yellow-500': gig.status === 'pending',
                        'text-blue-500': gig.status === 'pendingPayment',
                      }
                    )}
                  >
                    {gig.status}
                  </div>
                </div>
              </div>
              <div className="gig-actions md:text-sm flex">
                {
                  <ApplyButton
                    gigId={gig.id}
                    address={address}
                    isLoggedIn={!!user}
                    isVisible={isApplyButtonVisible}
                    gigTitle={gig.title}
                  />
                }
                {/* <button className=" md:px-8 lg:px-10 px-5 py-2 font-bold text-blue-600 transform rounded-md">
                  Share
                </button> */}
              </div>
            </div>
          </div>

          <Divider className="border-blue-600 border-dashed" />

          <GigDescription description={gig.description} />

          <GigTags tags={gig.gig_tags} />

          <Divider className="border-blue-600 border-dashed" />

          <GigApplications
            isFunder={isFunder}
            applications={gig.applications}
            currentUsername={user && user.email}
          />

          <Divider className="border-gray-400 border-dashed" />

          <GigFunder funder={gig.funder} />
        </div>
      </Card>
    </div>
  );
}

GigInfo.propTypes = {
  gig: PropTypes.shape({
    id: PropTypes.string,
    applications: PropTypes.arrayOf(
      PropTypes.shape({
        id: PropTypes.string.isRequired,
        createdAt: PropTypes.string.isRequired,
        status: PropTypes.string.isRequired,
        paymentAddress: PropTypes.string.isRequired,
        details: PropTypes.string.isRequired,
        applicant: PropTypes.shape({
          username: PropTypes.string,
        }),
      })
    ),
    categories: PropTypes.array,
    createdAt: PropTypes.string,
    description: PropTypes.string,
    experienceLevel: PropTypes.string,
    fee: PropTypes.number,
    funder: PropTypes.shape({
      username: PropTypes.string,
    }),
    imageUrl: PropTypes.string,
    status: PropTypes.string,
    title: PropTypes.string,
    gig_tags: PropTypes.array,
  }),
};
