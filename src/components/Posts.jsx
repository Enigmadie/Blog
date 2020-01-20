import React from 'react';
import { connect } from 'react-redux';
import * as actions from '../actions';

const mapStateToProps = state => {
  const props = {
    posts: state.posts,
    isAdmin: state.isAdmin,
  };
  return props;
};

const actionCreators = {
  removePost: actions.removePost,
};

class Posts extends React.Component {
  handleRemovePost = id => () => {
    console.log(id)
    const { removePost } = this.props;
    removePost(id);
  }
  render() {
    const { posts } = this.props;
    return (
      <div className='posts'>
        {posts.reverse().map((post) => {
          const imgSrc = `http://localhost:8080${post.image}`
            return <div className='post' key={post._id}>
              <h2>{post.title}</h2>
              <img src={imgSrc} />
              <p>{post.content}</p>
              <div className='admin-post-panel'>
                <a>Edit</a>
                <button onClick={this.handleRemovePost(post._id)}>X</button>
              </div>
            </div>
        }
        )}
        </div>
    )
  }
};

export default connect(mapStateToProps, actionCreators)(Posts);
