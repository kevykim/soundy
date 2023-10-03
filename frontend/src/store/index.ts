import { createStore, combineReducers, applyMiddleware, compose } from 'redux';
import thunk from 'redux-thunk';
import logger from 'redux-logger'
import sessionReducer from './session';
import songReducer from './songs';
import commentReducer from './comments';

const rootReducer = combineReducers({
  session : sessionReducer,
  songs : songReducer,
  comments : commentReducer,
});


let enhancer : any;

if (process.env.NODE_ENV === 'production') {
  enhancer = applyMiddleware(thunk);
} else {
  const composeEnhancers =
    (window as any).__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
  enhancer = composeEnhancers(applyMiddleware(thunk, logger));
}

const configureStore = (preloadedState? : any) => {
  return createStore(rootReducer, preloadedState, enhancer);
};

export default configureStore;

