import React from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import * as actions from '../actions';

const mapStateToProps = state => {
  const { isAdmin, dataFetchingFromServerState, posts: { byId, allIds } } = state;
  const posts = allIds.map((id) => byId[id]).reverse();
  return { isAdmin, dataFetchingFromServerState, posts };
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
          const imgSrc = `http://localhost:8080${post.image}`
          const postPath = `/posts/${post._id}`
          const editPostPath = `/edit/${post._id}`

            return <div className='post' key={post._id}>
              <Link to={postPath}><h2>{post.title}</h2></Link>
              <img src={imgSrc} />
              <p>{post.content}</p>
              <div className='admin-post-panel'>
            {isAdmin && <Link to={editPostPath}>Edit</Link>}
          {isAdmin && <button onClick={this.handleRemovePost(post._id)}>X</button>}
              </div>
            </div>
        }
        )}
        </div>
      </>
    )
  }
};

export default connect(mapStateToProps, actionCreators)(Posts);
