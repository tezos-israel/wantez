import { useReducer } from "react";
import { useContract } from "./use-contract";

const CONTRACT_ADDRESS = "KT19Z8rpDE1PZpArJWuHyvRCFeYssLGzMNQ2";
const types = {
  OPERAION_STARTED: "OPERAION_STARTED",
  OPERATION_FINISHED: "OPERATION_FINISHED",
  OPERATION_FAILED: "OPERATION_FAILED",
};

export function useBountiesContract() {
  const {
    contract,
    error,
    storage,
    loading,
    connect,
    increaseOperationsCount,
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
    issueBounty,
  };

  async function callMethod(cb) {
    if (!contract) {
      return;
    }
    dispatch({ type: types.OPERAION_STARTED });
    try {
      const op = await cb(contract.methods);
      await op.confirmation();
      increaseOperationsCount();
    } catch (error) {
      dispatch({ type: types.OPERATION_FAILED, error: error.message });
    }
    dispatch({ type: types.OPERAION_FINISHED });
  }

  function issueBounty(bounty) {
    callMethod((methods) =>
      methods
        .issueBounty(bounty.id, bounty.deadline)
        .send({ amount: bounty.fee })
    );
  }
}

function stateReducer(state, action) {
  switch (action.type) {
    case types.OPERAION_STARTED:
      return { ...state, loading: true };
    case types.OPERAION_FINISHED:
      return { ...state, loading: false };
    case types.OPERAION_FAILED:
      return { ...state, loading: false, error: action.error };
  }
}
