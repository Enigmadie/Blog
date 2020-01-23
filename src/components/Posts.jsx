import React from 'react';
import { connect } from 'react-redux';
import * as actions from '../actions';

const mapStateToProps = state => {
  const { isAdmin, posts: { byId, allIds } } = state;
  const posts = allIds.map((id) => byId[id]);
  return { posts, isAdmin };
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
    const { posts } = this.props;
    return (
      <>
        <a className='create-post' href='/posts/new'>Create new post</a>
      <div className='posts'>
        {posts.reverse().map((post) => {
          const imgSrc = `http://localhost:8080${post.image}`
          const postPath = `/posts/${post._id}`
          const editPostPath = `/posts/edit/${post._id}`

            return <div className='post' key={post._id}>
              <a href={postPath}><h2>{post.title}</h2></a>
              <img src={imgSrc} />
              <p>{post.content}</p>
              <div className='admin-post-panel'>
                <a href={editPostPath}>Edit</a>
                <button onClick={this.handleRemovePost(post._id)}>X</button>
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
