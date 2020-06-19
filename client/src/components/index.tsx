import React from 'react';
import {
  BrowserRouter,
  Switch,
  Route,
} from 'react-router-dom';
import { useSelector } from 'react-redux';

import { RootState } from 'slices';
import Posts from './Posts';
import Post from './Post';
import NewPostForm from './NewPostForm/index';
import LoginForm from './LoginForm';
import NoMatch from './NoMatch';
import Category from './Category';
import Header from './Header';

const App: React.FC = () => {
  const { fetchingState } = useSelector((state: RootState) => state);
  const isFetching = fetchingState.processing === true;

  return (
    <BrowserRouter>
      <Header />
      {isFetching && (<div className="loader">Loading...</div>)}
      <div className="blog-content">
        <Switch>
          <Route path="/admin" component={LoginForm} />
          <Route path="/category/:name" component={Category} />
          <Route path="/posts/new" component={NewPostForm} />
          <Route exact path="/post/:id" component={Post} />
          <Route path="/post/:id/edit" component={NewPostForm} />
          <Route exact path="/" component={Posts} />
          <Route component={NoMatch} />
        </Switch>
      </div>
    </BrowserRouter>
  );
};

export default App;
