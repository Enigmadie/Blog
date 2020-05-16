import * as React from 'react';
import { render } from 'react-dom';
import { Provider } from 'react-redux';
import { configureStore, Action } from '@reduxjs/toolkit';
import { ThunkAction } from 'redux-thunk';

import './assets/application.sass';
import 'core-js/stable';
import 'regenerator-runtime/runtime';

import App from 'components';
import './i18n';
import reducer, { asyncActions, RootState } from 'slices';

function init(): void {
  const store = configureStore({
    reducer,
  });

  store.dispatch(asyncActions.fetchAdminData());

  render(
    <Provider store={store}>
      <App />
    </Provider>,
    document.getElementById('blog'),
  );
}

export type AppThunk = ThunkAction<void, RootState, null, Action<string>>

init();
