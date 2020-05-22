import React, { ReactElement, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { asyncActions, RootState } from 'slices';
import { RouteComponentProps, Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { Post } from 'interfaces';
import { getDistanceDate } from 'utils';

type TParams = { name: string };

const Category = ({ match }: RouteComponentProps<TParams>): ReactElement => {
  const dispatch = useDispatch();
  const { fetchCategoryData, removePost } = asyncActions;
  const { isAdmin } = useSelector((state: RootState) => state);
  const { posts } = useSelector((state: RootState) => state);

  const category = match.params.name;
  const { t } = useTranslation();
  const emptyMsg = t('emptyCategory');

  useEffect((): void => {
    dispatch(fetchCategoryData(category));
  }, [category]);

  return (
    <div>
      <h1>{category}</h1>
      {posts.data.length === 0 && <p className="category-empty">{emptyMsg}</p>}
      {posts.data.map((post: Post) => {
        const postDate = new Date(post.date);
        const date = getDistanceDate(postDate);
        const imgSrc = String(post.image);
        const editPostPath = `/post/${post._id}/edit`

        return (
          <div className="category-post">
            <img src={imgSrc} alt="post" />
            <h2>{post.title}</h2>
            <p className="posts-preview">{post.preview}</p>
            <div className="posts-bottom-panel">
              <p>{date}</p>
              <div className="admin-post-panel">
                {isAdmin.status && <Link to={editPostPath}><img alt="edit" src="https://img.icons8.com/windows/60/000000/edit.png" /></Link>}
                {isAdmin.status && <a onClick={() => dispatch(removePost(post._id))}><img alt="remove" src='https://img.icons8.com/windows/64/000000/delete-sign.png' /></a>}
              </div>
            </div> </div>
        );
      })}
    </div>
  );
};

export default Category;
