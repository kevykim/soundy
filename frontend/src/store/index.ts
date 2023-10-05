import { createStore, combineReducers, applyMiddleware, compose } from 'redux';
import thunk from 'redux-thunk';
import logger from 'redux-logger'
import sessionReducer from './session';
import songReducer from './songs';
import commentReducer from './comments';
import playlistReducer from './playlists';
import albumReducer from './albums';
import artistReducer from './artists';

const rootReducer = combineReducers({
  session : sessionReducer,
  songs : songReducer,
  comments : commentReducer,
  playlists : playlistReducer,
  albums : albumReducer,
  artists : artistReducer,
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

