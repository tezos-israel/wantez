import PropTypes from 'prop-types';

import { ConfirmButton } from '@shared/Dialogs/ConfirmDialog';

export default function CancelButton({ onCancel }) {
  return (
    <ConfirmButton
      confirmMessage="Are you sure you want to cancel this application?"
      className="px-5 py-1 font-bold text-blue-600 transform border-2 border-blue-600 rounded-md"
      onAnswer={handleAnswer}
    >
      Cancel
    </ConfirmButton>
  );

  function handleAnswer(confirmation) {
    if (confirmation) {
      onCancel();
    }
  }
}

CancelButton.propTypes = {
  onCancel: PropTypes.func.isRequired,
};
