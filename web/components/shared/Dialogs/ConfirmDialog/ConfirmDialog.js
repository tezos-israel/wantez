import PropTypes from 'prop-types';
import { useState } from 'react';

import Dialog from '@shared/CardDialog';
import Button from '@shared/Button';

import BasicDialogLayout from '../BasicDialogLayout';

export default function ConfirmDialog({ message, onSubmit }) {
  return (
    <Dialog onDismiss={close} ariaLabel="Confirmation Dialog">
      <BasicDialogLayout
        header={message}
        buttonsLine={() => (
          <div className="flex space-x-5">
            <Button
              type="button"
              color="primary"
              onClick={() => onSubmit(true)}
            >
              Confirm
            </Button>
            <Button type="button" onClick={close}>
              Cancel
            </Button>
          </div>
        )}
      />
    </Dialog>
  );

  function close() {
    onSubmit(false);
  }
}

ConfirmDialog.propTypes = {
  message: PropTypes.string.isRequired,
  onSubmit: PropTypes.func.isRequired,
};

export function useConfirmation(message, callback) {
  const [isVisible, setVisible] = useState(false);

  return { open, ConfirmDialog: ConfirmDialogWrapper };

  function open() {
    setVisible(true);
  }

  function submit(answer) {
    setVisible(false);
    callback(answer);
  }

  function ConfirmDialogWrapper() {
    return isVisible && <ConfirmDialog onSubmit={submit} message={message} />;
  }
}
