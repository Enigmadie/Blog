import React, { useEffect, ReactElement } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { RouteComponentProps } from 'react-router-dom';

import { asyncActions, RootState } from 'slices';

declare const domain: string;

type TParams = { id: string };

const Post = ({ match }: RouteComponentProps<TParams>): ReactElement => {
  const dispatch = useDispatch();
  const { activePost: { post } } = useSelector((state: RootState) => state);

  const activePostId = match.params.id;

  useEffect(() => {
    dispatch(asyncActions.fetchActivePostData(activePostId));
  }, []);

  const imgHref = `${domain}/assets/${post.image}`;
  return (
    <div className="post">
      <h1>{post.title}</h1>
      <img src={imgHref} alt="poster" />
      <div dangerouslySetInnerHTML={{ __html: post.content }} />
    </div>
  );
};

export default Post;
