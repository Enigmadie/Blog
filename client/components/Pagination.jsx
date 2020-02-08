import React from 'react';
import { connect } from 'react-redux';
import _ from 'lodash';

const mapStateToProps = state => {
  return {
    page: Number(state.currentPage),
    postsCount: state.postsCount
  };
};

class Pagination extends React.Component {
  render() {
    const { page, postsCount } = this.props;
    const postsPerPage = 9;

    const getPageHref = page => page === 1 ? '/' : `/?page=${page}`;
    const pages = Math.ceil(postsCount / postsPerPage);

    const prevPagesMax = page > 5 ? page - 4 : 1;
    const nextPagesMax = page + 5 > pages ? pages : page + 4;

    const pagesColl = _.range(prevPagesMax, nextPagesMax + 1);
    const isLastPage = pages === page;
    const isFirstPage = page === 1;

    return (
      <div className='paginate'>
        {!isFirstPage && <>
          <a href={getPageHref(1)}>«</a>
          <a href={getPageHref(page - 1)}>‹</a>
        </>}
        {pagesColl.map((el, id) => {
          return <a key={id} href={getPageHref(el)} className={el === page ? 'active' : ''} >{el}</a>
        })}
        {!isLastPage && <>
          <p>...</p>
          <a href={getPageHref(page + 1)}>›</a>
          <a href={getPageHref(pages)}>»</a>
        </>}
      </div>
    );
  }
}

export default connect(mapStateToProps)(Pagination);
