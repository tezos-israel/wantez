import PropTypes from 'prop-types';
import { useRef } from 'react';

import { useBoolean } from 'hooks/useBoolean';

import Dialog from '@shared/CardDialog';
import SuccessDialog from '@shared/Dialogs/SuccessDialog';
import NotLoggedInDialog from '@shared/Dialogs/NotLoggedInDialog';

import ApplyDialogForm from './ApplyDialogForm';

export default function ApplyDialog({
  onDismiss,
  gigId,
  address,
  isLoggedIn,
  gigTitle,
}) {
  const initialFocusRef = useRef();
  const [isSuccess, onSuccess] = useBoolean();

  if (isSuccess) {
    return <ApplyDialogSuccess onDismiss={onDismiss} gigTitle={gigTitle} />;
  }

  if (!isLoggedIn || !address) {
    return <NotLoggedInDialog onDismiss={onDismiss} />;
  }

  return (
    <Dialog
      onDismiss={onDismiss}
      initialFocusRef={initialFocusRef}
      aria-label="Create gig application Dialog"
    >
      <ApplyDialogForm
        initialFocusRef={initialFocusRef}
        onDismiss={onDismiss}
        onSuccess={onSuccess}
        gigId={gigId}
        address={address}
      />
    </Dialog>
  );
}

ApplyDialog.propTypes = {
  address: PropTypes.string,
  gigId: PropTypes.string.isRequired,
  gigTitle: PropTypes.string.isRequired,
  isLoggedIn: PropTypes.bool.isRequired,
  onDismiss: PropTypes.func.isRequired,
};


export function ApplyDialogSuccess({ onDismiss, gigTitle }) {
  return (
    <SuccessDialog onDismiss={onDismiss} aria-label="Application success">
      <p>
        You just applied to work on <br />
        <span className="font-bold text-blue-500">{`"${gigTitle}"`}</span>
      </p>
    </SuccessDialog>
  );
}

ApplyDialogSuccess.propTypes = {
  gigTitle: PropTypes.string.isRequired,
  onDismiss: PropTypes.func.isRequired,
};
