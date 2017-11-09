const MarketCoinModel = {
  error: null,
  fetchingCoins: false,
  fetchingEmotions: false,
  coins: [],
};

function setInitialState(initialState) {
  const state = initialState;

  if (!state || !state.Auth) {
    return { ...MarketCoinModel, error: 'There was an error in MarketCoinModel.' };
  }
  return state;
}

export { MarketCoinModel, setInitialState };
