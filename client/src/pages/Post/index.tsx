import React, { useEffect, ReactElement } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { RouteComponentProps, Link } from 'react-router-dom';
import { getDistanceDate, getImageUrl } from 'utils';
import { Categories, Style } from 'interfaces';

import { asyncActions, RootState } from 'slices';
import BackOnTop from 'components/BackOnTop';
import Comments from './PostComments';

type TParams = { id: string };

const Post = ({ match }: RouteComponentProps<TParams>): ReactElement => {
  const dispatch = useDispatch();
  const {
    fetchActivePostComments,
    fetchActivePostData,
    fetchPostsData,
    removePost,
  } = asyncActions;

  const {
    profile,
    posts,
    activePost: { post },
  } = useSelector((state: RootState) => state);

  const activePostId = match.params.id;

  useEffect(() => {
    dispatch(fetchActivePostData(activePostId));
    dispatch(fetchActivePostComments(activePostId));

    const firstPage = 1;
    const limitPosts = 5;
    dispatch(fetchPostsData(firstPage, limitPosts));
  }, [activePostId]);

  const removeHandler = (): void => {
    dispatch(removePost(post.id));
  };

  const imgHref = getImageUrl(String(post.image));
  const postDate = new Date(post.createdAt);
  const date = post.createdAt ? getDistanceDate(postDate) : '';
  const editPostPath = `/post/${post.id}/edit`;

  const imgStyle: Style = {
    backgroundImage: `url(${imgHref})`,
  };
  return (
    <section className="post-wrapper">
      <BackOnTop limit={450} />
      <div className="post">
        <div className="post-actions">
          {profile.isAdmin && <Link to={editPostPath}><img alt="edit" src="https://img.icons8.com/windows/60/000000/edit.png" /></Link>}
          {profile.isAdmin && <button type="button" onClick={removeHandler}><img alt="remove" src="https://img.icons8.com/windows/64/000000/delete.png" /></button>}
          <img alt="comment" src="https://img.icons8.com/windows/60/000000/topic.png" />
        </div>
        <div className="post-data-wrapper">
          <div className="post-data">
            <h1>{post.title}</h1>
            <span>
              <p>{`${date} in`}</p>
              <div>
                {post.categories && post.categories.map((el: Categories) => (
                  <Link key={el.value} to={`/category/${el.value}`}>
                    {el.value}
                  </Link>
                ))}
              </div>
            </span>
            <div className="poster-post-wrapper">
              <div className="poster-post" style={imgStyle} />
            </div>
            <div dangerouslySetInnerHTML={{ __html: post.content }} />
          </div>
          <Comments id={activePostId} />
        </div>
      </div>
      <div className="right-block-post">
        <div className="border-posts" />
        <h2 className="new-posts-topic">New Posts</h2>
        <div className="recent-posts">
          {posts.data.map(({ title, id }) => <div key={id}><Link to={`/post/${id}`}><h3>{title}</h3></Link></div>)}
        </div>
      </div>
    </section>
  );
};

export default Post;
