import React from 'react';
import { render } from 'react-dom';
import { Provider } from 'react-redux';
import { configureStore } from '@reduxjs/toolkit';

import App from './components/index.jsx';
import './i18n';
import reducer, { fetchAdminData } from './slices';

export default () => {
  const store = configureStore({
    reducer,
  });

  store.dispatch(fetchAdminData());

  render(
    <Provider store={store}>
      <App />
    </Provider>,
    document.getElementById('blog'),
  );
};
