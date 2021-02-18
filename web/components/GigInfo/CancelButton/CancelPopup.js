import PropTypes from 'prop-types';

import Spinner from 'react-loader-spinner';
import { Dialog } from '@reach/dialog';

export default function CancelPopup({ isLoading, error, onDismiss }) {
  return (
    <Dialog
      onDismiss={onDismiss}
      aria-label="Create gig application Dialog"
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

      {!isLoading && !error && <div>Application was cancelled</div>}
    </Dialog>
  );
}

CancelPopup.propTypes = {
  isLoading: PropTypes.bool,
  error: PropTypes.string,
  onDismiss: PropTypes.func.isRequired,
};
