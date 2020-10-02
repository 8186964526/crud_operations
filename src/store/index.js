import { createStore, compose, applyMiddleware  } from 'redux';
import thunk from 'redux-thunk';
import { persistStore , persistReducer} from 'redux-persist'; //
import storage from 'redux-persist/lib/storage' ;// defaults to localStorage for web and AsyncStorage for react-native

 import appReducer from '../reducers';

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

const persistConfig = {
  key: 'root',
  storage,
}

const persistedReducer = persistReducer(persistConfig , appReducer) //reducers

export const store = createStore(
    persistedReducer,
    composeEnhancers(
      applyMiddleware(thunk)
    )
);

export const persistor = persistStore(store)
