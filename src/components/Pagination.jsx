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
    const { selectPage } = this.props
    selectPage({ page });
  }

  render() {
    const { page, posts } = this.props;
    const postsPerPage = 5;
    const pages = Math.ceil(posts.length / postsPerPage);
    const pagesColl = _.range(1, pages + 1);

    return (
      <div className='paginate'>
      {pagesColl.map((el, id) => {
        const pageHref = `/?page=${el}`;
        return <Link key={id} to={pageHref} className={el === page ? 'active' : ''} onClick={this.handleSelectPage(el)}>{el}</Link>
      })}
      </div>
    );
  }
}

export default connect(mapStateToProps, actionCreators)(Pagination);
