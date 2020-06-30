import React, { ReactElement, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { asyncActions, RootState } from 'slices';
import { RouteComponentProps, Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { Post, Style } from 'interfaces';
import { getDistanceDate, getImageUrl } from 'utils';
import Pagination from 'components/Pagination';

type TParams = { name: string };

const Category = ({ match }: RouteComponentProps<TParams>): ReactElement => {
  const dispatch = useDispatch();
  const { fetchCategoryData, removePost } = asyncActions;
  const { isAdmin, posts } = useSelector((state: RootState) => state);

  const category = match.params.name;
  const { t } = useTranslation();
  const emptyMsg = t('emptyCategory');

  useEffect((): void => {
    dispatch(fetchCategoryData(category));
  }, [category]);

  return (
    <>
      <h1 className="category-name">{category}</h1>
      <section className="posts-wrapper">
        <div className="posts">
          {posts.data.length === 0 && <p className="category-empty">{emptyMsg}</p>}
          {posts.data.map((post: Post) => {
            const postDate = new Date(post.date);
            const date = getDistanceDate(postDate);
            const imgSrc = getImageUrl(String(post.image));
            const editPostPath = `/post/${post._id}/edit`;
            const postPath = `/post/${post._id}`;

            const removeHandler = (): void => {
              dispatch(removePost(post._id));
            };

            const imgStyle: Style = {
              backgroundImage: `url(${imgSrc})`,
            };

            return (
              <div key={post._id} className="post-container">
                <Link className="poster-main-wrapper" to={postPath}>
                  <div className="poster-main" style={imgStyle} />
                </Link>
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
      </section>
      <Pagination />
    </>
  );
};

export default Category;
