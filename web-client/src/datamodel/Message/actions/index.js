import { generateFetchTypes } from 'helpers/TypeHelper';
import Types from '../types';
import * as MessageAPI from '../api';

export default {
  getMessage() {
    return {
      types: generateFetchTypes(Types.MESSAGE_REQUEST),
      request: MessageAPI.getMessage()
    };
  }
};
