import PropTypes from 'prop-types';
import { useState } from 'react';
import { useMutation } from '@apollo/client';

import { PAY_WORK } from 'queries/gigs';

import { useBoolean } from 'hooks/useBoolean';
import { useGigsContractContext } from 'hooks/GigsContractContext';
import { ConfirmButton } from '@shared/Dialogs/ConfirmDialog';

import PayWorkDialog from './PayWorkDialog';

export default function PayWorkButton({ application, gigId }) {
  const [isOpen, openDialog, closeDialog] = useBoolean();
  const { payWork, isLoading, error } = usePayWork();

  return (
    <>
      <ConfirmButton
        confirmMessage="Approving this will transfer the funds from the contract to the person currently working on this gig"
        className="px-5 py-1 font-bold text-blue-600 transform border-2 border-blue-600 rounded-md"
        onAnswer={handleConfirmAnswer}
      >
        Pay work
      </ConfirmButton>
      {isOpen && (
        <PayWorkDialog
          onDismiss={() => closeDialog()}
          isLoading={isLoading}
          error={error}
        />
      )}
    </>
  );

  function handleConfirmAnswer(confirmed) {
    if (!confirmed) {
      return;
    }

    openDialog();
    payWork(gigId, application.paymentAddress);
  }
}

PayWorkButton.propTypes = {
  application: PropTypes.shape({ paymentAddress: PropTypes.string }).isRequired,
  gigId: PropTypes.string.isRequired,
};

function usePayWork() {
  const { payWork } = useGigsContractContext();
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');
  const [finishGig] = useMutation(PAY_WORK);

  return {
    isLoading,
    error,
    async payWork(gigId, paymentAddress) {
      try {
        setIsLoading(true);
        await payWork(gigId, paymentAddress);
        await finishGig({ variables: { gigId } });
      } catch (e) {
        setError(e.message);
      }
      setIsLoading(false);
    },
  };
}
