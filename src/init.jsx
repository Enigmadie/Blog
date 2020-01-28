import '@babel/polyfill';
import React from 'react';
import { BrowserRouter, Route, Link } from 'react-router-dom';
import { render } from 'react-dom';
import { Provider } from 'react-redux';
import { createStore, compose, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';
import reducers from './reducers';
import Posts from './components/Posts.jsx';
import Post from './components/Post.jsx';
import PostCreator from './components/PostCreator';
import LoginForm from './components/LoginForm.jsx';
import * as actions from './actions';

export default (gon) => {
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

  store.dispatch(actions.fetchDataFromServer());

  render(
    <Provider store={store}>
      <BrowserRouter>
        <nav>
          <Link to='/'>Blog</Link>
        </nav>
        <div className='blog-content'>
          <Route exact path='/' component={Posts} />
          <Route path='/admin' component={LoginForm} />
          <Route exact path='/new' component={PostCreator} />
          <Route path='/posts/:id' component={Post} />
          <Route path='/edit/:id' component={PostCreator} />
        </div>
      </BrowserRouter>
    </Provider>,
    document.getElementById('blog')
  );
};
