import createReducer from 'helpers/createReducer';
import Types from '../types';
import { MessagesModel } from '../models';

function messageRequest(state) {
  return { ...state, fetching: true, error: null };
}

function messageError(state, action) {
  const { error } = action;
  const newState = { ...state, fetching: false };

  newState.error = { code: error.code, message: error.message || 'Server error' };

  return newState;
}

function messageSuccess(state, action) {
  const message = action.result.last_message;

  return {
    ...state,
    message,
    fetching: false,
  };
}

const actionHandlers = {
  [Types.MESSAGE_REQUEST]: messageRequest,
  [Types.MESSAGE_SUCCESS]: messageSuccess,
  [Types.MESSAGE_ERROR]: messageError,
};

export default createReducer(actionHandlers, { ...MessagesModel });
