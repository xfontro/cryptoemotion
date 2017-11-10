import { combineReducers } from 'redux';

import MarketCoin from './MarketCoin/reducers';
import Message from './Message/reducers';

export default combineReducers({ MarketCoin, Message, });
