import React, { useEffect, ReactElement } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { RouteComponentProps, Link } from 'react-router-dom';
import { getDistanceDate, getImageUrl } from 'utils';
import { Style } from 'interfaces';

import { asyncActions, RootState } from 'slices';

type TParams = { id: string };

const Post = ({ match }: RouteComponentProps<TParams>): ReactElement => {
  const dispatch = useDispatch();
  const { fetchActivePostData, fetchPostsData, removePost } = asyncActions;
  const { isAdmin, posts, activePost: { post } } = useSelector((state: RootState) => state);

  const activePostId = match.params.id;

  useEffect(() => {
    dispatch(fetchActivePostData(activePostId));
  }, [activePostId]);

  useEffect(() => {
    const firstPage = 1;
    const limitPosts = 5;
    dispatch(fetchPostsData(firstPage, limitPosts));
  }, []);

  const removeHandler = (): void => {
    dispatch(removePost(post._id));
  };

  const imgHref = getImageUrl(String(post.image));
  const postDate = new Date(post.created_at);
  const date = post.date ? getDistanceDate(postDate) : '';
  const editPostPath = `/post/${post._id}/edit`;

  const imgStyle: Style = {
    backgroundImage: `url(${imgHref})`,
  };
  return (
    <section className="post-wrapper">
      <div className="post">
        <div className="post-actions">
          {isAdmin.status && <Link to={editPostPath}><img alt="edit" src="https://img.icons8.com/windows/60/000000/edit.png" /></Link>}
          {isAdmin.status && <button type="button" onClick={removeHandler}><img alt="remove" src="https://img.icons8.com/windows/64/000000/delete.png" /></button>}
          <img alt="comment" src="https://img.icons8.com/windows/60/000000/topic.png" />
        </div>
        <div className="post-data">
          <h1>{post.title}</h1>
          <span>
            <p>{`${date} in`}</p>
            <div>
              {post.categories && post.categories.map((el: string) => (
                <Link key={el} to={`/category/${el}`}>
                  {el}
                </Link>
              ))}
            </div>
          </span>
          <div className="poster-post-wrapper">
            <div className="poster-post" style={imgStyle} />
          </div>
          <div dangerouslySetInnerHTML={{ __html: post.content }} />
        </div>
      </div>
      <div className="right-block-post">
        <div className="border-posts" />
        <h2 className="new-posts-topic">New Posts</h2>
        <div className="recent-posts">
          {posts.data.map(({ title, _id }) => <Link to={`/post/${_id}`}><h3>{title}</h3></Link>)}
        </div>
      </div>
    </section>
  );
};

export default Post;
