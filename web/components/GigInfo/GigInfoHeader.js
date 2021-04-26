import PropTypes from 'prop-types';
import classnames from 'classnames';
import { formatDistance, subDays } from 'date-fns';

import { useFiatPrice } from 'hooks/CurrencyContext';
import { useWalletContext } from 'hooks/WalletContext';
import { getLevelClassName } from 'lib/experienceLevel';
import ApplyButton from './ApplyButton';
import PayWorkButton from './PayWorkButton';

import { gigProps } from './props';
import styles from './gigInfo.module.css';

export default function Header({ gig, user, isFunder }) {
  const { fiatPrice, currencySymbol, isLoading: isLoadingPrice } = useFiatPrice(
    gig.fee
  );
  const { address } = useWalletContext();
  const hasApplied =
    user &&
    gig.applications.find(
      (application) => application.applicant.username === user.email
    );

  const currentWork = gig.applications.find(
    (application) => application.status === 'approved'
  );

  const isApplyButtonVisible = !isFunder && !hasApplied;

  return (
    <div className="lg:p-10 p-5">
      <div className="lg:flex-row flex flex-col items-start justify-between mb-6">
        <div className="flex items-center justify-start">
          <img src={gig.imageUrl} className="mr-5" width="100" height="100" />
          <h1 className="lg:text-xl text-gray-700">{gig.title}</h1>
        </div>
        <div className="relative w-40 h-10">
          <div
            className={classnames(
              'w-full h-full absolute -top-2 -right-2',
              getLevelClassName(gig.experienceLevel)
            )}
          ></div>
          <div
            className={classnames(
              'lg:text-xl px-8 py-1 border-2 border-blue-600 border-dashed text-blue-600 capitalize absolute',
              styles.gigLabel
            )}
          >
            {gig.experienceLevel}
          </div>
        </div>
      </div>
      <div className="lg:pl-32">
        <div className="flex justify-between mt-8 mb-10">
          <div>
            <div className="md:text-md flex justify-start mb-5 text-lg">
              <div className="cost tez-cost mr-4 font-bold text-blue-600">
                {gig.fee} <span className="currency">XTZ</span>
              </div>
              {!isLoadingPrice && (
                <div className="text-gray-500">
                  {fiatPrice}
                  <span className="ml-1">{currencySymbol}</span>
                </div>
              )}
            </div>
            <div>
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
          <Status status={gig.status} />
        </div>
        <div className="md:text-sm flex">
          <ApplyButton
            gigId={gig.id}
            address={address}
            isLoggedIn={!!user}
            isVisible={isApplyButtonVisible}
            gigTitle={gig.title}
          />

          {isFunder && gig.status === 'work' && (
            <PayWorkButton application={currentWork} gigId={gig.id} />
          )}

          {/* <button className=" md:px-8 lg:px-10 px-5 py-2 font-bold text-blue-600 transform rounded-md">
        Share
      </button> */}
        </div>
      </div>
    </div>
  );
}

Header.propTypes = {
  gig: gigProps,
  isFunder: PropTypes.bool,
  user: PropTypes.shape({
    email: PropTypes.string,
  }),
};

function Status({ status }) {
  return (
    <div className="right-section text-center">
      <div
        className={classnames('status w-5 h-5 mx-auto rounded-full', {
          'bg-green-800': status === 'work',
          'bg-gray-500': status === 'finished',
          'bg-red-700': status === 'canceled',
          'bg-yellow-500': status === 'pending',
          'bg-blue-500': status === 'pendingPayment',
        })}
      ></div>
      <div
        className={classnames('status-label mt-2 font-bold capitalize', {
          'text-green-800': status === 'work',
          'text-gray-500': status === 'finished',
          'text-red-700': status === 'canceled',
          'text-yellow-500': status === 'pending',
          'text-blue-500': status === 'pendingPayment',
        })}
      >
        {status}
      </div>
    </div>
  );
}
Status.propTypes = {
  status: PropTypes.string.isRequired,
};
