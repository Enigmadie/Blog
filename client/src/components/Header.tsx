import React, { useState, useEffect } from 'react';
import cn from 'classnames';
import { useSelector, useDispatch } from 'react-redux';
import { Link } from 'react-router-dom';

import { Categories } from 'interfaces';
import { RootState, actions } from 'slices';
import CategoriesColl from './CategoriesSelect';

const Header: React.FC = () => {
  const isLarge = window.innerWidth >= 1020;

  const [isCloseMenu, setCloseMenu] = useState(false);
  const [isLargeSize, setLargeSizeState] = useState(isLarge);
  const [subMenu, setSubMenuState] = useState(false);
  const [subMenuEl, setSubMenuEl] = useState('');

  const { profile } = useSelector((state: RootState) => state);
  const hasLogin = profile.login.length > 0;

  const { logoutProfile } = actions;
  const dispatch = useDispatch();

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
    'nav-open': isCloseMenu && !isLargeSize,
    'nav-s': isCloseMenu && !isLargeSize,
    'sub-menu-open': subMenu && !isLargeSize,
  });

  const categoriesCn = cn({
    'categories-menu': isLargeSize,
    link: !isLargeSize,
  });

  const profileCn = cn({
    'profile-menu': isLargeSize,
    link: !isLargeSize,
  });

  const categoriesDropCn = cn({
    'categories-drop-menu': isLargeSize && subMenu,
    'drop-menu': !isLargeSize && !subMenu && !isCloseMenu,
    'sub-menu': !isLargeSize && subMenu && isCloseMenu,
  });

  const profileDropCn = cn({
    'profile-drop-menu': isLargeSize && subMenu,
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

  const subHandler = (state: boolean, el: string): void => {
    if (isLargeSize) {
      setSubMenuState(state);
    }
    setSubMenuEl(el);
  };

  const menuHandler = (): void => {
    setCloseMenu(!isCloseMenu);
    setSubMenuState(false);
  };

  const logoutHandler = (): void => {
    localStorage.setItem('authorization', '');
    dispatch(logoutProfile());
  };

  return (
    <header>
      <Link to="/">Blog</Link>
      <nav className={navCn}>
        <button type="button" className={smallMenuCn} onClick={(): void => menuHandler()}>
          <div className="line line__1" />
          <div className="line line__2" />
          <div className="line line__3" />
        </button>
        <button type="button" className="sub-menu-btn" onClick={(): void => setSubMenuState(false)}>
          <div className="line line__1" />
          <div className="line line__2" />
        </button>
        <ul className={menuCn}>
          <li
            onFocus={(): void => subHandler(true, 'categories')}
            onClick={(): void => setSubMenuState(true)}
            onMouseOver={(): void => subHandler(true, 'categories')}
            onMouseOut={(): void => subHandler(false, 'categories')}
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
          {hasLogin ? (
            <>
              <li
                onFocus={(): void => subHandler(true, 'profile')}
                onClick={(): void => setSubMenuState(true)}
                onMouseOver={(): void => subHandler(true, 'profile')}
                onMouseOut={(): void => subHandler(false, 'profile')}
                className={profileCn}
              >
                <a className="login-header">
                  {isLarge && <img alt="login-img" src="https://img.icons8.com/ultraviolet/28/000000/user.png" />}
                  <p>{profile.login}</p>
                </a>
              </li>
              <li className={liCn} />
            </>
          ) : (
            <>
              <li className={liCn}>
                <Link to="/signup">Sign up</Link>
              </li>
              <li className={liCn}>
                <Link to="/login">Log In</Link>
              </li>
            </>
          )}
        </ul>
        {subMenuEl === 'categories' && (
          <div className={categoriesDropCn}>
            <ol
              onFocus={(): void => subHandler(true, 'categories')}
              onMouseOver={(): void => subHandler(true, 'categories')}
              onMouseOut={(): void => subHandler(false, 'categories')}
              onClick={(): void => subHandler(false, 'categories')}
            >
              {CategoriesColl.map(({ value }: Categories) => {
                const categoryHref = `/category/${value}`;
                return (
                  <li key={value} className={dropLiCn}>
                    <Link to={categoryHref}>{value}</Link>
                  </li>
                );
              })}
            </ol>
          </div>
        )}
        {subMenuEl === 'profile' && (
          <div className={profileDropCn}>
            <ol
              onFocus={(): void => subHandler(true, 'profile')}
              onMouseOver={(): void => subHandler(true, 'profile')}
              onMouseOut={(): void => subHandler(false, 'profile')}
              onClick={(): void => subHandler(false, 'profile')}
            >
              {profile.isAdmin === true && (
                <li className={dropLiCn}>
                  <Link to="posts/new" className="new-post-header">New post</Link>
                </li>
              )}
              <li className={dropLiCn}>
                <Link to={`profile/${profile.login}`}>Profile</Link>
              </li>
              <li className={dropLiCn}>
                <button type="button" onClick={logoutHandler}>Log Out</button>
              </li>
            </ol>
          </div>
        )}
      </nav>
    </header>
  );
};

export default Header;
