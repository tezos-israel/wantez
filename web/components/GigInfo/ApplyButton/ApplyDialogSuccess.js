import PropTypes from 'prop-types';
import BasicDialog from './BasicDialog';
import Button from '@shared/Button';

import SuccessImg from './success.svg';

export default function ApplyDialogSuccess({ gigTitle, onDismiss }) {
  return (
    <BasicDialog
      header={() => <SuccessImg />}
      buttonsLine={() => (
        <Button
          size="small"
          color="primary"
          onClick={onDismiss}
          className="mt-5"
        >
          OK
        </Button>
      )}
    >
      <p>
        You just applied to work on <br />
        <span className="font-bold text-blue-500">&quot;{gigTitle}&quot;</span>
      </p>
    </BasicDialog>
  );
}

ApplyDialogSuccess.propTypes = {
  gigTitle: PropTypes.string.isRequired,
  onDismiss: PropTypes.func.isRequired,
};
