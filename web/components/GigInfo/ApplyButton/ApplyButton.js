// import {useState} from 'react'

import { useBoolean } from 'hooks/useBoolean';

import Button from '@shared/Button';

import ApplyDialog from './ApplyDialog';

export default function ApplyButton({ gigId, address }) {
  const [isOpen, openDialog, closeDialog] = useBoolean(false);
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
