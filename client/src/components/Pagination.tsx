import React from 'react';
import { useSelector } from 'react-redux';
import _ from 'lodash';
import cn from 'classnames';

import { getPage } from 'utils';
import { RootState } from 'slices';

const Pagination: React.FC = () => {
  const { posts } = useSelector((state: RootState) => state);

  const page = getPage(window.location.href);

  const postsPerPage = 12;

  const getPageHref = (pageNumber: number): string => (pageNumber === 1 ? '/' : `/?page=${pageNumber}`);
  const pages = Math.ceil(posts.allPostsCount / postsPerPage);

  const prevPagesMax = page > 5 ? page - 4 : 1;
  const nextPagesMax = page + 5 > pages ? pages : page + 4;

  const pagesColl = _.range(prevPagesMax, nextPagesMax + 1);
  const isLastPage = pages === page;
  const isFirstPage = page === 1;

  return (
    <div className="paginate">
      {!isFirstPage && (
      <>
        <a href={getPageHref(1)}>«</a>
        <a href={getPageHref(page - 1)}>‹</a>
      </>
      )}
      {pagesColl.map((el: number, id: number) => {
        const pageCn = cn({
          active: el === page,
        });
        return <a key={id} href={getPageHref(el)} className={pageCn}>{el}</a>
      })}
      {!isLastPage && (
        <>
          <p>...</p>
          <a href={getPageHref(page + 1)}>›</a>
          <a href={getPageHref(pages)}>»</a>
        </>
      )}
    </div>
  );
};

export default Pagination;
