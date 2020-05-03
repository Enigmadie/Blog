import React from 'react';
import { BrowserRouter, Switch, Route, Link } from 'react-router-dom';
import { useSelector } from 'react-redux';

import Posts from './Posts.jsx';
import Post from './Post.jsx';
import NewPostForm from './NewPostForm';
import LoginForm from './LoginForm.jsx';

export default () => {
  const { fetchingState } = useSelector((state) => state);
  const isFetching = fetchingState === true;

  return (
    <BrowserRouter>
      <nav>
        <Link to="/">Blog</Link>
      </nav>
      <div className="menu">
        <p>Categories</p>
        <p>About</p>
        <p>Contact</p>
      </div>
      {isFetching
        ? (<div className="loader">Loading...</div>)
        : (
          <div className="blog-content">
            <Switch>
              <Route path="/admin" component={LoginForm} />
              <Route path="/posts/new" component={NewPostForm} />
              <Route exact path="/post/:id" component={Post} />
              <Route path="/post/:id/edit" component={NewPostForm} />
              <Route exact path="/" component={Posts} />
            </Switch>
          </div>
        )}
    </BrowserRouter>
  );
};
