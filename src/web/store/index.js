import { createStore, applyMiddleware } from 'redux';
import reducer from './rootReducer';
import { createLogger } from 'redux-logger';
import { composeWithDevTools } from 'redux-devtools-extension';

function configureState() {
  const middleware = [];
  if (process.env.NODE_ENV === 'development') {
    middleware.push(createLogger({ collapsed: true }));
  }
  let store;
  if (process.env.NODE_ENV === 'development') {
    store = createStore(
      reducer,
      composeWithDevTools(applyMiddleware(...middleware))
    );
  } else {
    store = createStore(reducer, applyMiddleware(...middleware));
  }

  return {
    ...store,
  };
}

export const store = configureState();
