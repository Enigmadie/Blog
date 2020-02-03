import React from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import _ from 'lodash';
import * as actions from '../actions';

const mapStateToProps = state => {
  return {
    page: Number(state.currentPage),
    posts: state.posts.allIds,
  };
};

const actionCreators = {
  selectPage: actions.selectPage,
};

class Pagination extends React.Component {
  handleSelectPage = page => () => {
    const { selectPage } = this.props;
    selectPage({ page });
  };

  render() {
    const { page, posts } = this.props;
    const postsPerPage = 10;
    const pages = Math.ceil(posts.length / postsPerPage);

    const prevPagesMax = page > 5 ? page - 4 : 1;
    const nextPagesMax = page + 5 > pages ? pages : page + 4;

    const pagesColl = _.range(prevPagesMax, nextPagesMax + 1);
    const isLastPage = pages === page;
    const isFirstPage = page === 1;

    return (
      <div className='paginate'>
        {!isFirstPage && <>
          <a onClick={this.handleSelectPage(1)}>«</a>
          <a onClick={this.handleSelectPage(page - 1)}>‹</a>
        </>}
        {pagesColl.map((el, id) => {
          const pageHref = el === 1 ? '/' : `/?page=${el}`;
          return <Link key={id} to={pageHref} className={el === page ? 'active' : ''} onClick={this.handleSelectPage(el)}>{el}</Link>
        })}
        {!isLastPage && <>
          <p>...</p>
          <a onClick={this.handleSelectPage(page + 1)}>›</a>
          <a onClick={this.handleSelectPage(pages)}>»</a>
        </>}
      </div>
    );
  }
}

export default connect(mapStateToProps, actionCreators)(Pagination);
