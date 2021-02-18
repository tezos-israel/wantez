import PropTypes from 'prop-types';

export default function CancelButton({ onCancel }) {
  return (
    <>
      <ConfirmButton
        confirmMessage="Are you sure you want to cancel this application?"
        className="px-5 py-1 font-bold text-blue-600 transform border-2 border-blue-600 rounded-md"
        onConfirm={onCancel}
      >
        Cancel
      </ConfirmButton>
    </>
  );
}

CancelButton.propTypes = {
  onCancel: PropTypes.func.isRequired,
};

function ConfirmButton({
  onConfirm,
  children,
  confirmMessage = 'Are you sure?',
}) {
  return (
    <button
      type="button"
      className="px-5 py-1 font-bold text-blue-600 transform border-2 border-blue-600 rounded-md"
      onClick={handleClick}
    >
      {children}
    </button>
  );

  async function handleClick(e) {
    if (await confirm(confirmMessage)) {
      onConfirm(e);
    }
  }
}

ConfirmButton.propTypes = {
  onConfirm: PropTypes.func.isRequired,
  confirmMessage: PropTypes.string,
};
