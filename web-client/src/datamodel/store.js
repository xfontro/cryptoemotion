import { applyMiddleware, createStore, compose } from 'redux';
import requestMiddleware from 'middlewares/request-middleware';
import reducers from './reducers';
import * as models from '../datamodel';

function setGlobalState(initialState) {
  return models.default.modelIndex.map(model => model.setInitialState(initialState));
}

function getComposer() {
  if (typeof window === 'undefined') return compose;
  return window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
}

function configureStore(initialState) {
  
  const middleware = applyMiddleware(requestMiddleware);
  const composeEnhancer = getComposer();
  const enhancer = composeEnhancer(middleware);
  const store = createStore(reducers, initialState, enhancer);

  return store;
}

export { configureStore, setGlobalState, };
