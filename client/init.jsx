import '@babel/polyfill';
import React from 'react';
import { render } from 'react-dom';
import { Provider } from 'react-redux';
import { createStore, applyMiddleware } from 'redux';
import { composeWithDevTools } from 'redux-devtools-extension';
import thunk from 'redux-thunk';
import App from './components/index.jsx'
import reducers from './reducers';
import url from 'url';
import * as actions from './actions';

export default () => {
  const store = createStore(
    reducers,
    composeWithDevTools(
      applyMiddleware(thunk),
    )
  );

  const { query } = url.parse(window.location.href, true);
  const currentPage = query.page ? { currentPage: query.page } : null;
  store.dispatch(actions.fetchDataFromServer(currentPage));

  render(
    <Provider store={store}>
      <App />
    </Provider>,
    document.getElementById('blog')
  );
};
