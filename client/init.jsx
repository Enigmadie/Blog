import '@babel/polyfill';
import React from 'react';
import { BrowserRouter, Route, Link } from 'react-router-dom';
import { render } from 'react-dom';
import { Provider } from 'react-redux';
import { createStore, applyMiddleware } from 'redux';
import { composeWithDevTools } from 'redux-devtools-extension';
import thunk from 'redux-thunk';
import reducers from './reducers';
import url from 'url';
import Posts from './components/Posts.jsx';
import Post from './components/Post.jsx';
import NewPostForm from './components/NewPostForm';
import LoginForm from './components/LoginForm.jsx';
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
