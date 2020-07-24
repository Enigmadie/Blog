import React, { useState, useEffect } from 'react';
import cn from 'classnames';
import { useSelector } from 'react-redux';
import { Link } from 'react-router-dom';

import { Categories } from 'interfaces';
import { RootState } from 'slices';
import CategoriesColl from './CategoriesSelect';

const Header: React.FC = () => {
  const isLarge = window.innerWidth >= 1020;
  const [isCloseMenu, setCloseMenu] = useState(false);
  const [isLargeSize, setLargeSizeState] = useState(isLarge);
  const [subMenu, setSubMenuState] = useState(false);
  const { isAdmin } = useSelector((state: RootState) => state);

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
          {isAdmin.status
            && (
            <li className={liCn}>
              <Link className="new-post-li" to="posts/new">New post</Link>
            </li>
            )}
        </ul>
        <div className={categoriesDropCn}>
          <ol
            onFocus={(): void => subHandler(true)}
            onMouseOver={(): void => subHandler(true)}
            onMouseOut={(): void => subHandler(false)}
            onClick={(): void => subHandler(false)}
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
      </nav>
    </header>
  );
};

export default Header;
