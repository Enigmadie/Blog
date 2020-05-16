import * as React from 'react';
import {
  BrowserRouter,
  Switch,
  Route,
  Link,
} from 'react-router-dom';
import { useSelector } from 'react-redux';

import { RootState } from 'slices';
import Posts from './Posts';
import Post from './Post';
import NewPostForm from './NewPostForm/index';
import LoginForm from './LoginForm';
import NoMatch from './NoMatch';

const App: React.FC = () => {
  const { fetchingState } = useSelector((state: RootState) => state);
  const isFetching = fetchingState.processing === true;

  return (
    <BrowserRouter>
      <nav>
        <Link to="/">Blog</Link>
        <div className="menu">
          <p>Categories</p>
          <p>About</p>
          <p>Contact</p>
        </div>
      </nav>
      {isFetching && (<div className="loader">Loading...</div>)}
      <div className="blog-content">
        <Switch>
          <Route path="/admin" component={LoginForm} />
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
