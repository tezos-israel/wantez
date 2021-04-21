import PropTypes from 'prop-types';
import Spinner from 'react-loader-spinner';

import Dialog from '@shared/CardDialog';
import SuccessDialog from '@shared/Dialogs/SuccessDialog';

export default function PayWorkDialog({ onDismiss, isLoading, error }) {
  if (!isLoading && !error) {
    return (
      <SuccessDialog onDismiss={onDismiss} aria-label="Work approval success">
        <p>Work is paid</p>
      </SuccessDialog>
    );
  }

  return (
    <Dialog
      onDismiss={onDismiss}
      aria-label="Work approval Dialog"
      className="w-content"
    >
      {isLoading && (
        <Spinner type="TailSpin" color="#cacaca" height={30} width={30} />
      )}

      {error && (
        <div className="text-red-500">Failed approving work: {error}</div>
      )}
    </Dialog>
  );
}

PayWorkDialog.propTypes = {
  error: PropTypes.string,
  isLoading: PropTypes.bool,
  onDismiss: PropTypes.func.isRequired,
};
