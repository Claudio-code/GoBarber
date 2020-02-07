import React from 'react';
import { StatusBar } from 'react-native';
import { PersistGate } from 'redux-persist/integration/react'
import { Provider } from 'react-redux';

import App from './App';
import { persistor, store } from './store';

export default function index() {
  return (
    <Provider store={store}>
      <PersistGate persistor={persistor}>
        <StatusBar backgroundColor="#009688"  barStyle="light-content"/>
        <App />
      </PersistGate>
    </Provider>
  );
}
