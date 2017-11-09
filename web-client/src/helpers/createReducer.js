export default function createReducer(actionHandler, initialState) {
  return (state = initialState, action) => {
    const handler = actionHandler[action.type];
    return handler ? handler(state, action) : state;
  };
}
