import React, { useEffect, ReactElement } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { RouteComponentProps, Link } from 'react-router-dom';
import { getDistanceDate } from 'utils';

import { asyncActions, RootState } from 'slices';

type TParams = { id: string };

const Post = ({ match }: RouteComponentProps<TParams>): ReactElement => {
  const dispatch = useDispatch();
  const { fetchActivePostData, removePost } = asyncActions;
  const { activePost: { post } } = useSelector((state: RootState) => state);
  const { isAdmin } = useSelector((state: RootState) => state);

  const activePostId = match.params.id;

  useEffect(() => {
    dispatch(fetchActivePostData(activePostId));
  }, []);

  const removeHandler = (): void => {
    dispatch(removePost(post._id));
  };

  const imgHref = String(post.image);
  const postDate = new Date(post.date);
  const date = post.date ? getDistanceDate(postDate) : '';
  const editPostPath = `/post/${post._id}/edit`;
  return (
    <div className="post">
      <h1>{post.title}</h1>
      <div className="posts-bottom-panel">
        <p>{date}</p>
        <div className="admin-post-panel">
          {isAdmin.status && <Link to={editPostPath}><img alt="edit" src="https://img.icons8.com/windows/60/000000/edit.png" /></Link>}
          {isAdmin.status && <button type="button" onClick={removeHandler}><img alt="remove" src="https://img.icons8.com/windows/64/000000/delete-sign.png" /></button>}
        </div>
      </div>
      <img src={imgHref} alt="poster" />
      <div dangerouslySetInnerHTML={{ __html: post.content }} />
    </div>
  );
};

export default Post;
