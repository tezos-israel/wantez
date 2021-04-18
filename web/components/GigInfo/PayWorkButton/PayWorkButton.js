import PropTypes from 'prop-types';

import { useBoolean } from 'hooks/useBoolean';
import { ConfirmButton } from '@shared/Dialogs/ConfirmDialog';

import PayWorkDialog from './PayWorkDialog';

export default function ApplyButton({ applicant, gigId, applicationId }) {
  const [isOpen, openDialog, closeDialog] = useBoolean();

  return (
    <>
      <ConfirmButton
        confirmMessage="Approving this will transfer the funds from the contract to the person currently working on this gig"
        className="px-5 py-1 font-bold text-blue-600 transform border-2 border-blue-600 rounded-md"
        onAnswer={(confirm) => confirm && openDialog()}
      >
        Pay work
      </ConfirmButton>
      {isOpen && <PayWorkDialog onDismiss={() => closeDialog()} />}
    </>
  );
}

ApplyButton.propTypes = {
  address: PropTypes.string,
  gigId: PropTypes.string.isRequired,
  gigTitle: PropTypes.string.isRequired,
  isLoggedIn: PropTypes.bool.isRequired,
  isVisible: PropTypes.bool.isRequired,
};
