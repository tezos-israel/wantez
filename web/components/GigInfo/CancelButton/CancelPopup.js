import PropTypes from 'prop-types';

import Spinner from 'react-loader-spinner';
import { Dialog } from '@reach/dialog';

import SuccessDialog from '@shared/Dialogs/SuccessDialog';

export default function CancelPopup({ isLoading, error, onDismiss }) {
  if (!isLoading && !error) {
    return (
      <SuccessDialog
        onDismiss={onDismiss}
        aria-label="Application cancel success"
      >
        <p>Your application was cancelled</p>
      </SuccessDialog>
    );
  }

  return (
    <Dialog
      onDismiss={onDismiss}
      aria-label="Cancel gig application Dialog"
      className="w-content"
    >
      {isLoading && (
        <Spinner type="TailSpin" color="#cacaca" height={30} width={30} />
      )}

      {error && (
        <div className="text-red-500">
          Failed canceling application: {error}
        </div>
      )}
    </Dialog>
  );
}

CancelPopup.propTypes = {
  isLoading: PropTypes.bool,
  error: PropTypes.string,
  onDismiss: PropTypes.func.isRequired,
};
