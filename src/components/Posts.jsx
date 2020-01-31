import React from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import { formatDistance } from 'date-fns';
import * as actions from '../actions';
import Pagination from './Pagination.jsx';

const mapStateToProps = state => {
  const { currentPage, isAdmin, dataFetchingFromServerState, posts: { byId, allIds } } = state;

  const posts = allIds.map((id) => byId[id]).reverse();

  const postsPerPage = 5;
  const indexOfLastPage = currentPage * postsPerPage;
  const indexOfFirstPage = indexOfLastPage - postsPerPage;
  const currentPosts = posts.slice(indexOfFirstPage, indexOfLastPage);

  return { isAdmin, dataFetchingFromServerState, posts: currentPosts };
};

const actionCreators = {
  removePost: actions.removePost,
  editPost: actions.editPost,
};

class Posts extends React.Component {
  handleRemovePost = id => () => {
    const { removePost } = this.props;
    removePost(id);
  }
  handleEditPost = id => () => {
    const { editPost } = this.props;
    editPost(id)
  }
  render() {
    const { isAdmin, dataFetchingFromServerState, posts } = this.props;
    if (dataFetchingFromServerState === 'requested' ) {
      return <div className='loader'/>
    }
    return (
      <>
      {isAdmin && <Link className='create-post' to='/new'>Create new post</Link>}
        <div className='posts'>
        {posts.map((post) => {
          const postDate = formatDistance(new Date(), new Date(post.date), { includeSeconds: true });
          const imgSrc = `http://localhost:8080${post.image}`
          const postPath = `/posts/${post._id}`
          const editPostPath = `/edit/${post._id}`

            return <div className='post' key={post._id}>
              <div className='upper-post-container'>
                <Link to={postPath}><h2>{post.title}</h2></Link>
                <p>{postDate}</p>
              </div>
              <img src={imgSrc} />
              <p>{post.preview}</p>
              <div className='admin-post-panel'>
            {isAdmin && <Link to={editPostPath}>Edit</Link>}
          {isAdmin && <button onClick={this.handleRemovePost(post._id)}>X</button>}
              </div>
            </div>
        }
        )}
        </div>
        <Pagination />
      </>
    )
  }
};

export default connect(mapStateToProps, actionCreators)(Posts);
