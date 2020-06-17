import React, { useState, useEffect } from 'react';
import {
  BrowserRouter,
  Switch,
  Route,
  Link,
} from 'react-router-dom';
import { useSelector } from 'react-redux';
import cn from 'classnames';

import { RootState } from 'slices';
import { Categories } from 'interfaces';
import Posts from './Posts';
import Post from './Post';
import NewPostForm from './NewPostForm/index';
import LoginForm from './LoginForm';
import NoMatch from './NoMatch';
import Category from './Category';
import CategoriesColl from './CategoriesSelect';

const App: React.FC = () => {
  const isLarge = window.innerWidth >= 1020;
  const { fetchingState } = useSelector((state: RootState) => state);
  const isFetching = fetchingState.processing === true;
  const [isCloseMenu, setCloseMenu] = useState(false);
  const [isLargeSize, setLargeSizeState] = useState(isLarge);
  const [subMenu, setSubMenuState] = useState(false);

  const smallMenuCn = cn({
    'menu-btn': true,
    close: isCloseMenu,
  });

  const liCn = cn({
    link: !isLargeSize,
  });

  const menuCn = cn({
    menu: isLargeSize,
    'nav-links': !isLargeSize && isCloseMenu,
    'nav-close': !isCloseMenu,
  });

  const navCn = cn({
    'nav-open': isCloseMenu,
    'nav-s': isCloseMenu,
    'sub-menu-open': subMenu && !isLargeSize,
  });

  const categoriesCn = cn({
    'categories-menu': isLargeSize,
    link: !isLargeSize,
  });

  const categoriesDropCn = cn({
    'categories-drop-menu': isLargeSize && subMenu,
    'drop-menu': !isLargeSize && !subMenu && !isCloseMenu,
    'sub-menu': !isLargeSize && subMenu && isCloseMenu,
  });

  const dropLiCn = cn({
    'on-menu': !isLargeSize && subMenu,
  });


  useEffect(() => {
    window.addEventListener('resize', () => {
      if (window.innerWidth <= 1020) {
        setLargeSizeState(false);
      } else {
        setLargeSizeState(true);
      }
    });
  }, []);

  const subHandler = (state: boolean): void => {
    if (isLargeSize) {
      setSubMenuState(state);
    }
  };

  const menuHandler = (): void => {
    setCloseMenu(!isCloseMenu);
    setSubMenuState(false);
  };

  return (
    <BrowserRouter>
      <header>
        <Link to="/">Blog</Link>
        <nav className={navCn}>
          <div className={smallMenuCn} onClick={() => menuHandler()}>
            <div className="line line__1" />
            <div className="line line__2" />
            <div className="line line__3" />
          </div>
          <div className="sub-menu-btn" onClick={() => setSubMenuState(false)}>
            <div className="line line__1" />
            <div className="line line__2" />
          </div>
          <ul className={menuCn}>
            <li
              onFocus={(): void => subHandler(true)}
              onClick={(): void => setSubMenuState(true)}
              onMouseOver={(): void => subHandler(true)}
              onMouseOut={(): void => subHandler(false)}
              className={categoriesCn}
              >
                Categories
            </li>
            <li className={liCn}>
              <Link to="/about">About</Link>
            </li>
            <li className={liCn}>
              <Link to="/contact">Contact</Link>
            </li>
          </ul>
          <div className={categoriesDropCn}>
            <ol
              onFocus={(): void => subHandler(true)}
              onMouseOver={(): void => subHandler(true)}
              onMouseOut={(): void => subHandler(false)}
            >
              {CategoriesColl.map(({ value }: Categories) => {
                const categoryHref = `/category/${value}`;
                return (
                  <li className={dropLiCn}>
                    <Link to={categoryHref}>{value}</Link>
                  </li>
                );
              })}
            </ol>
          </div>
        </nav>
      </header>
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
