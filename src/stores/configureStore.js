import { createStore, applyMiddleware } from 'redux';
import { composeWithDevTools } from 'redux-devtools-extension';
import { persistStore, persistReducer, createTransform } from 'redux-persist';
import { multiClientMiddleware } from 'redux-axios-middleware';
import { AsyncStorage } from 'react-native';
import thunkMiddleware from 'redux-thunk';
import { name as appName } from '../../app.json';
import clients from './ApiClients';
import appReducer from '../reducers';
import { omit } from 'lodash';

//TODO: COLOCAR O RESTO DAS KEYS AQUI
const blackListKeys = {};

const transform = createTransform((state, key) => {
  if (blackListKeys[key]) {
    return omit(state, blackListKeys[key]);
  }
  return state;
});

const persistConfig = {
  key: 'root',
  blacklist: ['youtube'],
  whitelist: ['history', 'settings'],
  keyPrefix: appName,
  storage: AsyncStorage,
  transforms: [transform],
  debug: false
};

const middlewares = [
  thunkMiddleware,
  multiClientMiddleware(clients, {
    interceptors: {
      response: [
        ({ getState, dispatch, getSourceAction }, req) => {
          /* Coloca o Authorization com Token em todos os clients do axios */
          //getState().auth.token;
          /*  if (req.data.token) {
            Object.values(clients).forEach(c => {
              c.client.defaults.headers.common[
                'Authorization'
              ] = `Bearer ${req.data.token}`;
            });
          } */

          return req;
        }
      ]
    }
  })
];

const rootReducer = (state, action) => {
  /* if (action.type === 'AUTH_LOGOUT') {
    state = undefined;
  } */
  return appReducer(state, action);
};

const persistedReducer = persistReducer(persistConfig, rootReducer);

const store = createStore(
  persistedReducer,
  composeWithDevTools(applyMiddleware(...middlewares))
);
const persistor = persistStore(store);

export default () => ({ store, persistor });
