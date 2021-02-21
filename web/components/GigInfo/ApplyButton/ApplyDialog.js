import PropTypes from 'prop-types';
import Dialog from '@reach/dialog';
import { useRef } from 'react';

import Card from '@shared/Card';

import ApplyDialogForm from './ApplyDialogForm';
import NotLoggedIn from './NotLoggedIn';

export default function ApplyDialog({ onDismiss, gigId, address, isLoggedIn }) {
  const initialFocusRef = useRef();

  return (
    <Dialog
      onDismiss={onDismiss}
      initialFocusRef={initialFocusRef}
      aria-label="Create gig application Dialog"
      className="w-content px-0 pt-0"
    >
      <Card>
        {address && isLoggedIn ? (
          <ApplyDialogForm
            initialFocusRef={initialFocusRef}
            onDismiss={onDismiss}
            onSuccess={onDismiss}
            gigId={gigId}
            address={address}
          />
        ) : (
          <NotLoggedIn onDismiss={onDismiss} />
        )}
      </Card>
    </Dialog>
  );
}

ApplyDialog.propTypes = {
  address: PropTypes.string,
  gigId: PropTypes.string.isRequired,
  isLoggedIn: PropTypes.bool.isRequired,
  onDismiss: PropTypes.func.isRequired,
};
