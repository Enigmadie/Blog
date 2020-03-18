import React from 'react';
import { BrowserRouter, Route, Link } from 'react-router-dom';
import Posts from './Posts.jsx';
import Post from './Post.jsx';
import NewPostForm from './NewPostForm';
import LoginForm from './LoginForm.jsx';

export default () => (
  <BrowserRouter>
    <nav>
      <Link to='/'>Blog</Link>
    </nav>
    <div className='menu'>
      <p>Categories</p>
      <p>About</p>
      <p>Contact</p>
    </div>
    <div className='blog-content'>
      <Route path='/admin' component={LoginForm} />
      <Route path='/posts/new' component={NewPostForm} />
      <Route exact path='/post/:id' component={Post} />
      <Route path='/post/:id/edit' component={NewPostForm} />
      <Route exact path='/' component={Posts} />
    </div>
  </BrowserRouter>
);
