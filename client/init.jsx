import '@babel/polyfill';
import React from 'react';
import { BrowserRouter, Route, Link } from 'react-router-dom';
import { render } from 'react-dom';
import { Provider } from 'react-redux';
import { createStore, compose, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';
import reducers from './reducers';
import url from 'url';
import Posts from './components/Posts.jsx';
import Post from './components/Post.jsx';
import NewPostForm from './components/NewPostForm';
import LoginForm from './components/LoginForm.jsx';
import * as actions from './actions';

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

  const { query } = url.parse(window.location.href, true);
  const currentPage = query.page ? { currentPage: query.page } : null;
  store.dispatch(actions.fetchDataFromServer(currentPage));

  render(
    <Provider store={store}>
      <BrowserRouter>
        <nav>
          <Link to='/'>Blog</Link>
        </nav>
        <div className='blog-content'>
          <Route path='/admin' component={LoginForm} />
          <Route path='/posts/new' component={NewPostForm} />
          <Route exact path='/post/:id' component={Post} />
          <Route path='/post/:id/edit' component={NewPostForm} />
          <Route exact path='/' component={Posts} />
        </div>
      </BrowserRouter>
    </Provider>,
    document.getElementById('blog')
  );
};
