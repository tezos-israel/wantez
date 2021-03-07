import PropTypes from 'prop-types';

import { useConfirmation } from './ConfirmDialog';

export default function ConfirmButton({
  onAnswer,
  children,
  confirmMessage = 'Are you sure?',
}) {
  const { open, ConfirmDialog } = useConfirmation(confirmMessage, onAnswer);

  return (
    <>
      <button
        type="button"
        className="px-5 py-1 font-bold text-blue-600 transform border-2 border-blue-600 rounded-md"
        onClick={open}
      >
        {children}
      </button>

      <ConfirmDialog />
    </>
  );
}

ConfirmButton.propTypes = {
  onAnswer: PropTypes.func.isRequired,
  confirmMessage: PropTypes.string,
};
