import PropTypes from 'prop-types';
import classnames from 'classnames';
import {
  AccordionItem,
  AccordionButton,
  AccordionPanel,
} from '@reach/accordion';
import { formatDistance, subDays } from 'date-fns';

import { AvatarImage } from '@shared/AvatarImage';

export default function GigApplicationsItem({
  application,
  isLast,
  currentUsername,
}) {
  return (
    <AccordionItem
      className={classnames(
        'application-item py-10 w-full focus:outline-none',
        {
          'border-b-2 border-gray-500 border-dashed ': !isLast,
        }
      )}
    >
      <AccordionButton className="focus:outline-none w-full">
        <div className="lg:flex-row lg:items-center flex flex-col justify-between">
          <div className="lg:w-1/3 flex items-center w-full">
            <AvatarImage
              email={application.applicant.username}
              className="item-image mr-6 rounded-full"
            />
            <div className="font-bold">{application.applicant.username}</div>
          </div>
          <div className="lg:justify-center lg:w-1/3 lg:my-0 flex items-center w-full my-3">
            <span
              className={classnames('item-status mr-4 w-3 h-3 rounded-full', {
                'bg-yellow-500': application.status === 'pending',
                'bg-green-500': application.status === 'approved',
                'bg-red-700': application.status === 'dismissed',
              })}
            ></span>
            <div className="">Application {application.status}</div>
          </div>
          <div className="lg:w-1/3 lg:text-right w-full text-left">
            {formatDistance(
              subDays(new Date(application.createdAt), 3),
              new Date()
            )}
            <span className="ml-1">ago</span>
          </div>
        </div>
      </AccordionButton>
      <AccordionPanel>
        <div className="md:text-sm lg:flex-row lg:py-10 lg:pl-20 flex flex-col items-end w-full px-5 py-5 mt-10 bg-gray-200">
          <div className="lg:w-2/3 lg:text-md w-full text-sm text-gray-600">
            {application.details}
          </div>
          <div className="md:px-10 lg:w-1/3 lg:px-20 lg:mt-0 flex flex-col w-full px-5 mt-5">
            {/* <button className="px-5 py-1 mb-3 font-bold text-white bg-blue-600 rounded-md">
          Approve
        </button>
        <button className=" px-5 py-1 font-bold text-blue-600 transform border-2 border-blue-600 rounded-md">
          Dismiss
        </button> */}
            {currentUsername === application.applicant.username && (
              <CancelApplicationButton />
            )}
          </div>
        </div>
      </AccordionPanel>
    </AccordionItem>
  );
}

GigApplicationsItem.propTypes = {
  application: PropTypes.shape({
    id: PropTypes.string,
    title: PropTypes.string,
    image: PropTypes.string,
    status: PropTypes.string,
    details: PropTypes.string,
    createdAt: PropTypes.string,
    applicant: PropTypes.shape({ username: PropTypes.string }),
  }).isRequired,
  isLast: PropTypes.bool,
  currentUsername: PropTypes.string,
};

function ConfirmButton({
  onClick,
  children,
  confirmMessage = 'Are you sure?',
}) {
  return (
    <button
      type="button"
      className="px-5 py-1 font-bold text-blue-600 transform border-2 border-blue-600 rounded-md"
      onClick={handleClick}
    >
      {children}
    </button>
  );

  async function handleClick(e) {
    if (await confirm(confirmMessage)) {
      onClick(e);
    }
  }
}

ConfirmButton.propTypes = {
  onClick: PropTypes.func.isRequired,
  confirmMessage: PropTypes.string,
};

function CancelApplicationButton() {
  return (
    <ConfirmButton
      confirmMessage="Are you sure you want to cancel this application?"
      className="px-5 py-1 font-bold text-blue-600 transform border-2 border-blue-600 rounded-md"
      onClick={() => {}}
    >
      Cancel
    </ConfirmButton>
  );
}
