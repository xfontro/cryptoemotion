const MessageModel = {
  error: null,
  fetching: false,
  message: null,
};

function setInitialState(initialState) {
  const state = initialState;

  if (!state || !state.Auth) {
    return { ...MessageModel, error: 'There was an error in MessageModel.' };
  }
  return state;
}

export { MessageModel, setInitialState };
