import PropTypes from 'prop-types';
import { useRef } from 'react';

import { useBoolean } from 'hooks/useBoolean';

import Dialog from '@shared/CardDialog';

import ApplyDialogForm from './ApplyDialogForm';
import NotLoggedIn from './NotLoggedIn';
import ApplyDialogSuccess from './ApplyDialogSuccess';

export default function ApplyDialog({
  onDismiss,
  gigId,
  address,
  isLoggedIn,
  gigTitle,
}) {
  const initialFocusRef = useRef();
  const [isSuccess, onSuccess] = useBoolean();

  return (
    <Dialog
      onDismiss={onDismiss}
      initialFocusRef={initialFocusRef}
      aria-label="Create gig application Dialog"
    >
      <Content
        isLoggedIn={address && isLoggedIn}
        isSuccess={isSuccess}
        onDismiss={onDismiss}
        gigTitle={gigTitle}
      >
        <ApplyDialogForm
          initialFocusRef={initialFocusRef}
          onDismiss={onDismiss}
          onSuccess={onSuccess}
          gigId={gigId}
          address={address}
        />
      </Content>
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

function Content({ children, isLoggedIn, isSuccess, onDismiss, gigTitle }) {
  if (isSuccess) {
    return <ApplyDialogSuccess onDismiss={onDismiss} gigTitle={gigTitle} />;
  }

  if (!isLoggedIn) {
    return <NotLoggedIn onDismiss={onDismiss} />;
  }

  return children;
}
