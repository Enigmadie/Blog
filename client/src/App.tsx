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
import SignUp from 'pages/LoginForm/SignUp';
import LogIn from 'pages/LoginForm/LogIn';
import NoMatch from 'pages/NoMatch';
import Category from 'pages/Category';
import Profile from 'pages/Profile';
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
  const { fetchingState, profile } = useSelector((state: RootState) => state);
  const isFetching = fetchingState.processing === true;
  const NewPostRoute = profile.isAdmin ? NewPostForm : NoMatch;

  return (
    <BrowserRouter>
      <Header />
      {isFetching && (<div className="loader" />)}
      <main>
        <Switch>
          <Route path="/signup" component={SignUp} />
          <Route path="/login" component={LogIn} />
          <Route path="/category/:name" component={Category} />
          <Route path="/posts/new" component={NewPostRoute} />
          <Route exact path="/post/:id" component={Post} />
          <Route path="/post/:id/edit" component={NewPostForm} />
          <Route path="/profile/:login" component={Profile} />
          <Route exact path="/" component={Posts} />
          <Route component={NoMatch} />
        </Switch>
      </main>
    </BrowserRouter>
  );
};

export default App;
