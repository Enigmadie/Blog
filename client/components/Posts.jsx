import React from 'react';
import { Link } from 'react-router-dom';
import { formatDistanceToNow, format, differenceInDays } from 'date-fns';
import Pagination from './Pagination.jsx';
import connect from '../connect';

const mapStateToProps = state => {
  const { isAdmin, fetchingState, posts: { data: { byId, allIds } } } = state;
  const posts = allIds.map((id) => byId[id])

  const postsPerPage = 9;
  const currentPosts = posts.slice(0, postsPerPage);

  return { isAdmin: isAdmin.data, fetchingState, posts: currentPosts };
};

const Posts = ({
  isAdmin,
  fetchingState,
  posts,
  removePost,
}) => {
  if (fetchingState === true ) {
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
        return <div className='post-container' key={post._id}>
          <Link to={postPath}><img src={imgSrc} /></Link>
          <div className='categories'>
          {post.categories.map((el, id) => <a key={id}>{el.value}</a>)}
          </div>
          <Link to={postPath}><h2>{post.title}</h2></Link>
          <p className='posts-preview'>{post.preview}</p>
          <div className='posts-bottom-panel'>
            <p>{date}</p>
            <div className='admin-post-panel'>
              {isAdmin && <Link to={editPostPath}><img src='https://img.icons8.com/windows/60/000000/edit.png' /></Link>}
              {isAdmin && <a onClick={()=> removePost(post._id)}><img src='https://img.icons8.com/windows/64/000000/delete-sign.png' /></a>}
            </div>
          </div>
        </div>
      }
      )}
      </div>
      <Pagination />
    </>
  )
}

export default connect(mapStateToProps)(Posts);
