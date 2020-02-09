import React from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import { formatDistanceToNow, format, differenceInDays } from 'date-fns';
import * as actions from '../actions';
import Pagination from './Pagination.jsx';

const mapStateToProps = state => {
  const { isAdmin, dataFetchingFromServerState, posts: { byId, allIds } } = state;

  const posts = allIds.map((id) => byId[id])

  const postsPerPage = 9;
  const currentPosts = posts.slice(0, postsPerPage);

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
      {isAdmin && <Link className='create-post' to='posts/new'>Create new post</Link>}
        <div className='posts'>
        {posts.map((post) => {
          const postDate = new Date(post.date);
          const date = (differenceInDays(new Date(), postDate) > 3)
            ? format(postDate, 'dd/MM/yyyy')
            : formatDistanceToNow(postDate, { includeSeconds: true, addSuffix: true });
          const imgSrc = `http://localhost:8080${post.image}`;
          const postPath = `/post/${post._id}`
          const editPostPath = `/post/${post._id}/edit`

          return <div className='post' key={post._id}>
            <img src={imgSrc} />
            <Link to={postPath}><h2>{post.title}</h2></Link>
            <p className='posts-preview'>{post.preview}</p>
            <p className='posts-date'>{date}</p>
            <div className='admin-post-panel'>
              {isAdmin && <Link to={editPostPath}><img src='https://img.icons8.com/office/16/000000/edit.png' /></Link>}
              {isAdmin && <a onClick={this.handleRemovePost(post._id)}><img src='https://img.icons8.com/office/16/000000/delete-sign.png' /></a>}
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
