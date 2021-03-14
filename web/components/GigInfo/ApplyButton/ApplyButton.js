import PropTypes from 'prop-types';

import { useBoolean } from 'hooks/useBoolean';

import Button from '@shared/Button';

import ApplyDialog from './ApplyDialog';

export default function ApplyButton({
  gigTitle,
  gigId,
  address,
  isLoggedIn,
  isVisible,
}) {
  const [isOpen, openDialog, closeDialog] = useBoolean();

  return (
    <>
      {isVisible && (
        <Button type="button" onClick={openDialog} color="primary">
          Express Interest
        </Button>
      )}

      {isOpen && (
        <ApplyDialog
          gigId={gigId}
          gigTitle={gigTitle}
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
  gigTitle: PropTypes.string.isRequired,
  isLoggedIn: PropTypes.bool.isRequired,
  isVisible: PropTypes.bool.isRequired,
};
