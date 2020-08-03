import { useReducer } from "react";
import { useContract } from "./use-contract";

const CONTRACT_ADDRESS = "KT19Z8rpDE1PZpArJWuHyvRCFeYssLGzMNQ2";
const types = {
  OPERATION_STARTED: "OPERATION_STARTED",
  OPERATION_FINISHED: "OPERATION_FINISHED",
  OPERATION_FAILED: "OPERATION_FAILED",
  CLEAR_ERROR: "CLEAR_ERROR",
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
    issueBounty,
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
        error: error.message || "Failed",
      });
      throw error;
    }
  }

  function clearErrors() {
    dispatch({ type: types.CLEAR_ERROR });
    clearContractError();
  }

  function issueBounty(bounty) {
    return callMethod(
      async (methods) =>
        await methods
          .issueBounty(bounty.id, bounty.deadline)
          .send({ amount: bounty.fee })
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
