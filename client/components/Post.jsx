import React from 'react';
import { find } from 'lodash';
import connect from '../connect';

const mapStateToProps = (state, { match }) => {
  const { posts: { data }, fetchingState  } = state;
  const activePostId = match.params.id;

  const post = find(data, { _id: activePostId })
  const activePost = fetchingState === true ? post : {};

  return { activePost, fetchingState  };
};

const Post = ({ activePost, fetchingState }) => {
  const imgHref = `http://localhost:8080${activePost.image}`
  if (fetchingState === true) {
    return <div className='loader'/>
  }
  return (
  <div className='post'>
    <h1>{activePost.title}</h1>
    <img src={imgHref} />
    <div dangerouslySetInnerHTML={{ __html: activePost.content }} />
  </div>
  );
};

export default connect(mapStateToProps)(Post)
