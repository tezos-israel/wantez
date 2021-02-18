import PropTypes from 'prop-types';

import { useBoolean } from 'hooks/useBoolean';

import Button from '@shared/Button';

import ApplyDialog from './ApplyDialog';

export default function ApplyButton({ gigId, address }) {
  const [isOpen, openDialog, closeDialog] = useBoolean();

  return (
    <>
      <Button
        type="button"
        disabled={!address}
        onClick={openDialog}
        color="primary"
      >
        Express Interest
      </Button>

      {isOpen && (
        <ApplyDialog gigId={gigId} address={address} onDismiss={closeDialog} />
      )}
    </>
  );
}

ApplyButton.propTypes = {
  gigId: PropTypes.string.isRequired,
  address: PropTypes.string,
};
