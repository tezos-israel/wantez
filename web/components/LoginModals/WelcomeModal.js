import PropTypes from 'prop-types';

import Dialog from '@reach/dialog';

export default function WelcomeModal({ isOpen, onDismiss, firstName }) {
  return (
    <Dialog
      isOpen={isOpen}
      onDismiss={onDismiss}
      aria-label="Welcome Dialog"
      className="w-content"
    >
      Welcome {firstName}
    </Dialog>
  );
}

WelcomeModal.propTypes = {
  isOpen: PropTypes.bool.isRequired,
  onDismiss: PropTypes.func.isRequired,
  firstName: PropTypes.string.isRequired,
};
