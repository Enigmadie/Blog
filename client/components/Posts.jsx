import React, { useEffect } from 'react';
import { useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { formatDistanceToNow, format, differenceInDays } from 'date-fns';
import url from 'url';

import Pagination from './Pagination.jsx';
import connect from '../connect';

const Posts = ({ removePost, fetchPostsData }) => {
  const { isAdmin, posts } = useSelector((state) => state);

  useEffect(() => {
    const { query } = url.parse(window.location.href, true);
    const currentPage = query.page ? query.page : 1;
    fetchPostsData({ page: currentPage });
  }, []);

  return (
    <div className="posts-wrapper">
      {isAdmin.status && <Link className="create-post" to="posts/new">Create new post</Link>}
      <div className="posts">
        {posts.data.map((post) => {
          const postDate = new Date(post.date);
          const date = (differenceInDays(new Date(), postDate) > 3)
            ? format(postDate, 'dd/MM/yyyy')
            : formatDistanceToNow(postDate, { includeSeconds: true, addSuffix: true });
          const imgSrc = `${domain}/assets${post.image}`;
          const postPath = `/post/${post._id}`
          const editPostPath = `/post/${post._id}/edit`
          return (
            <div className="post-container" key={post._id}>
              <Link to={postPath}>
                <img src={imgSrc} alt="post" />
              </Link>
              <div className="categories">
                {post.categories.map((el, id) => <a key={id}>{el.value}</a>)}
              </div>
              <Link to={postPath}><h2>{post.title}</h2></Link>
              <p className="posts-preview">{post.preview}</p>
              <div className="posts-bottom-panel">
                <p>{date}</p>
                <div className="admin-post-panel">
                  {isAdmin.status && <Link to={editPostPath}><img alt="edit" src="https://img.icons8.com/windows/60/000000/edit.png" /></Link>}
                  {isAdmin.status && <a onClick={() => removePost(post._id)}><img alt="remove" src='https://img.icons8.com/windows/64/000000/delete-sign.png' /></a>}
                </div>
              </div>
            </div>
          );
        })}
      </div>
      <Pagination />
    </div>
  );
};

export default connect()(Posts);
