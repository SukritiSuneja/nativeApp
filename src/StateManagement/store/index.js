import {createStore, applyMiddleware} from 'redux';
import reduxThunk from 'redux-thunk';
import axios from 'axios';
import axiosMiddleware from 'redux-axios-middleware';
import {persistStore, persistReducer} from 'redux-persist';
import storage from 'redux-persist/lib/storage'; // defaults to localStorage for web and AsyncStorage for react-native
import config from '../../config';
import reducers from '../reducers';
import logger from 'redux-logger';
import createSagaMiddleware from 'redux-saga';
import rootSaga from '../sagas';

/**
 * Create Axios Client to communicate
 */
const axiosClient = axios.create({
  baseURL: config.apiUrl,
  responseType: 'json',
});

// Store instance
export let store = null;
export let persistor = null;

const persistConfig = {
  key: 'root',
  storage,
  whitelist: [
  ],
  timeout: 20000,
  debug: __DEV__,
};

const sagaMiddleware = createSagaMiddleware();

const persistedReducer = persistReducer(persistConfig, reducers);

/**
 * Create the Redux store
 */

export const configureStore = () => {
  store = createStore(
    persistedReducer,
    applyMiddleware(
      reduxThunk,
      axiosMiddleware(axiosClient),
      logger,
      sagaMiddleware,
    ),
  );

  persistor = persistStore(store, null, () => {
    // console.log({ name: 'Persisited state', value: store.getState() });
  });

  sagaMiddleware.run(rootSaga);
  return {store, persistor};
};

/**
 * Get store
 */
export const getStore = () => store;

/**
 * Get persistor
 */
export const getPersistor = () => persistor;

/**
 * Dispatch an action
 */
export const dispatch = (...args) => store.dispatch(...args);

export default {
  dispatch,
  getStore,
  configureStore,
};
