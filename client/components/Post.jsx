import React, { useEffect } from 'react';
import { useSelector } from 'react-redux';
import connect from '../connect';

const Post = ({ match, fetchActivePostData }) => {
  const { post } = useSelector((state) => state.activePost);
  const activePostId = match.params.id;

  useEffect(() => {
    fetchActivePostData({ id: activePostId });
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

export default connect()(Post);
