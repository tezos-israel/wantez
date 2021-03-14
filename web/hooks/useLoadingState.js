import { useReducer } from 'react';

const STATE_TYPES = {
  LOADING: 'LOADING',
  FAILURE: 'FAILURE',
  SUCCESS: 'SUCCESS',
};

export default function useLoadingState() {
  const [{ isLoading, error }, dispatch] = useReducer(reducer, {
    isLoading: false,
    error: '',
  });

  return { isLoading, error, startLoading, success, failure };

  function reducer(state, { type, payload }) {
    switch (type) {
      case STATE_TYPES.LOADING:
        return { ...state, isLoading: true, error: '' };
      case STATE_TYPES.FAILURE:
        return { ...state, isLoading: false, error: payload };
      case STATE_TYPES.SUCCESS:
        return { ...state, isLoading: false, error: '' };
    }
  }

  function startLoading() {
    dispatch({ type: STATE_TYPES.LOADING });
  }

  function success() {
    dispatch({ type: STATE_TYPES.SUCCESS });
  }

  function failure(error) {
    dispatch({ type: STATE_TYPES.FAILURE, payload: error });
  }
}
