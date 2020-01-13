import '@babel/polyfill';
import React from 'react';
import { render } from 'react-dom';
import { Provider } from 'react-redux';
import { createStore, compose, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';
import reducers from './reducers';
import App from './components/App.jsx';

export default () => {
  /* eslint-disable no-underscore-dangle */
  const ext = window.__REDUX_DEVTOOLS_EXTENSION__;
  const devtoolMiddleware = ext && ext();
  /* eslint-enable */

  const store = createStore(
    reducers,
    compose(
      applyMiddleware(thunk),
      devtoolMiddleware,
    )
  );

  render(
    <Provider store={store}>
      <App />
    </Provider>,
    document.getElementById('blog')
  );
};
