import React from 'react';
import ReactDOM from 'react-dom';

// import registerServiceWorker from './registerServiceWorker';
import { unregister } from './registerServiceWorker';


import './assets/base.css';
//import Main from './DemoPages/Main';
import App from './App';
import configureStore from './config/configureStore';
import { Provider } from 'react-redux';
const store = configureStore();
const rootElement = document.getElementById('root');

const renderApp = Component => {
  ReactDOM.render(
    /* <Provider store={store}>
      <HashRouter>
        <AuthProvider>
          <Component />
        </AuthProvider>
      </HashRouter>
  </Provider>,*/

    <Provider store={store}>

      <App />

    </Provider>,
    rootElement
  );
};

renderApp(App);

if (module.hot) {
  module.hot.accept('./App', () => {
    const NextApp = require('./App').default;
    renderApp(NextApp);
  });
}
unregister();

// registerServiceWorker();



