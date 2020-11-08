import { useReducer } from 'react';
import { useContract } from './use-contract';

const CONTRACT_ADDRESS = 'KT1JLDYeV6VYN6imHmEbSnpYuoz8xZ8DMew9';
const types = {
  OPERATION_STARTED: 'OPERATION_STARTED',
  OPERATION_FINISHED: 'OPERATION_FINISHED',
  OPERATION_FAILED: 'OPERATION_FAILED',
  CLEAR_ERROR: 'CLEAR_ERROR',
};

export function useBountiesContract() {
  const {
    contract,
    error,
    storage,
    loading,
    connect,
    increaseOperationsCount,
    clearError: clearContractError,
  } = useContract(CONTRACT_ADDRESS);

  const [operationState, dispatch] = useReducer(stateReducer, {
    loading: false,
    error: null,
  });

  return {
    operationState,
    contractState: { error, loading },
    bounties: storage,
    connect,
    clearErrors,
    fundIssue,
    refundWantez,
    approveApplication,
  };

  async function callMethod(cb) {
    if (!contract) {
      return;
    }
    dispatch({ type: types.OPERATION_STARTED });
    try {
      const op = await cb(contract.methods);
      await op.confirmation();
      increaseOperationsCount();
      dispatch({ type: types.OPERATION_FINISHED });
    } catch (error) {
      dispatch({
        type: types.OPERATION_FAILED,
        error: error.message || 'Failed',
      });
      throw error;
    }
  }

  function clearErrors() {
    dispatch({ type: types.CLEAR_ERROR });
    clearContractError();
  }

  function fundIssue(wantez) {
    return callMethod(
      async (methods) =>
        await methods
          .issueBounty(wantez.id, wantez.deadline)
          .send({ amount: wantez.fee })
    );
  }

  function refundWantez({ id }) {
    return callMethod(async (methods) => await methods.refundBounty(id).send());
  }

  function approveApplication(wantezId, paymentAddress) {
    return callMethod(
      async (methods) =>
        await methods.approveApplication(paymentAddress, wantezId).send()
    );
  }
}

function stateReducer(state, action) {
  switch (action.type) {
    case types.OPERATION_STARTED:
      return { ...state, loading: true };
    case types.OPERATION_FINISHED:
      return { ...state, loading: false };
    case types.OPERATION_FAILED:
      return { ...state, loading: false, error: action.error };
    case types.CLEAR_ERROR:
      return { ...state, error: null };
  }
}
