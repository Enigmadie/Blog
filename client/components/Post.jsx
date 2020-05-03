import React, { useEffect } from 'react';
import { useSelector } from 'react-redux';
import _ from 'lodash';
// import connect from '../connect';

// const mapStateToProps = (state, { match }) => {
//   const { posts: { data }, fetchingState } = state;
//   const activePostId = match.params.id;

//   const post = find(data, { _id: activePostId });
//   console.log(match)
//   const activePost = fetchingState === true ? post : {};

//   return { activePost, fetchingState };
// };

export default ({ match }) => {
  const { data } = useSelector((state) => state.posts)
  const activePostId = match.params.id;

  const activePost = _.find(data, { _id: activePostId });
  const imgHref = `${domain}/assets/${activePost.image}`;
  return (
    <div className='post'>
      <h1>{activePost.title}</h1>
      <img src={imgHref} />
      <div dangerouslySetInnerHTML={{ __html: activePost.content }} />
    </div>
  );
};

// export default connect(mapStateToProps)(Post)
