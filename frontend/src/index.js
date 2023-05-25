import React from 'react';
import { createRoot } from 'react-dom/client';
import { unregister } from './registerServiceWorker';
import './assets/base.css';
import App from './App';
import configureStore from './config/configureStore';
import { Provider } from 'react-redux';
const store = configureStore();

const root = createRoot(
  document.getElementById('root')
);

root.render(
  <Provider store={store}>
    <App />
  </Provider>
);


if (module.hot) {
  module.hot.accept('./App', () => {
    const NextApp = require('./App').default;
    root.render(
      <Provider store={store}>
        <NextApp />
      </Provider>
    );
  });
}

unregister();
