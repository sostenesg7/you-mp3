import React, { Component } from 'react';
import { Provider } from 'react-redux';
import configureStore from './src/stores/configureStore';
import { PersistGate } from 'redux-persist/integration/react';
import { Provider as PaperProvider } from 'react-native-paper';

import AppRoot from './src/AppRoot';

const { persistor, store } = configureStore();

class App extends Component {
  render() {
    return (
      <Provider store={store}>
        <PersistGate persistor={persistor}>
          <PaperProvider>
            <AppRoot />
          </PaperProvider>
        </PersistGate>
      </Provider>
    );
  }
}

export default App;
