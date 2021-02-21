import PropTypes from 'prop-types';

import { useBoolean } from 'hooks/useBoolean';

import Button from '@shared/Button';

import ApplyDialog from './ApplyDialog';

export default function ApplyButton({ gigId, address, isLoggedIn }) {
  const [isOpen, openDialog, closeDialog] = useBoolean();

  return (
    <>
      <Button type="button" onClick={openDialog} color="primary">
        Express Interest
      </Button>

      {isOpen && (
        <ApplyDialog
          gigId={gigId}
          address={address}
          onDismiss={closeDialog}
          isLoggedIn={isLoggedIn}
        />
      )}
    </>
  );
}

ApplyButton.propTypes = {
  address: PropTypes.string,
  gigId: PropTypes.string.isRequired,
  isLoggedIn: PropTypes.bool.isRequired,
};
