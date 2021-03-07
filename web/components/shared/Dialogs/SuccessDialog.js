import PropTypes from 'prop-types';

import CardDialog from '@shared/CardDialog';
import Button from '@shared/Button';

import SuccessDialogIcon from './SuccessDialogIcon.svg';

import BasicDialogLayout from './BasicDialogLayout';

export default function SuccessDialog({ onDismiss, children, ...props }) {
  return (
    <CardDialog onDismiss={onDismiss} {...props}>
      <BasicDialogLayout
        header={<SuccessDialogIcon />}
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
        {children}
      </BasicDialogLayout>
    </CardDialog>
  );
}

SuccessDialog.propTypes = {
  onDismiss: PropTypes.func.isRequired,
};
