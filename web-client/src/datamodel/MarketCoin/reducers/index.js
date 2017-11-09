import createReducer from 'helpers/createReducer';
import Types from '../types';
import { MarketCoinModel } from '../models';
import { ACCEPTED_COINS, COIN_CHARTS } from 'staticdata';

function emotionsRequest(state) {
  return { ...state, fetchingEmotions: true, error: null };
}

function emotionsError(state, action) {
  const { error } = action;
  const newState = { ...state, fetchingEmotions: false };

  newState.error = { code: error.code, message: error.message || 'Server error' };

  return newState;
}

function emotionsSuccess(state, action) {
  const emotions = action.result.list_cryptos
    .filter(c => ACCEPTED_COINS.includes(c.symbol));

  const coins = state.coins.map((coin) => {
    const newEmotion = emotions.find(emotion => emotion.symbol === coin.symbol);

    if (newEmotion) {
      const { name, sentiment_score, symbol, ...emotion } = newEmotion;

      return {
        ...coin,
        emotion: {
          ...emotion,
          sentimentScore: Math.floor((sentiment_score + 1.0) * 10 / 2) ,
        },
      }
    }

    return { ...coin };
  });

  return {
    ...state,
    coins,
    fetchingEmotions: false,
  };
}

function coinsRequest(state) {
  return { ...state, fetchingCoins: true, error: null };
}

function coinsError(state, action) {
  const { error } = action;
  const newState = { ...state, fetchingCoins: false };

  newState.error = { code: error.code, message: error.message || 'Server error' };

  return newState;
}

function coinsSuccess(state, action) {
  const coins = action.result
    .filter(coin => ACCEPTED_COINS.includes(coin.symbol.toLowerCase()))
    .map(coin =>
      ({
        volumeUsd24h: parseFloat(coin['24h_volume_usd']),
        availableSupply: parseFloat(coin.available_supply),
        id: coin.id,
        lastUpdated: new Date(parseInt(coin.last_updated, 10)*1000),
        marketCapUsd: parseInt(coin.market_cap_usd, 10),
        maxSupply: parseFloat(coin.max_supply),
        name: coin.name,
        percentChange1h: parseFloat(coin.percent_change_1h),
        percentChange7d: parseFloat(coin.percent_change_7d),
        percentChange24h: parseFloat(coin.percent_change_24h),
        priceBtc: parseFloat(coin.price_btc),
        priceUsd: parseFloat(coin.price_usd),
        rank: coin.rank,
        symbol: coin.symbol.toLowerCase(),
        totalSupply: parseFloat(coin.total_supply),
        chart: COIN_CHARTS[coin.id],
      })
  );

  return {
    ...state,
    coins,
    fetchingCoins: false,
  };
}

const actionHandlers = {
  [Types.COINS_REQUEST]: coinsRequest,
  [Types.COINS_SUCCESS]: coinsSuccess,
  [Types.COINS_ERROR]: coinsError,
  [Types.EMOTIONS_REQUEST]: emotionsRequest,
  [Types.EMOTIONS_SUCCESS]: emotionsSuccess,
  [Types.EMOTIONS_ERROR]: emotionsError,
};

export default createReducer(actionHandlers, { ...MarketCoinModel });
