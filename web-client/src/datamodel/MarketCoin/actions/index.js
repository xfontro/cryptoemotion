import { generateFetchTypes } from 'helpers/TypeHelper';
import Types from '../types';
import * as MarketCoinAPI from '../api';

export default {
  getCoins() {
    return {
      types: generateFetchTypes(Types.COINS_REQUEST),
      request: MarketCoinAPI.getCoins()
    };
  },
  getEmotions() {
    return {
      types: generateFetchTypes(Types.EMOTIONS_REQUEST),
      request: MarketCoinAPI.getEmotions()
    };
  }
};
