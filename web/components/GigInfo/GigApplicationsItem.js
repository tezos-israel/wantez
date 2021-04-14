import PropTypes from 'prop-types';
import classnames from 'classnames';
import {
  AccordionItem,
  AccordionButton,
  AccordionPanel,
} from '@reach/accordion';
import { formatDistance, subDays } from 'date-fns';
import { useMutation } from '@apollo/client';

import {
  APPROVE_APPLICATION,
  RECONSIDER_APPLICATION,
  DISMISS_APPLICATION,
} from 'queries/applications';
import { useRouter } from 'next/router';

import CancelButton from './CancelButton';

import { AvatarImage } from '@shared/AvatarImage';

export default function GigApplicationsItem({
  application,
  isLast,
  isFunder,
  hasApprovedApplication,
  currentUsername,
  onCancel,
}) {
  const {
    handleApprove,
    handleDismiss,
    handleReconsider,
  } = useApplicationMutations(application.id);

  return (
    <AccordionItem
      className={classnames(
        'application-item py-10 w-full focus:outline-none',
        {
          'border-b-2 border-gray-500 border-dashed': !isLast,
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
          <div className="md:px-10 lg:w-1/3 2xl:px-30 lg:mt-0 flex flex-col w-full px-5 mt-5">
            <ApplicationButtons
              onCancel={onCancel}
              hasApprovedApplication={hasApprovedApplication}
              isApplicant={application.applicant.username === currentUsername}
              status={application.status}
              isFunder={isFunder}
              onApprove={handleApprove}
              onDismiss={handleDismiss}
              onReconsider={handleReconsider}
            />
          </div>
        </div>
      </AccordionPanel>
    </AccordionItem>
  );
}

GigApplicationsItem.propTypes = {
  application: PropTypes.shape({
    applicant: PropTypes.shape({
      username: PropTypes.string,
    }),
    createdAt: PropTypes.string,
    details: PropTypes.string,
    id: PropTypes.string,
    image: PropTypes.string,
    status: PropTypes.string,
    title: PropTypes.string,
  }).isRequired,
  currentUsername: PropTypes.string,
  hasApprovedApplication: PropTypes.bool.isRequired,
  isFunder: PropTypes.bool,
  isLast: PropTypes.bool,
  onCancel: PropTypes.func.isRequired,
};

function ApplicationButtons({
  onCancel,
  isApplicant,
  isFunder,
  hasApprovedApplication,
  status,
  onDismiss,
  onReconsider,
  onApprove,
}) {
  const isApproved = status === 'approved';
  const isDismissed = status === 'dismissed';

  if (isApplicant) {
    return <CancelButton onCancel={onCancel} />;
  }

  if (!isFunder) {
    return null;
  }

  if (isApproved || isDismissed) {
    return (
      <ApplicationButton onClick={onReconsider} opposite>
        Reconsider
      </ApplicationButton>
    );
  }

  if (hasApprovedApplication) {
    return null;
  }

  return (
    <>
      <ApplicationButton onClick={onApprove}>Approve</ApplicationButton>
      <ApplicationButton onClick={onDismiss} opposite>
        Dismiss
      </ApplicationButton>
    </>
  );
}

ApplicationButtons.propTypes = {
  hasApprovedApplication: PropTypes.bool.isRequired,
  isApplicant: PropTypes.bool.isRequired,
  isFunder: PropTypes.bool.isRequired,
  onApprove: PropTypes.func.isRequired,
  onCancel: PropTypes.func.isRequired,
  onDismiss: PropTypes.func.isRequired,
  onReconsider: PropTypes.func.isRequired,
  status: PropTypes.string.isRequired,
};

function ApplicationButton({ children, opposite, onClick }) {
  return (
    <button
      onClick={onClick}
      className={classnames(
        'px-5 py-1 mb-3 font-bold border-2 rounded-md',
        opposite ? 'text-blue-600 border-blue-600' : 'text-white bg-blue-600'
      )}
    >
      {children}
    </button>
  );
}

ApplicationButton.propTypes = {
  children: PropTypes.any,
  onClick: PropTypes.func.isRequired,
  opposite: PropTypes.bool,
};

function useApplicationMutations(applicationId) {
  const router = useRouter();
  const gigId = router.query.id;

  const requestContext = {
    context: {
      headers: {
        'x-hasura-role': 'funder',
      },
    },
  };

  const [approveApplication] = useMutation(APPROVE_APPLICATION, requestContext);
  const [dismissApplication] = useMutation(DISMISS_APPLICATION, requestContext);
  const [reconsiderApplication] = useMutation(
    RECONSIDER_APPLICATION,
    requestContext
  );

  return { handleApprove, handleDismiss, handleReconsider };

  function handleApprove() {
    approveApplication({ variables: { gigId, applicationId } });
  }

  function handleDismiss() {
    dismissApplication({ variables: { gigId, applicationId } });
  }

  function handleReconsider() {
    reconsiderApplication({ variables: { gigId, applicationId } });
  }
}
