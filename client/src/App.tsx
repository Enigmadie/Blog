import React from 'react';
import {
  BrowserRouter,
  Switch,
  Route,
} from 'react-router-dom';
import { useSelector } from 'react-redux';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

import { RootState } from 'slices';
import Posts from 'pages/Posts';
import Post from 'pages/Post/index';
import NewPostForm from 'pages/NewPostForm/index';
import LoginForm from 'pages/LoginForm';
import NoMatch from 'pages/NoMatch';
import Category from 'pages/Category';
import Header from 'components/Header';

toast.configure({
  position: 'top-right',
  autoClose: 15000,
  hideProgressBar: false,
  closeOnClick: true,
  pauseOnHover: true,
  draggable: true,
});

const App: React.FC = () => {
  const { fetchingState, isAdmin } = useSelector((state: RootState) => state);
  const isFetching = fetchingState.processing === true;
  const NewPostRoute = isAdmin.status ? NewPostForm : NoMatch;

  return (
    <BrowserRouter>
      <Header />
      {isFetching && (<div className="loader" />)}
      <main>
        <Switch>
          <Route path="/admin" component={LoginForm} />
          <Route path="/category/:name" component={Category} />
          <Route path="/posts/new" component={NewPostRoute} />
          <Route exact path="/post/:id" component={Post} />
          <Route path="/post/:id/edit" component={NewPostForm} />
          <Route exact path="/" component={Posts} />
          <Route component={NoMatch} />
        </Switch>
      </main>
    </BrowserRouter>
  );
};

export default App;
