import '@babel/polyfill';
import React from 'react';
import { render } from 'react-dom';
import { Provider } from 'react-redux';
import { configureStore } from '@reduxjs/toolkit';
import App from './components/index.jsx'
import url from 'url';
import reducer, { fetchDataFromServer } from './slices';

export default () => {
  const store = configureStore({
    reducer,
  });

  const { query } = url.parse(window.location.href, true);
  const currentPage = query.page ? { currentPage: query.page } : null;
  store.dispatch(fetchDataFromServer(currentPage));

  render(
    <Provider store={store}>
      <App />
    </Provider>,
    document.getElementById('blog')
  );
};
