import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Link } from 'react-router-dom';

import { asyncActions, RootState } from 'slices';
import { Post, Categories, Style } from 'interfaces';
import { getPage, getDistanceDate } from 'utils';
import Pagination from './Pagination';

const Posts: React.FC = () => {
  const dispatch = useDispatch();
  const { fetchPostsData, removePost } = asyncActions;
  const { isAdmin } = useSelector((state: RootState) => state);
  const { posts } = useSelector((state: RootState) => state);

  useEffect((): void => {
    const currentPage = getPage(window.location.href);
    dispatch(fetchPostsData(currentPage));
  }, []);

  return (
    <div className="posts-wrapper">
      <div className="posts">
        {posts.data.map((post: Post) => {
          const postDate = new Date(post.date);
          const date = getDistanceDate(postDate);
          const imgSrc = String(post.image);
          const postPath = `/post/${post._id}`;
          const editPostPath = `/post/${post._id}/edit`;
          const getCategoryPath = (category: string): string => `/category/${category}`;

          const imgStyle: Style = {
            'background-image': `url(${imgSrc})`,
          };

          const removeHandler = (): void => {
            dispatch(removePost(post._id));
          };
          return (
            <div className="post-container" key={post._id}>
              <Link className="poster-main-wrapper" to={postPath}>
                <div className="poster-main" style={imgStyle} />
              </Link>
              <div className="categories">
                {post.categories.map((el: Categories) => (
                  <Link key={el.value} to={getCategoryPath(el.value)}>
                    {el.value}
                  </Link>
                ))}
              </div>
              <Link to={postPath}><h2>{post.title}</h2></Link>
              <p className="posts-preview">{post.preview}</p>
              <div className="posts-bottom-panel">
                <p>{date}</p>
                <div className="admin-post-panel">
                  {isAdmin.status && <Link to={editPostPath}><img alt="edit" src="https://img.icons8.com/windows/60/000000/edit.png" /></Link>}
                  {isAdmin.status && <button type="button" onClick={removeHandler}><img alt="remove" src="https://img.icons8.com/windows/64/000000/delete-sign.png" /></button>}
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

export default Posts;
